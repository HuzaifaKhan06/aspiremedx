// Knowledge base for the site chatbot ("Aspire Assistant").
//
// Each intent:
//   id        unique key
//   q         the canonical question (shown in suggestions / "did you mean")
//   patterns  example phrasings people type — add more to improve matching
//   keywords  high-signal words that boost this intent
//   answer    reply text (**bold**, "• " bullets and line breaks supported)
//             or a function (ctx) => string for dynamic replies
//   quick     follow-up quick-reply chips
//   actions   buttons: { label, href } | { label, action: "email" | "call" }
//   topic     used to carry context into follow-ups ("how long does it take?")
//
// Hand-written intents come first; more are generated from lib/content.js at
// the bottom, so service/speciality/pricing answers stay in sync with the site.
// To teach the bot something new, add an intent (or more patterns) here.

import {
  contact,
  services,
  serviceDetails,
  specialities,
  siteFaqs,
  pricingPlans,
  pricingFaqs,
  pmSoftware,
  clearinghouses,
  payerPortals,
  processSteps,
  caqhServices,
  practiceTypes,
} from "../content.js";

const CONTACT_ACTIONS = [
  { label: "Email our team", action: "email" },
  { label: "Call us", action: "call" },
];

const handWritten = [
  /* ───────────── Small talk & bot ───────────── */
  {
    id: "greeting",
    q: "Hello!",
    patterns: ["hi", "hello", "hey there", "good morning", "hi there", "assalam o alaikum", "hey", "hello anyone there"],
    keywords: ["hello"],
    answer: (ctx) =>
      `${ctx.greeting}! 👋 I'm the **Aspire Assistant**. I can help with billing, credentialing, pricing, specialties, or connecting you with our team.\n\nWhat can I help you with today?`,
    quick: ["What services do you offer?", "How much does it cost?", "How long does credentialing take?", "Email the team"],
  },
  {
    id: "how-are-you",
    q: "How are you?",
    patterns: ["how are you", "how are you doing", "how is it going", "whats up", "how do you do"],
    answer: "Doing great, thanks for asking! 😊 I'm here 24/7 to answer questions about AspireMedX. What would you like to know?",
    quick: ["What services do you offer?", "Pricing plans"],
  },
  {
    id: "bot-identity",
    q: "Are you a real person?",
    patterns: ["who are you", "are you a bot", "are you human", "are you real", "what are you", "is this a robot", "am i talking to a bot", "your name"],
    keywords: ["botidentity"],
    answer:
      "I'm the **Aspire Assistant** — a virtual helper trained on AspireMedX's services, pricing and FAQs. I answer instantly, and whenever you'd like a real person, I can pass your message to our team.",
    quick: ["Talk to a human", "What can you do?"],
  },
  {
    id: "capabilities",
    q: "What can you help me with?",
    patterns: ["what can you do", "help", "what can you help with", "what can i ask", "menu", "options", "how does this work", "what do you know"],
    keywords: ["capabilities"],
    answer:
      "Here's what I can help with:\n• **Services** — billing, credentialing, enrollment, contracting, RCM\n• **Pricing** — plans, what's included, custom quotes\n• **Specialties** — 20+ specialties we bill for\n• **Technology** — EHRs, PM systems and clearinghouses we support\n• **Contact** — I can email our team on your behalf\n\nJust type your question in your own words.",
    quick: ["What services do you offer?", "Pricing plans", "Which specialties do you support?", "Email the team"],
  },
  {
    id: "thanks",
    q: "Thank you",
    patterns: ["thanks", "thank you", "thank you so much", "thanks a lot", "appreciate it", "great thanks", "awesome thanks", "perfect thank you"],
    keywords: ["thanks"],
    answer: "You're very welcome! 😊 Is there anything else I can help you with?",
    quick: ["Email the team", "No, that's all"],
  },
  {
    id: "bye",
    q: "Goodbye",
    patterns: ["bye", "goodbye", "see you", "that is all", "no that is all", "nothing else", "i am done", "no thanks", "talk later"],
    keywords: ["bye"],
    answer: "Thanks for chatting with AspireMedX! If anything else comes up, I'm right here in the corner. Have a great day! 👋",
  },
  {
    id: "compliment",
    q: "You're helpful",
    patterns: ["you are great", "good bot", "very helpful", "nice", "cool", "awesome", "you are smart", "love it", "great job"],
    answer: "That's kind of you — thank you! 🙌 Anything else I can look up for you?",
    quick: ["Pricing plans", "Email the team"],
  },
  {
    id: "frustrated",
    q: "This isn't helping",
    patterns: ["this is not helpful", "you are useless", "not what i asked", "wrong answer", "you do not understand", "stupid bot", "bad bot", "that did not help"],
    answer:
      "Sorry about that — I'm still learning. Let me get you to a real person: our team replies within one business day, or you can call us directly.",
    actions: CONTACT_ACTIONS,
    priority: 0.02,
  },
  {
    id: "human",
    q: "Can I talk to a real person?",
    patterns: ["talk to a human", "speak to a person", "real person", "live agent", "customer service", "can i talk to someone", "connect me to support", "representative please", "i want to talk to your team", "contact a manager", "can someone call me", "call me back", "request a callback"],
    keywords: ["human", "callback"],
    answer: (ctx) =>
      `Of course! ${ctx.isOpen ? "Our team is **online now** (Mon–Fri, 9 AM–6 PM ET)." : "Our office is currently closed (hours: Mon–Fri, 9 AM–6 PM ET), but we reply within one business day."}\n\n• 📞 ${contact.phone}\n• ✉️ ${contact.email}\n\nOr I can send your message to the team right now.`,
    actions: CONTACT_ACTIONS,
  },
  {
    id: "something-else",
    q: "Something else",
    patterns: ["something else", "none of these", "neither", "none of the above", "other question"],
    priority: 0.05,
    answer: "Sure — just type your question in your own words and I'll do my best. You can also ask me to **email the team** anytime.",
    quick: ["Email the team", "What can you help me with?"],
  },
  {
    id: "yes",
    q: "Yes",
    patterns: ["yes", "yeah", "yep", "sure", "ok sure", "yes please", "of course"],
    answer: "Great! What would you like to know more about?",
    quick: ["What services do you offer?", "Pricing plans", "Email the team"],
  },

  /* ───────────── Company ───────────── */
  {
    id: "about",
    q: "What is AspireMedX?",
    patterns: ["what is aspiremedx", "tell me about your company", "who is aspiremedx", "about you", "what does your company do", "about aspiremedx", "introduce your company"],
    keywords: ["company"],
    topic: "company",
    answer:
      "**AspireMedX** is a revenue cycle partner for medical practices, multi-specialty groups and healthcare organizations. We handle medical billing, provider credentialing, payer enrollment, contracting and full RCM — so you get paid faster, stay in-network, and your team can focus on patients.",
    quick: ["What services do you offer?", "Why choose AspireMedX?", "Who do you work with?"],
    actions: [{ label: "About us", href: "/about" }],
  },
  {
    id: "services-overview",
    q: "What services do you offer?",
    patterns: ["what services do you offer", "what do you do", "list your services", "services", "what do you provide", "your offerings", "what can aspiremedx do for my practice", "service list"],
    keywords: ["services"],
    topic: "services",
    answer: () =>
      `We cover the whole revenue cycle:\n${services.map((s) => `• **${s.title}**`).join("\n")}\n\nWhich one would you like to know more about?`,
    quick: ["Medical billing", "Provider credentialing", "Payer contracting", "Pricing plans"],
    actions: [{ label: "View all services", href: "/services" }],
  },
  {
    id: "practice-types",
    q: "Who do you work with?",
    patterns: ["who do you work with", "what kind of practices", "do you work with small practices", "do you work with solo providers", "types of clients", "do you work with hospitals", "who are your clients", "do you work with large groups"],
    keywords: ["practice", "client"],
    answer: () =>
      `We work with organizations of every size — from solo providers to multi-location groups:\n${practiceTypes.map((p) => `• ${p}`).join("\n")}`,
    quick: ["Which specialties do you support?", "Pricing plans"],
  },
  {
    id: "why-us",
    q: "Why choose AspireMedX?",
    patterns: ["why choose you", "why aspiremedx", "what makes you different", "why should i choose you", "what sets you apart", "benefits of working with you", "why you over competitors", "are you better than other billing companies", "why should i pick you over others", "why hire you", "why go with you"],
    keywords: ["different", "choose", "why", "competitor"],
    answer:
      "Practices choose us because we own the **whole revenue cycle**, not just claims:\n• Specialized expertise in credentialing, enrollment, contracting, coding and RCM\n• **Technology agnostic** — we work inside your existing systems\n• Proactive CAQH, expirables and denial-trend management\n• Dedicated account managers and clear KPI reporting\n• Strict HIPAA compliance with signed BAAs",
    quick: ["What results can I expect?", "Pricing plans"],
    actions: [{ label: "Why us", href: "/#why-us" }],
  },
  {
    id: "results",
    q: "What results can I expect?",
    patterns: ["what results can i expect", "how will you improve my revenue", "what outcomes", "will my collections increase", "success rate", "your track record", "how much can you increase revenue", "roi"],
    keywords: ["result", "revenue", "collect"],
    answer:
      "Typical outcomes our clients aim for:\n• **98%+** first-pass clean claim rate\n• **Up to 30%** reduction in A/R\n• Fewer credentialing- and enrollment-related denials\n• Faster provider onboarding and network participation\n• Much less admin work for your internal staff\n\nResults vary by practice — a free assessment shows where your biggest gains are.",
    quick: ["Get a free assessment", "Pricing plans"],
  },
  {
    id: "location",
    q: "Where are you located?",
    patterns: ["where are you located", "your address", "office location", "where is your office", "where are you based", "physical address", "do you have an office"],
    keywords: ["location"],
    answer: `Our office is at **${contact.address}**. We work with practices remotely across the US, so you don't need to be nearby.`,
    quick: ["What are your hours?", "Email the team"],
  },
  {
    id: "coverage",
    q: "Do you work with practices in every state?",
    patterns: ["do you work in my state", "which states do you cover", "nationwide", "do you work outside texas", "all 50 states", "do you work remotely", "can you work with practices in california"],
    keywords: ["state", "nationwide", "remote"],
    answer:
      "Yes — we work remotely with practices across the US. Our enrollment team handles **Medicaid across all 50 states** plus Medicare and commercial payers.",
    quick: ["Medicaid enrollment", "Email the team"],
  },
  {
    id: "hours",
    q: "What are your business hours?",
    patterns: ["what are your hours", "when are you open", "business hours", "are you open now", "working hours", "are you open on weekends", "office timings", "availability", "what time do you close", "what time do you open", "closing time"],
    keywords: ["hours"],
    answer: (ctx) =>
      `Our team is available **Monday–Friday, 9 AM–6 PM ET**. ${ctx.isOpen ? "✅ We're open right now!" : "We're currently closed — but I'm here 24/7, and messages get a reply within one business day."}`,
    quick: ["Email the team", "Call us"],
  },
  {
    id: "phone",
    q: "What's your phone number?",
    patterns: ["phone number", "can i call you", "your number", "contact number", "how do i call", "telephone", "call you"],
    keywords: ["phone"],
    answer: `You can call us at **${contact.phone}** (Mon–Fri, 9 AM–6 PM ET).`,
    actions: [{ label: "Call now", action: "call" }],
  },
  {
    id: "contact",
    q: "How can I contact you?",
    patterns: ["how can i contact you", "contact details", "contact information", "how do i reach you", "get in touch", "contact us", "your email address", "what is your email"],
    keywords: ["contact"],
    answer: `Here's how to reach us:\n• ✉️ **${contact.email}**\n• 📞 **${contact.phone}**\n• 📍 ${contact.address}\n\nWant me to send a message to the team for you?`,
    actions: [...CONTACT_ACTIONS, { label: "Contact page", href: "/contact" }],
  },
  {
    id: "email-request",
    q: "Email the team",
    patterns: ["email the team", "send an email", "email on my behalf", "can you email the owner", "send a message to your team", "i want to send a message", "leave a message", "write to you", "contact the owner", "forward my request", "email them for me"],
    keywords: ["email", "message"],
    answer: "Happy to! I'll collect a few details and pass your message straight to our team.",
    flow: "email",
    priority: 0.03,
  },
  {
    id: "careers",
    q: "Are you hiring?",
    patterns: ["are you hiring", "job openings", "careers", "can i work for you", "internship", "vacancies", "i want a job", "remote billing jobs"],
    keywords: ["career"],
    answer: `We're always glad to hear from talented billing, coding and credentialing professionals. Please send your CV to **${contact.email}** with the role you're interested in.`,
    actions: [{ label: "Email your CV", action: "email" }],
  },
  {
    id: "patient-bill",
    q: "I have a question about my medical bill",
    patterns: ["question about my bill", "i am a patient", "my medical bill", "why was i charged", "pay my bill", "patient billing question", "i received a bill", "dispute my bill", "my doctor sent me a bill", "i got a bill from my doctor", "bill from my doctor", "received a medical bill", "insurance did not pay my bill", "how do i pay my hospital bill"],
    keywords: ["patient", "statement", "charged", "received"],
    priority: 0.02,
    answer:
      "It sounds like you're a patient — thank you for reaching out! For questions about a specific bill, please contact **your provider's office** directly using the number on your statement, as they hold your account details.\n\n⚠️ For your privacy, please don't share medical or insurance details in this chat.",
    quick: ["Talk to a human"],
  },
  {
    id: "medical-advice",
    q: "Can you give medical advice?",
    patterns: ["medical advice", "i have symptoms", "should i see a doctor", "what medicine should i take", "diagnose me", "health question"],
    answer: "I'm not able to give medical advice — please contact your healthcare provider or, in an emergency, call **911**. I can help with billing, credentialing and revenue cycle questions for practices.",
  },
  {
    id: "phi-warning",
    q: "Is this chat secure for patient information?",
    patterns: ["can i share patient information", "is this chat secure", "can i send patient data here", "is this chat hipaa compliant", "share phi"],
    keywords: ["security", "chat"],
    answer:
      "Please **don't share patient health information (PHI)** in this chat. Once you're a client, all PHI is exchanged through secure, HIPAA-compliant channels covered by a signed BAA.",
    quick: ["Are you HIPAA compliant?"],
  },

  /* ───────────── Getting started & process ───────────── */
  {
    id: "get-started",
    q: "How do I get started?",
    patterns: ["how do i get started", "how to start", "i want to sign up", "next steps", "how do we begin", "i am interested", "onboard with you", "become a client", "i want to work with you", "sign me up"],
    keywords: ["start"],
    topic: "onboarding",
    answer:
      "Getting started is easy:\n1️⃣ **Free assessment** — we review your billing, credentialing and contracts\n2️⃣ **Custom proposal** — scope, timeline and pricing for your practice\n3️⃣ **Secure onboarding** — data transfer and portal access with minimal disruption\n\nWould you like to request a free assessment?",
    actions: [
      { label: "Get a free assessment", href: "/contact" },
      { label: "See pricing", href: "/pricing" },
    ],
  },
  {
    id: "process",
    q: "What is your onboarding process?",
    patterns: ["onboarding process", "what is your process", "how does onboarding work", "steps to onboard", "implementation process", "how do you work", "your workflow"],
    keywords: ["process", "onboarding", "step"],
    topic: "onboarding",
    answer: () => `Our 5-step process:\n${processSteps.map((s, i) => `${i + 1}. **${s.title}** — ${s.description}`).join("\n")}`,
    quick: ["How long does onboarding take?", "Will it disrupt my cash flow?"],
  },
  {
    id: "onboarding-duration",
    q: "How long does onboarding take?",
    patterns: ["how long does onboarding take", "how fast can you start", "when can you start", "onboarding timeline", "how soon can we go live", "implementation time"],
    keywords: ["duration", "start"],
    topic: "onboarding",
    answer:
      "Most practices are onboarded within a few weeks — the exact timeline depends on your system access, data transfer and number of providers. We map it out in your proposal after the free assessment.",
    quick: ["Will it disrupt my cash flow?", "Get a free assessment"],
  },
  {
    id: "cash-flow-disruption",
    q: "Will switching disrupt my cash flow?",
    patterns: ["will it disrupt my cash flow", "will switching affect my revenue", "disruption during transition", "will we lose money switching", "gap in payments during onboarding"],
    keywords: ["disrupt", "switch", "revenue"],
    answer:
      "Onboarding is designed **not** to disrupt your cash flow. We run a structured handoff — data transfer, portal access and CAQH alignment — while claims keep moving.",
    quick: ["Switching from another billing company", "How do I get started?"],
  },
  {
    id: "switching",
    q: "Can I switch from my current billing company?",
    patterns: ["switch from my current biller", "change billing company", "we already have a billing company", "leave our current vendor", "move from in house billing", "switching billing companies", "unhappy with our biller"],
    keywords: ["switch"],
    answer:
      "Absolutely — many clients come to us from another billing company or an in-house team. We handle the transition, including picking up **aged A/R** your previous biller left behind, so nothing falls through the cracks.",
    quick: ["Legacy A/R recovery", "Will it disrupt my cash flow?"],
  },
  {
    id: "what-we-need",
    q: "What do you need from us to start?",
    patterns: ["what do you need from us", "what information do you need", "documents needed to start", "requirements to start", "what access do you need"],
    keywords: ["document", "access"],
    answer:
      "To start we typically need access to your practice management/EHR system, clearinghouse and payer portals, plus provider details for credentialing. We give you a simple checklist during onboarding — no guesswork.",
    quick: ["What software do you support?"],
  },
  {
    id: "free-assessment",
    q: "Do you offer a free assessment?",
    patterns: ["free assessment", "free consultation", "free audit", "do you offer a free trial", "free evaluation", "can you review our billing for free", "free demo", "book a consultation", "schedule a meeting"],
    keywords: ["free", "assessment", "consult", "demo"],
    answer:
      "Yes! We offer a **free revenue & credentialing assessment** — no commitment. We review your current billing performance, credentialing status and contracts, then show you where the biggest gains are.",
    actions: [
      { label: "Request assessment", href: "/contact" },
      { label: "Email the team", action: "email" },
    ],
  },
  {
    id: "account-manager",
    q: "Will I have a dedicated account manager?",
    patterns: ["dedicated account manager", "point of contact", "who will manage my account", "single point of contact", "will i have a dedicated person", "account manager"],
    keywords: ["manager", "dedicated"],
    answer:
      "Yes — you get a clear point of contact. Our **Premium** plan includes a dedicated account manager, Professional includes a named team lead, and Essential has a shared support team.",
    quick: ["Compare plans"],
  },

  /* ───────────── Pricing ───────────── */
  {
    id: "pricing",
    q: "How much do your services cost?",
    patterns: ["how much does it cost", "pricing", "what are your prices", "how much do you charge", "what is your fee", "cost of your services", "your rates", "is it expensive", "price list", "how do you charge"],
    keywords: ["price"],
    topic: "pricing",
    answer: () =>
      `Our pricing is a **percentage of monthly collections** — you pay when you get paid:\n${pricingPlans.map((p) => `• **${p.name}** — ${p.rate} (${p.minimum.replace(" / month minimum", "/mo min")}) · ${p.idealFor}`).join("\n")}\n\nNeed a different mix? You can build a custom plan.`,
    quick: ["Compare plans", "Build a custom plan", "Are there setup fees?"],
    actions: [{ label: "View pricing", href: "/pricing" }],
  },
  {
    id: "compare-plans",
    q: "What's the difference between the plans?",
    patterns: ["compare plans", "difference between plans", "which plan is right for me", "which plan should i choose", "plan comparison", "what is included in each plan", "best plan"],
    keywords: ["plan", "compare"],
    topic: "pricing",
    answer:
      "Quick comparison:\n• **Essential** — billing, claims, payment posting, denial resubmissions. Best for 1–3 providers.\n• **Professional** ⭐ — adds full appeals, all-bucket A/R, credentialing (up to 3 providers), eligibility checks and a live KPI dashboard.\n• **Premium** — everything, plus unlimited credentialing, contract negotiation, prior auths and a dedicated account manager.",
    actions: [{ label: "Compare all features", href: "/pricing#compare" }],
    quick: ["Build a custom plan", "Get a quote"],
  },
  {
    id: "custom-plan",
    q: "Can I build a custom plan?",
    patterns: ["custom plan", "can i choose my own services", "only need one service", "just credentialing", "only billing", "build my own plan", "pick services", "a la carte", "customized package", "i only need credentialing", "only need billing", "only need one thing", "i do not need everything"],
    keywords: ["custom", "only"],
    topic: "pricing",
    answer:
      "Yes! Use our **Build Your Own** plan builder — pick exactly the services you need (e.g. credentialing only, or denial recovery only), tell us about your practice, and we'll send a tailored quote.",
    actions: [{ label: "Build a custom plan", href: "/pricing" }],
  },
  {
    id: "get-quote",
    q: "Can I get a quote?",
    patterns: ["get a quote", "send me a quote", "i need a proposal", "request pricing", "custom quote", "quote for my practice", "estimate for my practice"],
    keywords: ["price", "proposal"],
    topic: "pricing",
    answer:
      "Sure! The fastest way is our pricing page — choose a plan or build a custom one and we'll email a tailored proposal within one business day. Or I can pass your request to the team right here.",
    actions: [
      { label: "Get a quote", href: "/pricing" },
      { label: "Email the team", action: "email" },
    ],
  },
  {
    id: "percentage-model",
    q: "Why do you charge a percentage of collections?",
    patterns: ["percentage of collections", "why percentage", "how does percentage pricing work", "what does of collections mean", "do you charge per claim", "flat fee"],
    keywords: ["percentage", "collect"],
    topic: "pricing",
    answer:
      "Percentage-of-collections pricing keeps our incentives tied to yours — we only earn more when **your practice collects more**. There's no separate per-claim charge.",
    quick: ["Is there a minimum fee?", "Compare plans"],
  },
  {
    id: "minimum-fee",
    q: "Is there a minimum monthly fee?",
    patterns: ["minimum fee", "monthly minimum", "is there a minimum", "minimum charge", "smallest plan price"],
    keywords: ["minimum"],
    topic: "pricing",
    answer: () =>
      `Yes, each plan has a monthly minimum:\n${pricingPlans.map((p) => `• **${p.name}** — ${p.minimum}`).join("\n")}`,
  },
  {
    id: "setup-fee",
    q: "Are there setup or onboarding fees?",
    patterns: ["setup fee", "onboarding fee", "hidden fees", "any extra charges", "additional costs", "one time fee", "is onboarding free"],
    keywords: ["setupfee", "hidden"],
    topic: "pricing",
    answer:
      "Standard onboarding is **included** in every plan. Large legacy A/R clean-ups or complex system migrations are scoped separately and quoted up front — no surprises.",
  },
  {
    id: "contract-term",
    q: "Is there a long-term contract?",
    patterns: ["long term contract", "is there a contract", "do i have to sign a contract", "contract required", "minimum contract", "can i cancel", "cancellation policy", "am i locked in", "contract length", "notice period", "how do i cancel"],
    keywords: ["cancel", "term", "sign", "lock"],
    priority: 0.02,
    answer:
      "Contract terms and notice periods are laid out clearly in your proposal before you sign anything. If you have specific requirements, tell us and we'll factor them in.",
    actions: [{ label: "Ask the team", action: "email" }],
  },
  {
    id: "switch-plans",
    q: "Can I change plans later?",
    patterns: ["change plans later", "upgrade my plan", "downgrade plan", "switch plans", "move to a different plan"],
    keywords: ["upgrade", "downgrade", "plan"],
    topic: "pricing",
    answer: "Yes. Most practices start on one plan and move up as they add providers or locations. Changes take effect from the next billing cycle.",
  },
  {
    id: "credentialing-price",
    q: "How much does credentialing cost?",
    patterns: ["how much does credentialing cost", "credentialing price", "credentialing fee", "cost to credential a provider", "enrollment cost"],
    keywords: ["price", "credential"],
    topic: "pricing",
    priority: 0.02,
    answer:
      "Credentialing is included in our **Professional** (up to 3 providers) and **Premium** (unlimited) plans. If you only need credentialing, build a custom plan and we'll quote per provider.",
    actions: [{ label: "Build a custom plan", href: "/pricing" }],
  },

  /* ───────────── Billing ───────────── */
  {
    id: "clean-claim-rate",
    q: "What is your clean claim rate?",
    patterns: ["clean claim rate", "first pass rate", "claim acceptance rate", "how accurate are your claims", "first pass resolution"],
    keywords: ["cleanclaim"],
    topic: "billing",
    answer: "We target a **98%+ first-pass clean claim rate**, using advanced scrubbing and payer-specific rules before every submission.",
    quick: ["Denial management", "Days in A/R"],
  },
  {
    id: "days-in-ar",
    q: "What are your average days in A/R?",
    patterns: ["days in ar", "average days in ar", "how fast do we get paid", "how quickly will we get paid", "payment turnaround", "reimbursement speed"],
    keywords: ["daysar", "pay", "duration"],
    topic: "billing",
    answer: "Our medical billing clients average around **24 days in A/R**, with an overall denial rate under **3%**. Clean claims and persistent follow-up are what keep cash moving.",
  },
  {
    id: "denials",
    q: "How do you handle claim denials?",
    patterns: ["how do you handle denials", "denial management", "claims keep getting denied", "rejected claims", "reduce denials", "high denial rate", "denied claims help", "fix denials", "too many denials", "too many rejections", "insurance keeps rejecting claims"],
    keywords: ["denial"],
    topic: "denials",
    answer:
      "We work every denial — and fix why it happened:\n• Categorize and root-cause each denial\n• Correct and resubmit, or file appeals with documentation\n• Track denial trends by payer and code\n• Fix the upstream process so it doesn't repeat",
    quick: ["Do you file appeals?", "What is your denial rate?"],
  },
  {
    id: "appeals",
    q: "Do you file appeals?",
    patterns: ["do you file appeals", "appeal denied claims", "appeal process", "overturn denials", "write appeal letters"],
    keywords: ["appeal"],
    topic: "denials",
    answer: "Yes. We prepare and file appeals with supporting documentation and follow them through. Full appeals are included in our **Professional** and **Premium** plans.",
  },
  {
    id: "denial-rate",
    q: "What is your denial rate?",
    patterns: ["what is your denial rate", "denial percentage", "how many claims get denied"],
    keywords: ["denial", "rate"],
    topic: "denials",
    answer: "Our overall denial rate is **under 3%**, driven by thorough scrubbing before submission and root-cause fixes after.",
  },
  {
    id: "ar-followup",
    q: "Do you follow up on unpaid claims?",
    patterns: ["follow up on unpaid claims", "ar follow up", "aging ar", "old claims", "outstanding claims", "unpaid claims", "collect old balances", "reduce ar"],
    keywords: ["ar"],
    topic: "ar",
    answer: "Yes — persistent A/R follow-up across every aging bucket is core to what we do. Clients can see **up to a 30% reduction** in A/R.",
    quick: ["Legacy A/R recovery", "Days in A/R"],
  },
  {
    id: "legacy-ar",
    q: "Can you recover old A/R from a previous biller?",
    patterns: ["legacy ar", "recover old ar", "old claims from previous biller", "clean up aged ar", "backlog of claims", "claims older than 90 days"],
    keywords: ["legacy", "backlog", "ar"],
    topic: "ar",
    answer: "Yes — **legacy A/R recovery** cleans up old, aged claims your previous biller left behind. It's included in Premium or can be added to a custom plan.",
    actions: [{ label: "Build a custom plan", href: "/pricing" }],
  },
  {
    id: "payment-posting",
    q: "Do you handle payment posting?",
    patterns: ["payment posting", "era posting", "eob posting", "post payments", "reconcile payments", "remittance"],
    keywords: ["posting", "era", "eob"],
    topic: "billing",
    answer: "Yes — we post ERA/EOB payments and reconcile them against what was billed, flagging variances and underpayments. Included in every plan.",
  },
  {
    id: "coding",
    q: "Do you provide medical coding?",
    patterns: ["medical coding", "do you code", "cpt coding", "icd 10 coding", "certified coders", "coding review", "modifiers"],
    keywords: ["code"],
    topic: "billing",
    answer: "Yes — charge entry with **CPT, ICD-10 and modifier** review is part of every plan, so claims are coded correctly before they go out.",
  },
  {
    id: "claim-submission",
    q: "How do you submit claims?",
    patterns: ["how do you submit claims", "electronic claims", "claim submission", "claim scrubbing", "edi claims", "paper claims"],
    keywords: ["submission", "scrub"],
    topic: "billing",
    answer: "Claims are scrubbed with payer-specific rules, then submitted **electronically** to every major payer and clearinghouse — so errors are caught before the payer sees them.",
  },
  {
    id: "eligibility",
    q: "Do you verify patient eligibility?",
    patterns: ["eligibility verification", "verify insurance", "check benefits", "insurance verification", "eligibility checks"],
    keywords: ["eligibility", "verify"],
    topic: "billing",
    answer: "Yes — we check eligibility and benefits **before** the visit, preventing denials instead of chasing them. Included in Professional and Premium.",
  },
  {
    id: "prior-auth",
    q: "Do you handle prior authorizations?",
    patterns: ["prior authorization", "prior auth", "pre authorization", "authorization requests", "get authorizations"],
    keywords: ["priorauth"],
    answer: "Yes — we secure and track prior authorizations ahead of service. It's included in **Premium** or can be added to a custom plan.",
  },
  {
    id: "patient-statements",
    q: "Do you send patient statements?",
    patterns: ["patient statements", "patient billing", "patient balances", "send bills to patients", "patient invoices"],
    keywords: ["statement"],
    topic: "billing",
    answer: "Yes — clear patient statements and balance follow-up are included in our Professional and Premium plans.",
  },
  {
    id: "underpayments",
    q: "Do you catch underpayments?",
    patterns: ["underpayments", "short paid claims", "payer underpaid", "underpayment audit", "contract variance", "paid less than contracted"],
    keywords: ["underpay"],
    answer: "Yes — we audit what payers actually paid against your contracted rates and chase the difference. **Quarterly** audits in Professional, **monthly** in Premium.",
  },
  {
    id: "timely-filing",
    q: "How do you handle timely filing limits?",
    patterns: ["timely filing", "filing deadline", "missed filing limit", "late claims"],
    keywords: ["timelyfiling"],
    topic: "billing",
    answer: "We track each payer's timely filing window and prioritize claims before deadlines — late-filed denials are one of the most preventable revenue losses.",
  },
  {
    id: "medical-billing",
    q: "Tell me about medical billing",
    patterns: ["medical billing", "billing services", "do you do billing", "outsourced billing", "billing company", "end to end billing"],
    keywords: ["bill"],
    topic: "billing",
    answer: () => {
      const s = serviceDetails.find((d) => d.slug === "medical-billing");
      return `${s.tagline}\n\n${s.whatWeHandle.slice(0, 6).map((w) => `• ${w}`).join("\n")}`;
    },
    quick: ["What is your clean claim rate?", "How much does it cost?"],
    actions: [{ label: "Medical billing", href: "/services/medical-billing" }],
  },

  /* ───────────── Credentialing & enrollment ───────────── */
  {
    id: "what-is-credentialing",
    q: "What is provider credentialing?",
    patterns: ["what is credentialing", "explain credentialing", "credentialing meaning", "why do i need credentialing"],
    keywords: ["credential"],
    topic: "credentialing",
    answer:
      "**Credentialing** verifies a provider's qualifications — licenses, education, board certifications, work history — so payers will accept them in-network. Without it, claims for that provider are denied before they're even reviewed.",
    quick: ["How long does credentialing take?", "Do you manage CAQH?"],
  },
  {
    id: "credentialing-duration",
    q: "How long does credentialing take?",
    patterns: ["how long does credentialing take", "credentialing timeline", "how long to get credentialed", "enrollment timeline", "how long does enrollment take", "credentialing turnaround"],
    keywords: ["duration", "credential"],
    topic: "credentialing",
    priority: 0.02,
    answer:
      "Timelines vary by payer — commonly **60 to 120+ days**. We speed things up with complete, accurate applications and persistent follow-up, so yours don't stall in a queue.",
    quick: ["What documents do you need?", "How much does credentialing cost?"],
  },
  {
    id: "credentialing-service",
    q: "Do you offer credentialing services?",
    patterns: ["provider credentialing", "credentialing services", "do you do credentialing", "credential my providers", "help with credentialing", "get my doctor credentialed", "credentialing company"],
    keywords: ["credential"],
    topic: "credentialing",
    answer: () => {
      const s = serviceDetails.find((d) => d.slug === "provider-credentialing");
      return `Yes! ${s.tagline}\n\n${s.whatWeHandle.slice(0, 5).map((w) => `• ${w}`).join("\n")}`;
    },
    actions: [{ label: "Provider credentialing", href: "/services/provider-credentialing" }],
    quick: ["How long does credentialing take?", "How much does credentialing cost?"],
  },
  {
    id: "caqh",
    q: "Do you manage CAQH profiles?",
    patterns: ["caqh", "caqh profile", "caqh attestation", "update my caqh", "caqh proview management"],
    keywords: ["caqh"],
    topic: "credentialing",
    answer: () => `Yes — we create, complete, attest and continuously maintain CAQH ProView profiles:\n${caqhServices.slice(0, 5).map((c) => `• ${c}`).join("\n")}`,
  },
  {
    id: "recredentialing",
    q: "Do you handle recredentialing?",
    patterns: ["recredentialing", "re credentialing", "revalidation", "recertification", "credentialing renewal"],
    keywords: ["recredential", "revalidate"],
    topic: "credentialing",
    answer: "Yes — we track payer recredentialing and revalidation cycles and submit on time, so no provider falls out of network. Revalidation tracking is part of **Premium**.",
  },
  {
    id: "expirables",
    q: "Do you track license and DEA expirations?",
    patterns: ["track expirations", "license expiration", "dea renewal", "malpractice insurance expiry", "expirables tracking", "board certification expiry"],
    keywords: ["expirable", "renew"],
    topic: "credentialing",
    answer: "Yes — we track expirables like **licenses, DEA, malpractice insurance and board certifications**, and flag renewals before they lapse.",
  },
  {
    id: "credentialing-docs",
    q: "What documents are needed for credentialing?",
    patterns: ["documents needed for credentialing", "what do i need for credentialing", "credentialing requirements", "paperwork for credentialing", "credentialing checklist"],
    keywords: ["document", "credential"],
    topic: "credentialing",
    answer:
      "Typically: state license(s), DEA certificate, board certification, malpractice insurance (face sheet), CV/work history, education and training details, NPI, and W-9. We send you a complete checklist so nothing's missed.",
  },
  {
    id: "group-credentialing",
    q: "Do you do individual and group credentialing?",
    patterns: ["group credentialing", "individual credentialing", "credential a group", "facility credentialing", "credential nurse practitioners", "credential np and pa", "advanced practice providers"],
    keywords: ["practice", "np", "pa", "facility"],
    topic: "credentialing",
    answer: "Yes — we credential **individual physicians, NPs, PAs and other advanced practice providers, groups, and facilities**.",
  },
  {
    id: "privileges",
    q: "Do you help with hospital privileges?",
    patterns: ["hospital privileges", "privileging", "committee review", "hospital credentialing"],
    keywords: ["privileges"],
    topic: "credentialing",
    answer: "Yes — we prepare committee review packets and privilege applications as part of our credentialing service.",
  },
  {
    id: "psv",
    q: "Do you do primary source verification?",
    patterns: ["primary source verification", "psv", "verify licenses"],
    keywords: ["psv"],
    topic: "credentialing",
    answer: "Yes — we verify licenses, certifications and education directly with the primary sources, as payers require.",
  },
  {
    id: "enrollment",
    q: "What is payer enrollment?",
    patterns: ["what is enrollment", "payer enrollment", "provider enrollment", "enroll with insurance", "get in network with insurance", "join insurance networks", "insurance paneling"],
    keywords: ["enroll", "payer"],
    topic: "enrollment",
    answer: () => {
      const s = services.find((d) => d.slug === "provider-enrollment");
      return `**Enrollment** is a payer's formal approval for a provider to bill them. ${s.description}`;
    },
    actions: [{ label: "Provider enrollment", href: "/services/provider-enrollment" }],
  },
  {
    id: "medicare",
    q: "Do you handle Medicare enrollment?",
    patterns: ["medicare enrollment", "pecos", "enroll in medicare", "medicare revalidation", "medicare billing"],
    keywords: ["medicare"],
    topic: "enrollment",
    answer: "Yes — we handle **Medicare enrollment through PECOS**, revalidations and MAC portal work, plus follow-up on any additional information requests.",
  },
  {
    id: "medicaid",
    q: "Do you handle Medicaid enrollment?",
    patterns: ["medicaid enrollment", "enroll in medicaid", "state medicaid", "medicaid billing"],
    keywords: ["medicaid"],
    topic: "enrollment",
    answer: "Yes — we enroll providers with **Medicaid across all 50 states**, including revalidations and new locations.",
  },
  {
    id: "cred-vs-enroll",
    q: "What's the difference between credentialing, enrollment and contracting?",
    patterns: ["difference between credentialing and enrollment", "credentialing vs enrollment", "credentialing vs contracting", "is credentialing the same as enrollment"],
    keywords: ["difference", "credential", "enroll", "contract"],
    priority: 0.03,
    answer: () => siteFaqs[0].answer,
  },
  {
    id: "payers",
    q: "Which insurance payers do you work with?",
    patterns: ["which payers do you work with", "which insurance companies", "do you work with aetna", "do you work with unitedhealthcare", "blue cross", "humana", "cigna", "commercial payers"],
    keywords: ["payer"],
    answer: () => `We work with all major payers, including:\n${payerPortals.slice(0, 8).map((p) => `• ${p}`).join("\n")}\n…plus MAC and state Medicaid portals.`,
  },

  /* ───────────── Contracting & reporting ───────────── */
  {
    id: "contracting",
    q: "Do you negotiate payer contracts?",
    patterns: ["payer contracting", "negotiate contracts", "contract negotiation", "better reimbursement rates", "renegotiate rates", "insurance contracts"],
    keywords: ["contract"],
    topic: "contracting",
    answer: () => `Yes. ${services.find((s) => s.slug === "payer-contracting").description}`,
    actions: [{ label: "Payer contracting", href: "/services/payer-contracting" }],
  },
  {
    id: "fee-schedule",
    q: "Can you benchmark our fee schedule?",
    patterns: ["fee schedule", "benchmark rates", "are we underpaid by payers", "compare reimbursement rates"],
    keywords: ["feeschedule", "benchmark"],
    topic: "contracting",
    answer: "Yes — we benchmark your fee schedules against market rates and flag where you're being paid below what you should, as part of contract oversight.",
  },
  {
    id: "value-based",
    q: "Do you support value-based contracts?",
    patterns: ["value based contracts", "value based care", "vbc", "risk based contracts"],
    keywords: ["valuebased"],
    topic: "contracting",
    answer: "Yes — our contracting oversight covers fee schedules, renewal terms and **value-based arrangements**.",
  },
  {
    id: "reporting",
    q: "What reports will I get?",
    patterns: ["what reports do you provide", "kpi dashboard", "reporting", "analytics", "how will i track performance", "monthly reports", "real time dashboard", "visibility into performance"],
    keywords: ["report"],
    topic: "reporting",
    answer: () => {
      const s = serviceDetails.find((d) => d.slug === "reporting-analytics");
      return `Every plan includes a **monthly performance report**. Professional and Premium add a **real-time KPI dashboard**.\n\n${(s?.whatWeHandle || []).slice(0, 4).map((w) => `• ${w}`).join("\n")}`;
    },
    actions: [{ label: "Reporting & analytics", href: "/services/reporting-analytics" }],
  },
  {
    id: "rcm",
    q: "Do you offer full revenue cycle management?",
    patterns: ["full rcm", "revenue cycle management", "end to end rcm", "manage our whole revenue cycle", "complete rcm"],
    keywords: ["rcm"],
    topic: "rcm",
    answer: () => `Yes. ${services.find((s) => s.slug === "revenue-cycle-management").description}`,
    actions: [{ label: "Full RCM", href: "/services/revenue-cycle-management" }],
    quick: ["Premium plan", "How much does it cost?"],
  },

  /* ───────────── Technology & security ───────────── */
  {
    id: "software",
    q: "Which billing software do you support?",
    patterns: ["which software do you support", "what ehr do you work with", "do you work with athenahealth", "do you support epic", "drchrono", "greenway", "practice fusion", "allscripts", "cerner", "oracle health", "practice management software", "do you work with my ehr", "billing software", "emr integration", "which systems do you use"],
    keywords: ["software", "athenahealth", "athena", "epic", "drchrono", "greenway", "allscripts", "veradigm", "cerner"],
    topic: "technology",
    answer: () =>
      `We're technology agnostic — we work inside the system you already use, including:\n${pmSoftware.filter((p) => p.platform !== "Other platforms").map((p) => `• ${p.platform}`).join("\n")}\n…plus athenahealth, DrChrono, Greenway, Epic (where access permits) and more.`,
    quick: ["Do we need to switch software?", "Which clearinghouses?"],
  },
  {
    id: "switch-software",
    q: "Do we need to change our software?",
    patterns: ["do we need to change software", "do i need new software", "will we have to switch ehr", "keep our current system", "work in our existing ehr"],
    keywords: ["software", "switch"],
    topic: "technology",
    priority: 0.02,
    answer: "No — in most cases we work **inside your existing EHR / PM system**. We adapt to your technology rather than forcing a platform change.",
  },
  {
    id: "clearinghouses",
    q: "Which clearinghouses do you work with?",
    patterns: ["which clearinghouses", "clearinghouse", "availity", "change healthcare", "waystar", "trizetto"],
    keywords: ["clearinghouse"],
    topic: "technology",
    answer: () => `We work with all major clearinghouses:\n${clearinghouses.map((c) => `• ${c}`).join("\n")}`,
  },
  {
    id: "hipaa",
    q: "Are you HIPAA compliant?",
    patterns: ["are you hipaa compliant", "hipaa", "is my data safe", "data security", "how do you protect patient data", "privacy", "do you sign a baa", "business associate agreement", "baa"],
    keywords: ["hipaa", "security", "baa"],
    answer: "Yes. AspireMedX follows strict **HIPAA** guidelines and signs a **Business Associate Agreement (BAA)** with every client. PHI is only exchanged through secure, compliant channels.",
    quick: ["Is this chat secure for patient information?"],
  },

  /* ───────────── Specialties ───────────── */
  {
    id: "specialties",
    q: "Which specialties do you support?",
    patterns: ["which specialties do you support", "what specialties", "specialty billing", "do you bill for my specialty", "list of specialties", "specialities"],
    keywords: ["specialty"],
    topic: "specialty",
    answer: () =>
      `We bill for 20+ specialties, including:\n${specialities.slice(0, 10).map((s) => `• ${s.title}`).join("\n")}\n…and more. Just ask about yours — e.g. "Do you do cardiology billing?"`,
    actions: [{ label: "All specialties", href: "/speciality" }],
  },
  {
    id: "specialty-missing",
    q: "My specialty isn't listed",
    patterns: ["my specialty is not listed", "do you support other specialties", "i do not see my specialty", "unusual specialty"],
    keywords: ["specialty", "listed"],
    answer: "No problem — our team works across many more specialties than we list. Tell us yours and we'll confirm how we'd handle it.",
    actions: [{ label: "Email the team", action: "email" }],
  },
];

