"use client";

import { useEffect, useRef, useState } from "react";
import { PRACTICE_SIZES } from "./options";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  practiceSize: "",
  specialty: "",
  message: "",
  consent: false,
};

// Mounted fresh each time it opens (the parent renders it only while open),
// so form state starts clean on every open.
// `request` describes what the visitor is asking about:
//   { type: "plan", plan: "Professional", rate, rateNote }
//   { type: "custom", services: [...], practiceSize, claimVolume, currentSetup, specialty }
// Custom requests already collected practice details in the builder, so the
// modal shows them as a summary instead of asking again.
export default function QuoteModal({ request, onClose }) {
  const [form, setForm] = useState(() => ({
    ...EMPTY,
    practiceSize: request.practiceSize || "",
    specialty: request.specialty || "",
  }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Lock page scroll, focus the first field, close on Escape, restore focus after
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);

    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]):not(.sr-only), select, textarea, a[href]'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const isCustom = request.type === "custom";

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.organization.trim()) e.organization = "Required";
    if (!form.consent) e.consent = "Please agree to continue";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: request.type,
          plan: request.plan || "",
          services: request.services || [],
          claimVolume: request.claimVolume || "",
          currentSetup: request.currentSetup || "",
          ...form,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0b1f33]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_30px_80px_-20px_rgba(11,31,51,0.6)] sm:rounded-2xl"
      >
        {/* Header */}
        <div
          className="relative shrink-0 overflow-hidden px-6 py-5 text-white sm:px-8"
          style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 60%, #0b2a22 100%)" }}
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-2xl"
            style={{ background: "#20c4d6" }}
            aria-hidden
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#20c4d6]">
                {isCustom ? "Custom Plan Quote" : "Plan Enquiry"}
              </p>
              <h2 id="quote-modal-title" className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold">
                {status === "sent"
                  ? "Request received"
                  : isCustom
                  ? "Get your custom quote"
                  : `Get started with ${request.plan}`}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {status === "sent" ? (
          <div className="flex flex-col items-center px-8 py-12 text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-navy)]">
              Thank you, {form.name.split(" ")[0]}!
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--color-muted)]">
              We&apos;ve received your {isCustom ? "custom plan" : `${request.plan} plan`} request. A billing
              specialist will email a tailored proposal to <strong className="text-[var(--color-navy)]">{form.email}</strong> within
              one business day.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8">
              {/* Summary of what they picked */}
              <div className="rounded-xl border border-[var(--color-teal)]/20 bg-[var(--color-teal-tint)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-teal)]">
                  {isCustom ? `Your selection · ${request.services.length} services` : "Selected plan"}
                </p>
                {isCustom ? (
                  <>
                    <div className="mt-2.5 flex max-h-24 flex-wrap gap-1.5 overflow-y-auto">
                      {request.services.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-[var(--color-teal)]/20 bg-white px-2.5 py-1 text-xs font-medium text-[var(--color-navy)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    {[request.practiceSize, request.claimVolume, request.currentSetup, request.specialty].some(Boolean) && (
                      <p className="mt-3 border-t border-[var(--color-teal)]/15 pt-2.5 text-xs text-[var(--color-muted)]">
                        {[request.practiceSize, request.claimVolume, request.currentSetup, request.specialty].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-navy)]">
                    {request.plan} — {request.rate} {request.rateNote}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="q-name" label="Full Name" required error={errors.name}>
                  <input
                    ref={firstFieldRef}
                    id="q-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jordan Reyes"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputCls(errors.name)}
                  />
                </Field>
                <Field id="q-email" label="Work Email" required error={errors.email}>
                  <input
                    id="q-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@organization.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputCls(errors.email)}
                  />
                </Field>
                <Field id="q-phone" label="Phone" required error={errors.phone}>
                  <input
                    id="q-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(555) 019-2044"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={inputCls(errors.phone)}
                  />
                </Field>
                <Field id="q-org" label="Practice / Organization" required error={errors.organization}>
                  <input
                    id="q-org"
                    type="text"
                    autoComplete="organization"
                    placeholder="Riverside Health Partners"
                    value={form.organization}
                    onChange={(e) => set("organization", e.target.value)}
                    className={inputCls(errors.organization)}
                  />
                </Field>
                {!isCustom && (
                  <>
                    <Field id="q-size" label="Practice Size">
                      <div className="relative">
                        <select
                          id="q-size"
                          value={form.practiceSize}
                          onChange={(e) => set("practiceSize", e.target.value)}
                          className={`${inputCls()} appearance-none pr-9 ${form.practiceSize ? "" : "text-[var(--color-muted)]"}`}
                        >
                          <option value="">Number of providers…</option>
                          {PRACTICE_SIZES.map((s) => (
                            <option key={s.value} value={s.value}>{s.value}</option>
                          ))}
                        </select>
                        <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </Field>
                    <Field id="q-specialty" label="Primary Specialty">
                      <input
                        id="q-specialty"
                        type="text"
                        placeholder="e.g. Cardiology"
                        value={form.specialty}
                        onChange={(e) => set("specialty", e.target.value)}
                        className={inputCls()}
                      />
                    </Field>
                  </>
                )}
              </div>

              <Field id="q-message" label="Anything else we should know?">
                <textarea
                  id="q-message"
                  rows={3}
                  placeholder={isCustom ? "EHR / PM system, ideal start date, biggest billing headache…" : "Current billing setup, EHR / PM system, monthly claim volume…"}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className={`${inputCls()} resize-none`}
                />
              </Field>

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                  errors.consent ? "border-red-300 bg-red-50" : "border-[var(--color-line)] bg-[var(--color-bg)] hover:bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-teal)]"
                />
                <span className="text-xs leading-relaxed text-[var(--color-muted)]">
                  I agree that AspireMedX may contact me about this request. My information is handled per the{" "}
                  <span className="font-semibold text-[var(--color-navy)]">HIPAA Privacy Policy</span> and never shared with third parties.
                </span>
              </label>
              {errors.consent && <p className="-mt-3 text-xs text-red-500">{errors.consent}</p>}

              {serverError && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {serverError}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-[var(--color-line)] bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-center text-xs text-[var(--color-muted)] sm:text-left">
                Response within 1 business day · No commitment
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-lg px-6 py-3 text-sm font-bold text-white shadow-[0_6px_24px_-8px_rgba(11,143,135,0.6)] transition-all hover:brightness-110 disabled:opacity-70"
                style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
              >
                {status === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  "Send Request →"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-teal)]">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function inputCls(error) {
  return `w-full rounded-lg border px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-navy)] focus:bg-white ${
    error ? "border-red-300 bg-red-50" : "border-[var(--color-line)] bg-[var(--color-bg)]"
  }`;
}
