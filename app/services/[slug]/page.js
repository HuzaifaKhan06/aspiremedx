import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { serviceDetails, contact, cta } from "@/lib/content";

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | AspireMedX`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = serviceDetails
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg)]">
        {/* Page hero */}
        <section className="border-b border-[var(--color-line)] bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <Link
              href="/services"
              className="text-sm font-semibold text-[var(--color-teal)] transition-colors hover:text-[var(--color-navy)]"
            >
              ← All services
            </Link>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
              {service.tagline}
            </p>

            {/* Key benefit metrics */}
            <div className="mt-8 flex flex-wrap gap-4">
              {service.keyBenefits.map((benefit) => (
                <div
                  key={benefit.label}
                  className="rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-5 py-4"
                >
                  <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--color-navy)]">
                    {benefit.stat}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-muted)]">{benefit.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
                Overview
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
                {service.overview}
              </p>

              <h2 className="mt-10 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
                Where revenue usually gets stuck
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
                {service.challenges}
              </p>
            </div>

            {/* What we handle card */}
            <div className="rounded-xl border border-[var(--color-line)] bg-white p-7">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">
                What we handle
              </h3>
              <ul className="mt-4 space-y-3.5">
                {service.whatWeHandle.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--color-ink)]"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal-tint)]">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M1.5 4L3 5.5L6.5 2"
                          stroke="var(--color-teal)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="border-y border-[var(--color-line)] bg-[var(--color-navy)] py-16">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                Talk to us about {service.title.toLowerCase()}
              </h2>
              <p className="mt-2 text-sm text-white/60">
                {contact.email} · {contact.phone}
              </p>
            </div>
            <Link
              href="/#contact"
              className="shrink-0 rounded-lg bg-[var(--color-cyan)] px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-all hover:brightness-95"
            >
              {cta.secondary}
            </Link>
          </div>
        </section>

        {/* Other services */}
        {otherServices.length > 0 && (
          <section className="py-16">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)]">
                Other services
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group rounded-xl border border-[var(--color-line)] bg-white p-6 transition-all hover:border-[var(--color-teal)]/40 hover:shadow-md"
                  >
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      {s.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-teal)] transition-colors group-hover:text-[var(--color-navy)]">
                      Learn more →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
