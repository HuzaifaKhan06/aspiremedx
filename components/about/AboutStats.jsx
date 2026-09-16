import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";

const stats = [
  { value: 98, suffix: "%+", label: "First-Pass Clean Claim Rate", color: "#20c4d6" },
  { value: 30, prefix: "< ", suffix: " Days", label: "Average Days in A/R", color: "#0b8f87" },
  { value: 120, suffix: "+", label: "Payer Relationships", color: "#20c4d6" },
  { value: 100, suffix: "%", label: "HIPAA Compliance Coverage", color: "#0b8f87" },
];

export default function AboutStats() {
  return (
    <section
      className="py-16"
      style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 50%, #0b2a22 100%)" }}
    >
      {/* Hex overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stat-hex" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
            <polygon points="25,2 46,13 46,36 25,47 4,36 4,13" fill="none" stroke="#20c4d6" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stat-hex)" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#20c4d6]">
            By The Numbers
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-white sm:text-4xl">
            Results That Speak for Themselves
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-sm transition-all hover:border-[#20c4d6]/30 hover:bg-white/8">
                <p
                  className="font-[family-name:var(--font-display)] text-4xl font-extrabold"
                  style={{ color: stat.color }}
                >
                  {stat.prefix || ""}
                  <Counter value={stat.value} suffix="" onMount={false} duration={1600} />
                  {stat.suffix}
                </p>
                <p className="mt-3 text-sm font-semibold text-white/60">{stat.label}</p>
                <div className="mx-auto mt-4 h-0.5 w-8 rounded-full" style={{ background: stat.color, opacity: 0.4 }} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Two accent quotes */}
        <Reveal className="mt-14 grid gap-5 sm:grid-cols-2" delay={100}>
          {[
            { quote: "We don't just file claims — we own the outcome.", attr: "AspireMedX Philosophy" },
            { quote: "Credentialing, enrollment, and billing don't have to be three separate headaches.", attr: "Our Client Promise" },
          ].map((q) => (
            <div
              key={q.attr}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7"
            >
              <span className="absolute -left-2 -top-4 font-serif text-8xl leading-none text-[#20c4d6] opacity-20 select-none" aria-hidden>"</span>
              <p className="relative font-[family-name:var(--font-display)] text-lg font-semibold text-white">{q.quote}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/30">{q.attr}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
