// All editable site copy lives here so content can change without touching
// component markup. Replace placeholder numbers/quotes before the site goes live.

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/#contact" },
];

// Specialities shown in the navbar dropdown. "Speciality" itself links to
// /speciality (the card grid); each item below links to its own detail page.
export const specialities = [
  {
    slug: "dme-billing",
    title: "DME Billing",
    tagline: "Durable medical equipment billing that keeps pace with payer documentation rules.",
    overview:
      "DME claims live or die on paperwork — the right HCPCS codes, a valid CMN or physician order, and proof of medical necessity all have to line up before a payer will pay. AspireMedX manages that documentation trail from order to reimbursement, for both rental and purchased equipment.",
    whatWeHandle: [
      "HCPCS Level II coding for equipment, supplies, and accessories",
      "Certificate of Medical Necessity (CMN) and prior authorization tracking",
      "Rental vs. purchase billing cycles, including cap rental rules",
      "Replacement, repair, and supply reorder claims",
      "Denial follow-up for medical necessity and documentation disputes",
    ],
    challenges:
      "DME denials are usually a documentation problem, not a coding one — missing signatures, expired prior auths, or a CMN that doesn't match the claim. We track expiration dates and required paperwork before a claim goes out, not after it bounces back.",
  },
  {
    slug: "pharmacy-billing-services",
    title: "Pharmacy Billing Services",
    tagline: "Prescription claims, prior authorizations, and PBM reconciliation handled in one place.",
    overview:
      "Pharmacy billing runs on a tighter clock than most specialties — real-time adjudication, PBM-specific formularies, and prior auth windows that can hold up a fill. AspireMedX keeps claims moving through that pipeline and reconciles what PBMs actually pay against what was billed.",
    whatWeHandle: [
      "Real-time claim adjudication and rejection resolution",
      "Prior authorization requests and appeals for non-formulary drugs",
      "PBM contract and reimbursement rate reconciliation",
      "340B and specialty pharmacy claim workflows",
      "Patient copay assistance and coordination of benefits",
    ],
    challenges:
      "Most pharmacy revenue leaks through rejected claims that never get resubmitted and reimbursement rates that quietly drift from the contracted rate. We chase both — same-day rejection turnaround and a running check against PBM contracts.",
  },
  {
    slug: "mental-health-billing",
    title: "Mental Health Billing",
    tagline: "Time-based codes, session limits, and parity rules, billed correctly the first time.",
    overview:
      "Behavioral health billing has its own logic — time-based CPT codes, session-frequency limits, and parity laws that vary by payer and state. AspireMedX bills individual, group, and telehealth sessions against the right code set so reimbursement doesn't stall behind a technicality.",
    whatWeHandle: [
      "Time-based CPT coding for individual, family, and group therapy",
      "Telehealth billing with correct place-of-service and modifier use",
      "Session limit and authorization tracking across payers",
      "Coordination between psychiatric and therapy claims for shared patients",
      "Mental health parity compliance monitoring",
    ],
    challenges:
      "A big share of behavioral health denials come from session limits and expired authorizations, not the clinical coding. We track authorized session counts per patient so a provider never finds out mid-treatment that coverage ran out.",
  },
  {
    slug: "emergency-room-billing",
    title: "Emergency Room Billing",
    tagline: "Facility and professional ER claims, billed and reconciled together.",
    overview:
      "ER billing means running facility and professional claims side by side, on high-acuity coding with a short window to get it right. AspireMedX bills both components, applies correct E/M leveling, and manages the split-claim complexity that ER visits create.",
    whatWeHandle: [
      "Facility and professional (physician) claim billing in parallel",
      "E/M level assignment based on acuity and documentation",
      "Trauma activation and critical care add-on coding",
      "Out-of-network and surprise-billing (No Surprises Act) compliance",
      "High-volume claim turnaround for fast-moving ER encounter logs",
    ],
    challenges:
      "ER claims move fast and get denied fast — usually on E/M leveling or missing critical-care documentation. We review acuity documentation before submission instead of relitigating it after a denial.",
  },
  {
    slug: "asc-billing-services",
    title: "ASC Billing Services",
    tagline: "Bundled surgical-facility billing, coded and reconciled against the case.",
    overview:
      "Ambulatory surgery centers bill a bundled facility fee that has to match the procedure, implants, and supplies actually used in the case — not just the CPT code on the schedule. AspireMedX reconciles the operative note against the claim before it goes out.",
    whatWeHandle: [
      "ASC-specific facility fee coding and bundling rules",
      "Implant and high-cost supply documentation and pass-through billing",
      "Multiple-procedure and bilateral billing modifiers",
      "Payer-specific ASC fee schedule verification",
      "Case-level reconciliation against the operative note",
    ],
    challenges:
      "Underbilled implants and mismatched multi-procedure modifiers are where ASC revenue usually goes missing. We reconcile every case against the operative note before the claim is filed, not after payment posts short.",
  },
  {
    slug: "radiology-billing-services",
    title: "Radiology Billing Services",
    tagline: "Technical and professional component billing across every modality.",
    overview:
      "Radiology billing splits into technical and professional components across a wide range of modalities and payer-specific bundling edits. AspireMedX codes and bills both components correctly and keeps up with NCCI edits so studies don't get bundled into a lower-paying claim by mistake.",
    whatWeHandle: [
      "Technical (TC) and professional (26) component billing",
      "Modality-specific CPT coding: X-ray, CT, MRI, ultrasound, mammography",
      "NCCI edit and bundling rule monitoring",
      "Contrast and supply billing alongside imaging studies",
      "Teleradiology and outside-read billing coordination",
    ],
    challenges:
      "Radiology revenue often leaks through bundling edits that quietly fold a billable study into another line. We check studies against current NCCI edits before submission so a legitimate second read doesn't disappear into a bundle.",
  },
];

