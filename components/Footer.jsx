import Link from "next/link";
import Image from "next/image";
import { serviceDetails, specialities, contact } from "@/lib/content";

export default function Footer() {
  const footerSpecialities = specialities.slice(0, 8);

  return (
    <footer className="border-t border-[var(--color-line)] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/brand/logo-navbar.png"
                alt="AspireMedX — Smart Revenue Cycle Solutions"
                width={930}
                height={414}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              Enterprise medical billing, credentialing, and revenue cycle
              management for healthcare organizations that need scale, accuracy,
              and control.
            </p>
            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-teal)]/20 bg-[var(--color-teal-tint)] px-3 py-1.5 text-xs font-semibold text-[var(--color-teal)]">
              <ShieldIcon />
              HIPAA Compliant
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
              Services
            </p>
            <ul className="mt-4 space-y-2.5">
              {serviceDetails.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-navy)]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm font-semibold text-[var(--color-teal)] transition-colors hover:text-[var(--color-navy)]"
                >
                  All services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialities */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
              Specialities
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerSpecialities.map((spec) => (
                <li key={spec.slug}>
                  <Link
                    href={`/speciality/${spec.slug}`}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-navy)]"
                  >
                    {spec.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/speciality"
                  className="text-sm font-semibold text-[var(--color-teal)] transition-colors hover:text-[var(--color-navy)]"
                >
                  All specialities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-muted)]">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-[var(--color-navy)]"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-[var(--color-navy)]"
                >
                  {contact.phone}
                </a>
              </li>
              <li>{contact.address}</li>
            </ul>
            <Link
              href="/#contact"
              className="mt-6 inline-block rounded-lg bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-soft)]"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-[var(--color-muted)] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} AspireMedX. All rights reserved.</p>
          <p className="text-[var(--color-muted)]/60">
            Demo build — content and figures are placeholders.
          </p>
        </div>
      </div>
    </footer>
  );
}

function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
