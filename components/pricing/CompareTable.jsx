"use client";

import { useMemo, useState } from "react";
import { CheckIcon } from "./icons";

// Premium side-by-side feature matrix on a dark navy stage. The featured plan
// is a glowing column, the plan header row sticks while scrolling on desktop,
// and "Show only differences" hides rows that are identical across plans.
// Below lg the matrix scrolls horizontally inside its own container so the
// page itself never scrolls sideways.

const GROUP_ICONS = {
  "Billing & Claims": (
    <>
      <path d="M6 2h9l4 4v16l-2.5-1.5L14 22l-2.5-1.5L9 22l-3-1.5z" />
      <path d="M12 9v8M14 10.5h-3a1.25 1.25 0 0 0 0 2.5h2a1.25 1.25 0 0 1 0 2.5h-3" />
    </>
  ),
  "Credentialing & Enrollment": (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="9" r="2.5" />
      <path d="M8 15.5a4 4 0 0 1 8 0" />
    </>
  ),
  "Revenue Optimization": (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </>
  ),
  "Reporting & Support": (
    <>
      <path d="M3 3v18h18" />
      <path d="M8 17v-5M12 17V8M16 17v-7" />
    </>
  ),
};

const PLAN_ICONS = {
  essential: <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" />,
  professional: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  premium: <path d="m2 8 5 4 5-8 5 8 5-4-2 12H4z" />,
};

const COLS = "grid-cols-[minmax(220px,1.5fr)_repeat(3,minmax(150px,1fr))]";

const isSameAcrossPlans = (row, plans) => plans.every((p) => JSON.stringify(row[p.id]) === JSON.stringify(row[plans[0].id]));

