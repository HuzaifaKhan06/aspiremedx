import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecialityCard from "@/components/SpecialityCard";
import { dmeDetail, specialities, contact } from "@/lib/content";

export const metadata = {
  title: `${dmeDetail.title} | AspireMedX`,
  description: dmeDetail.tagline,
};

export default function DmeBillingPage() {
  const otherSpecialities = specialities.filter((item) => item.slug !== "dme-billing").slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg)]">
        {/* Breadcrumb + hero */}
        <section className="border-b border-[var(--color-line)] bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-sm text-[var(--color-muted)]">
              <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/speciality" className="hover:text-[var(--color-navy)]">Speciality</Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--color-navy)]">DME Billing</span>
            </p>

            <div className="mt-6 grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
                  Speciality billing
                </p>
                <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
                  {dmeDetail.title}
                </h1>
                <p className="mt-4 max-w-xl text-lg text-[var(--color-muted)]">
                  {dmeDetail.tagline}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/#contact"
                    className="rounded-md bg-[var(--color-amber)] px-6 py-3 text-sm font-semibold text-[var(--color-navy-dark)] hover:bg-[var(--color-amber-dark)]"
                  >
                    Request a Consultation
                  </Link>
                  <a
                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                    className="rounded-md border border-[var(--color-line)] px-6 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]"
                  >
                    Call {contact.phone}
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-alt)] p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
                  Equipment we bill for
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                  {dmeDetail.equipmentCategories.map((item) => (
                    <li key={item} className="text-sm leading-snug text-[var(--color-ink)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Overview + how we help */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              Overview
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{dmeDetail.intro}</p>

            <h2 className="mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              How AspireMedX handles DME billing
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{dmeDetail.howWeHelp}</p>
          </div>
        </section>

        {/* Why partner with us */}
        <section className="border-y border-[var(--color-line)] bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              Why partner with AspireMedX for DME billing
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {dmeDetail.reasons.map((reason) => (
                <div key={reason.title} className="border-t border-[var(--color-line)] pt-5">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              Frequently asked questions
            </h2>
            <div className="mt-6 divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
              {dmeDetail.faqs.map((faq) => (
                <details key={faq.question} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)]">
                    {faq.question}
                    <span className="ml-4 shrink-0 text-[var(--color-teal)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="border-y border-[var(--color-line)] bg-[var(--color-navy)] py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                Ready to simplify your DME billing?
              </h2>
              <p className="mt-2 text-sm text-white/70">{contact.email} · {contact.phone}</p>
            </div>
            <Link
              href="/#contact"
              className="shrink-0 rounded-md bg-[var(--color-amber)] px-6 py-3 text-sm font-semibold text-[var(--color-navy-dark)] hover:bg-[var(--color-amber-dark)]"
            >
              Request a Consultation
            </Link>
          </div>
        </section>

        {/* Other specialities */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
              Other specialities
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {otherSpecialities.map((item) => (
                <SpecialityCard key={item.slug} speciality={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