export const heroStats = [
  { value: "96%", label: "Clean claim rate" },
  { value: "22", label: "Avg. days in A/R" },
  { value: "-31%", label: "Denials, first 90 days" },
];

export const practiceTypes = [
  "Physician Groups",
  "Multi-Specialty Clinics",
  "Diagnostic Labs",
  "Behavioral Health",
  "Urgent Care",
  "Ambulatory Surgery",
];

export const services = [
  {
    code: "01",
    title: "Medical Billing",
    description:
      "End-to-end claim creation, scrubbing, and submission so clean claims go out the door the first time.",
  },
  {
    code: "02",
    title: "Coding & Compliance",
    description:
      "Certified coders keep every claim aligned with payer rules and current CPT/ICD guidelines.",
  },
  {
    code: "03",
    title: "Denial Management",
    description:
      "Root-cause tracking and fast resubmission turn denials into recovered revenue, not write-offs.",
  },
  {
    code: "04",
    title: "Claims & Payment Posting",
    description:
      "Every remittance is reconciled against the claim it settles, so nothing slips through unmatched.",
  },
  {
    code: "05",
    title: "Credentialing & Enrollment",
    description:
      "Provider enrollment and payer credentialing handled and tracked so billing never stalls behind paperwork.",
  },
  {
    code: "06",
    title: "Analytics & Reporting",
    description:
      "A live view of collections, A/R aging, and denial trends, built for practice owners, not accountants.",
  },
];

export const processSteps = [
  { code: "01", title: "Capture", description: "Charges and encounters are collected as care is delivered." },
  { code: "02", title: "Code & Scrub", description: "Certified coders and automated scrubbing catch errors before submission." },
  { code: "03", title: "Submit", description: "Clean claims are filed electronically with every payer you work with." },
  { code: "04", title: "Track", description: "Every claim is monitored until it's adjudicated, not just filed and forgotten." },
  { code: "05", title: "Reconcile", description: "Payments are posted and denials routed back into the cycle for recovery." },
];

export const differentiators = [
  {
    title: "Certified coding team",
    description: "AAPC-certified coders review claims by specialty, not a generic template.",
  },
  {
    title: "HIPAA-compliant infrastructure",
    description: "Encrypted data handling and audit trails across every step of the cycle.",
  },
  {
    title: "A dedicated account manager",
    description: "One point of contact who knows your practice, not a rotating support queue.",
  },
  {
    title: "Real-time dashboards",
    description: "Collections, denials, and A/R aging, visible whenever you want to check.",
  },
];

