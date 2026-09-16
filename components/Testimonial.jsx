import { testimonial } from "@/lib/content";
import Reveal from "./Reveal";

export default function Testimonial() {
  return (
    <section className="bg-[var(--color-navy)] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          {/* Decorative quote mark */}
          <div
            className="mb-4 font-serif text-8xl leading-none text-[var(--color-cyan)] opacity-30 select-none"
            aria-hidden
          >
            &ldquo;
          </div>

          <blockquote className="font-[family-name:var(--font-display)] text-xl font-semibold leading-relaxed text-white sm:text-2xl">
            {testimonial.quote}
          </blockquote>

          <div className="mt-8">
            <div className="mx-auto mb-5 h-px w-16 bg-[var(--color-cyan)]/30" />
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">
              {testimonial.attribution}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
