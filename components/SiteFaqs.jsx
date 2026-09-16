import { siteFaqs } from "@/lib/content";
import Reveal from "./Reveal";

export default function SiteFaqs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
            FAQs
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)]">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[var(--color-line)] rounded-lg border border-[var(--color-line)] bg-white">
          {siteFaqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 40} as="details" className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">
                {faq.question}
                <span className="ml-4 shrink-0 text-[var(--color-teal)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{faq.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
