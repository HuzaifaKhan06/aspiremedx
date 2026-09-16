import Link from "next/link";
import { services } from "@/lib/content";
import Reveal from "./Reveal";

const ICONS = {
  "01": BillingIcon,
  "02": CredentialingIcon,
  "03": EnrollmentIcon,
  "04": ContractingIcon,
  "05": RCMIcon,
  "06": AnalyticsIcon,
};

export default function Services() {
  return (
    <section id="services" className="bg-[var(--color-bg)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">
            Services
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            Everything between the visit and the payment.
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Full-cycle coverage — from credentialing through claim submission,
            denial management, and reporting — so nothing falls between the handoffs.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.code];
            return (
              <Reveal key={service.code} delay={i * 60}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-[var(--color-line)] bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-teal)]/40 hover:shadow-[0_16px_40px_-16px_rgba(11,31,51,0.25)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-teal-tint)] text-[var(--color-teal)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-[var(--color-line)]">
                      {service.code}
                    </span>
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-teal)] transition-colors group-hover:text-[var(--color-navy)]">
                    Explore service
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-navy)] shadow-sm transition-all hover:border-[var(--color-navy)] hover:shadow-md"
          >
            View all services
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function BillingIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

function CredentialingIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v6c0 5.5 3.5 8.5 8 11 4.5-2.5 8-5.5 8-11V5z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function EnrollmentIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  );
}

function ContractingIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15l2 2 4-4" />
    </svg>
  );
}

function RCMIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function AnalyticsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M18 17 13 12l-4 4-3-3" />
    </svg>
  );
}
