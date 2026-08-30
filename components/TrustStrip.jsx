import { practiceTypes } from "@/lib/content";

export default function TrustStrip() {
  return (
    <section className="border-y border-[var(--color-line)] bg-white py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-5 text-center font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
          Built for practices like yours
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {practiceTypes.map((type) => (
            <li
              key={type}
              className="text-sm font-medium text-[var(--color-navy)]/70"
            >
              {type}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
