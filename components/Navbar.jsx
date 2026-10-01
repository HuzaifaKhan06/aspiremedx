"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SpecialityIcon from "@/components/speciality/SpecialityIcon";
import ServiceIcon from "@/components/ServiceIcon";
import { nav, specialities, featuredSpecialitySlugs, serviceDetails, serviceGroups, contact, cta } from "@/lib/content";

// Services grouped for the dropdown — billing first, digital growth last.
const groupedServices = serviceGroups.map((g) => ({
  label: g.label,
  items: g.slugs.map((slug) => serviceDetails.find((s) => s.slug === slug)).filter(Boolean),
}));

const coreSpecialities = specialities.filter((s) => featuredSpecialitySlugs.includes(s.slug));
const moreSpecialities = specialities.filter((s) => !featuredSpecialitySlugs.includes(s.slug));

// "Cardiology Billing" → "Cardiology" for the compact dropdown labels
const shortSpecialityName = (title) => title.replace(/ Billing( Services)?$/, "");

// Desktop nav link styling — the current page gets bold navy text and a
// teal underline; other links grow the same underline on hover.
const navLinkClass = (active) =>
  `group/nl relative flex items-center gap-1 text-[13px] transition-colors ${
    active ? "font-semibold text-[var(--color-navy)]" : "font-medium text-[var(--color-muted)] hover:text-[var(--color-navy)]"
  }`;

