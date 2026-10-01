// Conversation engine for the site chatbot. Pure JS, no network calls:
// matches questions against the knowledge base, keeps light context between
// turns, and runs a guided "email the team" flow.

import { intents, starterTopics } from "./knowledge.js";
import { buildIndex, normalize, search, tokenize } from "./nlp.js";

// Confidence thresholds (tuned with scripts against sample questions)
const HIGH = 0.4;
const LOW = 0.22;

// Tokens mixed into short follow-ups so "how long does it take?" after a
// credentialing answer is understood as a credentialing question.
const TOPIC_TOKENS = {
  pricing: ["price"],
  credentialing: ["credential"],
  enrollment: ["enroll"],
  billing: ["bill"],
  denials: ["denial"],
  ar: ["ar"],
  onboarding: ["start"],
  contracting: ["contract"],
  reporting: ["report"],
  technology: ["software"],
  specialty: ["specialty"],
  rcm: ["rcm"],
  services: ["services"],
};

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/;
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/;
// Never offered as "suggested questions" while the visitor types
const SMALL_TALK = new Set([
  "greeting", "yes", "thanks", "bye", "compliment", "how-are-you", "salam", "good-night", "nice-to-meet", "season-greeting",
  "ack", "no", "sorry", "laugh", "love", "joke", "time", "weather", "bot-name",
]);
const CANCEL_RE =/^(cancel|stop|never ?mind|forget it|exit|quit)\b/i;

let uid = 0;
const nextId = () => `m${Date.now().toString(36)}${(uid++).toString(36)}`;

export function botMessage(fields) {
  return { id: nextId(), from: "bot", time: Date.now(), ...fields };
}

export function userMessage(text) {
  return { id: nextId(), from: "user", time: Date.now(), text };
}

// Every intent's canonical question is also a pattern, so clicking a
// suggestion chip always resolves to that intent.
const index = buildIndex(intents.map((i) => ({ ...i, patterns: [i.q, ...i.patterns] })));
const byId = Object.fromEntries(intents.map((i) => [i.id, i]));

// Exact phrasing lookup — catches short replies like "no, that's all" whose
// words are all stop words, and makes suggestion chips resolve instantly.
const exact = new Map();
intents.forEach((i) =>
  [i.q, ...i.patterns].forEach((p) => {
    const key = normalize(p);
    if (key && !exact.has(key)) exact.set(key, i);
  })
);

function context() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  // Office hours are Mon–Fri 9–18 in US Eastern time
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short", hour: "numeric", hour12: false }).formatToParts(new Date());
  const et = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const etHour = Number(et.hour) % 24;
  const isOpen = !["Sat", "Sun"].includes(et.weekday) && etHour >= 9 && etHour < 18;
  return { greeting, isOpen };
}

function answerFor(intent) {
  const text = typeof intent.answer === "function" ? intent.answer(context()) : intent.answer;
  return botMessage({ text, quick: intent.quick, actions: intent.actions, intentId: intent.id });
}

export const initialState = { lastTopic: null, lastIntentId: null, misses: 0, flow: null };

export function welcomeMessage() {
  const { greeting } = context();
  return botMessage({
    text: `${greeting}! 👋 I'm the **Aspire Assistant**.\n\nAsk me anything about medical billing, credentialing, pricing or our specialties — or pick a topic below.`,
    quick: starterTopics,
  });
}

/** Ranked question suggestions for the "as you type" helper. */
export function suggest(text, limit = 3) {
  if (tokenize(text).length === 0) return [];
  const { results } = search(text, index, { limit: limit + 4 });
  const seen = new Set();
  return results
    .filter((r) => r.score >= LOW && !SMALL_TALK.has(r.intent.id))
    .filter((r) => (seen.has(r.intent.q) ? false : seen.add(r.intent.q)))
    .slice(0, limit)
    .map((r) => r.intent.q);
}

/**
 * Handle one user message. Returns { messages, state } — the bot's replies
 * and the updated conversation state.
 */
