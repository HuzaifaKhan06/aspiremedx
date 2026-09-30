// Lightweight, dependency-free intent matcher for the site chatbot.
//
// No AI API or model: every question is matched against the knowledge base
// in lib/chatbot/knowledge.js using classic information-retrieval tricks —
//   1. normalise text (contractions, multi-word phrases → single tokens)
//   2. remove stop words, stem ("billing" → "bill"), map synonyms
//      ("cost", "fee", "how much" → "price")
//   3. correct typos against the known vocabulary (edit distance)
//   4. score each intent with TF-IDF cosine similarity + best-pattern overlap
// It all runs in the browser in well under a millisecond per query.

// Multi-word phrases collapsed to one canonical token before tokenising.
// Order matters: longer phrases first.
const PHRASES = [
  ["accounts receivable", " ar "],
  ["account receivable", " ar "],
  ["a/r", " ar "],
  ["how much", " price "],
  ["how long", " duration "],
  ["how many days", " duration "],
  ["turnaround time", " duration "],
  ["get started", " start "],
  ["sign up", " start "],
  ["signup", " start "],
  ["on board", " start "],
  ["real person", " human "],
  ["live agent", " human "],
  ["talk to someone", " human "],
  ["speak to someone", " human "],
  ["customer service", " human "],
  ["customer support", " human "],
  ["e-mail", " email "],
  ["e mail", " email "],
  ["prior authorization", " priorauth "],
  ["prior authorisation", " priorauth "],
  ["prior auth", " priorauth "],
  ["pre authorization", " priorauth "],
  ["preauthorization", " priorauth "],
  ["pre auth", " priorauth "],
  ["caqh proview", " caqh "],
  ["pro view", " caqh "],
  ["business associate agreement", " baa "],
  ["clean claim", " cleanclaim "],
  ["first pass", " cleanclaim "],
  ["days in ar", " daysar "],
  ["fee schedule", " feeschedule "],
  ["value based", " valuebased "],
  ["value-based", " valuebased "],
  ["revenue cycle management", " rcm "],
  ["revenue cycle", " rcm "],
  ["primary source verification", " psv "],
  ["practice management", " pmsystem "],
  ["what can you do", " capabilities "],
  ["what do you do", " services "],
  ["who are you", " botidentity "],
  ["are you a bot", " botidentity "],
  ["are you human", " botidentity "],
  ["are you real", " botidentity "],
  ["thank you", " thanks "],
  ["good morning", " hello "],
  ["good afternoon", " hello "],
  ["good evening", " hello "],
  ["see you", " bye "],
  ["good bye", " bye "],
  ["goodbye", " bye "],
  ["set up fee", " setupfee "],
  ["setup fee", " setupfee "],
  ["onboarding fee", " setupfee "],
  ["new patient", " newpatient "],
  ["timely filing", " timelyfiling "],
  ["write off", " writeoff "],
  ["write-off", " writeoff "],
  ["nurse practitioner", " np "],
  ["physician assistant", " pa "],
  ["physician assistants", " pa "],
  ["hospital privileges", " privileges "],
  ["behavioral health", " mentalhealth "],
  ["mental health", " mentalhealth "],
  ["emergency room", " er "],
  ["urgent care", " urgentcare "],
  ["physical therapy", " physicaltherapy "],
  ["home health", " homehealth "],
  ["primary care", " primarycare "],
  ["family medicine", " familymedicine "],
  ["internal medicine", " internalmedicine "],
  ["pain management", " painmanagement "],
  ["multi specialty", " multispecialty "],
  ["multi-specialty", " multispecialty "],
  ["ob/gyn", " obgyn "],
  ["ob gyn", " obgyn "],
];