export const testimonial = {
  quote:
    "Switching our billing over meant our front desk stopped fielding claim questions, and our collections showed it within a quarter.",
  attribution: "Practice Administrator, Multi-Specialty Group",
  note: "Placeholder quote — swap in a real client testimonial before launch.",
};

// Dedicated, deeper content for the standalone DME billing page
// (app/speciality/dme-billing/page.js) — richer than the shared
// specialities[] entry above, which still powers the nav dropdown,
// the /speciality grid, and cross-links from other detail pages.
export const dmeDetail = {
  title: "Durable Medical Equipment (DME) Billing Services",
  tagline:
    "Every CMN, prior authorization, and HCPCS code tracked from the day equipment is ordered to the day it's paid.",
  intro:
    "DME reimbursement depends on paperwork lining up as much as it depends on coding: a valid physician order, a current Certificate of Medical Necessity, and documentation that actually supports why the equipment was medically necessary. Miss any one of those and a clean claim still comes back denied. AspireMedX manages that whole chain — order, documentation, coding, submission, and follow-up — so a supplier isn't left chasing paperwork after the fact.",
  howWeHelp:
    "Our billing team tracks CMN expiration dates, prior authorization windows, and rental-vs-purchase timelines for every open order, and flags anything missing before a claim goes out rather than after it bounces back. HCPCS Level II coding is handled by staff who work DME claims specifically, not general medical billing generalists, and every denial gets a root-cause review so the same paperwork gap doesn't repeat on the next claim.",
  equipmentCategories: [
    "Wheelchairs & mobility devices",
    "Hospital beds & support surfaces",
    "Oxygen equipment & concentrators",
    "CPAP / BiPAP & respiratory devices",
    "Orthotics & prosthetics",
    "Walkers, canes & ambulatory aids",
    "Diabetic supplies & monitors",
    "Enteral & infusion equipment",
  ],
  reasons: [
    {
      title: "Customized to your setup",
      description:
        "Whether you're an independent supplier or a multi-location DME provider, billing is set up around how your intake and fulfillment already work, not a rigid template.",
    },
    {
      title: "Documentation handled up front",
      description:
        "CMNs, physician orders, and prior authorizations are verified before a claim is filed — the point where most DME denials actually start.",
    },
    {
      title: "Rental & purchase cycles tracked",
      description:
        "Monthly rental billing, cap rental rules, and purchase conversions are tracked per item so nothing gets billed past its allowed cycle.",
    },
    {
      title: "Denials worked, not written off",
      description:
        "Every denial is traced to its cause and resubmitted with the missing piece corrected, instead of moving straight to write-off.",
    },
  ],
  faqs: [
    {
      question: "What's the difference between DME rental and purchase billing?",
      answer:
        "Rental billing recurs monthly against a capped rental period set by the payer, after which some items convert to purchased status; purchase billing is a single claim for the full allowable amount. Which applies depends on the item, the payer, and how long it's expected to be in use — we track that per order so billing switches over at the right point automatically.",
    },
    {
      question: "Why do DME claims get denied even when the equipment was clearly needed?",
      answer:
        "Most denials trace back to paperwork, not medical necessity itself — an expired CMN, a physician order that doesn't match what was billed, or missing prior authorization. The equipment being appropriate doesn't help if the documentation on file doesn't prove it to the payer's standard.",
    },
    {
      question: "Do you handle Medicare and Medicaid DME claims specifically?",
      answer:
        "Yes — Medicare and Medicaid DME billing follows its own set of coverage and documentation rules on top of standard HCPCS coding, and we bill both alongside commercial payers.",
    },
    {
      question: "How long does it take to see a difference after switching?",
      answer:
        "Most practices see cleaner claims within the first billing cycle, since documentation gaps get caught before submission rather than after. Denial recovery on existing aged claims typically shows up over the following one to two cycles.",
    },
  ],
};

export const contact = {
  email: "hello@aspiremedx.com",
  phone: "+1 (555) 019-2044",
  address: "Suite 400, 1200 Aspire Way, Austin, TX",
};
