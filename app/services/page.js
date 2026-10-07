import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import { serviceDetails, serviceGroups, processSteps, processIntro, contact, cta } from "@/lib/content";
import HeroBackground from "@/components/HeroBackground";

export const metadata = {
  title: "Medical Billing, RCM & Practice Growth Services | AspireMedX",
  description:
    "Medical billing, credentialing, coding, revenue cycle management, virtual medical assistants, medical scribing, web development, healthcare SEO, and digital marketing — from AspireMedX.",
};

const groups = serviceGroups.map((g) => ({
  ...g,
  id: g.label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, ""),
  items: g.slugs.map((slug) => serviceDetails.find((s) => s.slug === slug)).filter(Boolean),
}));

const heroStats = [
  { value: `${serviceDetails.length}`, label: "Services under one roof" },
  { value: "98%+", label: "First-pass clean claims" },
  { value: "100%", label: "HIPAA-compliant team" },
];

// Six tiles for the hero visual — the services most practices start with.
const heroTiles = ["medical-billing", "provider-credentialing", "medical-coding", "revenue-cycle-management", "virtual-medical-assistant", "medical-scribing"]
  .map((slug) => serviceDetails.find((s) => s.slug === slug))
  .filter(Boolean);

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg)]">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 55%, #0b3330 100%)" }}
        >
          <HeroBackground src="/heroes/Services-Hero.webp" position="center 3%" />

          <style>{`
            @keyframes svc-float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
            }
            .svc-float { animation: svc-float 6s ease-in-out infinite; }
          `}</style>

          {/* Grid pattern overlay */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="svc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0v40" fill="none" stroke="#20c4d6" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#svc-grid)" />
          </svg>
          <div
            className="pointer-events-none absolute right-0 top-0 h-[80%] w-[50%] opacity-20"
            style={{ background: "radial-gradient(ellipse at top right, #20c4d6, transparent 70%)" }}
            aria-hidden
          />

          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-14 pt-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Reveal>
                <div className="mb-3 flex items-center gap-2 font-mono text-[11px] text-white/30">
                  <Link href="/" className="transition-colors hover:text-[#20c4d6]">Home</Link>
                  <span>/</span>
                  <span className="text-white/60">Services</span>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-[#20c4d6]/30 bg-[#20c4d6]/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#20c4d6]">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#20c4d6]" />
                  Our Services
                </span>

                <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-3xl lg:text-[2.1rem]">
                  Everything your practice needs{" "}
                  <span style={{ color: "#20c4d6" }}>to get paid and grow.</span>
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
                  From medical billing, coding, and credentialing to virtual
                  assistants, scribes, and patient-growth marketing — one
                  accountable partner for your revenue and your reach.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Link
                    href="/contact"
                    className="rounded-lg px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_24px_-4px_rgba(32,196,214,0.4)] transition-all hover:shadow-[0_6px_32px_-4px_rgba(32,196,214,0.6)] hover:brightness-110"
                    style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                  >
                    Get a Free Audit
                  </Link>
                  <a
                    href="#all-services"
                    className="rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#20c4d6]/60 hover:bg-white/10"
                  >
                    Explore Services
                  </a>
                </div>
              </Reveal>

              <Reveal delay={120} className="mt-6 grid max-w-md grid-cols-3 gap-2.5">
                {heroStats.map((s) => (
                  <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                    <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-white">{s.value}</p>
                    <p className="text-[11px] leading-tight text-white/50">{s.label}</p>
                  </div>
                ))}
              </Reveal>
            </div>

            {/* Hero visual — floating service tiles */}
            <Reveal delay={200} className="hidden lg:block">
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40">Revenue cycle, covered</p>
                  <span className="flex items-center gap-1.5 rounded-full bg-[#0b8f87]/20 px-2 py-0.5 text-[10px] font-semibold text-[#20c4d6]">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#20c4d6]" />
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {heroTiles.map((s, i) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="svc-float group flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#0b1f33]/60 p-2.5 transition-colors hover:border-[#20c4d6]/50"
                      style={{ animationDelay: `${i * 0.6}s` }}
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white"
                        style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                      >
                        <ServiceIcon slug={s.slug} className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-semibold leading-tight text-white/85 group-hover:text-white">{s.title}</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <div>
                    <p className="text-[10px] text-white/40">Average days in A/R</p>
                    <p className="font-[family-name:var(--font-display)] text-base font-extrabold text-white">24 days</p>
                  </div>
                  <svg viewBox="0 0 120 36" className="h-7 w-24" aria-hidden>
                    <path d="M0 8 L20 12 L40 10 L60 18 L80 22 L100 26 L120 30" fill="none" stroke="#20c4d6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Reveal>
          </div>

          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10"
            style={{ background: "linear-gradient(to bottom, transparent, #f3f8fa)" }}
            aria-hidden
          />
        </section>

        {/* Category jump bar */}
        <div id="all-services" className="relative z-10 mx-auto -mt-6 max-w-6xl scroll-mt-24 px-6">
          <div className="grid gap-2 rounded-xl border border-[var(--color-line)] bg-white p-2 shadow-[0_20px_45px_-25px_rgba(11,31,51,0.35)] sm:grid-cols-3">
            {groups.map((g, i) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[var(--color-bg)]"
              >
                <span className="font-mono text-xs font-semibold text-[var(--color-teal)]">0{i + 1}</span>
                <span className="flex-1">
                  <span className="block font-[family-name:var(--font-display)] text-[13px] font-bold text-[var(--color-navy)]">{g.label}</span>
                  <span className="block text-[11px] text-[var(--color-muted)]">{g.items.length} services</span>
                </span>
                <span aria-hidden className="text-[var(--color-teal)] transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            ))}
          </div>
        </div>

        {/* Service groups */}
        {groups.map((group, gi) => (
          <section key={group.id} id={group.id} className="scroll-mt-24 py-10">
            <div className="mx-auto max-w-6xl px-6">
              <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--color-teal)]">
                    0{gi + 1} — {group.label}
                  </p>
                  <h2 className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-2xl">
                    {group.description}
                  </h2>
                </div>
              </Reveal>

              {(() => {
                // Bigger groups go four across; an open slot gets a contact card
                // so rows never end with a gap.
                const cols = group.items.length > 4 ? 4 : 3;
                return (
                  <div className={`mt-6 grid gap-4 sm:grid-cols-2 ${cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
                    {group.items.map((service, i) => (
                      <Reveal key={service.slug} delay={(i % cols) * 80} className="h-full">
                        <ServiceCard service={service} featured={gi === 0 && i === 0} compact={cols === 4} />
                      </Reveal>
                    ))}
                    {group.items.length % cols !== 0 && (
                      <Reveal delay={(group.items.length % cols) * 80} className="h-full">
                        <TalkCard />
                      </Reveal>
                    )}
                  </div>
                );
              })()}
            </div>
          </section>
        ))}

        {/* How we work */}
        <section className="border-y border-[var(--color-line)] bg-white py-12">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">How we work</p>
              <h2 className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-2xl">
                A clear path from first call to ongoing results.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{processIntro}</p>
            </Reveal>

            <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step, i) => (
                <Reveal as="li" key={step.code} delay={i * 80} className="relative rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] p-4">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                  >
                    {step.code}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-[13px] font-bold text-[var(--color-navy)]">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">{step.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14">
          <Reveal className="mx-auto max-w-6xl px-6">
            <div
              className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl px-7 py-8 sm:flex-row sm:items-center"
              style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 60%, #0b3330 100%)" }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#20c4d6]/10 blur-2xl" aria-hidden />
              <div className="relative">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  Not sure where to start?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-white/60">
                  Book a free revenue and credentialing assessment and we&apos;ll map out which
                  services would make the biggest difference. {contact.email} · {contact.phone}
                </p>
              </div>
              <Link
                href="/contact"
                className="relative shrink-0 rounded-lg px-6 py-3 text-[13px] font-bold text-white shadow-[0_4px_24px_-4px_rgba(32,196,214,0.4)] transition-all hover:shadow-[0_6px_32px_-4px_rgba(32,196,214,0.6)] hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
              >
                {cta.secondary}
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}

function TalkCard() {
  return (
    <Link
      href="/contact"
      className="group flex h-full flex-col items-start justify-center rounded-2xl border-2 border-dashed border-[var(--color-teal)]/30 bg-[var(--color-teal-tint)]/50 p-5 transition-colors hover:border-[var(--color-teal)] hover:bg-[var(--color-teal-tint)]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[var(--color-teal)] shadow-sm">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      </span>
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-navy)]">
        Need a custom mix?
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-muted)]">
        Tell us about your practice and we&apos;ll recommend the right combination of services.
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-teal)] group-hover:text-[var(--color-navy)]">
        Talk to a specialist
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}

function ServiceCard({ service, featured, compact }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border ${compact ? "p-5" : "p-6"} transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? "border-transparent text-white shadow-[0_20px_45px_-20px_rgba(11,31,51,0.5)]"
          : "border-[var(--color-line)] bg-white shadow-sm hover:border-[var(--color-teal)]/40 hover:shadow-[0_20px_45px_-20px_rgba(11,31,51,0.3)]"
      }`}
      style={featured ? { background: "linear-gradient(145deg, #0b1f33 0%, #173b57 70%, #0b3330 100%)" } : undefined}
    >
      {/* Accent bar that grows on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: "linear-gradient(90deg, #0b8f87, #20c4d6)" }}
      />

      <div className="flex items-start justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
            featured ? "text-white" : "bg-[var(--color-navy)] text-white group-hover:bg-[var(--color-teal)]"
          }`}
          style={featured ? { background: "linear-gradient(135deg, #0b8f87, #20c4d6)" } : undefined}
        >
          <ServiceIcon slug={service.slug} className="h-5 w-5" />
        </span>
        {featured && (
          <span className="rounded-full border border-[#20c4d6]/40 bg-[#20c4d6]/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#20c4d6]">
            Most popular
          </span>
        )}
      </div>

      <h3 className={`mt-4 font-[family-name:var(--font-display)] text-base font-bold ${featured ? "text-white" : "text-[var(--color-navy)]"}`}>
        {service.title}
      </h3>
      <p className={`mt-1.5 text-[13px] leading-relaxed ${featured ? "text-white/65" : "text-[var(--color-muted)]"}`}>
        {service.tagline}
      </p>

      <ul className="mt-4 flex-1 space-y-1.5">
        {service.whatWeHandle.slice(0, 3).map((point) => (
          <li key={point} className={`flex items-start gap-2 text-xs leading-snug ${featured ? "text-white/80" : "text-[var(--color-ink)]"}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={featured ? "#20c4d6" : "var(--color-teal)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden>
              <path d="m5 12 5 5L20 7" />
            </svg>
            {point}
          </li>
        ))}
      </ul>

      <div className={`mt-5 flex items-center justify-between border-t pt-3 ${featured ? "border-white/10" : "border-[var(--color-line)]"}`}>
        <div>
          <p className={`font-[family-name:var(--font-display)] text-sm font-extrabold ${featured ? "text-[#20c4d6]" : "text-[var(--color-teal)]"}`}>
            {service.keyBenefits[0].stat}
          </p>
          <p className={`text-[10px] ${featured ? "text-white/50" : "text-[var(--color-muted)]"}`}>{service.keyBenefits[0].label}</p>
        </div>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm transition-all group-hover:translate-x-0.5 ${
            featured ? "bg-white/10 text-white group-hover:bg-[#20c4d6] group-hover:text-[#0b1f33]" : "bg-[var(--color-bg)] text-[var(--color-navy)] group-hover:bg-[var(--color-teal)] group-hover:text-white"
          }`}
          aria-label={`Learn more about ${service.title}`}
        >
          →
        </span>
      </div>
    </Link>
  );
}
