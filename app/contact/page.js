import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageForm from "@/components/ContactPageForm";
import { contact, heroOffers } from "@/lib/content";

export const metadata = {
  title: "Contact Us | AspireMedX",
  description:
    "Get in touch with AspireMedX. Fill out our contact form and a billing specialist will reach you within one business day.",
};

const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi AspireMedX! I'd like to know more about your services.")}`;

const contactLinks = [
  {
    label: "Email us",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </>
    ),
  },
  {
    label: "Call us",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[^+\d]/g, "")}`,
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: "WhatsApp",
    value: "Chat with our team",
    href: whatsappHref,
    external: true,
    icon: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    ),
  },
  {
    label: "Office",
    value: contact.address,
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

const steps = [
  { step: "1", title: "We review your form", body: "A specialist researches your specialty's billing nuances." },
  { step: "2", title: "30-minute discovery call", body: "At a time that suits you — no pitch, just listening." },
  { step: "3", title: "Custom proposal", body: "Tailored scope, timeline and fees for your practice." },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg)]">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 55%, #0b3330 100%)" }}
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="none" stroke="#20c4d6" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-hex)" />
          </svg>
          <div
            className="pointer-events-none absolute right-0 top-0 h-[70%] w-[45%] opacity-15"
            style={{ background: "radial-gradient(ellipse at top right, #20c4d6, transparent 70%)" }}
            aria-hidden
          />

          <div className="relative mx-auto grid max-w-6xl items-end gap-8 px-6 pb-14 pt-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] text-white/30">
                <Link href="/" className="transition-colors hover:text-[#20c4d6]">Home</Link>
                <span>/</span>
                <span className="text-white/60">Contact Us</span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#20c4d6]/30 bg-[#20c4d6]/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#20c4d6]">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#20c4d6]" />
                Talk to a Specialist
              </span>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-[2.1rem]">
                Let&apos;s start the conversation.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
                Tell us about your practice — the more detail you share, the more tailored our
                response. A billing specialist will be in touch within one business day.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { stat: "< 1 Day", label: "Response time" },
                { stat: "Free", label: "Initial assessment" },
                { stat: "No", label: "Commitment required" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-sm">
                  <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[#20c4d6]">{s.stat}</p>
                  <p className="text-[11px] leading-tight text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10"
            style={{ background: "linear-gradient(to bottom, transparent, #f3f8fa)" }}
            aria-hidden
          />
        </section>

        {/* Main content */}
        <section className="pb-14 pt-6">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-[320px_1fr] lg:items-start">
            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-24">
              {/* Direct contact */}
              <div
                className="relative overflow-hidden rounded-xl p-5 text-white"
                style={{ background: "linear-gradient(160deg, #0b1f33 0%, #0b2a22 100%)" }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#20c4d6]/10 blur-2xl" aria-hidden />
                <p className="relative font-mono text-[10px] font-semibold uppercase tracking-widest text-[#20c4d6]">Direct Contact</p>
                <h2 className="relative mt-1 font-[family-name:var(--font-display)] text-base font-bold">Prefer to reach us directly?</h2>
                <p className="relative mt-1 text-xs text-white/50">Mon–Fri, 9 AM–6 PM ET</p>

                <ul className="relative mt-4 space-y-2.5">
                  {contactLinks.map((c) => {
                    const inner = (
                      <>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#20c4d6] transition-colors group-hover:bg-[#20c4d6] group-hover:text-[#0b1f33]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            {c.icon}
                          </svg>
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] uppercase tracking-wider text-white/35">{c.label}</span>
                          <span className="block truncate text-[13px] text-white/80 group-hover:text-white">{c.value}</span>
                        </span>
                      </>
                    );
                    return (
                      <li key={c.label}>
                        {c.href ? (
                          <a
                            href={c.href}
                            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="group flex items-center gap-3"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div className="group flex items-center gap-3">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="relative mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                  {["HIPAA-compliant", "BAA available", "No spam"].map((b) => (
                    <span key={b} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/50">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Offers */}
              <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
                <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-600">
                  🔥 This month&apos;s offers
                </p>
                <ul className="mt-3 space-y-2">
                  {heroOffers.map((o) => (
                    <li key={o.id} className="flex items-center justify-between gap-2 px-2 text-[13px]">
                      <span className="font-semibold text-[var(--color-navy)]">{o.title}</span>
                      <span className="shrink-0 text-[11px] font-bold text-amber-600">{o.highlight}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 px-2 text-[11px] text-[var(--color-muted)]">Choose one under &ldquo;Claim an Offer&rdquo; in the form.</p>
              </div>

              {/* What happens next */}
              <div className="rounded-xl border border-[var(--color-line)] bg-white p-5 shadow-sm">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-teal)]">What Happens Next</p>
                <ol className="mt-3 space-y-3">
                  {steps.map((s) => (
                    <li key={s.step} className="flex gap-3">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                      >
                        {s.step}
                      </span>
                      <div>
                        <p className="font-[family-name:var(--font-display)] text-[13px] font-bold text-[var(--color-navy)]">{s.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-muted)]">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            {/* Form */}
            <ContactPageForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
