"use client";

import { useState } from "react";
import Link from "next/link";
import { contact, cta } from "@/lib/content";

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Demo only — no backend wired up yet.
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-[var(--color-bg)] py-24">
      {/* CTA banner → dedicated Contact page */}
      <div className="mx-auto mb-10 max-w-6xl px-6 sm:px-0">
        <div
          className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl px-8 py-8 text-center sm:flex-row sm:text-left"
          style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 60%, #0b2a22 100%)" }}
        >
          {/* Hex overlay */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-banner-hex" x="0" y="0" width="40" height="35" patternUnits="userSpaceOnUse">
                <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" fill="none" stroke="#20c4d6" strokeWidth="0.7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-banner-hex)" />
          </svg>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-10"
            style={{ background: "radial-gradient(ellipse at top right, #20c4d6, transparent 70%)" }} aria-hidden />
          <div className="relative">
            <p className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white sm:text-2xl">
              Ready for a full consultation?
            </p>
            <p className="mt-1 text-sm text-white/50">
              Visit our dedicated contact page for a detailed enquiry form — tell us your specialty, practice size, and biggest billing challenges.
            </p>
          </div>
          <Link
            href="/contact"
            className="relative shrink-0 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_24px_-4px_rgba(32,196,214,0.5)] transition-all hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
          >
            Open Contact Form →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[var(--color-line)] shadow-[0_24px_80px_-32px_rgba(11,31,51,0.2)] md:flex">
        {/* Left: Navy info panel */}
        <div className="bg-[var(--color-navy)] p-10 md:w-[42%] md:p-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-cyan)]">
            Get started
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to see AspireMedX in action?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Tell us about your organization and we&apos;ll walk you through how
            your revenue cycle would run on AspireMedX — no commitment required.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
            >
              <MailIcon />
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
            >
              <PhoneIcon />
              {contact.phone}
            </a>
            <p className="flex items-center gap-3 text-sm text-white/70">
              <LocationIcon />
              {contact.address}
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {[
              "100% HIPAA-compliant workflows",
              "Business Associate Agreements executed with every client",
              "Dedicated account manager on every engagement",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal)]">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                    <path
                      d="M1.5 4L3 5.5L6.5 2"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 bg-white p-10 md:p-12">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-teal-tint)]">
                <svg className="h-6 w-6 text-[var(--color-teal)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <p className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)]">
                Request received
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                This is a demo confirmation — no email was actually sent yet.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name" type="text" placeholder="Jordan Reyes" required />
                <Field id="organization" label="Organization" type="text" placeholder="Riverside Health Partners" required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="email" label="Email" type="email" placeholder="you@organization.com" required />
                <Field id="phone" label="Phone" type="tel" placeholder="(555) 019-2044" />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]"
                >
                  Tell us about your practice
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full resize-none rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-navy)] focus:bg-white"
                  placeholder="Speciality, current billing setup, biggest pain point…"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[var(--color-navy)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(11,31,51,0.35)] transition-all hover:bg-[var(--color-navy-soft)]"
              >
                {cta.primary}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, type, placeholder, required }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-navy)] focus:bg-white"
        placeholder={placeholder}
      />
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