const CONTRACTIONS = [
  [/\bwhats\b/g, "what is"],
  [/(^|\s)u(?=\s|$)/g, "$1you"],
  [/(^|\s)ur(?=\s|$)/g, "$1your"],
  [/(^|\s)r(?=\s|$)/g, "$1are"],
  [/\bwanna\b/g, "want to"],
  [/\bgonna\b/g, "going to"],
  [/\bwhat's\b/g, "what is"],
  [/\bhow's\b/g, "how is"],
  [/\bit's\b/g, "it is"],
  [/\bthat's\b/g, "that is"],
  [/\bi'm\b/g, "i am"],
  [/\bi've\b/g, "i have"],
  [/\bi'd\b/g, "i would"],
  [/\byou're\b/g, "you are"],
  [/\bwe're\b/g, "we are"],
  [/\bcan't\b/g, "can not"],
  [/\bwon't\b/g, "will not"],
  [/\b(\w+)n't\b/g, "$1 not"],
];

const STOP = new Set(
  (
    "a an the is are am was were be been being do does did i me my mine we our ours us you your yours it its of to for in on at by with " +
    "and or but can could would will shall should may might must please what which who whom whose this that these those there here " +
    "have has had any some about tell know like want wanted need needs get got just also so if then than as from into up out how " +
    "when much many very really more most such own same too other again further once all each both few no nor not " +
    "let lets give show explain describe mean means meaning okay ok hmm um uh sir madam guys pls plz kindly help regarding related " +
    "anything something everything thing things"
  ).split(" ")
);

// Word (raw or stemmed) → canonical token
const SYNONYMS = {
  price: "price", pricing: "price", cost: "price", costs: "price", fee: "price", fees: "price", charge: "price", charges: "price",
  expensive: "price", cheap: "price", cheapest: "price", costly: "price", pricey: "price", lowest: "price", priced: "price", overpriced: "price", afford: "price", affordable: "price", budget: "price",
  quote: "price", quotation: "price", payment: "pay", payments: "pay", paid: "pay", paying: "pay", pay: "pay",
  bill: "bill", billing: "bill", biller: "bill", billers: "bill", billed: "bill", bills: "bill",
  credential: "credential", credentialing: "credential", credentialed: "credential", credentials: "credential", credentialling: "credential",
  enroll: "enroll", enrollment: "enroll", enrolment: "enroll", enrolling: "enroll", enrolled: "enroll", registration: "enroll", register: "enroll",
  denial: "denial", denials: "denial", denied: "denial", deny: "denial", deni: "denial", reject: "denial", rejected: "denial",
  rejection: "denial", rejections: "denial",
  appeal: "appeal", appeals: "appeal", dispute: "appeal", disputes: "appeal", overturn: "appeal",
  receivable: "ar", receivables: "ar", aging: "ar", ageing: "ar", aged: "ar", outstanding: "ar", unpaid: "ar",
  contract: "contract", contracting: "contract", contracts: "contract", negotiate: "negotiate", negotiation: "negotiate", negotiating: "negotiate", renegotiate: "negotiate",
  choose: "choose", pick: "choose", select: "choose", prefer: "choose", hire: "choose", better: "choose",
  merely: "only", solely: "only", just: "only",
  hipaa: "hipaa", compliance: "hipaa", compliant: "hipaa", secure: "security", security: "security", privacy: "security", phi: "security",
  safe: "security", encrypted: "security", encryption: "security",
  software: "software", system: "software", systems: "software", ehr: "software", emr: "software", pm: "software", pmsystem: "software",
  platform: "software", platforms: "software", tool: "software", tools: "software", program: "software",
  contact: "contact", reach: "contact", phone: "phone", call: "phone", number: "phone", telephone: "phone", ring: "phone",
  email: "email", mail: "email", message: "message", write: "message",
  human: "human", person: "human", agent: "human", representative: "human", rep: "human", staff: "human", manager: "human",
  start: "start", begin: "start", onboard: "start", onboarding: "start", join: "start", switch: "switch", switching: "switch",
  move: "switch", transition: "switch", migrate: "switch", change: "switch",
  duration: "duration", long: "duration", timeline: "duration", fast: "duration", quick: "duration", quickly: "duration",
  days: "duration", weeks: "duration", months: "duration", time: "duration", soon: "duration",
  hi: "hello", hello: "hello", hey: "hello", hiya: "hello", greetings: "hello", salam: "hello", assalam: "hello", aoa: "hello", hola: "hello", yo: "hello",
  thanks: "thanks", thank: "thanks", thx: "thanks", ty: "thanks", appreciate: "thanks", appreciated: "thanks", cheers: "thanks",
  bye: "bye", later: "bye", cya: "bye",
  specialty: "specialty", speciality: "specialty", specialties: "specialty", specialities: "specialty", specialist: "specialty", niche: "specialty",
  location: "location", located: "location", address: "location", office: "location", based: "location", where: "location",
  hours: "hours", open: "hours", close: "hours", closing: "hours", closed: "hours", timing: "hours", timings: "hours", available: "hours", availability: "hours", weekend: "hours",
  report: "report", reports: "report", reporting: "report", dashboard: "report", dashboards: "report", analytics: "report", kpi: "report", kpis: "report", metrics: "report",
  code: "code", coding: "code", coder: "code", coders: "code", cpt: "code", icd: "code", icd10: "code", hcpcs: "code", modifier: "code", modifiers: "code",
  plan: "plan", plans: "plan", package: "plan", packages: "plan", tier: "plan", tiers: "plan", subscription: "plan",
  custom: "custom", customize: "custom", customized: "custom", tailor: "custom", tailored: "custom", personalized: "custom",
  company: "company", firm: "company", business: "company", agency: "company", aspiremedx: "company", aspire: "company",
  practice: "practice", practices: "practice", clinic: "practice", clinics: "practice", group: "practice", groups: "practice",
  doctor: "provider", doctors: "provider", physician: "provider", physicians: "provider", provider: "provider", providers: "provider", clinician: "provider",
  medicare: "medicare", pecos: "medicare", mac: "medicare", medicaid: "medicaid",
  insurance: "payer", insurer: "payer", insurers: "payer", payer: "payer", payers: "payer", payor: "payer", payors: "payer", carrier: "payer", carriers: "payer",
  clearinghouse: "clearinghouse", clearinghouses: "clearinghouse", clearing: "clearinghouse",
  cancel: "cancel", cancellation: "cancel", terminate: "cancel", termination: "cancel", quit: "cancel", leave: "cancel",
  job: "career", jobs: "career", career: "career", careers: "career", hiring: "career", vacancy: "career", vacancies: "career", internship: "career", work: "work",
  patient: "patient", patients: "patient",
  statement: "statement", statements: "statement", invoice: "statement", invoices: "statement",
  eligibility: "eligibility", verify: "verify", verification: "verify", verified: "verify", check: "verify", checks: "verify",
  underpaid: "underpay", underpayment: "underpay", underpayments: "underpay", shortpaid: "underpay",
  audit: "audit", audits: "audit", auditing: "audit", review: "audit",
  free: "free", trial: "free", demo: "demo", consultation: "consult", consult: "consult", meeting: "consult", appointment: "consult", book: "consult", schedule: "consult",
  assessment: "assessment", evaluation: "assessment", analysis: "assessment",
  result: "result", results: "result", outcome: "result", outcomes: "result", improvement: "result", improve: "result", increase: "result", boost: "result",
  collection: "collect", collections: "collect", collect: "collect", revenue: "revenue", cash: "revenue", cashflow: "revenue", money: "revenue", income: "revenue",
  recredential: "recredential", recredentialing: "recredential", revalidation: "revalidate", revalidate: "revalidate", reattest: "revalidate", attestation: "revalidate",
  expirable: "expirable", expirables: "expirable", expire: "expirable", expiry: "expirable", expiration: "expirable", renewal: "renew", renew: "renew", renewals: "renew",
  document: "document", documents: "document", paperwork: "document", docs: "document", requirement: "document", requirements: "document", required: "document",
};

// Very small suffix-stripping stemmer — enough to fold plurals and tenses
function stem(w) {
  if (w.length <= 4) return w;
  if (w.endsWith("ies") && w.length > 5) return w.slice(0, -3) + "y";
  if (w.endsWith("ing") && w.length > 6) return w.slice(0, -3);
  if (w.endsWith("ed") && w.length > 5) return w.slice(0, -2);
  if (w.endsWith("es") && /(ss|x|ch|sh)es$/.test(w)) return w.slice(0, -2);
  if (w.endsWith("s") && !w.endsWith("ss") && !w.endsWith("us") && !w.endsWith("is")) return w.slice(0, -1);
  return w;
}

function canonical(word) {
  if (SYNONYMS[word]) return SYNONYMS[word];
  const s = stem(word);
  return SYNONYMS[s] || s;
}

export function normalize(text) {
  let t = ` ${String(text || "").toLowerCase().replace(/[’‘`]/g, "'")} `;
  for (const [re, rep] of CONTRACTIONS) t = t.replace(re, rep);
  t = t.replace(/\s+/g, " ");
  for (const [phrase, rep] of PHRASES) t = t.split(phrase).join(rep).replace(/\s+/g, " ");
  return t
    .replace(/[^a-z0-9%+/ ]+/g, " ")
    .replace(/\//g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(text) {
  return normalize(text)
    .split(" ")
    .filter((w) => w && !STOP.has(w) && (w.length > 1 || /\d/.test(w)))
    .map(canonical);
}

// Damerau–Levenshtein distance with an early exit once it exceeds `max`
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      rowMin = Math.min(rowMin, d[i][j]);
    }
    if (rowMin > max) return max + 1;
  }
  return d[a.length][b.length];
}

/**
 * Build a searchable index from intents:
 *   { id, patterns: string[], keywords?: string[], ... }
 */
export function buildIndex(intents) {
  const docs = intents.map((intent) => {
    const patternTokens = intent.patterns.map((p) => [...new Set(tokenize(p))]).filter((t) => t.length);
    const keywordTokens = (intent.keywords || []).flatMap((k) => tokenize(k));
    const tf = new Map();
    patternTokens.flat().forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
    keywordTokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 2));
    return { intent, patternTokens, keywordSet: new Set(keywordTokens), tf };
  });

  const df = new Map();
  docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) || 0) + 1)));
  const N = docs.length;
  const idf = (t) => Math.log(1 + N / (df.get(t) || 0.5));

  docs.forEach((d) => {
    d.vec = new Map();
    let norm = 0;
    d.tf.forEach((count, t) => {
      const w = (1 + Math.log(count)) * idf(t);
      d.vec.set(t, w);
      norm += w * w;
    });
    d.norm = Math.sqrt(norm) || 1;
  });

  const vocab = [...df.keys()];
  return { docs, df, idf, vocab };
}

// Replace unknown tokens with the closest known vocabulary word (typo fix)
function correct(tokens, index) {
  return tokens.map((t) => {
    if (index.df.has(t) || t.length < 4 || /\d/.test(t)) return t;
    const max = t.length >= 8 ? 2 : 1;
    let best = null;
    let bestD = max + 1;
    for (const v of index.vocab) {
      if (v[0] !== t[0] && max === 1) continue;
      const dist = editDistance(t, v, max);
      if (dist < bestD || (dist === bestD && best && index.df.get(v) > index.df.get(best))) {
        best = v;
        bestD = dist;
      }
    }
    return best && bestD <= max ? best : t;
  });
}

/**
 * Rank intents for a query. Returns [{ intent, score }] best first.
 * `extraTokens` lets the caller mix in context from the previous turn.
 */
export function search(query, index, { extraTokens = [], limit = 5 } = {}) {
  const raw = tokenize(query);
  const tokens = correct(raw, index);
  const all = [...tokens, ...extraTokens];
  if (!all.length) return { tokens, results: [] };

  const qtf = new Map();
  all.forEach((t, i) => qtf.set(t, (qtf.get(t) || 0) + (i < tokens.length ? 1 : 0.6)));
  const qvec = new Map();
  let qnorm = 0;
  qtf.forEach((c, t) => {
    const w = c * index.idf(t);
    qvec.set(t, w);
    qnorm += w * w;
  });
  qnorm = Math.sqrt(qnorm) || 1;
  const qset = new Set(all);

  const results = index.docs.map((d) => {
    let dot = 0;
    qvec.forEach((w, t) => {
      const dw = d.vec.get(t);
      if (dw) dot += w * dw;
    });
    const cosine = dot / (qnorm * d.norm);

    // Best single-pattern overlap (weighted Dice), rewards complete matches
    let best = 0;
    for (const p of d.patternTokens) {
      let inter = 0;
      let wInter = 0;
      let wTotal = 0;
      p.forEach((t) => {
        const w = index.idf(t);
        wTotal += w;
        if (qset.has(t)) {
          inter++;
          wInter += w;
        }
      });
      if (!inter) continue;
      let qW = 0;
      qset.forEach((t) => (qW += index.idf(t)));
      const dice = (2 * wInter) / (wTotal + qW);
      if (dice > best) best = dice;
    }

    let kwHits = 0;
    d.keywordSet.forEach((k) => qset.has(k) && kwHits++);
    const kwBoost = Math.min(0.15, kwHits * 0.05);

    const score = 0.5 * cosine + 0.5 * best + kwBoost + (d.intent.priority || 0);
    return { intent: d.intent, score };
  });

  results.sort((a, b) => b.score - a.score);
  return { tokens, results: results.slice(0, limit) };
}
