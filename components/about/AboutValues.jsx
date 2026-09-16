import Reveal from "@/components/Reveal";

const values = [
  {
    number: "01",
    title: "Accuracy First",
    body: "Every claim we submit has been through a rigorous scrubbing process. We'd rather slow down to get it right than submit fast and fix it later.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Radical Transparency",
    body: "You'll always know your clean claim rate, your denial reasons, and your A/R aging. No black boxes — just the data you need to make decisions.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <rect x="4" y="4" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 28h24M10 28v-6M16 28v-4M22 28v-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Proactive, Not Reactive",
    body: "We track expiration dates, authorization windows, and payer policy changes before they create a problem — not after a denial lands.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 9v7l5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Specialization Over Generalization",
    body: "We staff billing teams by specialty — not by alphabet. A DME biller and an oncology coder have entirely different skills, and we treat them that way.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <path d="M16 4l4 8h8l-6.5 5 2.5 8-8-5-8 5 2.5-8L4 12h8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Zero-Disruption Transition",
    body: "We onboard inside your existing EHR and PM systems. No forced migrations, no training overhauls — just a new billing partner that shows up ready to work.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <path d="M6 16a10 10 0 1 1 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 26v-6M12 24l4 2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "One Accountable Partner",
    body: "Credentialing, enrollment, billing, and reporting — one team, one SLA, one point of contact. Not three vendors pointing at each other when something goes wrong.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <circle cx="12" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="22" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 28c0-5.523 3.582-10 8-10M20 18c4.418 0 8 4.477 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 28c0-5.523 3.582-10 8-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function AboutValues() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">
            What We Stand For
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            Our Core Values
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-muted)]">
            The principles that shape every decision we make for our clients.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.number} delay={i * 60}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-teal)]/40 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(11,31,51,0.2)]">
                {/* Number badge */}
                <span className="absolute right-5 top-5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-line)] transition-colors group-hover:text-[var(--color-teal)]/30">
                  {v.number}
                </span>

                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-teal-tint)] text-[var(--color-teal)] transition-all group-hover:bg-[var(--color-teal)] group-hover:text-white">
                  {v.icon}
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                  {v.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {v.body}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-0.5 w-0 rounded-full bg-gradient-to-r from-[var(--color-teal)] to-[#20c4d6] transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
