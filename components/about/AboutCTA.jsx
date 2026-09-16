import Reveal from "@/components/Reveal";
import Link from "next/link";
import { contact } from "@/lib/content";

export default function AboutCTA() {
  return (
    <section className="bg-[var(--color-bg)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-2xl p-12 text-center"
            style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 60%, #0b2a22 100%)" }}
          >
            {/* Hex overlay */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-hex" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
                  <polygon points="25,2 46,13 46,36 25,47 4,36 4,13" fill="none" stroke="#20c4d6" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-hex)" />
            </svg>

            {/* Glow */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-10"
              style={{ background: "radial-gradient(ellipse at top right, #20c4d6, transparent 60%)" }} aria-hidden />

            <div className="relative">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#20c4d6]">
                Ready to Partner
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold text-white sm:text-4xl">
                Let's Transform Your Revenue Cycle
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/55">
                Tell us about your organization — specialty, size, and biggest billing pain points — and we'll walk you through exactly how AspireMedX would approach your revenue cycle.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/#contact"
                  className="rounded-lg px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_24px_-4px_rgba(32,196,214,0.4)] transition-all hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                >
                  Get a Free Assessment
                </Link>
                <a
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#20c4d6]/40 hover:bg-white/10"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {contact.phone}
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {["HIPAA Compliant", "BAA Executed", "Audit-Ready", "No Long-Term Contracts"].map((b) => (
                  <span key={b} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/40">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Three quick links */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Our Services", href: "/services", desc: "See the full scope of what we manage." },
            { label: "Specialities", href: "/speciality", desc: "Find your specialty in our expert coverage." },
            { label: "Contact Us", href: "/#contact", desc: "Reach us directly — no forms required." },
          ].map((item) => (
            <Reveal key={item.label}>
              <Link
                href={item.href}
                className="group flex items-center justify-between rounded-xl border border-[var(--color-line)] bg-white p-5 shadow-sm transition-all hover:border-[var(--color-teal)]/30 hover:shadow-md"
              >
                <div>
                  <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">{item.label}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{item.desc}</p>
                </div>
                <span className="text-[var(--color-teal)] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
