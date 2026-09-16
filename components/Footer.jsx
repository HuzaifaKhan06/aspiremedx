import Link from "next/link";
import Image from "next/image";
import { serviceDetails, specialities, contact } from "@/lib/content";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Why Choose Us", href: "/#why-us" },
  { label: "Services", href: "/services" },
  { label: "Specialities", href: "/speciality" },
  { label: "Technology", href: "/#technology" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #0b1f33 0%, #0b2a22 100%)" }}>
      {/* Decorative arc */}
      <svg
        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] opacity-[0.07]"
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden
      >
        <circle cx="250" cy="250" r="220" stroke="#0b8f87" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="160" stroke="#0b8f87" strokeWidth="1" />
        <circle cx="250" cy="250" r="100" stroke="#20c4d6" strokeWidth="0.8" />
      </svg>
      <svg
        className="pointer-events-none absolute -bottom-20 -left-20 h-[320px] w-[320px] opacity-[0.05]"
        viewBox="0 0 320 320"
        fill="none"
        aria-hidden
      >
        <circle cx="160" cy="160" r="140" stroke="#20c4d6" strokeWidth="1.5" />
        <circle cx="160" cy="160" r="90" stroke="#0b8f87" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1.2fr_1fr]">

          {/* ── Brand ── */}
          <div>
            <Link href="/">
              <Image
                src="/brand/logo-navbar.png"
                alt="AspireMedX — Smart Revenue Cycle Solutions"
                width={930}
                height={414}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              AspireMedX empowers healthcare organizations with intelligent medical billing,
              credentialing, and revenue cycle management — driving faster payments and cleaner claims.
            </p>

            {/* HIPAA badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#20c4d6]/30 bg-[#20c4d6]/10 px-4 py-1.5 text-xs font-semibold text-[#20c4d6]">
              <ShieldIcon />
              HIPAA Compliant
            </div>

            {/* Social / trust links */}
            <div className="mt-6 flex gap-3">
              <a href={`mailto:${contact.email}`} aria-label="Email" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-[#20c4d6]/40 hover:text-[#20c4d6]">
                <MailIcon />
              </a>
              <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} aria-label="Phone" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-[#20c4d6]/40 hover:text-[#20c4d6]">
                <PhoneIcon />
              </a>
            </div>
          </div>

          {/* ── Company ── */}
          <div>
            <p className="mb-5 font-[family-name:var(--font-display)] text-base font-bold text-white">
              Company
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-[#20c4d6]"
                >
                  {link.label}
                </Link>
              ))}
              {serviceDetails.slice(0, 6).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="text-sm text-white/50 transition-colors hover:text-[#20c4d6]"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Contact Us ── */}
          <div>
            <p className="mb-5 font-[family-name:var(--font-display)] text-base font-bold text-white">
              Contact Us
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/50">
                <span className="mt-0.5 shrink-0 text-[#20c4d6]"><LocationIcon /></span>
                <span>{contact.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-[#20c4d6]"
                >
                  <span className="shrink-0 text-[#20c4d6]"><PhoneIcon /></span>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-[#20c4d6]"
                >
                  <span className="shrink-0 text-[#20c4d6]"><MailIcon /></span>
                  {contact.email}
                </a>
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-white/30 sm:flex-row sm:justify-between">
          <p>© Copyright {year} | All Rights Reserved | <span className="font-semibold text-white/50">AspireMedX.</span></p>
          <p>HIPAA-Aligned | SOC 2 Compliant | BAA Executed</p>
        </div>
      </div>
    </footer>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
