import { heroStats } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[var(--color-bg)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-8 md:grid-cols-[1.1fr_0.9fr] md:pb-12 md:pt-10">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-3 py-1 font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
            Revenue cycle management
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--color-navy)] sm:text-4xl md:text-5xl">
            Get paid for the care
            <br />
            <span className="italic text-[var(--color-teal)]">you already deliver.</span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            AspireMedX runs medical billing, coding, and denial management for
            healthcare practices — so claims go out clean, follow-up never
            stalls, and revenue stops leaking at the edges.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-md bg-[var(--color-amber)] px-6 py-3 text-sm font-semibold text-[var(--color-navy-dark)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--color-amber-dark)]"
            >
              Request a Consultation
            </a>
            <a
              href="#process"
              className="text-sm font-medium text-[var(--color-navy)] underline underline-offset-4 hover:text-[var(--color-teal)]"
            >
              See how the cycle works →
            </a>
          </div>

          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--color-line)] pt-5">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-2xl font-medium text-[var(--color-navy)] sm:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-[var(--color-muted)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden items-center justify-center md:flex">
          <HeroClaimCard />
        </div>
      </div>
    </section>
  );
}

function HeroClaimCard() {
  const rows = [
    { label: "Claim #A-10234", status: "Submitted", tone: "text-[var(--color-teal)]" },
    { label: "Claim #A-10229", status: "Paid", tone: "text-[var(--color-navy)]" },
    { label: "Claim #A-10218", status: "In review", tone: "text-[var(--color-amber-dark)]" },
  ];

  return (
    <div className="w-full max-w-sm rounded-2xl border border-[var(--color-line)] bg-white p-5 shadow-[0_20px_60px_-25px_rgba(11,61,92,0.35)]">
      <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-3">
        <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-navy)]">
          Live claim status
        </span>
        <span className="h-2 w-2 rounded-full bg-[var(--color-teal)]" />
      </div>
      <ul className="mt-3 space-y-3">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--color-muted)]">{row.label}</span>
            <span className={`font-medium ${row.tone}`}>{row.status}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-lg bg-[var(--color-teal-light)] p-4">
        <p className="font-mono text-xs text-[var(--color-teal)]">This month</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
          $412,860 collected
        </p>
      </div>
    </div>
  );
}
