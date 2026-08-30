import { testimonial } from "@/lib/content";

export default function Testimonial() {
  return (
    <section className="bg-[var(--color-bg-alt)] py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-[family-name:var(--font-display)] text-2xl italic leading-snug text-[var(--color-navy)] sm:text-3xl">
          “{testimonial.quote}”
        </p>
        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
          {testimonial.attribution}
        </p>
        <p className="mt-8 text-xs text-[var(--color-muted)]/70">
          {testimonial.note}
        </p>
      </div>
    </section>
  );
}
