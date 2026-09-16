import Reveal from "@/components/Reveal";

const pillars = [
  {
    title: "Our Mission",
    body: "To eliminate the administrative burden that slows healthcare organizations down — so providers can focus on delivering exceptional care while we ensure every dollar they've earned gets paid.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <circle cx="24" cy="24" r="18" stroke="#20c4d6" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="10" stroke="#0b8f87" strokeWidth="1" />
        <circle cx="24" cy="24" r="3" fill="#20c4d6" />
        <path d="M24 6v4M24 38v4M6 24h4M38 24h4" stroke="#20c4d6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Our Vision",
    body: "A healthcare revenue ecosystem where billing complexity, credentialing gaps, and denial backlogs are solved before they reach the provider — through expertise, automation, and accountability.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <path d="M6 24c0-9.941 8.059-18 18-18s18 8.059 18 18-8.059 18-18 18S6 33.941 6 24z" stroke="#20c4d6" strokeWidth="1.5" />
        <path d="M16 24c0 4.418 3.582 8 8 8s8-3.582 8-8" stroke="#0b8f87" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 16v4M18 18l2.83 2.83M30 18l-2.83 2.83" stroke="#20c4d6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Our Approach",
    body: "We combine specialized billing and credentialing expertise with a technology-agnostic model — working inside your existing systems, not replacing them — to deliver measurable, sustainable revenue improvements.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <path d="M8 36L20 22l8 8 12-16" stroke="#20c4d6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="14" r="3" fill="#20c4d6" />
        <path d="M6 40h36" stroke="#0b8f87" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function AboutMission() {
  return (
    <section className="bg-[var(--color-bg)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Story block */}
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">
              Who We Are
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
              Built by Revenue Cycle Experts, for Healthcare
            </h2>
            <p className="mt-5 text-[var(--color-muted)] leading-relaxed">
              AspireMedX was founded by practitioners who had spent years inside the revenue cycle — navigating denials, credentialing backlogs, and payer complexity on behalf of medical practices. They built AspireMedX to do the same work better: with more specialization, more accountability, and more transparency.
            </p>
            <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
              Today, AspireMedX serves physician groups, multi-specialty health systems, diagnostic networks, and enterprise healthcare organizations — bringing the same expertise to organizations of every size, from solo providers to 100-physician groups.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["HIPAA-Aligned", "Audit-Ready", "BAA Executed", "SLA-Tracked"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-[var(--color-teal)]/20 bg-[var(--color-teal-tint)] px-4 py-1.5 text-xs font-semibold text-[var(--color-teal)]"
                >
                  {b}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Visual: stacked cards */}
          <Reveal delay={120}>
            <div className="relative flex flex-col gap-4">
              {[
                { label: "Founded", value: "2020", sub: "Purpose-built for healthcare RCM" },
                { label: "Specialties Served", value: "20+", sub: "From primary care to oncology & ASC" },
                { label: "Payer Relationships", value: "120+", sub: "Medicare, Medicaid & commercial" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-5 rounded-xl border border-[var(--color-line)] bg-white p-5 shadow-sm transition-all hover:border-[var(--color-teal)]/30 hover:shadow-md"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "linear-gradient(135deg, #0b1f33, #0b8f87)" }}
                  >
                    <span className="font-[family-name:var(--font-display)] text-lg font-extrabold text-white">
                      {item.value}
                    </span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">{item.label}</p>
                    <p className="text-sm text-[var(--color-muted)]">{item.sub}</p>
                  </div>
                </div>
              ))}

              {/* Decorative dot grid */}
              <svg className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 opacity-10" aria-hidden>
                <defs>
                  <pattern id="dot-grid" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="#0b8f87" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-grid)" />
              </svg>
            </div>
          </Reveal>
        </div>

        {/* Three pillars */}
        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div
                className="relative overflow-hidden rounded-2xl p-7"
                style={{ background: "linear-gradient(160deg, #0b1f33, #0b2a22)" }}
              >
                {/* Corner hex accent */}
                <svg className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 opacity-10" aria-hidden>
                  <polygon points="40,2 76,22 76,62 40,82 4,62 4,22" fill="none" stroke="#20c4d6" strokeWidth="1" />
                </svg>
                <div className="mb-5">{p.icon}</div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