export default function CompareTable({ plans, groups, onSelect }) {
  const [diffOnly, setDiffOnly] = useState(false);

  const visibleGroups = useMemo(
    () =>
      groups
        .map((g) => ({ ...g, rows: diffOnly ? g.rows.filter((r) => !isSameAcrossPlans(r, plans)) : g.rows }))
        .filter((g) => g.rows.length),
    [groups, plans, diffOnly]
  );

  const totalRows = groups.reduce((n, g) => n + g.rows.length, 0);
  const includedCount = (plan) =>
    groups.reduce((n, g) => n + g.rows.filter((r) => r[plan.id] !== false).length, 0);

  return (
    <section
      id="compare"
      className="relative scroll-mt-24 py-14"
      style={{ background: "linear-gradient(160deg, #0b1f33 0%, #10293f 45%, #0b2a22 100%)" }}
    >
      {/* Backdrop */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="compare-grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0v44" fill="none" stroke="#20c4d6" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#compare-grid)" />
      </svg>
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[60%] -translate-x-1/2 rounded-full bg-[#20c4d6]/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#20c4d6]/30 bg-[#20c4d6]/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#20c4d6]">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#20c4d6]" />
            Compare Plans
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
            Exactly what you get —{" "}
            <span className="bg-gradient-to-r from-[#20c4d6] via-[#5eead4] to-[#20c4d6] bg-clip-text text-transparent">
              and what you don&apos;t
            </span>
          </h2>
          <p className="mt-3 text-sm text-white/55">No fine print. Every service in every plan, side by side.</p>
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-white/45">
            <span className="font-semibold text-white/80">{totalRows}</span> features across{" "}
            <span className="font-semibold text-white/80">{groups.length}</span> categories
          </p>
          <button
            type="button"
            role="switch"
            aria-checked={diffOnly}
            onClick={() => setDiffOnly((v) => !v)}
            className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-white/75 transition-colors hover:border-[#20c4d6]/40 hover:text-white"
          >
            <span className={`relative h-5 w-9 rounded-full transition-colors ${diffOnly ? "bg-[#20c4d6]" : "bg-white/15"}`}>
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${diffOnly ? "left-[18px]" : "left-0.5"}`}
              />
            </span>
            Show only differences
          </button>
        </div>

        {/* Matrix */}
        <div className="mt-4 max-lg:-mx-6 max-lg:overflow-x-auto max-lg:px-6">
          <div className="min-w-[760px]" role="table" aria-label="Plan feature comparison">
            {/* Sticky plan header */}
            <div role="rowgroup" className="sticky top-[84px] z-20">
              <div role="row" className={`grid ${COLS} gap-x-3`}>
                <div role="columnheader" className="flex items-end rounded-tl-2xl bg-[#0d2238]/95 px-5 pb-4 backdrop-blur">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40">Features</span>
                </div>
                {plans.map((plan) => (
                  <div
                    role="columnheader"
                    key={plan.id}
                    className={`relative rounded-t-2xl px-4 pb-4 pt-5 text-center backdrop-blur ${
                      plan.featured
                        ? "border-x border-t border-[#20c4d6]/50 bg-gradient-to-b from-[#0f4a55] to-[#0d3440]/95 shadow-[0_-10px_40px_-10px_rgba(32,196,214,0.5)]"
                        : "border-x border-t border-white/10 bg-[#0d2238]/95"
                    }`}
                  >
                    {plan.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#0b8f87] to-[#20c4d6] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_-4px_rgba(32,196,214,0.8)]">
                        ★ {plan.badge || "Most popular"}
                      </span>
                    )}
                    <span
                      className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl ${
                        plan.featured ? "bg-gradient-to-br from-[#0b8f87] to-[#20c4d6] text-white" : "bg-white/10 text-[#20c4d6]"
                      }`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {PLAN_ICONS[plan.id] ?? PLAN_ICONS.essential}
                      </svg>
                    </span>
                    <span className="mt-2 block font-[family-name:var(--font-display)] text-base font-extrabold text-white">{plan.name}</span>
                    <span className="mt-1 block font-[family-name:var(--font-display)] text-2xl font-extrabold leading-none">
                      <span className={plan.featured ? "bg-gradient-to-r from-[#5eead4] to-[#20c4d6] bg-clip-text text-transparent" : "text-white"}>
                        {plan.rate}
                      </span>
                    </span>
                    <span className="mt-1 block text-[10px] text-white/45">{plan.rateNote}</span>
                    <span className="mt-2 inline-block rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/60">
                      {includedCount(plan)}/{totalRows} features
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div role="rowgroup">
              {visibleGroups.map((group) => (
                <div key={group.group}>
                  {/* Group header */}
                  <div role="row" className={`grid ${COLS} gap-x-3`}>
                    <div role="rowheader" className="flex items-center gap-2.5 bg-white/[0.03] px-5 pb-2.5 pt-5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#20c4d6]/15 text-[#20c4d6]">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          {GROUP_ICONS[group.group] ?? GROUP_ICONS["Billing & Claims"]}
                        </svg>
                      </span>
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#20c4d6]">{group.group}</span>
                    </div>
                    {plans.map((plan) => (
                      <div key={plan.id} className={columnCls(plan)} />
                    ))}
                  </div>

                  {group.rows.map((row) => (
                    <div role="row" key={row.label} className={`group/row grid ${COLS} gap-x-3`}>
                      <div
                        role="rowheader"
                        className="flex items-center border-t border-white/[0.06] bg-white/[0.03] px-5 py-3 text-[13px] text-white/75 transition-colors group-hover/row:bg-white/[0.07] group-hover/row:text-white"
                      >
                        {row.label}
                      </div>
                      {plans.map((plan) => (
                        <div
                          role="cell"
                          key={plan.id}
                          className={`flex items-center justify-center border-t px-3 py-3 text-center transition-colors ${columnCls(plan)} ${
                            plan.featured ? "border-t-[#20c4d6]/10 group-hover/row:bg-[#20c4d6]/[0.14]" : "border-t-white/[0.06] group-hover/row:bg-white/[0.07]"
                          }`}
                        >
                          <Cell value={row[plan.id]} featured={plan.featured} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}

              {/* Footer: choose buttons */}
              <div role="row" className={`grid ${COLS} gap-x-3`}>
                <div className="rounded-bl-2xl bg-white/[0.03] px-5 py-5">
                  <p className="text-[11px] leading-relaxed text-white/40">All plans include a signed BAA and no long-term contract.</p>
                </div>
                {plans.map((plan) => (
                  <div key={plan.id} className={`rounded-b-2xl border-b px-4 py-5 ${columnCls(plan)} ${plan.featured ? "border-b-[#20c4d6]/50" : "border-b-white/10"}`}>
                    <button
                      type="button"
                      onClick={() => onSelect(plan)}
                      className={`w-full rounded-lg px-3 py-2.5 text-xs font-bold transition-all ${
                        plan.featured
                          ? "bg-gradient-to-r from-[#0b8f87] to-[#20c4d6] text-white shadow-[0_8px_24px_-8px_rgba(32,196,214,0.8)] hover:brightness-110"
                          : "border border-white/20 text-white hover:border-[#20c4d6] hover:bg-[#20c4d6] hover:text-[#0b1f33]"
                      }`}
                    >
                      Choose {plan.name} →
                    </button>
                    <p className="mt-2 text-center text-[10px] text-white/40">{plan.minimum}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Continuous column "pillar" — the featured plan glows, others are subtle glass
function columnCls(plan) {
  return plan.featured
    ? "border-x border-[#20c4d6]/50 bg-[#20c4d6]/[0.08]"
    : "border-x border-white/10 bg-white/[0.02]";
}

function Cell({ value, featured }) {
  if (value === true) {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-white ${
          featured ? "bg-gradient-to-br from-[#0b8f87] to-[#20c4d6] shadow-[0_0_12px_rgba(32,196,214,0.6)]" : "bg-[#0b8f87]/80"
        }`}
      >
        <CheckIcon className="h-3.5 w-3.5" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-block h-0.5 w-4 rounded-full bg-white/15">
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold leading-tight ${
        featured ? "bg-[#20c4d6]/20 text-[#7ee8f2]" : "bg-white/[0.07] text-white/80"
      }`}
    >
      {value}
    </span>
  );
}
