import { differentiators } from "@/lib/content";

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-[var(--color-navy)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-amber)]">
            Why AspireMedX
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Billing run by people who read the denial letters.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {differentiators.map((item) => (
            <div key={item.title} className="border-t border-white/15 pt-5">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
