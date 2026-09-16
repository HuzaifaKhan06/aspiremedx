"use client";

import { useState } from "react";
import Link from "next/link";
import { contact } from "@/lib/content";

const PRACTICE_TYPES = [
  "Physician Group",
  "Multi-Specialty Health System",
  "Diagnostic & Imaging Network",
  "Behavioral Health Network",
  "Ambulatory Surgery Center (ASC)",
  "Hospital-Affiliated Practice",
  "Solo Provider",
  "Other",
];

const SPECIALTIES = [
  "Family Medicine",
  "Internal Medicine",
  "Cardiology",
  "Orthopedics / Orthopedic Surgery",
  "Neurology / Neurosurgery",
  "Oncology / Hematology",
  "Radiology / Diagnostic Imaging",
  "Gastroenterology",
  "Pulmonology",
  "Urology",
  "Dermatology",
  "Ophthalmology",
  "OB/GYN",
  "Pediatrics",
  "Psychiatry / Behavioral Health",
  "Pain Management",
  "Physical / Occupational Therapy",
  "DME / Home Health",
  "Emergency Medicine",
  "Anesthesiology",
  "Multi-Specialty",
  "Other",
];

const PRACTICE_SIZES = [
  "1 Provider (Solo)",
  "2–5 Providers",
  "6–15 Providers",
  "16–30 Providers",
  "31–50 Providers",
  "50+ Providers",
];

const SERVICES = [
  "Medical Billing & Claim Submission",
  "Provider Credentialing",
  "Payer Enrollment",
  "Revenue Cycle Management (RCM)",
  "Denial Management & Appeals",
  "Payer Contracting & Negotiation",
  "DME Billing",
  "All Services / Not Sure Yet",
];

const REFERRAL_SOURCES = [
  "Google / Search Engine",
  "LinkedIn",
  "Referral from a Colleague",
  "Medical Conference or Event",
  "Social Media",
  "Industry Publication",
  "Email Campaign",
  "Other",
];

const PREFERRED_CONTACT = ["Email", "Phone Call", "Either Works"];

const TIMELINE = [
  "Immediately (ASAP)",
  "Within 1 Month",
  "1–3 Months",
  "3–6 Months",
  "Just Exploring",
];

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  practiceType: "",
  specialty: "",
  practiceSize: "",
  service: "",
  timeline: "",
  referral: "",
  preferredContact: "",
  currentChallenges: [],
  message: "",
  consent: false,
};

const CHALLENGES = [
  "High denial rates",
  "Slow credentialing timelines",
  "Poor A/R visibility",
  "Underpaid claims / no contract benchmarking",
  "Staff bandwidth / turnover",
  "Technology / EHR integration",
  "HIPAA compliance concerns",
  "Multiple vendors / no single point of contact",
];

