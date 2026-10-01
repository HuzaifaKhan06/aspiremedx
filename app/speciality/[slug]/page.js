import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecialityCard from "@/components/SpecialityCard";
import SpecialityIcon from "@/components/speciality/SpecialityIcon";
import { specialities, contact, cta } from "@/lib/content";

export function generateStaticParams() {
  return specialities
    .filter((item) => item.slug !== "dme-billing")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const speciality = specialities.find((item) => item.slug === slug);
  if (!speciality) return {};
  return {
    title: `${speciality.title} | AspireMedX`,
    description: speciality.tagline,
  };
}

export default async function SpecialityDetailPage({ params }) {
  const { slug } = await params;
  const speciality = specialities.find((item) => item.slug === slug);
  if (!speciality) notFound();

  const otherSpecialities = specialities.filter((item) => item.slug !== speciality.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg)]">
        <section className="border-b border-[var(--color-line)] bg-white py-12">
          <div className="mx-auto max-w-4xl px-6">
            <Link href="/speciality" className="text-sm font-semibold text-[var(--color-teal)] hover:text-[var(--color-navy)]">
              ← All specialities
            </Link>
            <div className="mt-6 flex items-center gap-5">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-teal-tint)] shadow-[0_12px_30px_-18px_rgba(11,143,135,0.6)] [--ic-1:#0b8f87] [--ic-2:#20c4d6] [--ic-3:#e5f3f2]">
                <SpecialityIcon slug={speciality.slug} className="h-10 w-10" />
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
                {speciality.title}
              </h1>
            </div>
            <p className="mt-4 max-w-2xl text-sm text-[var(--color-muted)] sm:text-base">
              {speciality.tagline}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-4xl gap-12 px-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
                Overview
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
                {speciality.overview}
              </p>

              <h2 className="mt-10 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
                Where claims usually go wrong
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
                {speciality.challenges}
              </p>
            </div>

            <div className="rounded-lg border border-[var(--color-line)] bg-white p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
                What we handle
              </h3>
              <ul className="mt-4 space-y-3">
                {speciality.whatWeHandle.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-relaxed text-[var(--color-ink)]">
                    <span className="mt-1 text-[var(--color-teal)]">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--color-line)] bg-[var(--color-navy)] py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                Talk to us about {speciality.title.toLowerCase()}
              </h2>
              <p className="mt-2 text-sm text-white/70">{contact.email} · {contact.phone}</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-md bg-[var(--color-cyan)] px-6 py-3 text-sm font-semibold text-[var(--color-navy)] hover:brightness-95"
            >
              {cta.secondary}
            </Link>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)]">
              Other specialities
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {otherSpecialities.map((item) => (
                <SpecialityCard key={item.slug} speciality={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
