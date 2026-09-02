import Link from "next/link";

export default function SpecialityCard({ speciality }) {
  return (
    <Link
      href={`/speciality/${speciality.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-white p-8 transition-colors hover:border-[var(--color-teal)] hover:bg-[var(--color-bg-alt)]"
    >
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          {speciality.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          {speciality.tagline}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-teal)] group-hover:text-[var(--color-navy)]">
        Learn more
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
