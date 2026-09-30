import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingClient from "@/components/pricing/PricingClient";
import { pricingFaqs, contact } from "@/lib/content";

export const metadata = {
  title: "Pricing & Plans | AspireMedX",
  description:
    "Transparent medical billing and RCM pricing. Compare Essential, Professional and Premium plans, see exactly what each includes, or build a custom plan and get a quote.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg)]">
        <PricingClient />

        {/* FAQ */}
        <section className="border-t border-[var(--color-line)] bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">Pricing FAQ</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)]">
                Questions about pricing?
              </h2>
              <p className="mt-4 text-[var(--color-muted)]">
                Still unsure which plan fits? Talk to us at{" "}
                <a href={`mailto:${contact.email}`} className="font-semibold text-[var(--color-teal)] hover:text-[var(--color-navy)]">
                  {contact.email}
                </a>
                .
              </p>
            </div>
            <div className="divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)]">
              {pricingFaqs.map((faq) => (
                <details key={faq.question} className="group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-navy)] [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal-tint)] text-[var(--color-teal)] transition-transform group-open:rotate-45">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div
              className="relative overflow-hidden rounded-3xl px-8 py-14 text-center text-white"
              style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 55%, #0b2a22 100%)" }}
            >
              <div
                className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
                style={{ background: "#20c4d6" }}
                aria-hidden
              />
              <h2 className="relative font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight">
                Not sure which plan is right?
              </h2>
              <p className="relative mx-auto mt-3 max-w-lg text-white/55">
                Get a free revenue and credentialing assessment — we&apos;ll recommend the plan that pays for itself.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-lg px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(32,196,214,0.7)] transition-all hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                >
                  Get a Free Assessment
                </Link>
                <a
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="rounded-lg border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Call {contact.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
