import Reveal from "./Reveal";

const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Responsive Support Aligned with U.S. Time Zones",
    description: "Continuous coverage that keeps pace with your practice schedule — no waiting across time zones.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden>
        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: "Zero-Disruption Onboarding",
    description: "Smooth transition with no downtime or workflow interruption — existing cash flow protected from day one.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden>
        <path d="M3 3v18h18" strokeLinecap="round" />
        <path d="M7 16l4-4 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "High Accuracy Across All RCM Functions",
    description: "98%+ clean claims, precise coding, and optimized billing workflows across every specialty and payer.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
      </svg>
    ),
    title: "Specialty-Trained Resources",
    description: "Dedicated experts in credentialing, surgical billing, behavioral health, diagnostics, and multi-specialty revenue cycles.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Automation Reducing Manual Work by 50–60%",
    description: "Intelligent claim scrubbing, ERA processing, and payer portal automation that accelerates the entire revenue cycle.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round" />
      </svg>
    ),
    title: "Proven Revenue Impact — 12–18% Improvement",
    description: "Demonstrated uplift through denial reduction, faster A/R movement, and cleaner claims across client practices.",
  },
];

export default function WhyTrust() {
  return (
    <>
      <section id="why-us" className="bg-[var(--color-bg)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">
              Why Choose Us
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
              Why Practices Trust AspireMedX
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="flex items-start gap-4 rounded-xl border border-[var(--color-line)] bg-white p-6 shadow-sm transition-all duration-200 hover:border-[var(--color-teal)]/40 hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-teal-tint)] text-[var(--color-teal)]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-navy)]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certification banner */}
      <Reveal>
        <div
          className="py-8 text-center"
          style={{ background: "linear-gradient(135deg, #0b1f33, #0b8f87)" }}
        >
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-widest text-white sm:text-2xl">
              Certified. Secure. Trusted.
            </p>
            <p className="mt-2 text-sm text-white/60">
              HIPAA-aligned | SOC 2 compliant | Business Associate Agreements executed with every client
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {["HIPAA Compliant", "BAA Executed", "Audit-Ready", "SLA-Tracked"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}
