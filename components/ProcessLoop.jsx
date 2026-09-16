import { processSteps, processIntro } from "@/lib/content";
import Reveal from "./Reveal";

export default function ProcessLoop() {
  return (
    <section id="process" className="bg-[var(--color-bg)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">
            Our Proven Process
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            From assessment to optimization — a structured path.
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">{processIntro}</p>
        </Reveal>

        {/* Desktop: horizontal timeline */}
        <div className="mt-14 hidden lg:block">
          <div className="relative flex items-start">
            {/* Connecting line */}
            <div className="absolute left-[3.5rem] right-[3.5rem] top-7 h-px bg-[var(--color-line)]" />

            {processSteps.map((step, i) => (
              <Reveal key={step.code} delay={i * 80} className="relative flex flex-1 flex-col items-center px-3 text-center">
                {/* Step number circle */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-navy)] bg-white font-[family-name:var(--font-display)] text-base font-extrabold text-[var(--color-navy)]">
                  {parseInt(step.code)}
                  {i === 0 && (
                    <span className="pulse-dot absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--color-cyan)]" />
                  )}
                </div>
                <div className="mt-4">
                  <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-navy)]">
                    {step.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical numbered steps */}
        <ol className="mt-10 space-y-5 lg:hidden">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.code} delay={i * 60} className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-navy)] bg-white font-[family-name:var(--font-display)] text-sm font-extrabold text-[var(--color-navy)]">
                {parseInt(step.code)}
              </div>
              <div className="flex-1 pb-5 last:pb-0">
                <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">
                  {step.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