/* ───────────── Generated from site content ───────────── */

// Friendly aliases people use for specialities, keyed by slug
const SPECIALTY_ALIASES = {
  "dme-billing": ["dme", "durable medical equipment", "medical equipment", "wheelchair", "oxygen supplies"],
  "pharmacy-billing-services": ["pharmacy", "pharmacist", "prescription claims", "pbm", "340b"],
  "mental-health-billing": ["mental health", "behavioral health", "therapist", "counseling", "psychologist", "therapy practice"],
  "emergency-room-billing": ["emergency room", "er billing", "emergency medicine", "ed billing"],
  "asc-billing-services": ["asc", "ambulatory surgery center", "surgery center", "surgical center"],
  "radiology-billing-services": ["radiology", "imaging", "x ray", "mri", "diagnostic imaging"],
  "urgent-care-billing": ["urgent care", "walk in clinic"],
  "family-medicine-billing": ["family medicine", "family practice", "gp"],
  "internal-medicine-billing": ["internal medicine", "internist"],
  "psychiatry-billing": ["psychiatry", "psychiatrist"],
  "cardiology-billing": ["cardiology", "cardiologist", "heart"],
  "dermatology-billing": ["dermatology", "dermatologist", "skin"],
  "pediatrics-billing": ["pediatrics", "pediatrician", "children", "kids"],
  "neurology-billing": ["neurology", "neurologist", "brain"],
  "orthopedics-billing": ["orthopedics", "orthopedic", "ortho", "bone"],
  "gastroenterology-billing": ["gastroenterology", "gi", "gastro", "gastroenterologist"],
  "endocrinology-billing": ["endocrinology", "endocrinologist", "diabetes"],
  "obgyn-billing": ["obgyn", "gynecology", "obstetrics", "women health"],
  "pain-management-billing": ["pain management", "pain clinic"],
  "physical-therapy-billing": ["physical therapy", "pt", "physiotherapy", "rehab"],
  "diagnostic-laboratory-billing": ["lab", "laboratory", "diagnostic lab", "pathology"],
  "home-health-billing": ["home health", "home care", "hospice"],
  "primary-care-billing": ["primary care", "pcp"],
  "multi-specialty-billing": ["multi specialty", "multispecialty", "multiple specialties"],
};

