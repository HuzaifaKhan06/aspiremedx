import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SpecialityExplorer from "@/components/speciality/SpecialityExplorer";
import { specialities, featuredSpecialitySlugs, contact, cta } from "@/lib/content";

export const metadata = {
  title: "Speciality Billing Services | AspireMedX",
  description:
    "Speciality medical billing services from AspireMedX — internal medicine, family medicine, cardiology, nephrology, pediatrics, oncology, ophthalmology, and more.",
};

const coreSpecialities = specialities.filter((s) => featuredSpecialitySlugs.includes(s.slug));
const moreSpecialities = specialities.filter((s) => !featuredSpecialitySlugs.includes(s.slug));

const heroStats = [
  { value: `${specialities.length}+`, label: "Specialities billed" },
  { value: `${coreSpecialities.length}`, label: "Core specialities" },
  { value: "1", label: "Accountable billing partner" },
];

export default function SpecialityPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg)]">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 55%, #0b3330 100%)" }}
        >
          <style>{`
            @keyframes spec-float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            @keyframes spec-spin { to { transform: rotate(360deg); } }
            .spec-float { animation: spec-float 6s ease-in-out infinite; }
            .spec-spin { animation: spec-spin 40s linear infinite; }
          `}</style>

          {/* Hex pattern overlay */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="spec-hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="none" stroke="#20c4d6" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#spec-hex)" />
          </svg>
          <div className="pointer-events-none absolute right-0 top-0 h-[70%] w-[45%] opacity-15"
            style={{ background: "radial-gradient(ellipse at top right, #20c4d6, transparent 70%)" }} aria-hidden />

          {/* Floating speciality chips */}
          <div className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden>
            <div className="relative h-64 w-64">
              <div className="spec-spin absolute inset-0 rounded-full border border-dashed border-[#20c4d6]/20" />
              <div className="absolute inset-8 rounded-full border border-[#0b8f87]/25" />
              <div className="absolute inset-[4.5rem] flex items-center justify-center rounded-full border border-[#20c4d6]/30 bg-[#20c4d6]/5">
                <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-white">
                  {specialities.length}
                  <span className="text-[#20c4d6]">+</span>
                </span>
              </div>
              {coreSpecialities.slice(0, 5).map((s, i) => {
                const pos = [
                  "left-1/2 top-0 -translate-x-1/2",
                  "right-0 top-[30%]",
                  "right-6 bottom-6",
                  "left-6 bottom-6",
                  "left-0 top-[30%]",
                ][i];
                return (
                  <span
                    key={s.slug}
                    className={`spec-float absolute ${pos} whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm`}
                    style={{ animationDelay: `${i * 0.8}s` }}
                  >
                    {s.title.replace(/ Billing( Services)?$/, "")}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-12">
            <Reveal className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2 font-mono text-xs text-white/30">
                <Link href="/" className="transition-colors hover:text-[#20c4d6]">Home</Link>
                <span>/</span>
                <span className="text-white/60">Speciality</span>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-[#20c4d6]/30 bg-[#20c4d6]/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#20c4d6]">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#20c4d6]" />
                Speciality Billing
              </span>

              <h1 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl">
                Billing rules change by speciality.
                <br />
                <span style={{ color: "#20c4d6" }}>So does our approach.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                Each speciality runs on its own coding rules, payer quirks, and
                denial patterns. Pick yours to see how AspireMedX handles it.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-7 grid max-w-xl grid-cols-3 gap-3">
              {heroStats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                  <p className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs text-white/50">{s.label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
            style={{ background: "linear-gradient(to bottom, transparent, #f3f8fa)" }} aria-hidden />
        </section>

        <SpecialityExplorer core={coreSpecialities} more={moreSpecialities} />

        {/* CTA */}
        <section className="pb-20">
          <Reveal className="mx-auto max-w-6xl px-6">
            <div
              className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl px-8 py-10 sm:flex-row sm:items-center"
              style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 60%, #0b3330 100%)" }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#20c4d6]/10 blur-2xl" aria-hidden />
              <div className="relative">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                  Don&apos;t see your speciality?
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  We support many more. Talk to us — {contact.email} · {contact.phone}
                </p>
              </div>
              <Link
                href="/contact"
                className="relative shrink-0 rounded-lg px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_24px_-4px_rgba(32,196,214,0.4)] transition-all hover:shadow-[0_6px_32px_-4px_rgba(32,196,214,0.6)] hover:brightness-110"
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
