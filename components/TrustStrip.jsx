import { practiceTypes } from "@/lib/content";

export default function TrustStrip() {
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-bg)] py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-5 text-center font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Built for organizations like yours
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {practiceTypes.map((type) => (
            <li
              key={type}
              className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-xs font-semibold text-[var(--color-navy)] shadow-sm"
            >
              {type}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
