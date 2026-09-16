import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { serviceDetails } from "@/lib/content";

export const metadata = {
  title: "RCM & Medical Billing Services | AspireMedX",
  description:
    "Full-cycle revenue cycle management — medical billing, credentialing, enrollment, payer contracting, and analytics — from AspireMedX.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg)]">
        {/* Page hero */}
        <section className="border-b border-[var(--color-line)] bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">
              Services
            </p>
            <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-5xl">
              Full-cycle RCM — every service, one partner.
            </h1>
            <p className="mt-4 max-w-xl text-[var(--color-muted)]">
              From credentialing and enrollment to claims management, denial
              recovery, and reporting — AspireMedX covers every stage of the
              revenue cycle so nothing falls through the gaps.
            </p>
          </div>
        </section>

        {/* Service grid */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceDetails.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA band */}
        <section className="border-t border-[var(--color-line)] bg-white py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--color-navy)]">
              Not sure where to start?
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              Book a free revenue and credentialing assessment and we&apos;ll map out
              which services would make the biggest difference for your organization.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-block rounded-lg bg-[var(--color-navy)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(11,31,51,0.35)] transition-all hover:bg-[var(--color-navy-soft)]"
            >
              Get a Free Assessment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-xl border border-[var(--color-line)] bg-white p-8 shadow-sm transition-all hover:border-[var(--color-teal)]/40 hover:shadow-[0_16px_40px_-16px_rgba(11,31,51,0.2)]"
    >
      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)]">
        {service.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
        {service.tagline}
      </p>

      {/* Key benefit pills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {service.keyBenefits.slice(0, 2).map((benefit) => (
          <div
            key={benefit.label}
            className="rounded-lg bg-[var(--color-bg)] px-3 py-2"
          >
            <p className="font-[family-name:var(--font-display)] text-base font-extrabold text-[var(--color-teal)]">
              {benefit.stat}
            </p>
            <p className="mt-0.5 text-[10px] leading-tight text-[var(--color-muted)]">
              {benefit.label}
            </p>
          </div>
        ))}
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-teal)] transition-colors group-hover:text-[var(--color-navy)]">
        Learn more
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
