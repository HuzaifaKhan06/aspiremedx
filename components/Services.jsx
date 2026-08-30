import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="bg-[var(--color-bg)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
            Services
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            Everything between the visit and the payment.
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.code} className="bg-white p-8 transition-colors hover:bg-[var(--color-bg-alt)]">
              <span className="font-mono text-xs text-[var(--color-teal)]">
                {service.code}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
