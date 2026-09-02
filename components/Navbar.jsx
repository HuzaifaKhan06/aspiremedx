"use client";

import { useState } from "react";
import Link from "next/link";
import { nav, specialities, contact } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [specialityOpenMobile, setSpecialityOpenMobile] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-bg)]/95 backdrop-blur">
      {/* Top bar — logo left, contact info right on desktop, hamburger right on mobile */}
      <div className="border-b border-[var(--color-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2.5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-navy)] font-mono text-sm font-medium text-white">
              AX
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-navy)]">
              AspireMedX
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <a
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium text-[var(--color-navy)] hover:text-[var(--color-teal)]"
            >
              <PhoneIcon />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 text-sm font-medium text-[var(--color-navy)] hover:text-[var(--color-teal)]"
            >
              <MailIcon />
              {contact.email}
            </a>
            <span className="flex items-center gap-1.5 rounded-md bg-[var(--color-teal-light)] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-teal)]">
              <ShieldIcon />
              HIPAA Compliant
            </span>
          </div>

          {/* Hamburger — same row as the logo, right corner, mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-line)] md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-[var(--color-ink)]" />
              <span className="block h-0.5 w-5 bg-[var(--color-ink)]" />
            </div>
          </button>
        </div>
      </div>

      {/* Main nav row — desktop only, mobile uses the dropdown menu below */}
      <div className="mx-auto hidden max-w-6xl items-center justify-between px-6 py-2.5 md:flex">
        <nav className="flex items-center gap-8">
          <Link
            href="/#services"
            className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-navy)]"
          >
            Services
          </Link>

          {/* Speciality — link + hover dropdown */}
          <div className="group relative">
            <Link
              href="/speciality"
              className="flex items-center gap-1 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-navy)]"
            >
              Speciality
              <ChevronIcon />
            </Link>

            <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 rounded-lg border border-[var(--color-line)] bg-white p-2 opacity-0 shadow-[0_20px_45px_-20px_rgba(11,61,92,0.35)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {specialities.map((item) => (
                <Link
                  key={item.slug}
                  href={`/speciality/${item.slug}`}
                  className="block rounded-md px-3 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-navy)]"
                >
                  {item.title}
                </Link>
              ))}
              <Link
                href="/speciality"
                className="mt-1 block rounded-md border-t border-[var(--color-line)] px-3 pt-3 text-sm font-semibold text-[var(--color-teal)] hover:text-[var(--color-navy)]"
              >
                View all specialities →
              </Link>
            </div>
          </div>

          {nav
            .filter((item) => item.label !== "Services")
            .map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-navy)]"
              >
                {item.label}
              </a>
            ))}
        </nav>

        <Link
          href="/#contact"
          className="rounded-md bg-[var(--color-navy)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-navy-dark)]"
        >
          Request a Demo
        </Link>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-[var(--color-line)] px-6 py-4 md:hidden">
          <Link href="/#services" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-[var(--color-muted)]">
            Services
          </Link>

          <button
            onClick={() => setSpecialityOpenMobile((v) => !v)}
            className="flex items-center justify-between py-2 text-left text-sm font-medium text-[var(--color-muted)]"
            aria-expanded={specialityOpenMobile}
          >
            <Link href="/speciality" onClick={(e) => e.stopPropagation()} className="hover:text-[var(--color-navy)]">
              Speciality
            </Link>
            <ChevronIcon />
          </button>
          {specialityOpenMobile && (
            <div className="ml-3 flex flex-col gap-1 border-l border-[var(--color-line)] pl-3">
              {specialities.map((item) => (
                <Link
                  key={item.slug}
                  href={`/speciality/${item.slug}`}
                  onClick={() => setOpen(false)}
                  className="py-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          {nav
            .filter((item) => item.label !== "Services")
            .map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-[var(--color-muted)]"
              >
                {item.label}
              </a>
            ))}

          <a
            href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
            className="mt-2 flex items-center gap-2 py-2 text-sm font-medium text-[var(--color-navy)]"
          >
            <PhoneIcon />
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 py-2 text-sm font-medium text-[var(--color-navy)]">
            <MailIcon />
            {contact.email}
          </a>

          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-[var(--color-navy)] px-4 py-2 text-center text-sm font-medium text-white"
          >
            Request a Demo
          </Link>
        </nav>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