export default function ContactPageForm() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function toggleChallenge(label) {
    setForm((f) => ({
      ...f,
      currentChallenges: f.currentChallenges.includes(label)
        ? f.currentChallenges.filter((c) => c !== label)
        : [...f.currentChallenges, label],
    }));
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.organization.trim()) e.organization = "Required";
    if (!form.practiceType) e.practiceType = "Please select one";
    if (!form.service) e.service = "Please select one";
    if (!form.consent) e.consent = "You must agree to continue";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      const firstKey = Object.keys(v)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[480px] flex-col items-center justify-center rounded-2xl border border-[var(--color-line)] bg-white p-12 text-center shadow-sm">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--color-navy)]">
          Thank You, {form.firstName}!
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-[var(--color-muted)]">
          We've received your enquiry and a member of our team will be in touch within one business day.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg border border-[var(--color-line)] px-6 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-teal)]/40"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* ── Section 1: Personal Info ── */}
      <FormSection title="Your Information" number="01">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="firstName" label="First Name" required error={errors.firstName}>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              placeholder="Jordan"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              className={inputCls(errors.firstName)}
            />
          </Field>
          <Field id="lastName" label="Last Name" required error={errors.lastName}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              placeholder="Reyes"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              className={inputCls(errors.lastName)}
            />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="email" label="Email Address" required error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@organization.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls(errors.email)}
            />
          </Field>
          <Field id="phone" label="Phone Number" required error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(555) 019-2044"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={inputCls(errors.phone)}
            />
          </Field>
        </div>
        <Field id="organization" label="Organization / Practice Name" required error={errors.organization}>
          <input
            id="organization"
            name="organization"
            type="text"
            required
            placeholder="Riverside Health Partners"
            value={form.organization}
            onChange={(e) => set("organization", e.target.value)}
            className={inputCls(errors.organization)}
          />
        </Field>
      </FormSection>

      {/* ── Section 2: Practice Details ── */}
      <FormSection title="Practice Details" number="02">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="practiceType" label="Practice Type" required error={errors.practiceType}>
            <Select
              id="practiceType"
              value={form.practiceType}
              onChange={(v) => set("practiceType", v)}
              options={PRACTICE_TYPES}
              placeholder="Select practice type…"
              error={errors.practiceType}
            />
          </Field>
          <Field id="practiceSize" label="Practice Size">
            <Select
              id="practiceSize"
              value={form.practiceSize}
              onChange={(v) => set("practiceSize", v)}
              options={PRACTICE_SIZES}
              placeholder="Number of providers…"
            />
          </Field>
        </div>
        <Field id="specialty" label="Primary Specialty">
          <Select
            id="specialty"
            value={form.specialty}
            onChange={(v) => set("specialty", v)}
            options={SPECIALTIES}
            placeholder="Select your specialty…"
          />
        </Field>
      </FormSection>

      {/* ── Section 3: Service & Intent ── */}
      <FormSection title="Service Interest" number="03">
        <Field id="service" label="Service You're Interested In" required error={errors.service}>
          <Select
            id="service"
            value={form.service}
            onChange={(v) => set("service", v)}
            options={SERVICES}
            placeholder="Choose a service…"
            error={errors.service}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="timeline" label="Implementation Timeline">
            <Select
              id="timeline"
              value={form.timeline}
              onChange={(v) => set("timeline", v)}
              options={TIMELINE}
              placeholder="When are you looking to start?"
            />
          </Field>
          <Field id="preferredContact" label="Preferred Contact Method">
            <Select
              id="preferredContact"
              value={form.preferredContact}
              onChange={(v) => set("preferredContact", v)}
              options={PREFERRED_CONTACT}
              placeholder="How should we reach you?"
            />
          </Field>
        </div>

        {/* Challenges checklist */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Current Challenges <span className="font-normal normal-case tracking-normal text-[var(--color-muted)]/60">(select all that apply)</span>
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {CHALLENGES.map((c) => {
              const checked = form.currentChallenges.includes(c);
              return (
                <label
                  key={c}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all ${
                    checked
                      ? "border-[var(--color-teal)]/40 bg-[var(--color-teal-tint)] text-[var(--color-navy)]"
                      : "border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-muted)] hover:border-[var(--color-teal)]/20 hover:bg-white"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                      checked ? "border-[var(--color-teal)] bg-[var(--color-teal)]" : "border-[var(--color-line)] bg-white"
                    }`}
                  >
                    {checked && (
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                        <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleChallenge(c)} />
                  {c}
                </label>
              );
            })}
          </div>
        </div>
      </FormSection>

      {/* ── Section 4: Message ── */}
      <FormSection title="Additional Details" number="04">
        <Field id="message" label="Tell Us About Your Situation">
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Describe your current billing setup, biggest pain points, EHR/PM system in use, or anything else you'd like us to know before our call…"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className="mt-0 w-full resize-none rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-navy)] focus:bg-white"
          />
        </Field>
        <Field id="referral" label="How Did You Hear About Us?">
          <Select
            id="referral"
            value={form.referral}
            onChange={(v) => set("referral", v)}
            options={REFERRAL_SOURCES}
            placeholder="Select a source…"
          />
        </Field>

        {/* Consent */}
        <div>
          <label className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3.5 text-sm transition-all ${errors.consent ? "border-red-300 bg-red-50" : "border-[var(--color-line)] bg-[var(--color-bg)] hover:border-[var(--color-teal)]/20 hover:bg-white"}`}>
            <span
              id="consent"
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                form.consent ? "border-[var(--color-teal)] bg-[var(--color-teal)]" : errors.consent ? "border-red-400 bg-white" : "border-[var(--color-line)] bg-white"
              }`}
              onClick={() => set("consent", !form.consent)}
            >
              {form.consent && (
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                  <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <input type="checkbox" className="sr-only" checked={form.consent} onChange={() => set("consent", !form.consent)} />
            <span className="text-[var(--color-muted)]">
              I agree that AspireMedX may contact me about my enquiry. I understand my information is handled per the{" "}
              <span className="font-semibold text-[var(--color-navy)]">HIPAA Privacy Policy</span>{" "}
              and will not be shared with third parties.
            </span>
          </label>
          {errors.consent && <p className="mt-1.5 text-xs text-red-500">{errors.consent}</p>}
        </div>
      </FormSection>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="relative w-full overflow-hidden rounded-xl py-4 text-sm font-bold text-white shadow-[0_6px_28px_-6px_rgba(11,143,135,0.55)] transition-all hover:brightness-110 disabled:opacity-70"
          style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
              </svg>
              Sending…
            </span>
          ) : (
            "Submit Your Enquiry →"
          )}
        </button>
        <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
          We respond within 1 business day · No spam · No commitment required
        </p>
      </div>
    </form>
  );
}

/* ─── Helper sub-components ─── */

function FormSection({ title, number, children }) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg, #0b1f33, #0b8f87)" }}
        >
          {number}
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-navy)]">{title}</h3>
      </div>
      <div className="space-y-5">{children}</div>
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

function Select({ id, value, onChange, options, placeholder, error }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-navy)] focus:bg-white ${
          error ? "border-red-300 bg-red-50" : "border-[var(--color-line)] bg-[var(--color-bg)]"
        } ${value ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function inputCls(error) {
  return `w-full rounded-lg border px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-navy)] focus:bg-white ${
    error ? "border-red-300 bg-red-50" : "border-[var(--color-line)] bg-[var(--color-bg)]"
  }`;
}
