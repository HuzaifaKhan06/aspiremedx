"use client";

import { CheckIcon, CrossIcon } from "./icons";

// Full side-by-side feature matrix. Scrolls horizontally inside its own
// container on narrow screens so the page itself never scrolls sideways.
export default function CompareTable({ plans, groups, onSelect }) {
  return (
    <section id="compare" className="scroll-mt-28 border-y border-[var(--color-line)] bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">Compare Plans</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            Exactly what you get — and what you don&apos;t
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            No fine print. Every service in every plan, side by side.
          </p>
        </div>

        <div className="relative mt-12 overflow-x-auto rounded-2xl border border-[var(--color-line)]">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <caption className="sr-only">Plan feature comparison</caption>
            <thead>
              <tr className="bg-[var(--color-bg)]">
                <th scope="col" className="w-[34%] p-5 text-left align-bottom">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Features</span>
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={`p-5 text-center align-bottom ${plan.featured ? "bg-[var(--color-teal-tint)]" : ""}`}
                  >
                    {plan.featured && (
                      <span className="mb-2 inline-block rounded-full bg-[var(--color-teal)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {plan.badge}
                      </span>
                    )}
                    <span className="block font-[family-name:var(--font-display)] text-base font-extrabold text-[var(--color-navy)]">
                      {plan.name}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-[var(--color-muted)]">
                      {plan.rate} {plan.rateNote.replace("of monthly ", "of ")}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <GroupRows key={group.group} group={group} plans={plans} />
              ))}
              <tr>
                <td className="p-5" />
                {plans.map((plan) => (
                  <td key={plan.id} className={`p-5 text-center ${plan.featured ? "bg-[var(--color-teal-tint)]" : ""}`}>
                    <button
                      type="button"
                      onClick={() => onSelect(plan)}
                      className={`w-full rounded-lg px-4 py-2.5 text-xs font-bold transition-all ${
                        plan.featured
                          ? "text-white hover:brightness-110"
                          : "border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white"
                      }`}
                      style={plan.featured ? { background: "linear-gradient(135deg, #0b8f87, #20c4d6)" } : undefined}
                    >
                      Choose {plan.name}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function GroupRows({ group, plans }) {
  return (
    <>
      <tr>
        <th
          scope="colgroup"
          colSpan={plans.length + 1}
          className="border-t border-[var(--color-line)] bg-white px-5 pb-2 pt-6 text-left font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--color-teal)]"
        >
          {group.group}
        </th>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.label} className="border-t border-[var(--color-line)]/70 transition-colors hover:bg-[var(--color-bg)]/60">
          <th scope="row" className="px-5 py-3.5 text-left font-medium text-[var(--color-ink)]">
            {row.label}
          </th>
          {plans.map((plan) => (
            <td key={plan.id} className={`px-5 py-3.5 text-center ${plan.featured ? "bg-[var(--color-teal-tint)]/70" : ""}`}>
              <Cell value={row[plan.id]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function Cell({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-teal)] text-white">
        <CheckIcon className="h-3.5 w-3.5" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-muted)]/50">
        <CrossIcon className="h-3 w-3" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className="text-xs font-semibold text-[var(--color-navy)]">{value}</span>;
}
