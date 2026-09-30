"use client";

import { useMemo, useRef, useState } from "react";
import { customServiceGroups, customBundles, specialities } from "@/lib/content";
import { CheckIcon, ServiceIcon } from "./icons";
import { PRACTICE_SIZES, CLAIM_VOLUMES, CURRENT_SETUPS } from "./options";

const allServices = customServiceGroups.flatMap((g) => g.services.map((s) => ({ ...s, group: g.group })));
const allIds = allServices.map((s) => s.id);

const SPECIALTY_OPTIONS = [
  ...specialities.map((s) => s.title.replace(/ Billing( Services)?$/, "")),
  "Other",
];

const STEPS = [
  { n: 1, title: "Choose services", hint: "Pick what you need" },
  { n: 2, title: "Your practice", hint: "Size & setup" },
  { n: 3, title: "Review & send", hint: "Get your quote" },
];

const EMPTY_DETAILS = { practiceSize: "", claimVolume: "", currentSetup: "", specialty: "" };

// Three-step custom plan configurator: pick services (with one-click
// bundles and category filters) → describe the practice → review and send.
// "Send" opens the shared QuoteModal with the full selection.
export default function CustomBuilder({ plans, onRequest }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(() => new Set());
  const [category, setCategory] = useState("all");
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const topRef = useRef(null);

  const selectedServices = useMemo(() => allServices.filter((s) => selected.has(s.id)), [selected]);
  const count = selectedServices.length;

  // Cheapest preset plan that already covers every selected service
  const coveringPlan = useMemo(() => {
    if (!count) return null;
    return plans.find((p) => selectedServices.every((s) => s.plans.includes(p.id))) || null;
  }, [plans, selectedServices, count]);

  const canContinue = step === 1 ? count > 0 : step === 2 ? !!details.practiceSize : true;

  function goTo(n) {
    if (n === 2 && !count) return;
    if (n === 3 && (!count || !details.practiceSize)) return;
    setStep(n);
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function applyBundle(bundle) {
    setSelected(new Set(bundle.services === "all" ? allIds : bundle.services));
  }

  function setDetail(key, value) {
    setDetails((d) => ({ ...d, [key]: d[key] === value ? "" : value }));
  }

  function primaryAction() {
    if (step < 3) goTo(step + 1);
    else onRequest(selectedServices.map((s) => s.title), details);
  }

  const primaryLabel = step === 1 ? "Continue to practice details" : step === 2 ? "Review my plan" : "Get my custom quote";

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Stepper */}
      <ol className="grid grid-cols-3 gap-2 rounded-2xl border border-[var(--color-line)] bg-white p-2 shadow-[0_20px_50px_-30px_rgba(11,31,51,0.35)]">
        {STEPS.map((s) => {
          const active = step === s.n;
          const done = step > s.n;
          const reachable = s.n === 1 || (s.n === 2 && count > 0) || (s.n === 3 && count > 0 && details.practiceSize);
          return (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => goTo(s.n)}
                disabled={!reachable}
                aria-current={active ? "step" : undefined}
                className={`flex w-full flex-col items-center gap-1.5 rounded-xl px-2 py-2.5 text-center transition-colors sm:flex-row sm:gap-3 sm:px-4 sm:text-left ${
                  active ? "bg-[var(--color-navy)] text-white" : "hover:bg-[var(--color-bg)] disabled:cursor-not-allowed disabled:hover:bg-transparent"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    active
                      ? "bg-white text-[var(--color-navy)]"
                      : done
                      ? "bg-[var(--color-teal)] text-white"
                      : "border border-[var(--color-line)] text-[var(--color-muted)]"
                  }`}
                >
                  {done ? <CheckIcon className="h-3.5 w-3.5" /> : s.n}
                </span>
                <span className="block min-w-0">
                  <span className={`block text-[11px] font-bold leading-tight sm:truncate sm:text-sm ${active ? "text-white" : "text-[var(--color-navy)]"}`}>{s.title}</span>
                  <span className={`hidden truncate text-xs sm:block ${active ? "text-white/60" : "text-[var(--color-muted)]"}`}>{s.hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        {/* Main panel */}
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(11,31,51,0.25)] sm:p-7">
          {step === 1 && (
            <StepServices
              selected={selected}
              category={category}
              setCategory={setCategory}
              toggle={toggle}
              applyBundle={applyBundle}
              clear={() => setSelected(new Set())}
            />
          )}
          {step === 2 && <StepPractice details={details} setDetail={setDetail} setDetails={setDetails} />}
          {step === 3 && (
            <StepReview
              services={selectedServices}
              details={details}
              coveringPlan={coveringPlan}
              onEdit={goTo}
            />
          )}

          {/* Step navigation */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--color-line)] pt-5">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-bg)] hover:text-[var(--color-navy)]"
              >
                ← Back
              </button>
            ) : (
              <span className="text-xs text-[var(--color-muted)]">Step 1 of 3</span>
            )}
            <button
              type="button"
              onClick={primaryAction}
              disabled={!canContinue}
              className="rounded-lg px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(11,143,135,0.7)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
            >
              {primaryLabel} →
            </button>
          </div>
          {!canContinue && (
            <p className="mt-2 text-right text-xs text-[var(--color-muted)]">
              {step === 1 ? "Select at least one service to continue" : "Choose your practice size to continue"}
            </p>
          )}
        </div>

        {/* Summary */}
        <Summary
          step={step}
          services={selectedServices}
          details={details}
          coveringPlan={coveringPlan}
          onRemove={toggle}
          onPrimary={primaryAction}
          primaryLabel={primaryLabel}
          canContinue={canContinue}
        />
      </div>

      {/* Mobile quick bar */}
      {count > 0 && (
        <div className="sticky bottom-4 z-40 mr-16 mt-6 lg:hidden">
          <div className="flex items-center justify-between gap-3 rounded-xl bg-[var(--color-navy)] px-4 py-3 text-white shadow-[0_20px_40px_-15px_rgba(11,31,51,0.6)]">
            <span className="text-sm font-semibold">
              {count} {count === 1 ? "service" : "services"} · Step {step}/3
            </span>
            <button
              type="button"
              onClick={primaryAction}
              disabled={!canContinue}
              className="rounded-lg px-4 py-2 text-xs font-bold text-white disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
            >
              {step === 3 ? "Get quote →" : "Next →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Step 1: services ─── */

function StepServices({ selected, category, setCategory, toggle, applyBundle, clear }) {
  const groups = category === "all" ? customServiceGroups : customServiceGroups.filter((g) => g.group === category);

  return (
    <div>
      <StepHeading
        eyebrow="Step 1"
        title="What should we take off your plate?"
        body="Start from a popular bundle or tap individual services. You can change this anytime."
      />

      {/* Bundles */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {customBundles.map((b) => {
          const ids = b.services === "all" ? allIds : b.services;
          const active = ids.length === selected.size && ids.every((id) => selected.has(id));
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => applyBundle(b)}
              aria-pressed={active}
              className={`rounded-xl border p-3.5 text-left transition-all ${
                active
                  ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-white shadow-[0_12px_30px_-15px_rgba(11,31,51,0.7)]"
                  : "border-[var(--color-line)] bg-[var(--color-bg)] hover:border-[var(--color-teal)]/50 hover:bg-white"
              }`}
            >
              <span className="flex items-start justify-between gap-2">
                <span className={`text-sm font-bold leading-tight ${active ? "text-white" : "text-[var(--color-navy)]"}`}>{b.name}</span>
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    active ? "bg-[#20c4d6] text-white" : "bg-white text-[var(--color-teal)] ring-1 ring-[var(--color-line)]"
                  }`}
                >
                  {ids.length}
                </span>
              </span>
              <span className={`mt-1 block text-xs ${active ? "text-white/60" : "text-[var(--color-muted)]"}`}>{b.description}</span>
            </button>
          );
        })}
      </div>

      {/* Category filter */}
      <div className="mt-7 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Service categories">
          {[{ group: "all", services: allServices }, ...customServiceGroups].map((g) => {
            const on = category === g.group;
            const n = g.services.filter((s) => selected.has(s.id)).length;
            return (
              <button
                key={g.group}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setCategory(g.group)}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  on ? "bg-[var(--color-teal)] text-white" : "bg-[var(--color-bg)] text-[var(--color-muted)] hover:text-[var(--color-navy)]"
                }`}
              >
                {g.group === "all" ? "All services" : g.group}
                {n > 0 && (
                  <span className={`rounded-full px-1.5 text-[10px] ${on ? "bg-white/25" : "bg-[var(--color-teal-tint)] text-[var(--color-teal)]"}`}>{n}</span>
                )}
              </button>
            );
          })}
        </div>
        {selected.size > 0 && (
          <button type="button" onClick={clear} className="shrink-0 py-1.5 text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-navy)]">
            Clear
          </button>
        )}
      </div>

      {/* Service tiles */}
      <div className="mt-5 space-y-6">
        {groups.map((group) => (
          <div key={group.group}>
            {category === "all" && (
              <p className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">{group.group}</p>
            )}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {group.services.map((s) => {
                const on = selected.has(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggle(s.id)}
                    aria-pressed={on}
                    className={`group relative flex flex-col rounded-xl border p-4 text-left transition-all duration-200 ${
                      on
                        ? "border-[var(--color-teal)] bg-[var(--color-teal-tint)]/60 shadow-[0_10px_28px_-16px_rgba(11,143,135,0.8)]"
                        : "border-[var(--color-line)] bg-white hover:-translate-y-0.5 hover:border-[var(--color-teal)]/40 hover:shadow-[0_10px_28px_-18px_rgba(11,31,51,0.4)]"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                          on ? "text-white" : "bg-[var(--color-bg)] text-[var(--color-navy)] group-hover:text-[var(--color-teal)]"
                        }`}
                        style={on ? { background: "linear-gradient(135deg, #0b8f87, #20c4d6)" } : undefined}
                      >
                        <ServiceIcon id={s.id} />
                      </span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                          on ? "border-[var(--color-teal)] bg-[var(--color-teal)] text-white" : "border-[var(--color-line)] bg-white"
                        }`}
                      >
                        {on && <CheckIcon className="h-3 w-3" />}
                      </span>
                    </span>
                    <span className="mt-3 text-sm font-bold text-[var(--color-navy)]">{s.title}</span>
                    <span className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{s.description}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 2: practice ─── */

function StepPractice({ details, setDetail, setDetails }) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 2"
        title="Tell us about your practice"
        body="This helps us size the team and pricing. Only practice size is required."
      />

      <FieldGroup label="How many providers?" required>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PRACTICE_SIZES.map((o) => {
            const on = details.practiceSize === o.value;
            return (
              <OptionCard key={o.value} on={on} onClick={() => setDetail("practiceSize", o.value)}>
                <span className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 w-2 rounded-full ${i < o.dots ? (on ? "bg-[#20c4d6]" : "bg-[var(--color-teal)]") : on ? "bg-white/15" : "bg-[var(--color-line)]"}`}
                    />
                  ))}
                </span>
                <span className={`mt-3 block text-sm font-bold ${on ? "text-white" : "text-[var(--color-navy)]"}`}>{o.label}</span>
                <span className={`block text-xs ${on ? "text-white/60" : "text-[var(--color-muted)]"}`}>{o.hint}</span>
              </OptionCard>
            );
          })}
        </div>
      </FieldGroup>

      <FieldGroup label="Monthly claim volume">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CLAIM_VOLUMES.map((o) => {
            const on = details.claimVolume === o.value;
            return (
              <OptionCard key={o.value} on={on} onClick={() => setDetail("claimVolume", o.value)} compact>
                <span className={`block text-sm font-bold ${on ? "text-white" : "text-[var(--color-navy)]"}`}>{o.label}</span>
                <span className={`block text-[11px] ${on ? "text-white/60" : "text-[var(--color-muted)]"}`}>claims / month</span>
              </OptionCard>
            );
          })}
        </div>
      </FieldGroup>

      <FieldGroup label="How do you bill today?">
        <div className="grid gap-3 sm:grid-cols-3">
          {CURRENT_SETUPS.map((o) => {
            const on = details.currentSetup === o.value;
            return (
              <OptionCard key={o.value} on={on} onClick={() => setDetail("currentSetup", o.value)} compact>
                <span className={`block text-sm font-bold ${on ? "text-white" : "text-[var(--color-navy)]"}`}>{o.label}</span>
                <span className={`block text-xs ${on ? "text-white/60" : "text-[var(--color-muted)]"}`}>{o.hint}</span>
              </OptionCard>
            );
          })}
        </div>
      </FieldGroup>

      <FieldGroup label="Primary specialty" htmlFor="builder-specialty">
        <div className="relative sm:max-w-sm">
          <select
            id="builder-specialty"
            value={details.specialty}
            onChange={(e) => setDetails((d) => ({ ...d, specialty: e.target.value }))}
            className={`w-full appearance-none rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 pr-9 text-sm outline-none transition-colors focus:border-[var(--color-navy)] focus:bg-white ${
              details.specialty ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"
            }`}
          >
            <option value="">Select a specialty (optional)…</option>
            {SPECIALTY_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </FieldGroup>
    </div>
  );
}

