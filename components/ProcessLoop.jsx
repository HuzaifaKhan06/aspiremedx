import { processSteps } from "@/lib/content";

// Five points evenly spaced around a circle (r=120, center 160,160),
// starting at the top  one point per stage of the revenue cycle.
const NODE_POSITIONS = [
  { x: 160, y: 40 },
  { x: 274, y: 123 },
  { x: 231, y: 257 },
  { x: 89, y: 257 },
  { x: 46, y: 123 },
];

export default function ProcessLoop() {
  return (
    <section id="process" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
            The cycle
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            One claim, five checkpoints, no gaps.
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Every claim moves through the same cycle  a claim only leaves a
            stage once it&apos;s actually ready for the next one.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-12 md:grid-cols-[320px_1fr]">
          <div className="relative mx-auto h-80 w-80 shrink-0">
            <svg viewBox="0 0 320 320" className="h-full w-full">
              <circle
                cx="160"
                cy="160"
                r="120"
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="2"
                strokeDasharray="2 8"
              />
              {/* orbiting marker  paused automatically for reduced-motion users via globals.css */}
              <g className="orbit-spin" style={{ transformOrigin: "160px 160px" }}>
                <circle cx="160" cy="40" r="5" fill="var(--color-amber)" />
              </g>

              {processSteps.map((step, i) => {
                const pos = NODE_POSITIONS[i];
                return (
                  <g key={step.code}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="22"
                      fill="var(--color-bg)"
                      stroke="var(--color-navy)"
                      strokeWidth="1.5"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 5}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize="12"
                      fill="var(--color-navy)"
                    >
                      {step.code}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <ol className="grid gap-6 sm:grid-cols-2">
            {processSteps.map((step) => (
              <li key={step.code} className="border-l-2 border-[var(--color-teal)] pl-4">
                <p className="font-mono text-xs text-[var(--color-teal)]">{step.code}</p>
                <p className="mt-1 font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)]">
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