export function reply(text, state = initialState) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return { messages: [], state };

  if (state.flow?.type === "email") return continueEmailFlow(trimmed, state);
  if (state.flow?.type === "whatsapp") return continueWhatsAppFlow(trimmed, state);

  const exactHit = exact.get(normalize(trimmed));
  if (exactHit) {
    const next = { ...state, lastIntentId: exactHit.id, lastTopic: exactHit.topic || state.lastTopic, misses: 0 };
    if (exactHit.flow === "email") return startEmailFlow(trimmed, next, exactHit);
    if (exactHit.flow === "whatsapp") return startWhatsAppFlow(trimmed, next, exactHit);
    return { messages: [answerFor(exactHit)], state: next };
  }

  let { tokens, results } = search(trimmed, index);
  let top = results[0];

  // Short follow-up ("how much does it cost?")? Re-rank with the previous
  // topic mixed in; pronouns make us lean toward the contextual reading.
  const refersBack = /\b(it|that|this|they|them|those|same)\b|\b(what|how) about\b|^and\b/i.test(trimmed);
  if (state.lastTopic && TOPIC_TOKENS[state.lastTopic] && tokens.length <= 4 && (refersBack || !top || top.score < HIGH + 0.1)) {
    const withCtx = search(trimmed, index, { extraTokens: TOPIC_TOKENS[state.lastTopic] });
    const margin = refersBack ? -0.05 : 0.05;
    if (withCtx.results[0] && withCtx.results[0].score >= LOW && (!top || withCtx.results[0].score > top.score + margin)) {
      results = withCtx.results;
      top = results[0];
    }
  }

  // Confident match
  if (top && top.score >= HIGH) {
    const intent = top.intent;
    const next = { ...state, lastIntentId: intent.id, lastTopic: intent.topic || state.lastTopic, misses: 0 };
    if (intent.flow === "email") return startEmailFlow(trimmed, next, intent);
    if (intent.flow === "whatsapp") return startWhatsAppFlow(trimmed, next, intent);
    return { messages: [answerFor(intent)], state: next };
  }

  // Unsure — offer the closest questions
  const candidates = results.filter((r) => r.score >= LOW).slice(0, 3);
  if (candidates.length) {
    return {
      messages: [
        botMessage({
          text: "I want to make sure I get this right — did you mean one of these?",
          quick: [...candidates.map((c) => c.intent.q), "Something else"],
        }),
      ],
      state: { ...state, misses: state.misses + 1 },
    };
  }

  // No idea — after repeated misses, steer toward a human
  const misses = state.misses + 1;
  return {
    messages: [
      botMessage({
        text:
          misses >= 2
            ? "I'm still not sure I understand — sorry! The quickest way to get an answer is to message our team directly. They reply within one business day."
            : "Hmm, I don't have an answer for that yet. Could you rephrase it? Here are some things I know well:",
        quick: misses >= 2 ? ["Email the team", "Talk to a human"] : ["Pricing plans", "What services do you offer?", "Which specialties do you support?", "Email the team"],
        actions: misses >= 2 ? [{ label: "Email our team", action: "email" }] : undefined,
      }),
    ],
    state: { ...state, misses },
  };
}

/* ───────────── "Message us on WhatsApp" flow ───────────── */

