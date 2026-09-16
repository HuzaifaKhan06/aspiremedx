import Reveal from "./Reveal";
import Link from "next/link";

const leftFeatures = [
  {
    title: "Built for Revenue at Scale",
    description: "Enterprise-ready RCM handling billing volume across specialties, locations, and payer mixes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
        <path d="M3 3v18h18" strokeLinecap="round" />
        <path d="M7 16l4-4 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Automation-Native by Design",
    description: "Intelligent workflows with electronic claim scrubbing, ERA processing, and payer portal automation reduce manual effort.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Denial Intelligence, Not Just Follow-Up",
    description: "Root-cause driven denial prevention and recovery workflows that continuously improve clean claim rates.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const rightFeatures = [
  {
    title: "Performance Intelligence Over Static Reports",
    description: "Real-time KPI dashboards with A/R velocity, denial trends, and collection performance for leadership teams.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinejoin="round" />
        <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Technology-Agnostic Delivery Model",
    description: "Integrates with AdvancedMD, eClinicalWorks, athenahealth, NextGen, and 50+ other PM and EHR platforms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Performance That Sets Us Apart",
    description: "98%+ clean-claim throughput, sub-30 A/R cycles, low single-digit denial rates, and sustained double-digit revenue lift.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function WhatMakesDifferent() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">
            What Makes Us Different
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            What Makes AspireMedX Different
          </h2>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_280px_1fr]">
          {/* Left features */}
          <div className="space-y-8">
            {leftFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="group flex items-start gap-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] p-5 transition-all hover:border-[var(--color-teal)]/40 hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-teal-tint)] text-[var(--color-teal)]">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">{f.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{f.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Center visual */}
          <Reveal className="flex justify-center" delay={150}>
            <div className="relative">
              <div
                className="flex h-64 w-64 items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, #0b1f33 0%, #173b57 60%, #0b8f87 100%)",
                  boxShadow: "0 0 0 16px rgba(11,143,135,0.08), 0 0 0 32px rgba(11,143,135,0.04)",
                }}
              >
                {/* Orbiting ring */}
                <svg viewBox="0 0 200 200" className="absolute h-full w-full animate-[spin_20s_linear_infinite]" aria-hidden>
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#0b8f87" strokeWidth="1" strokeDasharray="8 12" opacity="0.4" />
                </svg>
                <div className="text-center">
                  <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white">98%</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#20c4d6]">Clean Claim Rate</p>
                  <div className="mx-auto mt-3 h-px w-12 bg-[#20c4d6]/40" />
                  <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">{"<30"}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#20c4d6]">A/R Days</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right features */}
          <div className="space-y-8">
            {rightFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="group flex items-start gap-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] p-5 transition-all hover:border-[var(--color-teal)]/40 hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-teal-tint)] text-[var(--color-teal)]">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">{f.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{f.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-navy)] shadow-sm transition-all hover:border-[var(--color-navy)] hover:shadow-md"
          >
            Explore More <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
