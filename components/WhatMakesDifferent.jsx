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

function FeatureCard({ feature, align = "left" }) {
  return (
    <div className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-teal)]/40 hover:bg-white hover:shadow-[0_20px_40px_-22px_rgba(11,143,135,0.5)]">
      {/* Accent bar on the side facing the hub */}
      <span
        aria-hidden
        className={`absolute top-0 h-full w-1 origin-top scale-y-0 bg-gradient-to-b from-[var(--color-teal)] to-[var(--color-cyan)] transition-transform duration-500 group-hover:scale-y-100 ${
          align === "left" ? "right-0" : "left-0"
        }`}
      />
      <span aria-hidden className="card-sheen" />

      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-teal-tint)] text-[var(--color-teal)] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[var(--color-teal)] group-hover:to-[var(--color-cyan)] group-hover:text-white group-hover:shadow-[0_8px_18px_-6px_rgba(11,143,135,0.6)]">
        {feature.icon}
      </div>
      <div className="relative">
        <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)] transition-colors group-hover:text-[var(--color-teal)]">
          {feature.title}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{feature.description}</p>
      </div>
    </div>
  );
}

export default function WhatMakesDifferent() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">
            What Makes Us Different
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-3xl">
            What Makes AspireMedX Different
          </h2>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_280px_1fr]">
          {/* Left features */}
          <div className="space-y-8">
            {leftFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <FeatureCard feature={f} align="left" />
              </Reveal>
            ))}
          </div>

          {/* Center visual — animated hub */}
          <Reveal className="flex justify-center" delay={150}>
            <div className="hub-float group/hub relative">
              {/* Expanding ripple waves */}
              {[0, 1.2, 2.4].map((delay) => (
                <span
                  key={delay}
                  aria-hidden
                  className="hub-ripple absolute inset-0 rounded-full border-2 border-[var(--color-teal)]/40"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}

              <div
                className="hub-glow relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full transition-transform duration-500 group-hover/hub:scale-105"
                style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 60%, #0b8f87 100%)" }}
              >
                {/* Radar sweep */}
                <span
                  aria-hidden
                  className="absolute inset-0 animate-[spin_5s_linear_infinite] rounded-full"
                  style={{ background: "conic-gradient(from 0deg, transparent 0deg 280deg, rgba(32,196,214,0.28) 360deg)" }}
                />
                {/* Orbiting rings */}
                <svg viewBox="0 0 200 200" className="absolute h-full w-full animate-[spin_20s_linear_infinite]" aria-hidden>
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#0b8f87" strokeWidth="1" strokeDasharray="8 12" opacity="0.5" />
                </svg>
                <svg viewBox="0 0 200 200" className="absolute h-full w-full animate-[spin_14s_linear_infinite_reverse]" aria-hidden>
                  <circle cx="100" cy="100" r="74" fill="none" stroke="#20c4d6" strokeWidth="1" strokeDasharray="2 10" opacity="0.45" />
                </svg>
                {/* Orbiting satellites */}
                <span aria-hidden className="absolute inset-[6%] animate-[spin_9s_linear_infinite]">
                  <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#20c4d6] shadow-[0_0_12px_3px_rgba(32,196,214,0.7)]" />
                </span>
                <span aria-hidden className="absolute inset-[13%] animate-[spin_13s_linear_infinite_reverse]">
                  <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#5eead4] shadow-[0_0_10px_2px_rgba(94,234,212,0.6)]" />
                </span>

                <div className="relative z-10 text-center">
                  <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white">98%</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#20c4d6]">Clean Claim Rate</p>
                  <div className="mx-auto mt-3 h-px w-12 bg-[#20c4d6]/40 transition-all duration-500 group-hover/hub:w-20 group-hover/hub:bg-[#20c4d6]" />
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
                <FeatureCard feature={f} align="right" />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-navy)] shadow-sm transition-all hover:border-[var(--color-navy)] hover:shadow-md"
          >
            Explore More <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
