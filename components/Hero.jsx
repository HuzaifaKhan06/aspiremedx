import { hero, heroStats, cta } from "@/lib/content";
import Counter from "./Counter";

export default function Hero() {
  const bars = [42, 55, 48, 63, 58, 72, 68, 81];
  const maxBar = Math.max(...bars);

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* Right-panel background accent */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[46%] bg-[var(--color-bg)] md:block"
        style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
        aria-hidden
      />

      {/* Subtle dot-grid overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--color-navy)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
          {/* ── Left: Copy ── */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-teal)]/25 bg-[var(--color-teal-tint)] px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]" />
              Medical Billing · Credentialing · RCM
            </span>

            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-navy)] sm:text-5xl lg:text-[3.5rem]">
              Maximize Revenue.
              <br />
              <span className="text-[var(--color-teal)]">Reduce Denials.</span>
              <br />
              Stay Fully Credentialed.
            </h1>

            <p className="mt-5 max-w-[520px] text-[1.05rem] leading-relaxed text-[var(--color-muted)]">
              {hero.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="rounded-lg bg-[var(--color-navy)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_-2px_rgba(11,31,51,0.35)] transition-all hover:bg-[var(--color-navy-soft)] hover:shadow-[0_6px_28px_-2px_rgba(11,31,51,0.45)]"
              >
                {cta.primary}
              </a>
              <a
                href="#contact"
                className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:text-[var(--color-teal)]"
              >
                {cta.secondary}
                <span aria-hidden>→</span>
              </a>
            </div>

            {/* Stats row */}
            <dl className="mt-10 flex flex-wrap gap-0 border-t border-[var(--color-line)] pt-8">
              {heroStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`pr-8 ${i > 0 ? "border-l border-[var(--color-line)] pl-8" : ""}`}
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-navy)]">
                    <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} onMount />
                  </dd>
                  <dd className="mt-1 text-xs leading-snug text-[var(--color-muted)]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Right: Dashboard card ── */}
          <div className="flex justify-center md:justify-end">
            <RcmDashboardCard bars={bars} maxBar={maxBar} />
          </div>
        </div>
      </div>
    </section>
  );
}

function RcmDashboardCard({ bars, maxBar }) {
  return (
    <div className="w-full max-w-[340px] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_32px_80px_-20px_rgba(11,31,51,0.45)]">
      {/* Header */}
      <div className="flex items-center justify-between bg-[var(--color-navy)] px-5 py-4">
        <span className="font-[family-name:var(--font-display)] text-sm font-bold text-white">
          Revenue Cycle Overview
        </span>
        <span className="flex items-center gap-1.5">
          <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--color-cyan)]" />
          <span className="font-mono text-[10px] uppercase tracking-wide text-white/60">Live</span>
        </span>
      </div>

      <div className="p-5">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: "Clean claim rate", value: 96, suffix: "%" },
            { label: "Days in A/R", value: 24, suffix: "" },
            { label: "Denial rate", value: 3, suffix: "%" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-[var(--color-bg)] p-3 text-center">
              <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--color-navy)]">
                <Counter value={kpi.value} suffix={kpi.suffix} onMount duration={1400} />
              </p>
              <p className="mt-0.5 text-[10px] leading-tight text-[var(--color-muted)]">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
            Collections trend
          </p>
          <div className="mt-2.5 flex h-16 items-end gap-1.5">
            {bars.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-[var(--color-navy)] to-[var(--color-cyan)]"
                style={{ height: `${(v / maxBar) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Monthly total */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[var(--color-teal-tint)] px-4 py-3.5">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--color-teal)]">
              This month
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-navy)]">
              $1.86M collected
            </p>
          </div>
          <span className="flex items-center gap-0.5 rounded-lg bg-white px-2.5 py-1.5 font-mono text-xs font-bold text-[var(--color-teal)] shadow-sm">
            ↑ 12.4%
          </span>
        </div>
      </div>
    </div>
  );
}
