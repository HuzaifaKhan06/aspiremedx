import Reveal from "./Reveal";
import Link from "next/link";
import { specialities } from "@/lib/content";

const specialtyGroups = [
  {
    title: "Primary Care & Multi-Specialty",
    description: "High-volume primary care billing, chronic disease management, preventive visits, and multi-specialty group operations.",
    items: [
      "Annual wellness visit billing without revenue leaks",
      "Chronic care management and CCM tracking",
      "Same-day preventive and problem-visit coding",
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <circle cx="24" cy="18" r="8" stroke="#20c4d6" strokeWidth="2" />
        <path d="M10 42c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 10v4M20 14h8" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Surgical & Multi-Specialty Practices",
    description: "Procedure-focused coding and surgical RCM specialists for ASC billing, orthopedics, and high-value surgical claim optimization.",
    items: [
      "Global period tracking and modifier compliance",
      "Implant and operative note reconciliation",
      "High-value surgical claim optimization",
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <path d="M12 36L24 12L36 36" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 28h16" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="12" r="3" fill="#20c4d6" />
      </svg>
    ),
  },
  {
    title: "Diagnostics & Behavioral Health",
    description: "High-accuracy diagnostic billing for labs, imaging, and ancillary services, plus behavioral health with session limit tracking.",
    items: [
      "Technical and professional component billing",
      "Time-based codes and parity compliance",
      "Prior authorization and session tracking",
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <rect x="8" y="14" width="32" height="22" rx="3" stroke="#20c4d6" strokeWidth="2" />
        <path d="M16 25l6 6 10-12" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 20h32" stroke="#20c4d6" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
];

const allSpecialties = [
  "Family Medicine", "Internal Medicine", "Cardiology", "Neurology",
  "Orthopedics", "Dermatology", "Gastroenterology", "Psychiatry",
  "Pediatrics", "OB/GYN", "Radiology", "Urgent Care",
  "Physical Therapy", "Pain Management", "Endocrinology", "ASC Billing",
  "DME Billing", "Home Health", "Emergency Room", "Lab & Diagnostics",
  "Pharmacy Billing", "Mental Health", "Primary Care", "Multi-Specialty",
];

export default function SpecialtiesSection() {
  return (
    <section
      className="overflow-hidden py-20"
      style={{ background: "linear-gradient(160deg, #0b1f33 0%, #0b2a22 100%)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <Reveal className="text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#20c4d6]">
            Expert Coverage
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Specialties &amp; Expert Teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            We support revenue cycle operations across 20+ specialties, with dedicated expert teams aligned to each clinical domain.
          </p>
        </Reveal>

        {/* 3 specialty group cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {specialtyGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all hover:border-[#20c4d6]/30 hover:bg-white/8">
                <div className="mb-4">{group.icon}</div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{group.description}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#20c4d6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Divider with CTA */}
        <Reveal className="mt-12 text-center">
          <p className="text-sm font-semibold text-white/70">
            We deploy dedicated, specialty-trained experts for each domain
          </p>
        </Reveal>

        {/* Specialty tags */}
        <Reveal className="mt-6" delay={100}>
          <div className="flex flex-wrap justify-center gap-2.5">
            {allSpecialties.map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/60 transition-all hover:border-[#20c4d6]/40 hover:bg-[#20c4d6]/10 hover:text-white"
              >
                {spec}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center" delay={150}>
          <Link
            href="/speciality"
            className="inline-flex items-center gap-2 rounded-lg border border-[#20c4d6]/40 bg-[#20c4d6]/10 px-6 py-3 text-sm font-semibold text-[#20c4d6] transition-all hover:bg-[#20c4d6]/20 hover:border-[#20c4d6]"
          >
            View All Specialties <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
