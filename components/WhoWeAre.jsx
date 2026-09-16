import Counter from "./Counter";
import Reveal from "./Reveal";

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
    <section className="bg-[var(--color-bg)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">
            Who We Are
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            Numbers That Define Our Impact
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 40}>
              <div className="group rounded-xl border border-[var(--color-line)] bg-white p-6 shadow-sm transition-all duration-200 hover:border-[var(--color-teal)]/40 hover:shadow-md">
                <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-navy)]">
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
                <p className="mt-2 text-sm font-semibold text-[var(--color-ink)]">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{stat.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