/* ─── Step 3: review ─── */

function StepReview({ services, details, coveringPlan, onEdit }) {
  const grouped = customServiceGroups
    .map((g) => ({ group: g.group, items: services.filter((s) => s.group === g.group) }))
    .filter((g) => g.items.length);

  const detailRows = [
    ["Practice size", details.practiceSize],
    ["Claim volume", details.claimVolume],
    ["Current billing", details.currentSetup],
    ["Specialty", details.specialty],
  ];

  return (
    <div>
      <StepHeading eyebrow="Step 3" title="Review your custom plan" body="Looks right? Send it over and we'll reply with a tailored quote." />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ReviewCard title={`Services (${services.length})`} onEdit={() => onEdit(1)}>
          <div className="space-y-3">
            {grouped.map((g) => (
              <div key={g.group}>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">{g.group}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <span key={s.id} className="flex items-center gap-1.5 rounded-full bg-[var(--color-teal-tint)] px-2.5 py-1 text-xs font-medium text-[var(--color-navy)]">
                      <ServiceIcon id={s.id} className="h-3.5 w-3.5 text-[var(--color-teal)]" />
                      {s.title}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ReviewCard>

        <ReviewCard title="Practice details" onEdit={() => onEdit(2)}>
          <dl className="space-y-2.5 text-sm">
            {detailRows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="shrink-0 whitespace-nowrap text-[var(--color-muted)]">{k}</dt>
                <dd className={`text-right font-semibold ${v ? "text-[var(--color-navy)]" : "text-[var(--color-muted)]/50"}`}>{v || "—"}</dd>
              </div>
            ))}
          </dl>
        </ReviewCard>
      </div>

      {coveringPlan && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[var(--color-teal)]/25 bg-[var(--color-teal-tint)] p-4 text-sm text-[var(--color-navy)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[var(--color-teal)]" aria-hidden>
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
          </svg>
          <p>
            Everything you picked is already included in our <strong>{coveringPlan.name}</strong> plan ({coveringPlan.rate}{" "}
            {coveringPlan.rateNote}). We&apos;ll quote both so you can compare.
          </p>
        </div>
      )}

      <div className="mt-6 rounded-xl bg-[var(--color-bg)] p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">What happens next</p>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            ["Send your plan", "Add your contact details — takes 30 seconds."],
            ["We build your quote", "A specialist prices your exact service mix."],
            ["Get a proposal", "Tailored pricing in your inbox within 1 business day."],
          ].map(([t, b], i) => (
            <li key={t} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}>
                {i + 1}
              </span>
              <span>
                <span className="block text-sm font-bold text-[var(--color-navy)]">{t}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-[var(--color-muted)]">{b}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ─── Summary sidebar ─── */

function Summary({ step, services, details, coveringPlan, onRemove, onPrimary, primaryLabel, canContinue }) {
  const count = services.length;
  return (
    <aside
      className="relative overflow-hidden rounded-2xl p-6 text-white lg:sticky lg:top-28"
      style={{ background: "linear-gradient(160deg, #0b1f33 0%, #173b57 60%, #0b2a22 100%)" }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl" style={{ background: "#20c4d6" }} aria-hidden />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#20c4d6]">Your Custom Plan</p>
          <span className="text-[10px] font-semibold text-white/40">Step {step} of 3</span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#20c4d6] transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        <p className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold" aria-live="polite">
          {count}
          <span className="ml-2 text-sm font-semibold text-white/50">{count === 1 ? "service" : "services"}</span>
        </p>

        {count ? (
          <ul className="mt-4 max-h-56 space-y-1.5 overflow-y-auto pr-1">
            {services.map((s) => (
              <li key={s.id} className="group flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] text-white/80 hover:bg-white/5">
                <span className="flex min-w-0 items-center gap-2">
                  <ServiceIcon id={s.id} className="h-4 w-4 shrink-0 text-[#20c4d6]" />
                  <span className="truncate">{s.title}</span>
                </span>
                {step === 1 && (
                  <button
                    type="button"
                    onClick={() => onRemove(s.id)}
                    aria-label={`Remove ${s.title}`}
                    className="shrink-0 text-white/30 transition-colors hover:text-white"
                  >
                    ×
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-white/15 px-4 py-7 text-center">
            <p className="text-sm text-white/50">No services yet</p>
            <p className="mt-1 text-xs text-white/30">Pick a bundle or tap a service to start</p>
          </div>
        )}

        {details.practiceSize && (
          <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-xs text-white/60">
            {[details.practiceSize, details.claimVolume, details.currentSetup, details.specialty].filter(Boolean).map((d) => (
              <p key={d} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#20c4d6]" aria-hidden />
                {d}
              </p>
            ))}
          </div>
        )}

        {coveringPlan && step < 3 && (
          <p className="mt-4 rounded-lg bg-white/10 px-3 py-2.5 text-xs leading-relaxed text-white/70">
            All included in <strong className="text-[#20c4d6]">{coveringPlan.name}</strong> ({coveringPlan.rate}) — we&apos;ll quote both.
          </p>
        )}

        <button
          type="button"
          onClick={onPrimary}
          disabled={!canContinue}
          className="mt-5 w-full rounded-lg py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(32,196,214,0.7)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
        >
          {primaryLabel} →
        </button>
        <p className="mt-3 text-center text-[11px] text-white/40">Free quote · No commitment · HIPAA-compliant</p>
      </div>
    </aside>
  );
}

/* ─── Small building blocks ─── */

function StepHeading({ eyebrow, title, body }) {
  return (
    <div>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-teal)]">{eyebrow}</p>
      <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-navy)] sm:text-2xl">{title}</h3>
      <p className="mt-1.5 text-sm text-[var(--color-muted)]">{body}</p>
    </div>
  );
}

function FieldGroup({ label, required, htmlFor, children }) {
  const Label = htmlFor ? "label" : "p";
  return (
    <div className="mt-7">
      <Label htmlFor={htmlFor} className="mb-3 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-teal)]">*</span>}
      </Label>
      {children}
    </div>
  );
}

function OptionCard({ on, onClick, compact, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`relative rounded-xl border text-left transition-all ${compact ? "p-3.5" : "p-4"} ${
        on
          ? "border-[var(--color-navy)] bg-[var(--color-navy)] shadow-[0_12px_30px_-15px_rgba(11,31,51,0.7)]"
          : "border-[var(--color-line)] bg-white hover:border-[var(--color-teal)]/50 hover:bg-[var(--color-bg)]"
      }`}
    >
      {on && (
        <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#20c4d6] text-white">
          <CheckIcon className="h-2.5 w-2.5" />
        </span>
      )}
      {children}
    </button>
  );
}

function ReviewCard({ title, onEdit, children }) {
  return (
    <div className="rounded-xl border border-[var(--color-line)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-[var(--color-navy)]">{title}</p>
        <button type="button" onClick={onEdit} className="text-xs font-semibold text-[var(--color-teal)] hover:text-[var(--color-navy)]">
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}
