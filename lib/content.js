// All editable site copy lives here so content can change without touching
// component markup.
//
// Homepage copy (hero, services, process, why-choose, results, FAQs, tech
// integrations) is sourced from the AspireMedX_Website_Content.pdf content
// package the owner provided, lightly adapted to fit each component's
// layout. Speciality content is original — written for AspireMedX using
// general medical-billing industry knowledge, not copied from any one
// source.

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Technology", href: "/#technology" },
  { label: "Process", href: "/#process" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/#contact" },
];

export const cta = {
  primary: "Get a Free Revenue & Credentialing Assessment",
  secondary: "Schedule a Consultation",
};

export const hero = {
  eyebrow: "Complete Medical Billing, Credentialing, Enrollment & RCM",
  headline: "Maximize Revenue. Reduce Denials. Stay Fully Credentialed.",
  subheadline:
    "AspireMedX helps medical practices, multi-specialty groups, and healthcare organizations get paid faster, stay in-network with more payers, and eliminate the administrative burden of billing, credentialing, and contracting — so you can focus on delivering exceptional patient care.",
};

// Hero + trust-strip stats — structured as {value, suffix} so the Counter
// component can animate the numeric part. Sourced from the owner's content
// package; not placeholders.
export const heroStats = [
  { value: 98, suffix: "%+", label: "First-pass clean claim rate" },
  { value: 30, prefix: "Up to ", suffix: "%", label: "A/R reduction" },
  { value: 100, suffix: "%", label: "HIPAA compliant" },
];

export const practiceTypes = [
  "Physician Groups",
  "Multi-Specialty Health Systems",
  "Diagnostic & Imaging Networks",
  "Behavioral Health Networks",
  "Ambulatory Surgery Centers",
  "Hospital-Affiliated Practices",
];

export const services = [
  {
    code: "01",
    slug: "medical-billing",
    title: "Medical Billing",
    description:
      "Charge entry and coding, advanced claim scrubbing, electronic submission to every major payer, payment posting, and denial management — built to accelerate cash flow.",
  },
  {
    code: "02",
    slug: "provider-credentialing",
    title: "Provider Credentialing",
    description:
      "Primary source verification, CAQH ProView management, and payer application submission for physicians, NPs, PAs, and facilities — from initial credentialing through recredentialing.",
  },
  {
    code: "03",
    slug: "provider-enrollment",
    title: "Provider Enrollment",
    description:
      "Medicare (PECOS), Medicaid across all 50 states, and commercial payer enrollment — including new locations, revalidations, and follow-up on additional information requests.",
  },
  {
    code: "04",
    slug: "payer-contracting",
    title: "Payer Contracting",
    description:
      "Contract benchmarking, negotiation support, and ongoing oversight of fee schedules, renewal terms, and value-based arrangements so you're paid fairly, not just in-network.",
  },
  {
    code: "05",
    slug: "revenue-cycle-management",
    title: "Full Revenue Cycle Management",
    description:
      "End-to-end RCM connecting front-end eligibility and credentialing with mid-cycle coding and back-end denials and A/R — one accountable partner for the whole cycle.",
  },
  {
    code: "06",
    slug: "reporting-analytics",
    title: "Reporting & Analytics",
    description:
      "Real-time KPI dashboards and performance reporting across claims, denials, and collections — built for practice owners and finance leaders, not just billers.",
  },
];

export const processIntro =
  "A structured path from assessment to ongoing optimization — designed so onboarding never disrupts your existing cash flow.";

export const processSteps = [
  {
    code: "01",
    title: "Discovery & Assessment",
    description: "A comprehensive review of current billing performance, credentialing status, contracts, and technology stack.",
  },
  {
    code: "02",
    title: "Customized Roadmap",
    description: "A clear plan covering billing, credentialing, enrollment, contracting, and system integration priorities.",
  },
  {
    code: "03",
    title: "Secure Onboarding",
    description: "Data transfer, portal access setup, and CAQH alignment, handed off with minimal disruption to cash flow.",
  },
  {
    code: "04",
    title: "Execution & Monitoring",
    description: "Active daily management of claims, applications, portals, and payer follow-up.",
  },
  {
    code: "05",
    title: "Ongoing Optimization",
    description: "Regular performance reviews, denial root-cause analysis, and contract monitoring for continuous improvement.",
  },
];