function ActiveUnderline({ active }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-[var(--color-teal)] to-[var(--color-cyan)] transition-transform duration-300 ${
        active ? "scale-x-100" : "scale-x-0 group-hover/nl:scale-x-100"
      }`}
    />
  );
}

const mobileLinkClass = (active) =>
  `border-l-2 py-2 pl-3 text-sm ${
    active ? "border-[var(--color-teal)] font-semibold text-[var(--color-navy)]" : "border-transparent font-medium text-[var(--color-muted)]"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpenMobile, setServicesOpenMobile] = useState(false);
  const [specialityOpenMobile, setSpecialityOpenMobile] = useState(false);
  const pathname = usePathname();

  // Hash links (e.g. /#why-us) are in-page anchors, never "the current page".
  const isActive = (href) =>
    href === "/"
      ? pathname === "/"
      : !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  // Next.js doesn't scroll when a link points at the page you're already on,
  // so the logo / Home link scroll back to the top manually on the home page.
  const scrollTopIfHome = (e) => {
    if (pathname !== "/") return;
    e.preventDefault();
    if (window.location.hash) window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-white/95 backdrop-blur">
      {/* Single row — logo, nav links, CTA on desktop; logo + hamburger on mobile */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3 lg:gap-4">
        <Link href="/" onClick={scrollTopIfHome} className="flex shrink-0 items-center">
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
          <Link href="/" onClick={scrollTopIfHome} className={navLinkClass(isActive("/"))}>
            Home
            <ActiveUnderline active={isActive("/")} />
          </Link>
          {/* Services — link + hover dropdown */}
          <div className="group relative">
            <Link href="/services" className={navLinkClass(isActive("/services"))}>
              Services
              <ChevronIcon />
              <ActiveUnderline active={isActive("/services")} />
            </Link>

            <div className="invisible absolute -left-36 top-full z-50 w-[760px] translate-y-1 rounded-xl border border-[var(--color-line)] bg-white p-5 opacity-0 shadow-[0_20px_45px_-20px_rgba(11,31,51,0.35)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {/* Same layout as the Speciality dropdown — stacked groups, three columns */}
              {groupedServices.map((group, gi) => (
                <div key={group.label} className={gi > 0 ? "mt-4 border-t border-[var(--color-line)] pt-4" : ""}>
                  <p className="px-3 pb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-teal)]">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-3 gap-x-2">
                    {group.items.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group/si flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg)] hover:text-[var(--color-teal)]"
                      >
                        <ServiceIcon slug={service.slug} className="h-5 w-5 shrink-0 text-[var(--color-teal)] transition-colors group-hover/si:text-[var(--color-cyan)]" />
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/services"
                className="mt-4 block rounded-md border-t border-[var(--color-line)] px-3 pt-3 text-sm font-semibold text-[var(--color-teal)] hover:text-[var(--color-navy)]"
              >
                View all services →
              </Link>
            </div>
          </div>

          {/* Speciality — link + hover dropdown */}
          <div className="group relative">
            <Link href="/speciality" className={navLinkClass(isActive("/speciality"))}>
              Speciality
              <ChevronIcon />
              <ActiveUnderline active={isActive("/speciality")} />
            </Link>

            <div className="invisible absolute -left-56 top-full z-50 w-[760px] translate-y-1 rounded-xl border border-[var(--color-line)] bg-white p-5 opacity-0 shadow-[0_20px_45px_-20px_rgba(11,31,51,0.35)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {[
                { label: "Core Specialities", items: coreSpecialities },
                { label: "More Specialities", items: moreSpecialities },
              ].map((group, gi) => (
                <div key={group.label} className={gi > 0 ? "mt-4 border-t border-[var(--color-line)] pt-4" : ""}>
                  <p className="px-3 pb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-teal)]">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-3 gap-x-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/speciality/${item.slug}`}
                        className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] text-[var(--color-ink)] transition-colors [--ic-3:#ffffff] hover:bg-[var(--color-bg)] hover:text-[var(--color-teal)] hover:[--ic-3:#f3f8fa]"
                      >
                        <SpecialityIcon slug={item.slug} className="h-5 w-5 shrink-0" />
                        {shortSpecialityName(item.title)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/speciality"
                className="mt-4 block rounded-md border-t border-[var(--color-line)] px-3 pt-3 text-sm font-semibold text-[var(--color-teal)] hover:text-[var(--color-navy)]"
              >
                View all specialities →
              </Link>
            </div>
          </div>

          {nav
            .filter((item) => item.label !== "Services" && item.label !== "Speciality")
            .map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(isActive(item.href))}>
                {item.label}
                <ActiveUnderline active={isActive(item.href)} />
              </Link>
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
          href="/contact"
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
            onClick={(e) => {
              setOpen(false);
              scrollTopIfHome(e);
            }}
            className={mobileLinkClass(isActive("/"))}
          >
            Home
          </Link>
          {/* Services mobile accordion */}
          <button
            onClick={() => setServicesOpenMobile((v) => !v)}
            className={`flex items-center justify-between text-left ${mobileLinkClass(isActive("/services"))}`}
            aria-expanded={servicesOpenMobile}
          >
            <Link href="/services" onClick={(e) => e.stopPropagation()} className="hover:text-[var(--color-navy)]">
              Services
            </Link>
            <ChevronIcon />
          </button>
          {servicesOpenMobile && (
            <div className="ml-3 flex flex-col gap-1 border-l border-[var(--color-line)] pl-3">
              {groupedServices.map((group) => (
                <div key={group.label} className="flex flex-col gap-1">
                  <p className="pt-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-teal)]">
                    {group.label}
                  </p>
                  {group.items.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 py-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]"
                    >
                      <ServiceIcon slug={service.slug} className="h-5 w-5 shrink-0 text-[var(--color-teal)]" />
                      {service.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setSpecialityOpenMobile((v) => !v)}
            className={`flex items-center justify-between text-left ${mobileLinkClass(isActive("/speciality"))}`}
            aria-expanded={specialityOpenMobile}
          >
            <Link href="/speciality" onClick={(e) => e.stopPropagation()} className="hover:text-[var(--color-navy)]">
              Speciality
            </Link>
            <ChevronIcon />
          </button>
          {specialityOpenMobile && (
            <div className="ml-3 flex flex-col gap-1 border-l border-[var(--color-line)] pl-3">
              {[
                { label: "Core Specialities", items: coreSpecialities },
                { label: "More Specialities", items: moreSpecialities },
              ].map((group) => (
                <div key={group.label} className="flex flex-col gap-1">
                  <p className="pt-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-teal)]">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/speciality/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 py-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-navy)]"
                    >
                      <SpecialityIcon slug={item.slug} className="h-5 w-5 shrink-0" />
                      {shortSpecialityName(item.title)}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          {nav
            .filter((item) => item.label !== "Services" && item.label !== "Speciality")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={mobileLinkClass(isActive(item.href))}
              >
                {item.label}
              </Link>
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
            href="/contact"
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