const specialtyIntents = specialities.map((s) => {
  const name = s.title.replace(/ Billing( Services)?$/, "");
  const aliases = SPECIALTY_ALIASES[s.slug] || [name.toLowerCase()];
  return {
    id: `specialty-${s.slug}`,
    q: `Do you do ${s.title.toLowerCase()}?`,
    patterns: [
      s.title,
      `do you do ${name} billing`,
      `${name} billing services`,
      `billing for ${name}`,
      ...aliases.map((a) => `${a} billing`),
      ...aliases.map((a) => `do you work with ${a}`),
    ],
    keywords: aliases,
    topic: "specialty",
    answer: `Yes — **${s.title}** is one of our specialties. ${s.tagline}\n\n${(s.whatWeHandle || []).slice(0, 4).map((w) => `• ${w}`).join("\n")}`,
    actions: [{ label: `${name} billing`, href: `/speciality/${s.slug}` }],
    quick: ["How much does it cost?", "Email the team"],
  };
});

const planIntents = pricingPlans.map((p) => ({
  id: `plan-${p.id}`,
  q: `What's in the ${p.name} plan?`,
  patterns: [`${p.name} plan`, `what is included in ${p.name}`, `${p.name} pricing`, `tell me about ${p.name}`, `${p.name} package`],
  keywords: [p.name],
  topic: "pricing",
  priority: 0.02,
  answer: `**${p.name}** — ${p.rate} ${p.rateNote} (${p.minimum}). ${p.tagline}\n\n${p.highlights
    .map((h) => `${h.included ? "✅" : "❌"} ${h.text}`)
    .join("\n")}\n\nIdeal for **${p.idealFor}**.`,
  actions: [{ label: `Choose ${p.name}`, href: "/pricing" }],
  quick: ["Compare plans", "Build a custom plan"],
}));

const softwareIntents = pmSoftware
  .filter((p) => p.platform !== "Other platforms")
  .map((p) => {
    const short = p.platform.replace(/\s*\(.*\)/, "");
    return {
      id: `software-${short.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      q: `Do you work with ${short}?`,
      patterns: [`do you work with ${short}`, `${short}`, `${short} billing`, `do you support ${short}`, `${p.platform}`],
      keywords: [short],
      topic: "technology",
      priority: 0.02,
      answer: `Yes — we work with **${p.platform}**: ${p.capability}`,
    };
  });

const faqIntents = [...siteFaqs, ...pricingFaqs]
  .filter((f) => !/difference between credentialing|how long does provider credentialing|how do you price|hipaa/i.test(f.question))
  .map((f, i) => ({
    id: `faq-${i}`,
    q: f.question,
    patterns: [f.question],
    answer: f.answer,
  }));

export const intents = [...handWritten, ...specialtyIntents, ...planIntents, ...softwareIntents, ...faqIntents];

// Topic chips shown in the welcome message
export const starterTopics = [
  "💰 Pricing plans",
  "🩺 What services do you offer?",
  "📋 How long does credentialing take?",
  "🏥 Which specialties do you support?",
  "✉️ Email the team",
];