// "Why Practices Choose AspireMedX" — from the owner's content package,
// section 4, split into two bullet groups for the layout.
// "Results You Can Expect" — section 6, split the same way.
export const whyUsBands = [
  {
    eyebrow: "Why Practices Choose Us",
    title: "A partner built around your entire revenue cycle, not just claims.",
    intro:
      "AspireMedX pairs specialized expertise with a technology-agnostic approach — we work inside the systems you already use, not the other way around.",
    graphic: "shield",
    groups: [
      {
        heading: "How we operate",
        items: [
          "Specialized expertise across credentialing, enrollment, contracting, coding, and full RCM",
          "Technology agnostic — we integrate with the platforms and clearinghouses you already use",
          "Proactive management of CAQH, expirables, contracts, and denial trends",
        ],
      },
      {
        heading: "What you get",
        items: [
          "Dedicated account managers and clear KPI reporting",
          "Strict HIPAA compliance, signed BAAs, and current payer knowledge",
          "A scalable partnership, from solo providers to multi-location groups",
        ],
      },
    ],
  },
  {
    eyebrow: "Results You Can Expect",
    title: "Measurable outcomes across the whole revenue cycle.",
    intro:
      "The goal isn't just claims filed — it's faster onboarding, cleaner claims, and fewer dollars stuck in aging A/R.",
    graphic: "radial",
    reverse: true,
    groups: [
      {
        heading: "Revenue performance",
        items: [
          "Faster provider onboarding and network participation",
          "Higher clean claim rates and improved net collections",
          "Reduced aging accounts receivable and days in A/R",
        ],
      },
      {
        heading: "Operational relief",
        items: [
          "Fewer credentialing- and enrollment-related denials",
          "Better visibility into reimbursement rates and contract performance",
          "Significant reduction in administrative workload for internal staff",
        ],
      },
    ],
  },
];

// Technology, portals & integrations — owner content package, section 3.
export const caqhServices = [
  "Profile creation and complete data population for new providers",
  "Regular attestation and re-attestation to keep profiles current",
  "Upload and management of supporting documents (licenses, insurance, certificates)",
  "Monitoring of profile status and correction of data discrepancies",
  "Coordination with payers that pull data directly from CAQH",
  "Bulk management for multi-provider groups",
];

export const payerPortals = [
  "UnitedHealthcare",
  "Aetna",
  "Cigna",
  "Anthem / Blue Cross Blue Shield (state plans)",
  "Humana",
  "Centene / WellCare",
  "Molina",
  "Local & regional Blue plans",
  "Medicare Administrative Contractor (MAC) portals",
  "State Medicaid portals",
];

export const clearinghouses = [
  "Change Healthcare (Optum)",
  "Availity",
  "Office Ally",
  "Claim.MD",
  "Waystar",
  "TriZetto",
  "Emdeon / Change",
];

export const pmSoftware = [
  { platform: "AdvancedMD", capability: "Full PM/billing module support, claim generation, ERA posting, reporting, and workflow optimization." },
  { platform: "Office Ally", capability: "Clearinghouse + billing services, claim submission, eligibility, and status tracking." },
  { platform: "Claim.MD", capability: "Real-time claim scrubbing, submission, rejection management, and ERA processing." },
  { platform: "Tebra (formerly Kareo)", capability: "Practice management, billing, patient engagement, and revenue cycle workflows." },
  { platform: "eClinicalWorks (eCW)", capability: "EHR + billing module support, charge capture, claim submission, and denial workflows." },
  { platform: "ModMed", capability: "Specialty-focused EHR billing support (dermatology, orthopedics, ophthalmology, etc.)." },
  { platform: "NextGen Healthcare", capability: "Enterprise PM and EHR billing, charge entry, claims, and A/R management." },
  { platform: "Other platforms", capability: "athenahealth, DrChrono, Practice Fusion, Greenway, Allscripts/Veradigm, Cerner/Oracle Health, Epic (where access permits), and more." },
];

export const testimonial = {
  quote:
    "Moving our revenue cycle to AspireMedX meant our internal team stopped fighting fires on claims and started reviewing dashboards instead. Collections showed it within a quarter.",
  attribution: "VP of Revenue Cycle, Multi-Specialty Health System",
  note: "Placeholder quote — swap in a real client outcome before launch.",
};

// Owner content package, section 7.
export const siteFaqs = [
  {
    question: "What's the difference between credentialing, enrollment, and contracting?",
    answer:
      "Credentialing verifies a provider's qualifications and history. Enrollment is the formal approval by a specific payer to bill for services. Contracting sets the rates, terms, and conditions under which you'll be paid.",
  },
  {
    question: "How long does provider credentialing and enrollment typically take?",
    answer:
      "Timelines vary by payer — commonly 60 to 120-plus days. AspireMedX accelerates the process through complete, accurate applications and persistent follow-up.",
  },
  {
    question: "Do you maintain CAQH profiles on an ongoing basis?",
    answer:
      "Yes. AspireMedX creates, completes, attests, and continuously maintains CAQH ProView profiles so your data stays current and payer-ready.",
  },
  {
    question: "Which billing softwares and clearinghouses do you work with?",
    answer:
      "AspireMedX supports AdvancedMD, Office Ally, Claim.MD, Tebra, eClinicalWorks, ModMed, NextGen, athenahealth, and many others, plus major clearinghouses such as Change Healthcare, Availity, Waystar, and Claim.MD.",
  },
  {
    question: "Can you work inside our existing EHR or practice management system?",
    answer:
      "In most cases, yes. AspireMedX adapts to your current technology stack rather than forcing a platform change.",
  },
  {
    question: "Do you handle both individual and group credentialing?",
    answer:
      "Yes. AspireMedX supports individual providers, advanced practice providers, groups, and facilities.",
  },
  {
    question: "Are your services fully HIPAA compliant?",
    answer:
      "Yes. AspireMedX follows strict HIPAA guidelines and executes Business Associate Agreements (BAAs) with every client.",
  },
  {
    question: "How do you price your services?",
    answer:
      "Pricing is customized based on practice size, specialty mix, volume, and scope of services — billing only, credentialing only, or full RCM. AspireMedX provides a transparent proposal after the initial assessment.",
  },
];

