import Counter from "./Counter";
import Reveal from "./Reveal";
import AnimatedSectionBg from "./AnimatedSectionBg";

const stats = [
  { static: "$1.5B+", label: "Revenue Volume Managed Annually", sub: "Technology-enabled revenue cycle management across specialties." },
  { value: 500, prefix: "$", suffix: "M+", label: "Net Collections Reconciled Annually", sub: "AI-assisted automation and audit-ready payment posting." },
  { value: 45, suffix: "K+", label: "Claims Processed Every Month", sub: "High-volume claim lifecycle management with expert oversight." },
  { value: 120, suffix: "+", label: "Payer Relationships & Networks", sub: "Supporting commercial, Medicare, and Medicaid payers nationwide." },
  { value: 4600, suffix: "+", label: "Denials Re-engineered Monthly", sub: "Advanced denial intelligence delivering accelerated recoveries." },
  { value: 92, prefix: "$", suffix: "M+", label: "Cash Recovered Through Denials Annually", sub: "Direct uplift from overturned denials and corrected documentation." },
  { static: "12–18%", label: "Revenue Lift Delivered Across Practices", sub: "Measurable financial improvement powered by automation & analytics." },
  { static: "< 30", suffix: " Days", label: "A/R Days Achieved Consistently", sub: "Predictable, faster reimbursement cycles." },
  { value: 98, suffix: "%", label: "Clean Claim Rate (First-Pass)", sub: "Ensuring faster payments and fewer denials." },
  { value: 50, suffix: "+", label: "PM Software & Clearinghouse Integrations", sub: "Connected, automated RCM ecosystem across every platform." },
  { value: 100, suffix: "%", label: "HIPAA Compliance Coverage", sub: "BAAs executed with every client, every engagement." },
  { static: "50–60%", label: "Reduction in Manual Workflows", sub: "Automation-driven efficiency across the entire revenue cycle." },
];

export default function WhoWeAre() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)] py-20">
      {/* Background photo with a light fade so the heading and cards stay readable */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <AnimatedSectionBg src="/heroes/HomePage-Numbers-Score-Bg.webp" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(243,248,250,0.82) 0%, rgba(243,248,250,0.6) 50%, rgba(243,248,250,0.82) 100%)" }}
        />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--color-bg)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">
            Who We Are
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-3xl">
            Numbers That Define Our Impact
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 40} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-xl border border-[var(--color-line)] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-teal)]/40 hover:shadow-[0_22px_45px_-22px_rgba(11,143,135,0.5)]">
                {/* Top accent bar grows in on hover */}
                <span aria-hidden className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[var(--color-teal)] to-[var(--color-cyan)] transition-transform duration-500 group-hover:scale-x-100" />
                {/* Light sweep */}
                <span aria-hidden className="card-sheen" />
                {/* Corner ring blooms on hover */}
                <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 scale-50 rounded-full border-[12px] border-[var(--color-teal)]/10 opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100" />
                {/* Live dot */}
                <span aria-hidden className="pulse-dot absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]/50 transition-colors group-hover:bg-[var(--color-cyan)]" />

                <p className="relative origin-left font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-navy)] transition-all duration-300 group-hover:scale-105 group-hover:text-[var(--color-teal)]">
                  {stat.static ? (
                    stat.static + (stat.suffix || "")
                  ) : (
                    <>
                      {stat.prefix || ""}
                      <Counter value={stat.value} suffix="" onMount={false} duration={1600} />
                      {stat.suffix}
                    </>
                  )}
                </p>
                <p className="relative mt-2 text-sm font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-navy)]">{stat.label}</p>
                <span aria-hidden className="relative mt-2 block h-px w-8 bg-[var(--color-teal)]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[var(--color-teal)]" />
                <p className="relative mt-2 text-xs leading-relaxed text-[var(--color-muted)]">{stat.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
