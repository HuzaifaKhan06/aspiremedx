import { whyUsBands } from "@/lib/content";
import Reveal from "./Reveal";

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-white">
      <div className="border-b border-[var(--color-line)] bg-[var(--color-bg)] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
              Why AspireMedX
            </p>
            <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
              Scale, technology, and domain expertise, delivered as one platform.
            </h2>
          </Reveal>
        </div>
      </div>

      {whyUsBands.map((band, i) => (
        <div
          key={band.eyebrow}
          className={`border-b border-[var(--color-line)] py-16 ${i % 2 === 1 ? "bg-[var(--color-bg)]" : "bg-white"}`}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className={`grid gap-12 md:grid-cols-2 md:items-center ${band.reverse ? "md:[&>*:first-child]:order-last" : ""}`}>
              <Reveal>
                <BandGraphic type={band.graphic} />
              </Reveal>

              <Reveal delay={100}>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
                  {band.eyebrow}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
                  {band.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {band.intro}
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {band.groups.map((group) => (
                    <div key={group.heading}>
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-navy)]">
                        {group.heading}
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-snug text-[var(--color-ink)]">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-teal)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function BandGraphic({ type }) {
  return (
    <div className="rounded-lg border border-[var(--color-line)] bg-white p-6 shadow-[0_20px_50px_-30px_rgba(11,31,51,0.35)]">
      {type === "bars" && <BarsGraphic />}
      {type === "radial" && <RadialGraphic />}
      {type === "automation" && <AutomationGraphic />}
      {type === "shield" && <ShieldGraphic />}
    </div>
  );
}

function BarsGraphic() {
  const bars = [38, 52, 46, 60, 55, 70, 64, 78, 74, 88];
  const maxBar = Math.max(...bars);
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
        Billed revenue managed
      </p>
      <div className="mt-4 flex h-40 items-end gap-1.5">
        {bars.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--color-navy)] to-[var(--color-cyan)]"
            style={{ height: `${(v / maxBar) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-[var(--color-line)] pt-3 text-xs text-[var(--color-muted)]">
        <span>Quarterly volume trend</span>
        <span className="font-mono font-semibold text-[var(--color-teal)]">↑ Illustrative</span>
      </div>
    </div>
  );
}

function RadialGraphic() {
  const metrics = [
    { label: "Clean claim rate", value: 96, color: "var(--color-navy)" },
    { label: "On-time posting", value: 91, color: "var(--color-teal)" },
    { label: "Denial recovery", value: 83, color: "var(--color-cyan)" },
  ];
  const r = 15.9155;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col items-center text-center">
          <svg viewBox="0 0 36 36" className="h-20 w-20">
            <circle cx="18" cy="18" r={r} fill="none" stroke="var(--color-line)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r={r}
              fill="none"
              stroke={m.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(m.value / 100) * circumference} ${circumference}`}
              transform="rotate(-90 18 18)"
            />
            <text x="18" y="21" textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fill="var(--color-navy)">
              {m.value}%
            </text>
          </svg>
          <p className="mt-2 text-[11px] leading-tight text-[var(--color-muted)]">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

function AutomationGraphic() {
  const nodes = [
    { x: 60, y: 30, label: "Eligibility" },
    { x: 200, y: 30, label: "Coding" },
    { x: 30, y: 110, label: "Claims" },
    { x: 230, y: 110, label: "Follow-up" },
    { x: 130, y: 150, label: "A/R" },
  ];
  const center = { x: 130, y: 80 };

  return (
    <div>
      <svg viewBox="0 0 260 170" className="h-40 w-full">
        {nodes.map((n) => (
          <line
            key={n.label}
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="var(--color-line)"
            strokeWidth="1.5"
          />
        ))}
        <circle cx={center.x} cy={center.y} r="16" fill="var(--color-navy)" />
        <text x={center.x} y={center.y + 4} textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fill="white">
          RCM
        </text>
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="20" fill="var(--color-teal-tint)" stroke="var(--color-teal)" strokeWidth="1.5" />
            <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill="var(--color-navy)">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-3 border-t border-[var(--color-line)] pt-3 text-xs text-[var(--color-muted)]">
        Automated hand-offs between workflow stages
      </p>
    </div>
  );
}

function ShieldGraphic() {
  const items = ["HIPAA-aligned", "Audit-ready", "SLA-tracked"];
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 100 110" className="h-28 w-24 shrink-0">
        <path
          d="M50 4 92 20v34c0 32-22 46-42 52C30 100 8 86 8 54V20z"
          fill="var(--color-navy)"
        />
        <path d="M32 54 44 66 70 38" fill="none" stroke="var(--color-cyan)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-teal)]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