export const contact = {
  email: "hello@aspiremedx.com",
  phone: "+1 (555) 019-2044",
  address: "Suite 400, 1200 Aspire Way, Austin, TX",
};

// ---------------------------------------------------------------------------
// Specialities — shown in the navbar dropdown and the /speciality grid.
// "Speciality" itself links to /speciality; each item links to its own page.
// dme-billing has a dedicated, deeper page (app/speciality/dme-billing);
// every other slug renders through the shared app/speciality/[slug] template.
// ---------------------------------------------------------------------------
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
      "Pharmacy billing runs on a tighter clock than most specialities — real-time adjudication, PBM-specific formularies, and prior auth windows that can hold up a fill. AspireMedX keeps claims moving through that pipeline and reconciles what PBMs actually pay against what was billed.",
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
    title: "Mental Health & Behavioral Health Billing",
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
  {
    slug: "urgent-care-billing",
    title: "Urgent Care Billing",
    tagline: "High-volume walk-in visits, coded and billed as fast as patients move through the door.",
    overview:
      "Urgent care runs on volume and speed — a steady stream of walk-ins, occupational medicine visits, and point-of-care testing that all need to be coded and billed the same day they happen. AspireMedX keeps that throughput from turning into a claims backlog.",
    whatWeHandle: [
      "E/M leveling for walk-in visits alongside S-codes for urgent care facility fees",
      "Point-of-care testing billing (rapid strep, flu, mono, basic labs)",
      "Occupational medicine and workers' comp claim billing",
      "After-hours and extended-service modifier application",
      "High-volume daily claim batching and same-day submission",
    ],
    challenges:
      "Urgent care denials usually trace back to E/M level mismatches or missing modifiers on same-day procedures. With this much daily volume, a small coding pattern error compounds fast — we catch it at the batch level before it repeats across a week of claims.",
  },
  {
    slug: "family-medicine-billing",
    title: "Family Medicine Billing",
    tagline: "Preventive care, chronic disease management, and referrals, billed without missing revenue.",
    overview:
      "Family medicine practices bill across an unusually wide mix — annual wellness visits, problem-focused sick visits, chronic care management, and referral coordination, often in the same day for the same patient. AspireMedX keeps that mix coded correctly so preventive-care claims don't quietly convert into a patient bill.",
    whatWeHandle: [
      "Annual Wellness Visit (AWV) vs. problem-focused E/M coding and modifier 25 use",
      "Chronic Care Management (CCM) and transitional care management billing",
      "Immunization and vaccine administration coding",
      "Referral and prior authorization coordination for specialist visits",
      "Medicare and commercial payer mix reconciliation",
    ],
    challenges:
      "The most common revenue leak is billing a preventive visit and a problem-focused visit on the same day without the right modifier, which either drops the second service or triggers a denial. We flag same-day combination visits before submission so both services get paid correctly.",
  },
  {
    slug: "internal-medicine-billing",
    title: "Internal Medicine Billing",
    tagline: "Complex adult care and multi-condition visits, coded to match documentation.",
    overview:
      "Internal medicine visits often manage several chronic conditions in a single encounter, which makes E/M level selection and documentation-to-code matching more complicated than a single-complaint visit. AspireMedX codes to what's actually documented, not a default template.",
    whatWeHandle: [
      "Multi-problem E/M coding aligned to medical decision-making complexity",
      "Chronic Care Management and Annual Wellness Visit billing",
      "Diagnostic and lab order billing coordination",
      "Prior authorization tracking for referrals and specialty medications",
      "Risk-adjustment (HCC) coding accuracy for value-based contracts",
    ],
    challenges:
      "Under-coding is as costly as over-coding here — a visit that genuinely supports a higher-complexity code but gets billed at a lower level leaves money on the table every time it happens. We review documentation against coding level before submission, not just after a payer flags it.",
  },
  {
    slug: "psychiatry-billing",
    title: "Psychiatry Billing",
    tagline: "Medication management and E/M visits, billed separately from therapy time.",
    overview:
      "Psychiatric billing runs on a different code set than therapy billing — E/M visit levels plus medication management, rather than time-based therapy codes — and often involves tighter prior authorization requirements around controlled substances. AspireMedX bills the two correctly and keeps them from being confused with each other.",
    whatWeHandle: [
      "E/M coding for medication management visits, including add-on psychotherapy codes",
      "Prior authorization tracking for controlled substances and specialty medications",
      "Telepsychiatry billing with correct place-of-service coding",
      "Coordination with therapy claims for patients seeing both a psychiatrist and therapist",
      "Initial psychiatric evaluation and diagnostic interview billing",
    ],
    challenges:
      "A common denial pattern is billing a med management visit with a therapy code instead of the correct E/M plus add-on combination, which most payers reject outright. We code medication management and therapy time separately so neither claim gets bundled incorrectly.",
  },
  {
    slug: "cardiology-billing",
    title: "Cardiology Billing",
    tagline: "High-cost diagnostics and procedures, billed with the prior authorization to back them up.",
    overview:
      "Cardiology billing carries some of the highest per-claim dollar amounts in outpatient medicine — echocardiograms, stress tests, cath lab procedures, and device management — which also means payers scrutinize prior authorization and medical necessity more closely. AspireMedX gets that documentation in place before the claim, not after a denial.",
    whatWeHandle: [
      "Diagnostic testing billing: echocardiograms, stress tests, Holter monitors, EKGs",
      "Cardiac catheterization and interventional procedure coding",
      "Implantable device billing and remote monitoring codes",
      "Prior authorization management for high-cost imaging and procedures",
      "Global period tracking for procedural follow-up visits",
    ],
    challenges:
      "Missing or incomplete prior authorization is the single biggest cause of cardiology denials, given how many services require it. We verify authorization status against the scheduled procedure before the patient is even seen, not after the claim is filed.",
  },
  {
    slug: "dermatology-billing",
    title: "Dermatology Billing",
    tagline: "Medical, surgical, and cosmetic services, billed to the right payer or patient.",
    overview:
      "Dermatology mixes medically necessary visits with cosmetic procedures that insurance won't cover at all, plus a steady flow of biopsies and excisions that need pathology coordination. Getting that split wrong means claims filed for non-covered services or missed revenue on procedures that should've been billed to insurance. AspireMedX keeps the two separated correctly from intake onward.",
    whatWeHandle: [
      "Medical vs. cosmetic service distinction and correct patient-responsibility billing",
      "Biopsy, excision, and lesion removal coding, including size- and depth-based CPT selection",
      "Pathology lab billing coordination for tissue sent out for diagnosis",
      "Modifier use for multiple procedures performed in the same visit",
      "Mohs surgery billing and staged-procedure documentation",
    ],
    challenges:
      "Multiple-procedure visits are where dermatology claims most often get underpaid — missing modifiers cause a payer to bundle or reduce a second procedure that should be reimbursed separately. We apply modifier logic per visit rather than relying on a single default pattern.",
  },
  {
    slug: "pediatrics-billing",
    title: "Pediatrics Billing",
    tagline: "Vaccines, well-child visits, and a high-Medicaid payer mix, billed without leaving revenue behind.",
    overview:
      "Pediatric practices bill a distinct mix of well-child visits, vaccine administration, and newborn care, frequently against Medicaid and CHIP alongside commercial plans — each with its own vaccine program rules and preventive-care billing quirks. AspireMedX handles that mix so vaccine claims and well visits don't get billed as if they were adult primary care.",
    whatWeHandle: [
      "Well-child visit (EPSDT) coding by age-specific schedule",
      "Vaccine product and administration billing, including VFC program claims",
      "Newborn and hospital discharge billing coordination",
      "Medicaid and CHIP eligibility verification and claim rules by state",
      "Same-day sick-visit and well-visit combination billing",
    ],
    challenges:
      "VFC-supplied vaccines have to be billed for administration only, not the vaccine product itself — billing the product on a VFC-eligible claim is a common, avoidable denial. We track VFC status per patient so vaccine claims go out coded correctly the first time.",
  },
  {
    slug: "neurology-billing",
    title: "Neurology Billing",
    tagline: "EMG, EEG, and infusion billing, backed by the prior authorization payers expect.",
    overview:
      "Neurology combines cognitive E/M visits with technical procedures like EMG/NCS testing and EEG studies, plus infusion billing for conditions like multiple sclerosis — each requiring different documentation and, frequently, prior authorization before imaging or testing is approved. AspireMedX manages that documentation trail alongside the coding itself.",
    whatWeHandle: [
      "EMG/NCS and EEG procedure coding, including per-nerve and per-study billing rules",
      "Prior authorization tracking for advanced imaging (MRI, MRA) and neurodiagnostic testing",
      "Infusion and injection billing for chronic neurological conditions",
      "E/M coding for complex, multi-visit diagnostic workups",
      "Botox and other therapeutic injection billing with medical necessity documentation",
    ],
    challenges:
      "Neurodiagnostic studies billed without a completed prior authorization on file are one of the most common denial types in this speciality. We confirm authorization status against the ordered study before it's performed, not after the claim comes back.",
  },
  {
    slug: "orthopedics-billing",
    title: "Orthopedics Billing",
    tagline: "Surgical global periods, implants, and DME crossover, reconciled against the operative note.",
    overview:
      "Orthopedic billing spans office visits, high-dollar surgical procedures with global periods, and DME crossover for braces and mobility devices — all of which need to be reconciled against what the operative note actually documents. AspireMedX checks that reconciliation before the claim goes out, not after an underpayment posts.",
    whatWeHandle: [
      "Surgical procedure coding with correct global period and modifier application",
      "Implant and hardware billing tied to operative documentation",
      "DME crossover billing for braces, walking boots, and post-surgical equipment",
      "Prior authorization management for imaging and elective procedures",
      "Fracture care global billing vs. itemized visit billing",
    ],
    challenges:
      "Visits that fall inside a procedure's global period often get billed separately by mistake, which draws an automatic denial or recoupment. We track active global periods per patient so follow-up visits are billed correctly the first time.",
  },
  {
    slug: "gastroenterology-billing",
    title: "Gastroenterology Billing",
    tagline: "Screening vs. diagnostic colonoscopy billing, and endoscopy bundling, handled correctly.",
    overview:
      "Gastroenterology billing has one especially high-stakes distinction: a screening colonoscopy that becomes diagnostic mid-procedure (a polyp is found and removed) has to be billed differently than a purely preventive screening, and getting it wrong either creates an unexpected patient bill or an avoidable denial. AspireMedX applies that distinction correctly on every procedure claim.",
    whatWeHandle: [
      "Screening-to-diagnostic colonoscopy billing conversion and modifier use",
      "Endoscopy and procedure bundling rules under NCCI edits",
      "Anesthesia coordination billing for sedated procedures",
      "Pathology billing coordination for biopsied tissue",
      "Prior authorization for advanced procedures and infusion therapies",
    ],
    challenges:
      "Billing a converted screening-to-diagnostic colonoscopy as a pure screening is one of the most common — and most consequential — errors in GI billing, since it can leave the patient with an unexpected bill. We flag procedure notes for that conversion before the claim is coded.",
  },
  {
    slug: "endocrinology-billing",
    title: "Endocrinology Billing",
    tagline: "Chronic disease management and device billing, tracked across recurring visits.",
    overview:
      "Endocrinology is built around ongoing chronic disease management — diabetes, thyroid disorders, and hormonal conditions — with frequent lab orders and a growing share of device billing for continuous glucose monitors and insulin pumps. AspireMedX keeps the recurring visit and device billing consistent across a patient's whole treatment history.",
    whatWeHandle: [
      "Chronic Care Management billing for ongoing diabetes and thyroid treatment",
      "Continuous glucose monitor (CGM) and insulin pump billing and supply claims",
      "Frequent lab order billing coordination and medical necessity documentation",
      "E/M coding for recurring chronic-condition follow-up visits",
      "Prior authorization for specialty medications and devices",
    ],
    challenges:
      "CGM and pump supply claims are frequently denied for missing or outdated medical necessity documentation, since many payers require it on a recurring basis rather than just at initial setup. We track renewal windows so supporting documentation stays current instead of lapsing between claims.",
  },
  {
    slug: "obgyn-billing",
    title: "OB/GYN Billing",
    tagline: "Global maternity billing and routine gynecology, billed under two different rule sets.",
    overview:
      "OB/GYN practices bill two very different models side by side: bundled global maternity care covering prenatal visits, delivery, and postpartum care as one package, and standard itemized billing for routine gynecology. Mixing the two up — billing a prenatal visit separately when it belongs in the global package, for example — is a frequent, costly mistake. AspireMedX keeps the two billing models cleanly separated.",
    whatWeHandle: [
      "Global maternity billing package tracking (antepartum, delivery, postpartum)",
      "Itemized billing for routine gynecology visits and procedures",
      "Ultrasound frequency-limit tracking against payer policy",
      "High-risk pregnancy billing and additional antepartum visit documentation",
      "Newborn care coordination billing where applicable",
    ],
    challenges:
      "Billing an individual prenatal visit outside the global package — instead of folding it into the bundled maternity claim — is one of the most common OB billing errors, and it draws denials once the delivery claim is filed. We track each pregnancy's global billing window from the first visit forward.",
  },
  {
    slug: "pain-management-billing",
    title: "Pain Management Billing",
    tagline: "Procedure billing and controlled-substance documentation, built for payer scrutiny.",
    overview:
      "Pain management sits under more payer scrutiny than most specialities — image-guided injection procedures require precise coding and medical necessity documentation, and controlled substance prescribing invites frequent audits. AspireMedX bills the procedures correctly and keeps documentation audit-ready before a payer ever asks for it.",
    whatWeHandle: [
      "Image-guided injection procedure coding (epidural, facet, nerve block)",
      "Medical necessity documentation for interventional procedures",
      "Prior authorization management for procedures and controlled substances",
      "Urine drug screening and monitoring billing compliance",
      "Multiple-procedure billing and bundling edit review",
    ],
    challenges:
      "Interventional procedures billed without imaging-guidance documentation attached are a frequent denial and audit trigger in this speciality. We confirm that guidance documentation is on file before a procedure claim goes out, not after a payer requests records.",
  },
  {
    slug: "physical-therapy-billing",
    title: "Physical Therapy Billing",
    tagline: "Time-based units and therapy caps, tracked patient by patient.",
    overview:
      "Physical therapy billing runs on time-based unit calculations — the 8-minute rule — plus Medicare therapy threshold tracking that requires a KX modifier once a patient crosses a spending cap. Miscounting units or missing a threshold modifier are two of the most common, avoidable denial causes. AspireMedX tracks both per patient, per visit.",
    whatWeHandle: [
      "8-minute rule unit calculation and timed vs. untimed code billing",
      "Medicare therapy threshold tracking and KX modifier application",
      "Functional limitation reporting and progress-note documentation alignment",
      "Plan of care certification and recertification tracking",
      "Multiple-discipline billing coordination (PT, OT, speech) where applicable",
    ],
    challenges:
      "Unit-count errors under the 8-minute rule are one of the most common reasons therapy claims get down-coded or denied. We calculate billed units directly against documented treatment time before submission rather than relying on a flat per-visit assumption.",
  },
  {
    slug: "diagnostic-laboratory-billing",
    title: "Diagnostic Laboratory Billing",
    tagline: "High-volume, low-dollar claims, billed accurately at scale.",
    overview:
      "Laboratory billing is a volume game — thousands of low-dollar claims where a small, repeated coding or bundling error compounds into significant lost revenue across a billing cycle. AspireMedX applies the same scrutiny to lab claims at scale that a lower-volume speciality gets claim by claim.",
    whatWeHandle: [
      "CPT and panel coding aligned to CLIA certification level",
      "Panel bundling edit review to prevent components being denied as duplicates",
      "Client billing vs. patient billing distinction for referred tests",
      "Medical necessity (ICD-10) matching for ordered tests, per payer policy",
      "High-volume electronic claim batching and rejection monitoring",
    ],
    challenges:
      "Because lab billing runs at such high volume, a single misconfigured bundling edit or missing diagnosis-to-test match can repeat across hundreds of claims before anyone notices. We monitor rejection patterns at the batch level so a systemic issue gets caught in days, not a full billing cycle.",
  },
  {
    slug: "home-health-billing",
    title: "Home Health Billing",
    tagline: "Episodic PDGM billing, tied directly to OASIS documentation.",
    overview:
      "Home health billing runs on 30-day payment episodes under Medicare's Patient-Driven Groupings Model (PDGM), where reimbursement is calculated directly from OASIS assessment data and physician certification requirements. A documentation gap in the OASIS record shows up as a reimbursement gap on the claim. AspireMedX keeps that link intact.",
    whatWeHandle: [
      "PDGM episodic billing and case-mix group verification against OASIS data",
      "Physician certification and recertification tracking for each episode",
      "Face-to-face encounter documentation compliance",
      "Low-utilization payment adjustment (LUPA) monitoring",
      "Visit frequency and plan-of-care alignment across the episode",
    ],
    challenges:
      "A missing or late physician certification is one of the fastest ways an otherwise well-documented home health episode gets denied outright. We track certification and recertification deadlines per episode so a signature gap never holds up payment.",
  },
  {
    slug: "primary-care-billing",
    title: "Primary Care Billing",
    tagline: "High-volume preventive and chronic care billing, without the wellness-visit revenue leaks.",
    overview:
      "Primary care practices carry some of the highest patient volume in outpatient medicine, blending preventive visits, chronic disease management, and acute sick visits — often in the same appointment. AspireMedX bills that blend correctly so preventive-care claims stay fully covered and chronic-care management doesn't go unbilled.",
    whatWeHandle: [
      "Annual Wellness Visit and preventive service coding with correct modifier use",
      "Chronic Care Management (CCM) and Remote Patient Monitoring billing",
      "Same-day preventive and problem-focused visit combination billing",
      "Referral tracking and prior authorization coordination",
      "Payer mix reconciliation across Medicare, Medicaid, and commercial plans",
    ],
    challenges:
      "Chronic Care Management time is one of the most under-billed services in primary care simply because it isn't tracked consistently across a month. We monitor CCM time thresholds per patient so qualifying months actually get billed instead of quietly missed.",
  },
  {
    slug: "multi-specialty-billing",
    title: "Multi-Specialty Practice Billing",
    tagline: "One billing standard across every department, instead of a patchwork by specialist.",
    overview:
      "Multi-specialty groups run the risk of every department coding and documenting slightly differently, which makes performance reporting and denial tracking unreliable at the organization level. AspireMedX applies one consistent billing standard across departments while still respecting each speciality's own coding rules.",
    whatWeHandle: [
      "Speciality-specific coding applied consistently across every department",
      "Centralized credentialing and enrollment tracking for all providers",
      "Organization-wide KPI reporting alongside per-department performance views",
      "Shared clearinghouse and payer portal management across locations",
      "Cross-department denial pattern analysis to catch systemic issues early",
    ],
    challenges:
      "Without centralized oversight, one department's denial pattern often goes unnoticed until it's already cost several billing cycles. We report performance both organization-wide and per department, so a problem in one speciality doesn't hide inside an otherwise healthy aggregate number.",
  },
];

