"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { contact } from "@/lib/content";
import { reply, suggest, welcomeMessage, initialState, finishEmailFlow, botMessage, userMessage } from "@/lib/chatbot/engine";
import { sendChatEmail } from "@/lib/chatbot/sendEmail";

const STORAGE_KEY = "amx-chat-v1";
const TEASER_KEY = "amx-chat-teaser-dismissed";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function loadSaved() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Floating "Aspire Assistant" chatbot, mounted once in the root layout so it
// appears on every page. All answers come from the local rule/retrieval
// engine in lib/chatbot — no AI API, no network calls.
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => loadSaved()?.messages || [welcomeMessage()]);
  const [botState, setBotState] = useState(() => loadSaved()?.botState || initialState);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [view, setView] = useState("chat"); // chat | email
  const [draft, setDraft] = useState(null);
  const [sending, setSending] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [unread, setUnread] = useState(true);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);

  // Persist the conversation for this browser tab (survives page reloads)
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: messages.slice(-60), botState }));
    } catch {}
  }, [messages, botState]);

  // Friendly teaser bubble a few seconds after the first visit
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setTeaser(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Keep the newest message in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open, view]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, view]);

  function dismissTeaser() {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  }

  function toggleOpen() {
    setOpen((o) => !o);
    setUnread(false);
    dismissTeaser();
  }

  // Show bot replies one at a time with a short "typing" pause
  const deliver = useCallback((replies) => {
    setTyping(true);
    let delay = 0;
    replies.forEach((m, i) => {
      delay += Math.min(1300, 420 + (m.text?.length || 0) * 4) + (i ? 250 : 0);
      timers.current.push(
        setTimeout(() => {
          setMessages((prev) => [...prev, m]);
          if (i === replies.length - 1) setTyping(false);
        }, delay)
      );
    });
    if (!replies.length) setTyping(false);
  }, []);

  const submitEmail = useCallback(
    async (data, stateForFlow) => {
      setSending(true);
      const res = await sendChatEmail(data).catch(() => ({ ok: false }));
      setSending(false);
      setView("chat");
      if (!res.ok) {
        deliver([
          botMessage({
            text: `Sorry — I couldn't send that just now. Please email us directly at **${contact.email}** or call **${contact.phone}**.`,
          }),
        ]);
        return;
      }
      const done = finishEmailFlow(stateForFlow, "sent", data);
      setBotState(done.state);
      deliver(done.messages);
    },
    [deliver]
  );

  function send(text) {
    const clean = text.trim();
    if (!clean || typing || sending) return;
    setInput("");
    setMessages((prev) => [...prev, userMessage(clean)]);
    const result = reply(clean, botState);
    setBotState(result.state);
    if (result.sendRequested && result.state.flow?.data) {
      submitEmail(result.state.flow.data, result.state);
      return;
    }
    deliver(result.messages);
  }

  function handleAction(action) {
    if (action.action === "email") {
      openEmailForm(botState.flow?.data);
    }
  }

  function openEmailForm(prefill) {
    setDraft({ name: "", email: "", phone: "", subject: "", message: "", ...(prefill || {}) });
    setView("email");
  }

  function cancelFlow() {
    const done = finishEmailFlow(botState, "cancelled");
    setBotState(done.state);
    deliver(done.messages);
  }

  function restart() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyping(false);
    setBotState(initialState);
    setMessages([welcomeMessage()]);
    setView("chat");
  }

  const suggestions = useMemo(() => (input.trim().length >= 3 && view === "chat" ? suggest(input) : []), [input, view]);
  const lastBotIndex = messages.findLastIndex((m) => m.from === "bot");

  return (
    <>
      {/* Teaser bubble */}
      {teaser && !open && (
        <div className="chat-msg-in fixed bottom-24 right-5 z-[89] w-64 rounded-2xl rounded-br-md border border-[var(--color-line)] bg-white p-4 pr-8 shadow-[0_20px_50px_-15px_rgba(11,31,51,0.45)] sm:right-6">
          <button
            type="button"
            onClick={dismissTeaser}
            aria-label="Dismiss"
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-bg)]"
          >
            ×
          </button>
          <button type="button" onClick={toggleOpen} className="text-left">
            <p className="text-sm font-bold text-[var(--color-navy)]">Hi there! 👋</p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
              Questions about billing, credentialing or pricing? I answer instantly.
            </p>
          </button>
        </div>
      )}

      {/* Launcher */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-[90] flex h-15 w-15 items-center justify-center rounded-full text-white shadow-[0_12px_32px_-8px_rgba(11,143,135,0.75)] transition-transform hover:scale-105 sm:right-6 ${
          open ? "max-sm:hidden" : "chat-attention"
        }`}
        style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
      >
        {!open && <span className="chat-ring absolute inset-0 rounded-full bg-[#20c4d6]" aria-hidden />}
        <span className="relative">
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              <path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="3" />
            </svg>
          )}
        </span>
        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#ef4444] text-[10px] font-bold">
            1
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Aspire Assistant chat"
          className="chat-panel-in fixed inset-0 z-[95] flex flex-col overflow-hidden bg-[var(--color-bg)] sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[min(620px,calc(100vh-11.5rem))] sm:w-[390px] sm:rounded-2xl sm:border sm:border-[var(--color-line)] sm:shadow-[0_30px_80px_-20px_rgba(11,31,51,0.55)]"
        >
          {/* Header */}
          <div
            className="relative flex shrink-0 items-center gap-3 overflow-hidden px-4 py-3.5 text-white"
            style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 60%, #0b2a22 100%)" }}
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl" style={{ background: "#20c4d6" }} aria-hidden />
            {view === "email" ? (
              <button
                type="button"
                onClick={() => setView("chat")}
                aria-label="Back to chat"
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            ) : (
              <BotAvatar size="lg" />
            )}
            <div className="relative min-w-0 flex-1">
              <p className="font-[family-name:var(--font-display)] text-[15px] font-bold leading-tight">
                {view === "email" ? "Message our team" : "Aspire Assistant"}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                {view === "email" ? "We reply within 1 business day" : "Online · Instant answers"}
              </p>
            </div>
            <div className="relative flex items-center gap-1">
              {view === "chat" && (
                <>
                  <HeaderButton label="Email our team" onClick={() => openEmailForm(botState.flow?.data)}>
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    <path d="m22 6-10 7L2 6" />
                  </HeaderButton>
                  <HeaderButton label="Restart conversation" onClick={restart}>
                    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                    <path d="M3 3v5h5" />
                  </HeaderButton>
                </>
              )}
              <HeaderButton label="Close chat" onClick={() => setOpen(false)}>
                <path d="M18 6 6 18M6 6l12 12" />
              </HeaderButton>
            </div>
          </div>

          {view === "email" && draft ? (
            <EmailForm
              draft={draft}
              setDraft={setDraft}
              sending={sending}
              onSubmit={() => submitEmail(draft, botState)}
              onCancel={() => setView("chat")}
            />
          ) : (
            <>
              {/* Messages */}
              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
                {messages.map((m, i) => (
                  <Fragment key={m.id}>
                    {m.from === "user" ? (
                      <div className="chat-msg-in flex justify-end">
                        <p
                          className="max-w-[80%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md px-3.5 py-2.5 text-sm text-white shadow-sm"
                          style={{ background: "linear-gradient(135deg, #0b1f33, #173b57)" }}
                        >
                          {m.text}
                        </p>
                      </div>
                    ) : (
                      <BotBubble
                        message={m}
                        isLast={i === lastBotIndex && !typing}
                        flowActive={botState.flow?.step === "confirm"}
                        sending={sending}
                        onQuick={send}
                        onAction={handleAction}
                        onSendEmail={() => submitEmail(botState.flow.data, botState)}
                        onEditEmail={() => openEmailForm(botState.flow?.data)}
                        onCancelEmail={cancelFlow}
                      />
                    )}
                  </Fragment>
                ))}
                {typing && (
                  <div className="chat-msg-in flex items-start gap-2">
                    <BotAvatar />
                    <div className="chat-typing flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3.5 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions while typing */}
              {suggestions.length > 0 && (
                <div className="shrink-0 border-t border-[var(--color-line)] bg-white px-3 pb-1 pt-2">
                  <p className="px-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">Suggested questions</p>
                  <div className="mt-1 flex flex-col">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] text-[var(--color-navy)] hover:bg-[var(--color-teal-tint)]"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 text-[var(--color-teal)]" aria-hidden>
                          <circle cx="11" cy="11" r="7" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Composer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className={`shrink-0 bg-white px-3 pb-3 pt-2 ${suggestions.length ? "" : "border-t border-[var(--color-line)]"}`}
              >
                <div className="flex items-center gap-2 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] py-1 pl-3.5 pr-1 transition-colors focus-within:border-[var(--color-teal)] focus-within:bg-white">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholderFor(botState)}
                    aria-label="Type your message"
                    maxLength={500}
                    type={botState.flow?.step === "email" ? "email" : "text"}
                    className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)]/70"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || typing || sending}
                    aria-label="Send message"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </button>
                </div>
                <p className="mt-1.5 text-center text-[10px] text-[var(--color-muted)]/80">
                  Automated assistant · Please don&apos;t share patient health information
                </p>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

function placeholderFor(state) {
  switch (state.flow?.step) {
    case "name":
      return "Your name…";
    case "email":
      return "you@practice.com";
    case "subject":
      return "Short subject…";
    case "message":
      return "Type your message…";
    default:
      return "Ask me anything…";
  }
}

/* ─── Pieces ─── */

function BotAvatar({ size = "sm" }) {
  const cls = size === "lg" ? "h-9 w-9" : "h-7 w-7";
  return (
    <span
      className={`relative flex ${cls} shrink-0 items-center justify-center rounded-full text-white ring-2 ring-white/20`}
      style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
      aria-hidden
    >
      <svg width={size === "lg" ? 18 : 14} height={size === "lg" ? 18 : 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="16" height="12" rx="3" />
        <path d="M12 4v4M9 13h.01M15 13h.01M9.5 16.5h5" />
      </svg>
    </span>
  );
}

function HeaderButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
    </button>
  );
}

function BotBubble({ message, isLast, flowActive, sending, onQuick, onAction, onSendEmail, onEditEmail, onCancelEmail }) {
  const card = message.card;
  return (
    <div className="chat-msg-in flex items-start gap-2">
      <BotAvatar />
      <div className="min-w-0 max-w-[85%]">
        <div className="rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-[var(--color-ink)] shadow-sm">
          <RichText text={message.text} />

          {card?.type === "email-summary" && (
            <div className="mt-3 overflow-hidden rounded-xl border border-[var(--color-line)]">
              <dl className="divide-y divide-[var(--color-line)] text-xs">
                {[
                  ["Name", card.data.name],
                  ["Email", card.data.email],
                  ["Subject", card.data.subject],
                  ["Message", card.data.message],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 px-3 py-2">
                    <dt className="w-14 shrink-0 font-semibold text-[var(--color-muted)]">{k}</dt>
                    <dd className="min-w-0 whitespace-pre-wrap break-words text-[var(--color-navy)]">{v}</dd>
                  </div>
                ))}
              </dl>
              {isLast && flowActive && (
                <div className="flex gap-1.5 border-t border-[var(--color-line)] bg-[var(--color-bg)] p-2">
                  <button
                    type="button"
                    onClick={onSendEmail}
                    disabled={sending}
                    className="flex-1 rounded-lg py-2 text-xs font-bold text-white disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                  >
                    {sending ? "Sending…" : "Send ✓"}
                  </button>
                  <button type="button" onClick={onEditEmail} className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-navy)] hover:border-[var(--color-teal)]">
                    Edit
                  </button>
                  <button type="button" onClick={onCancelEmail} className="rounded-lg px-3 py-2 text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-navy)]">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {message.actions?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.actions.map((a) => (
              <ActionButton key={a.label} action={a} onAction={onAction} />
            ))}
          </div>
        )}

        {isLast && message.quick?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.quick.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onQuick(q)}
                className="rounded-full border border-[var(--color-teal)]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-teal)] transition-colors hover:border-[var(--color-teal)] hover:bg-[var(--color-teal)] hover:text-white"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({ action, onAction }) {
  const cls =
    "inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-navy)]/15 bg-[var(--color-navy)] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-navy-soft)]";
  const arrow = <span aria-hidden>→</span>;
  if (action.href) {
    return (
      <Link href={action.href} className={cls}>
        {action.label} {arrow}
      </Link>
    );
  }
  if (action.action === "call") {
    return (
      <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className={cls}>
        📞 {action.label}
      </a>
    );
  }
  return (
    <button type="button" onClick={() => onAction(action)} className={cls}>
      ✉️ {action.label}
    </button>
  );
}

// Minimal formatter: **bold**, line breaks, "• " bullets and numbered lines
function RichText({ text }) {
  if (!text) return null;
  return (
    <div className="space-y-1">
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        const bullet = line.startsWith("• ");
        const content = bullet ? line.slice(2) : line;
        const parts = content.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? (
            <strong key={j} className="font-semibold text-[var(--color-navy)]">
              {p.slice(2, -2)}
            </strong>
          ) : (
            <Fragment key={j}>{p}</Fragment>
          )
        );
        return bullet ? (
          <div key={i} className="flex gap-2 pl-0.5">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-teal)]" aria-hidden />
            <span>{parts}</span>
          </div>
        ) : (
          <p key={i}>{parts}</p>
        );
      })}
    </div>
  );
}

function EmailForm({ draft, setDraft, sending, onSubmit, onCancel }) {
  const [errors, setErrors] = useState({});

  function set(k, v) {
    setDraft((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!draft.name.trim()) errs.name = "Please enter your name";
    if (!EMAIL_RE.test(draft.email.trim())) errs.email = "Please enter a valid email";
    if (!draft.subject.trim()) errs.subject = "Please add a subject";
    if (draft.message.trim().length < 5) errs.message = "Please add a short message";
    setErrors(errs);
    if (!Object.keys(errs).length) onSubmit();
  }

  const field = (k) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-teal)] focus:bg-white ${
      errors[k] ? "border-red-300 bg-red-50" : "border-[var(--color-line)] bg-white"
    }`;

  return (
    <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 space-y-3.5 overflow-y-auto px-4 py-5">
        <p className="rounded-xl bg-[var(--color-teal-tint)] px-3.5 py-3 text-xs leading-relaxed text-[var(--color-navy)]">
          Leave your details and message — it goes straight to the AspireMedX team, and we&apos;ll reply by email.
        </p>
        {[
          ["name", "Your name", "text", "Jordan Reyes", "name"],
          ["email", "Email", "email", "you@practice.com", "email"],
          ["phone", "Phone (optional)", "tel", "(555) 019-2044", "tel"],
          ["subject", "Subject", "text", "e.g. Quote for credentialing", "off"],
        ].map(([k, label, type, ph, ac]) => (
          <div key={k}>
            <label htmlFor={`chat-${k}`} className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              {label}
            </label>
            <input
              id={`chat-${k}`}
              type={type}
              autoComplete={ac}
              placeholder={ph}
              value={draft[k] || ""}
              onChange={(e) => set(k, e.target.value)}
              className={field(k)}
            />
            {errors[k] && <p className="mt-1 text-[11px] text-red-500">{errors[k]}</p>}
          </div>
        ))}
        <div>
          <label htmlFor="chat-message" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Message
          </label>
          <textarea
            id="chat-message"
            rows={4}
            placeholder="How can we help?"
            value={draft.message || ""}
            onChange={(e) => set("message", e.target.value)}
            className={`${field("message")} resize-none`}
          />
          {errors.message && <p className="mt-1 text-[11px] text-red-500">{errors.message}</p>}
        </div>
      </div>
      <div className="flex shrink-0 gap-2 border-t border-[var(--color-line)] bg-white p-3">
        <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-navy)]">
          Back
        </button>
        <button
          type="submit"
          disabled={sending}
          className="flex-1 rounded-lg py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
        >
          {sending ? "Sending…" : "Send message →"}
        </button>
      </div>
    </form>
  );
}
