import Link from "next/link";
import SpecialityIcon from "@/components/speciality/SpecialityIcon";

export default function SpecialityCard({ speciality }) {
  return (
    <Link
      href={`/speciality/${speciality.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[0_8px_24px_-20px_rgba(11,31,51,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-teal)]/40 hover:shadow-[0_24px_48px_-24px_rgba(11,31,51,0.4)]"
    >
      {/* Top accent bar */}
      <span aria-hidden className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0b8f87] to-[#20c4d6] transition-transform duration-500 group-hover:scale-x-100" />
      {/* Oversized watermark icon */}
      <span aria-hidden className="pointer-events-none absolute -bottom-6 -right-6 opacity-[0.05] transition-all duration-700 [--ic-1:#0b1f33] [--ic-2:#0b1f33] [--ic-3:transparent] group-hover:-rotate-12 group-hover:opacity-[0.09]">
        <SpecialityIcon slug={speciality.slug} className="h-28 w-28" />
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-teal-tint)] transition-all duration-500 [--ic-1:#0b8f87] [--ic-2:#20c4d6] [--ic-3:#e5f3f2] group-hover:scale-105 group-hover:bg-[var(--color-navy)] group-hover:[--ic-1:#20c4d6] group-hover:[--ic-2:#ffffff] group-hover:[--ic-3:#0b1f33]">
        <SpecialityIcon slug={speciality.slug} className="h-9 w-9" />
      </span>

      <h3 className="relative mt-5 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)] transition-colors group-hover:text-[var(--color-teal)]">
        {speciality.title}
      </h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
        {speciality.tagline}
      </p>
      <span className="relative mt-5 inline-flex items-center gap-2 border-t border-[var(--color-line)] pt-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">
        Learn more
        <span aria-hidden className="h-px w-6 bg-[var(--color-teal)] transition-all duration-300 group-hover:w-12" />
      </span>
    </Link>
  );
}