// ---------------------------------------------------------------------------
// Service detail pages — one object per core service.
// Each entry powers /services/[slug] and the Services dropdown in the nav.
// ---------------------------------------------------------------------------
export const serviceDetails = [
  {
    slug: "medical-billing",
    title: "Medical Billing",
    tagline:
      "Accelerate cash flow with a clean-claim-first billing strategy built for every major payer.",
    overview:
      "End-to-end claim management from charge entry through payment posting — built to reduce days in A/R and eliminate the revenue gaps that accumulate when claims slip through without follow-up. AspireMedX applies advanced scrubbing and payer-specific rule sets before submission, so denials don't start with a preventable error.",
    whatWeHandle: [
      "Charge entry and CPT/ICD-10 coding review",
      "Advanced claim scrubbing and edit resolution before submission",
      "Electronic claim submission to all major payers and clearinghouses",
      "Payment posting and ERA/EOB reconciliation",
      "Denial management — root-cause analysis and appeal filing",
      "Aging A/R follow-up and collection recovery",
      "Patient responsibility balance billing coordination",
    ],
    keyBenefits: [
      { stat: "98%+", label: "First-pass clean claim rate" },
      { stat: "24 days", label: "Average days in A/R" },
      { stat: "< 3%", label: "Overall denial rate" },
    ],
    challenges:
      "Most billing gaps aren't coding errors — they're process gaps: claims that never got properly scrubbed, denials that sat unanswered, payments that posted to the wrong account. AspireMedX closes those gaps at every handoff in the billing workflow.",
  },
  {
    slug: "provider-credentialing",
    title: "Provider Credentialing",
    tagline:
      "Primary source verification and CAQH management so your providers stay credentialed and in-network.",
    overview:
      "Provider credentialing is the foundation that makes everything else billable — without it, claims for a provider route to denial before they're even reviewed. AspireMedX manages the full credentialing lifecycle from initial application through ongoing maintenance, for physicians, NPs, PAs, and facilities.",
    whatWeHandle: [
      "Primary source verification of licenses, certifications, and education",
      "CAQH ProView profile creation, attestation, and ongoing maintenance",
      "Payer application submission and follow-up tracking",
      "Committee review preparation and privilege applications",
      "Recredentialing and re-verification on payer-required cycles",
      "Expirable tracking — licenses, DEA, malpractice, board certifications",
    ],
    keyBenefits: [
      { stat: "60–90 days", label: "Typical initial credentialing timeline" },
      { stat: "100%", label: "CAQH profile maintenance coverage" },
      { stat: "0", label: "Expirables missed with proactive tracking" },
    ],
    challenges:
      "Credentialing denials are rarely about the provider — they're almost always about a gap in the application: missing documentation, an expired primary source, or a CAQH profile that wasn't current when the payer pulled it. We close those gaps proactively, before they hold up a claim.",
  },
  {
    slug: "provider-enrollment",
    title: "Provider Enrollment",
    tagline:
      "Medicare, Medicaid, and commercial payer enrollment managed from application to active in-network status.",
    overview:
      "Provider enrollment converts credentialing approval into billing authorization — without it, a credentialed provider still can't get paid. AspireMedX manages Medicare PECOS enrollment, Medicaid enrollment across all 50 states, and commercial payer applications through to active participation status.",
    whatWeHandle: [
      "Medicare enrollment through PECOS, including new providers and groups",
      "Medicaid enrollment across all 50 states and MCO plans",
      "Commercial payer panel applications — new locations and new providers",
      "Revalidations, demographic updates, and reassignment of benefits",
      "Additional information request (AIR) follow-up with payers",
      "Effective date tracking and retroactive billing coordination",
    ],
    keyBenefits: [
      { stat: "All 50", label: "States for Medicaid enrollment" },
      { stat: "120+", label: "Commercial payer relationships" },
      { stat: "100%", label: "Application follow-up coverage" },
    ],
    challenges:
      "Enrollment delays cost money in missed claims from the day a provider should have been active. AspireMedX tracks effective dates and coordinates retroactive billing where payers allow it, so enrollment gaps don't become permanent revenue gaps.",
  },
  {
    slug: "payer-contracting",
    title: "Payer Contracting",
    tagline:
      "Contract benchmarking, negotiation support, and fee schedule oversight so you're paid fairly — not just in-network.",
    overview:
      "Being in-network is the baseline. Being in-network at the right rate is what actually drives revenue. AspireMedX provides contract benchmarking against market data, negotiation support for new and renewal contracts, and ongoing monitoring to ensure payers honor what they agreed to pay.",
    whatWeHandle: [
      "Fee schedule benchmarking against Medicare and market rates",
      "Contract terms analysis — exclusions, clean claim definitions, timely payment",
      "Negotiation support for initial and renewal contracts",
      "Value-based and risk-based contract review and modeling",
      "Payment variance monitoring — flagging underpayments against contracted rates",
      "Contract renewal tracking and proactive renegotiation scheduling",
    ],
    keyBenefits: [
      { stat: "15–30%", label: "Typical rate improvement on renegotiated contracts" },
      { stat: "100%", label: "Contract expiration tracking coverage" },
      { stat: "Ongoing", label: "Payment variance monitoring" },
    ],
    challenges:
      "Most practices don't know their payers are underpaying until they look — because underpayments post quietly and move to collections. We monitor payment amounts against contracted rates on an ongoing basis so the gap gets caught within a billing cycle, not a year later.",
  },
  {
    slug: "revenue-cycle-management",
    title: "Full Revenue Cycle Management",
    tagline:
      "End-to-end RCM connecting every stage of the revenue cycle under one accountable partner.",
    overview:
      "Full RCM is more than billing — it connects front-end eligibility and credentialing with mid-cycle coding and claim submission, and back-end denial management and A/R recovery, into one accountable workflow. AspireMedX manages the entire cycle so nothing falls between the handoffs.",
    whatWeHandle: [
      "Front-end: eligibility verification and benefits coordination",
      "Credentialing and enrollment — maintaining provider network participation",
      "Coding — charge capture, CPT/ICD-10 coding, and modifier review",
      "Claim scrubbing, submission, and payer portal management",
      "Payment posting, ERA processing, and reconciliation",
      "Denial management, appeals, and A/R recovery",
      "KPI reporting — collections, days in A/R, denial rates, clean claim rates",
    ],
    keyBenefits: [
      { stat: "One", label: "Partner for the entire revenue cycle" },
      { stat: "Real-time", label: "KPI dashboards and performance reporting" },
      { stat: "End-to-end", label: "Accountability across every workflow stage" },
    ],
    challenges:
      "Revenue leaks most often at the handoffs — between front-end intake and coding, between coding and billing, between billing and follow-up. A fragmented RCM operation means no one is accountable for the gaps. AspireMedX owns the whole cycle.",
  },
  {
    slug: "reporting-analytics",
    title: "Reporting & Analytics",
    tagline:
      "Real-time KPI dashboards built for practice owners and finance leaders — not just billers.",
    overview:
      "Revenue cycle visibility shouldn't require digging through clearinghouse reports. AspireMedX builds and maintains KPI dashboards that surface the metrics that matter — clean claim rates, denial rates, days in A/R, and collection performance — in a format that practice owners and finance leaders can act on.",
    whatWeHandle: [
      "Real-time KPI dashboard setup and maintenance",
      "Claim submission and acceptance rate reporting",
      "Denial rate and denial category tracking",
      "Days in A/R and aging bucket analysis",
      "Collections performance vs. expected reimbursement",
      "Provider-level and payer-level performance breakdowns",
      "Monthly performance reviews and trend analysis",
    ],
    keyBenefits: [
      { stat: "Real-time", label: "Data refresh on claim and payment status" },
      { stat: "10+", label: "KPIs tracked across the revenue cycle" },
      { stat: "Monthly", label: "Performance review calls included" },
    ],
    challenges:
      "Most billing reports answer questions billers ask — not questions practice owners ask. AspireMedX builds reporting that answers 'How much money is stuck in denials?' and 'Why did collections drop this quarter?' instead of just 'How many claims did we file?'",
  },
];

// Dedicated, deeper content for the standalone DME page
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
