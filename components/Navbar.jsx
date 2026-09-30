"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { nav, specialities, serviceDetails, contact, cta } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpenMobile, setServicesOpenMobile] = useState(false);
  const [specialityOpenMobile, setSpecialityOpenMobile] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-white/95 backdrop-blur">
      {/* Single row — logo, nav links, CTA on desktop; logo + hamburger on mobile */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3 lg:gap-4">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/brand/logo-navbar.png"
            alt="AspireMedX — Smart Revenue Cycle Solutions"
            width={930}
            height={414}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden shrink-0 items-center gap-4 whitespace-nowrap lg:flex">
          <Link
            href="/"
            className="text-[13px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-navy)]"
          >
            Home
          </Link>
          {/* Services — link + hover dropdown */}
          <div className="group relative">
            <Link
              href="/services"
              className="flex items-center gap-1 text-[13px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-navy)]"
            >
              Services
              <ChevronIcon />
            </Link>

            <div className="invisible absolute left-0 top-full z-50 w-64 translate-y-1 rounded-xl border border-[var(--color-line)] bg-white p-2 opacity-0 shadow-[0_20px_45px_-20px_rgba(11,31,51,0.35)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {serviceDetails.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[var(--color-ink)] hover:bg-[var(--color-bg)] hover:text-[var(--color-navy)]"
                >
                  {service.title}
                </Link>
              ))}
              <Link
                href="/services"
                className="mt-1 block rounded-lg border-t border-[var(--color-line)] px-3 pt-3 text-sm font-semibold text-[var(--color-teal)] hover:text-[var(--color-navy)]"
              >
                View all services →
              </Link>
            </div>
          </div>

          {/* Speciality — link + hover dropdown */}
          <div className="group relative">
            <Link
              href="/speciality"
              className="flex items-center gap-1 text-[13px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-navy)]"
            >
              Speciality
              <ChevronIcon />
            </Link>

            <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 rounded-md border border-[var(--color-line)] bg-white p-2 opacity-0 shadow-[0_20px_45px_-20px_rgba(11,31,51,0.35)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {specialities.map((item) => (
                <Link
                  key={item.slug}
                  href={`/speciality/${item.slug}`}
                  className="block rounded-md px-3 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-bg)] hover:text-[var(--color-navy)]"
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
            .filter((item) => item.label !== "Services" && item.label !== "Speciality")
            .map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-navy)]"
              >
                {item.label}
              </a>
            ))}
        </nav>

        {/* Contact + HIPAA — icon chips on smaller desktops, full details on wide screens */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              aria-label={`Call ${contact.phone}`}
              title={contact.phone}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-navy)] transition-colors hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
            >
              <PhoneIcon />
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label={`Email ${contact.email}`}
              title={contact.email}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-navy)] transition-colors hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
            >
              <MailIcon />
            </a>
          </div>

          <div className="hidden flex-col gap-0.5 border-l border-[var(--color-line)] pl-3 xl:flex">
            <a
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-navy)] hover:text-[var(--color-teal)]"
            >
              <PhoneIcon size={13} />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-navy)] hover:text-[var(--color-teal)]"
            >
              <MailIcon size={13} />
              {contact.email}
            </a>
          </div>

          <span
            title="HIPAA Compliant"
            className="flex items-center gap-1.5 rounded-md bg-[var(--color-teal-tint)] px-2 py-1.5 text-xs font-semibold text-[var(--color-teal)]"
          >
            <ShieldIcon />
            <span className="leading-none">HIPAA<span className="hidden xl:inline"> Compliant</span></span>
          </span>
        </div>

        <Link
          href="/#contact"
          className="hidden shrink-0 rounded-md bg-[var(--color-navy)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-soft)] lg:block"
        >
          {cta.secondary}
        </Link>

        {/* Hamburger — same row as the logo, right corner, below desktop width */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-line)] lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-[var(--color-ink)]" />
            <span className="block h-0.5 w-5 bg-[var(--color-ink)]" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-[var(--color-line)] px-6 py-4 lg:hidden">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="py-2 text-sm font-medium text-[var(--color-muted)]"
          >
            Home
          </Link>
          {/* Services mobile accordion */}
          <button
            onClick={() => setServicesOpenMobile((v) => !v)}
            className="flex items-center justify-between py-2 text-left text-sm font-medium text-[var(--color-muted)]"
            aria-expanded={servicesOpenMobile}
          >
            <Link href="/services" onClick={(e) => e.stopPropagation()} className="hover:text-[var(--color-navy)]">
              Services
            </Link>
            <ChevronIcon />
          </button>
          {servicesOpenMobile && (
            <div className="ml-3 flex flex-col gap-1 border-l border-[var(--color-line)] pl-3">
              {serviceDetails.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setOpen(false)}
                  className="py-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          )}

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
            .filter((item) => item.label !== "Services" && item.label !== "Speciality")
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
            className="mt-2 rounded-md bg-[var(--color-navy)] px-4 py-2 text-center text-sm font-semibold text-white"
          >
            {cta.secondary}
          </Link>
        </nav>
      )}
    </header>
  );
}

function PhoneIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
