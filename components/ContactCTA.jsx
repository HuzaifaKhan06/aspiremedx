"use client";

import { useState } from "react";
import { contact } from "@/lib/content";

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Demo only — no backend wired up yet. Replace with a real API call
    // (e.g. POST to /api/consultation) once the backend is ready.
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-[var(--color-bg)] py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
            Get started
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            Ready to see AspireMedX in action?
          </h2>
          <p className="mt-4 max-w-md text-[var(--color-muted)]">
            Tell us about your practice and we&apos;ll walk you through how your
            billing would run on AspireMedX — no commitment required.
          </p>

          <dl className="mt-10 space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="w-16 font-mono text-xs uppercase text-[var(--color-muted)]">Email</dt>
              <dd className="text-[var(--color-navy)]">{contact.email}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 font-mono text-xs uppercase text-[var(--color-muted)]">Phone</dt>
              <dd className="text-[var(--color-navy)]">{contact.phone}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 font-mono text-xs uppercase text-[var(--color-muted)]">Office</dt>
              <dd className="text-[var(--color-navy)]">{contact.address}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
                Request received
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                This is a demo confirmation — no email was actually sent yet.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-md border border-[var(--color-line)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-navy)]"
                  placeholder="Jordan Reyes"
                />
              </div>
              <div>
                <label htmlFor="practice" className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                  Practice name
                </label>
                <input
                  id="practice"
                  name="practice"
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-md border border-[var(--color-line)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-navy)]"
                  placeholder="Riverside Family Care"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1.5 w-full rounded-md border border-[var(--color-line)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-navy)]"
                    placeholder="you@practice.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="mt-1.5 w-full rounded-md border border-[var(--color-line)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-navy)]"
                    placeholder="(555) 019-2044"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                  What would you like us to know?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="mt-1.5 w-full resize-none rounded-md border border-[var(--color-line)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-navy)]"
                  placeholder="Specialty, current billing setup, biggest pain point…"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-dark)]"
              >
                Request a Consultation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
