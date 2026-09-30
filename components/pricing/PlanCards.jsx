"use client";

import { CheckIcon, CrossIcon } from "./icons";

// Three compact plan cards sized to sit side by side in a single viewport.
// Each shows its curated highlights (including what's not included) and a
// "Choose" button pinned to the bottom so buttons line up across cards.
export default function PlanCards({ plans, onSelect, onBuildCustom }) {
  return (
    <div>
      <div className="grid items-stretch gap-6 md:grid-cols-3 md:gap-5">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={() => onSelect(plan)} />
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-[var(--color-muted)] sm:flex-row sm:gap-4">
        <a href="#compare" className="font-semibold text-[var(--color-navy)] hover:text-[var(--color-teal)]">
          Compare every feature ↓
        </a>
        <span className="hidden text-[var(--color-line)] sm:inline" aria-hidden>|</span>
        <span>
          Need a different mix?{" "}
          <button type="button" onClick={onBuildCustom} className="font-semibold text-[var(--color-teal)] hover:text-[var(--color-navy)]">
            Build your own plan →
          </button>
        </span>
      </div>
    </div>
  );
}

function PlanCard({ plan, onSelect }) {
  const dark = plan.featured;

  return (
    <article
      className={`relative flex flex-col rounded-2xl px-6 pb-6 pt-5 transition-all duration-300 ${
        dark
          ? "text-white shadow-[0_30px_70px_-25px_rgba(11,143,135,0.6)] ring-1 ring-[#20c4d6]/40 md:-my-3 md:pb-9 md:pt-8"
          : "border border-[var(--color-line)] bg-white shadow-[0_20px_50px_-30px_rgba(11,31,51,0.35)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(11,31,51,0.45)]"
      }`}
      style={dark ? { background: "linear-gradient(160deg, #0b1f33 0%, #173b57 55%, #0b2a22 100%)" } : undefined}
    >
      {dark && (
        <>
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-25 blur-3xl" style={{ background: "#20c4d6" }} />
          </div>
          <span
            className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
          >
            ★ {plan.badge}
          </span>
        </>
      )}

      <div className="relative flex items-center justify-between gap-3">
        <h3 className={`font-[family-name:var(--font-display)] text-lg font-extrabold ${dark ? "text-white" : "text-[var(--color-navy)]"}`}>
          {plan.name}
        </h3>
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            dark ? "bg-white/10 text-[#20c4d6]" : "bg-[var(--color-teal-tint)] text-[var(--color-teal)]"
          }`}
        >
          {plan.idealFor}
        </span>
      </div>
      <p className={`relative mt-1.5 text-[13px] leading-snug ${dark ? "text-white/60" : "text-[var(--color-muted)]"}`}>
        {plan.tagline}
      </p>

      <div className="relative mt-4 flex items-baseline gap-1.5">
        <span className={`font-[family-name:var(--font-display)] text-[40px] font-extrabold leading-none tracking-tight ${dark ? "text-white" : "text-[var(--color-navy)]"}`}>
          {plan.rate}
        </span>
        <span className={`text-xs ${dark ? "text-white/60" : "text-[var(--color-muted)]"}`}>{plan.rateNote}</span>
      </div>
      <p className={`relative mt-1.5 text-[11px] ${dark ? "text-white/40" : "text-[var(--color-muted)]/80"}`}>{plan.minimum}</p>

      <ul className={`relative mt-4 flex-1 space-y-2 border-t pt-4 ${dark ? "border-white/10" : "border-[var(--color-line)]"}`}>
        {plan.highlights.map((h) => (
          <li key={h.text} className="flex gap-2.5 text-[13px] leading-snug">
            {h.included ? (
              <span
                className={`mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                  dark ? "bg-[#20c4d6]/15 text-[#20c4d6]" : "bg-[var(--color-teal-tint)] text-[var(--color-teal)]"
                }`}
              >
                <CheckIcon className="h-2.5 w-2.5" />
              </span>
            ) : (
              <span className={`mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${dark ? "bg-white/5 text-white/30" : "bg-[var(--color-bg)] text-[var(--color-muted)]/50"}`}>
                <CrossIcon className="h-2 w-2" />
              </span>
            )}
            <span
              className={
                h.included
                  ? dark ? "text-white/85" : "text-[var(--color-ink)]"
                  : `line-through decoration-1 ${dark ? "text-white/35" : "text-[var(--color-muted)]/60"}`
              }
            >
              {h.text}
              {!h.included && <span className="sr-only"> (not included)</span>}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        className={`relative mt-5 w-full rounded-lg py-3 text-sm font-bold transition-all ${
          dark
            ? "text-white shadow-[0_8px_24px_-8px_rgba(32,196,214,0.7)] hover:brightness-110"
            : "border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white"
        }`}
        style={dark ? { background: "linear-gradient(135deg, #0b8f87, #20c4d6)" } : undefined}
      >
        Choose {plan.name} →
      </button>
    </article>
  );
}
