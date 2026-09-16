import Reveal from "@/components/Reveal";

const differentiators = [
  {
    title: "End-to-End Ownership",
    body: "From first credential application to final payment posting — one team owns the entire cycle. No blame-shifting between billing, credentialing, and enrollment.",
    stat: "100%",
    statLabel: "Single-partner accountability",
  },
  {
    title: "Technology-Agnostic Integration",
    body: "We've worked in AdvancedMD, eClinicalWorks, athenahealth, NextGen, Tebra, and 50+ other systems. We configure our workflow inside your platform — not the other way around.",
    stat: "50+",
    statLabel: "PM & EHR platforms supported",
  },
  {
    title: "Specialty-Trained Billing Teams",
    body: "DME billing and oncology coding require entirely different expertise. We staff each engagement with billers who know that specialty's code set, modifier rules, and payer policies.",
    stat: "20+",
    statLabel: "Specialties covered by dedicated teams",
  },
  {
    title: "Proactive Expirable Tracking",
    body: "Licenses, DEA numbers, malpractice coverage, CAQH attestations — we track every expiration date before it creates a denial, not after it causes one.",
    stat: "0",
    statLabel: "Missed expirables on our watch",
  },
];

export default function AboutWhy() {
  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(160deg, #0b1f33 0%, #0b2a22 100%)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#20c4d6]">
            Why AspireMedX
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-white sm:text-4xl">
            What Makes Us Different
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Not every RCM firm is built the same. Here's what separates an AspireMedX engagement from the alternative.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 80}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-[#20c4d6]/30 hover:bg-white/8">
                {/* Hex corner accent */}
                <svg className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 opacity-10" aria-hidden>
                  <polygon points="32,2 60,17 60,47 32,62 4,47 4,17" fill="none" stroke="#20c4d6" strokeWidth="1" />
                </svg>

                {/* Stat bubble */}
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                  >
                    <span className="font-[family-name:var(--font-display)] text-lg font-extrabold text-white">
                      {d.stat}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white/50">{d.statLabel}</p>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{d.body}</p>

                {/* Bottom gradient line */}
                <div
                  className="mt-7 h-px w-full opacity-20 transition-opacity group-hover:opacity-50"
                  style={{ background: "linear-gradient(to right, #0b8f87, #20c4d6, transparent)" }}
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Comparison row */}
        <Reveal className="mt-14" delay={100}>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-3 bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/30">
              <span>Capability</span>
              <span className="text-center">Typical Billing Firm</span>
              <span className="text-right text-[#20c4d6]">AspireMedX</span>
            </div>
            {[
              ["Credentialing & Enrollment", "Separate vendor", "Included"],
              ["CAQH Maintenance", "Client manages", "We own it"],
              ["Payer Contract Benchmarking", "Not offered", "Standard"],
              ["Technology Integration", "1–2 platforms", "50+ platforms"],
              ["Denial Root-Cause Analysis", "Generic appeal", "Specialty-specific fix"],
              ["Real-Time KPI Reporting", "Monthly PDF", "Live dashboard"],
            ].map(([cap, typical, ours], i) => (
              <div
                key={cap}
                className={`grid grid-cols-3 border-t border-white/5 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
              >
                <span className="font-medium text-white/70">{cap}</span>
                <span className="text-center text-white/30">{typical}</span>
                <span className="text-right font-semibold text-[#20c4d6]">{ours}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
