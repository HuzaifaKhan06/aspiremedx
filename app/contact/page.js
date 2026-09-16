import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageForm from "@/components/ContactPageForm";
import { contact } from "@/lib/content";

export const metadata = {
  title: "Contact Us | AspireMedX",
  description:
    "Get in touch with AspireMedX. Fill out our contact form and a billing specialist will reach you within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden pb-0 pt-32"
          style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 55%, #0b2a22 100%)" }}
        >
          {/* Hex overlay */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.045]" aria-hidden xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-hex" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
                <polygon points="25,2 46,13 46,36 25,47 4,36 4,13" fill="none" stroke="#20c4d6" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-hex)" />
          </svg>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-10"
            style={{ background: "radial-gradient(ellipse at top right, #20c4d6, transparent 65%)" }} aria-hidden />

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-white/30" aria-label="Breadcrumb">
              <a href="/" className="transition-colors hover:text-white/60">Home</a>
              <span aria-hidden>/</span>
              <span className="text-white/60">Contact Us</span>
            </nav>

            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#20c4d6]">
              Talk to a Specialist
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Let's Start the Conversation
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-white/50">
              Fill in the form below — the more detail you share, the more tailored our response will be. A billing specialist will be in touch within one business day.
            </p>

            {/* Quick stats */}
            <div className="mx-auto mt-10 flex flex-wrap justify-center gap-6 pb-16 text-center">
              {[
                { stat: "< 1 Day", label: "Response Time" },
                { stat: "Free", label: "Initial Assessment" },
                { stat: "No Commitment", label: "Required" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 px-6 py-4">
                  <p className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[#20c4d6]">{s.stat}</p>
                  <p className="mt-1 text-xs font-semibold text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="h-16 w-full" style={{ background: "linear-gradient(to bottom, transparent, #f3f8fa)" }} aria-hidden />
        </section>

        {/* Main content */}
        <section className="bg-[var(--color-bg)] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">

              {/* Left sidebar */}
              <div className="space-y-6 lg:sticky lg:top-28">
                {/* Contact details card */}
                <div
                  className="relative overflow-hidden rounded-2xl p-8 text-white"
                  style={{ background: "linear-gradient(160deg, #0b1f33 0%, #0b2a22 100%)" }}
                >
                  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="sidebar-hex" x="0" y="0" width="40" height="35" patternUnits="userSpaceOnUse">
                        <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" fill="none" stroke="#20c4d6" strokeWidth="0.7" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#sidebar-hex)" />
                  </svg>

                  <div className="relative">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#20c4d6]">Direct Contact</p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">Get in Touch</h2>
                    <p className="mt-2 text-sm text-white/50">Prefer to reach us directly? We're available Mon–Fri, 9 AM–6 PM ET.</p>

                    <div className="mt-6 space-y-4">
                      <a href={`mailto:${contact.email}`} className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#20c4d6] transition-colors group-hover:bg-[#20c4d6] group-hover:text-white">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                            <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />
                          </svg>
                        </span>
                        {contact.email}
                      </a>
                      <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#20c4d6] transition-colors group-hover:bg-[#20c4d6] group-hover:text-white">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </span>
                        {contact.phone}
                      </a>
                      <p className="flex items-start gap-3 text-sm text-white/60">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#20c4d6]">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                        </span>
                        {contact.address}
                      </p>
                    </div>

                    <div className="mt-7 border-t border-white/10 pt-7 space-y-2">
                      {["HIPAA-Compliant Intake", "BAA Available on Request", "No Spam · No Cold Calls"].map((b) => (
                        <div key={b} className="flex items-center gap-2 text-xs text-white/40">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#20c4d6]" aria-hidden />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* What to expect */}
                <div className="rounded-2xl border border-[var(--color-line)] bg-white p-7 shadow-sm">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-teal)]">What Happens Next</p>
                  <div className="mt-5 space-y-5">
                    {[
                      { step: "1", title: "We Review Your Form", body: "A billing specialist reads through your submission and researches your specialty's billing nuances." },
                      { step: "2", title: "Discovery Call", body: "We schedule a 30-minute discovery call at a time that works for you — no pitch, just listening." },
                      { step: "3", title: "Custom Proposal", body: "We send a tailored scope, timeline, and fee structure specific to your practice size and specialty." },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4">
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                        >{s.step}</span>
                        <div>
                          <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-navy)]">{s.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{s.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div>
                <ContactPageForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