// Pulls the message out of requests like "send on whatsapp that I need a quote"
// or "whatsapp: do you bill for cardiology?". Returns "" when there's none.
function extractWhatsAppMessage(text) {
  const m =
    text.match(/whats\s?app[^:]*?(?:\bthat\b|\bsaying\b|\bmessage\b|:|\s-)\s*(.{6,})$/i) ||
    text.match(/^(?:send|tell|message)\s+(?:them|the team|your team|the owner)?\s*(?:that\s+)?(.{6,}?)\s+(?:on|via|through|over)\s+whats\s?app\b/i);
  return m ? m[1].replace(/^["'“]|["'”.]$/g, "").trim() : "";
}

function whatsAppReady(text, state) {
  return {
    messages: [
      botMessage({
        text: `All set! Tap below to open WhatsApp — your message is already typed in:\n\n“${text}”\n\nJust press **send** in WhatsApp and our team will reply there.`,
        actions: [{ label: "Send on WhatsApp", action: "whatsapp", text }],
        quick: ["Current offers", "What services do you offer?"],
      }),
    ],
    state: { ...state, flow: null },
    whatsapp: text,
  };
}

function startWhatsAppFlow(text, state, intent) {
  const msg = extractWhatsAppMessage(text);
  if (msg) return whatsAppReady(msg, state);
  return {
    messages: [
      botMessage({
        text: `${answerFor(intent).text}\n\nWhat would you like to say? Type your message and I'll get it ready — or tap **Open WhatsApp** to start a blank chat.`,
        actions: [{ label: "Open WhatsApp", action: "whatsapp" }],
        quick: ["Hi! I'd like a quote", "I want to claim an offer", "Cancel"],
      }),
    ],
    state: { ...state, flow: { type: "whatsapp", step: "message" } },
  };
}

function continueWhatsAppFlow(text, state) {
  if (CANCEL_RE.test(text)) {
    return {
      messages: [botMessage({ text: "No problem — cancelled. Anything else I can help with?", quick: ["Current offers", "What services do you offer?"] })],
      state: { ...state, flow: null },
    };
  }
  if (text.length < 2) {
    return { messages: [botMessage({ text: "Could you type the message you'd like to send?", quick: ["Cancel"] })], state };
  }
  return whatsAppReady(text.slice(0, 1000), state);
}

/* ───────────── "Email the team" conversational flow ───────────── */

const EMAIL_STEPS = {
  name: "First, what's your **name**?",
  email: "Thanks{name}! What **email address** should the team reply to?",
  subject: "What's this about? A short **subject** is perfect (e.g. \"Quote for credentialing 3 providers\").",
  message: "Got it. Now type your **message** — include anything that will help us reply (practice size, specialty, what you need).",
};

// Pull whatever details the person already gave in their first message
function extractDetails(text) {
  const data = {};
  const email = text.match(EMAIL_RE);
  if (email) data.email = email[0].replace(/[.,;]+$/, "");
  const phone = text.replace(EMAIL_RE, "").match(PHONE_RE);
  if (phone) data.phone = phone[1].trim();
  const name = text.match(/\b(?:my name is|i am|i'm|this is)\s+([a-z][a-z'-]+(?:\s+[a-z][a-z'-]+)?)/i);
  if (name && !/interested|looking|a |an |the /i.test(name[1])) data.name = name[1].replace(/\b\w/g, (c) => c.toUpperCase());
  // "…that I need a quote for cardiology" → use as the message body
  const about = text.match(/\b(?:that|saying|about|regarding)\s+(.{12,})$/i);
  if (about) {
    const msg = about[1]
      .replace(EMAIL_RE, "")
      .replace(/[,;.]?\s*(and\s+)?(my\s+)?(name\s+is\s+[a-z' -]+|e-?mail(\s+address)?(\s+is|\s+at)?|contact\s+me\s+at|reach\s+me\s+at|you\s+can\s+reach\s+me\s+at)\s*[,;.]?\s*$/i, "")
      .replace(/[,;.\s]+$/, "")
      .trim();
    if (msg.length >= 8) data.message = msg.charAt(0).toUpperCase() + msg.slice(1);
  }
  return data;
}

function nextMissingStep(data) {
  return ["name", "email", "subject", "message"].find((k) => !data[k]) || "confirm";
}

function promptFor(step, data) {
  if (step === "confirm") {
    return botMessage({ text: "Here's what I'll send to the AspireMedX team:", card: { type: "email-summary", data } });
  }
  const text = EMAIL_STEPS[step].replace("{name}", data.name ? `, ${data.name.split(" ")[0]}` : "");
  return botMessage({ text, quick: ["Cancel"], inputHint: step });
}

function startEmailFlow(text, state, intent) {
  const data = extractDetails(text);
  if (data.message && !data.subject) data.subject = data.message.length > 60 ? `${data.message.slice(0, 57)}…` : data.message;
  const step = nextMissingStep(data);
  const intro = botMessage({ text: answerFor(intent).text + " Type **cancel** anytime to stop.", intentId: intent.id });
  return {
    messages: [intro, promptFor(step, data)],
    state: { ...state, flow: { type: "email", step, data } },
  };
}

function continueEmailFlow(text, state) {
  const { step, data } = state.flow;

  if (CANCEL_RE.test(text)) {
    return {
      messages: [botMessage({ text: "No problem — I've cancelled that message. Anything else I can help with?", quick: ["Pricing plans", "What services do you offer?"] })],
      state: { ...state, flow: null },
    };
  }

  if (step === "confirm") {
    if (/^(send|yes|yep|confirm|ok|okay|sure|go ahead)\b/i.test(text)) return { messages: [], state, sendRequested: true };
    return retry(state, "Use **Send** on the card above to send it, **Edit** to change something, or type **cancel**.");
  }

  const nextData = { ...data };
  if (step === "name") {
    if (text.length < 2 || text.length > 60) return retry(state, "Could you share your name (just first and last is fine)?");
    nextData.name = text.replace(/^(my name is|i am|i'm|this is)\s+/i, "").replace(/\b\w/g, (c) => c.toUpperCase());
  } else if (step === "email") {
    const m = text.match(EMAIL_RE);
    if (!m) return retry(state, "Hmm, that doesn't look like an email address. Could you double-check it? (e.g. name@practice.com)");
    nextData.email = m[0].replace(/[.,;]+$/, "");
  } else if (step === "subject") {
    nextData.subject = text.slice(0, 120);
  } else if (step === "message") {
    if (text.length < 5) return retry(state, "Could you add a little more detail so the team can help?");
    nextData.message = text.slice(0, 2000);
  }

  const nextStep = nextMissingStep(nextData);
  return {
    messages: [promptFor(nextStep, nextData)],
    state: { ...state, flow: nextStep === "confirm" ? { type: "email", step: "confirm", data: nextData } : { type: "email", step: nextStep, data: nextData } },
  };
}

function retry(state, text) {
  return { messages: [botMessage({ text, quick: ["Cancel"], inputHint: state.flow.step })], state };
}

/** Called by the UI after the summary card's Send / Cancel buttons. */
export function finishEmailFlow(state, outcome, data) {
  const first = data?.name?.split(" ")[0] || "there";
  const text =
    outcome === "sent"
      ? `✅ Done, ${first}! Your message is on its way to our team. They'll reply to **${data.email}** within one business day.\n\nAnything else I can help with?`
      : "No problem — I've discarded that message. Anything else I can help with?";
  return {
    messages: [botMessage({ text, quick: ["Pricing plans", "What services do you offer?"] })],
    state: { ...state, flow: null },
  };
}

export { byId as intentsById };
