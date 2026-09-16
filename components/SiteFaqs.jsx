"use client";

import { useState } from "react";
import { siteFaqs } from "@/lib/content";
import Reveal from "./Reveal";

export default function SiteFaqs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[var(--color-bg)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:items-start">
          {/* Left panel */}
          <Reveal>
            <div
              className="sticky top-24 rounded-2xl p-8"
              style={{ background: "linear-gradient(160deg, #0b1f33, #173b57)" }}
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#20c4d6]">
                FAQs
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
                Top Questions Answered
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                We provide clear, expert answers to the most pressing questions about medical billing, credentialing, enrollment, and revenue cycle management.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Credentialing timelines & process",
                  "CAQH profile management",
                  "Billing software compatibility",
                  "HIPAA compliance standards",
                  "Pricing & service scope",
                ].map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-2.5 text-sm text-white/50"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#20c4d6]" />
                    {topic}
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
              >
                Ask Us Directly <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>

          {/* FAQ accordion */}
          <div className="space-y-3">
            {siteFaqs.map((faq, i) => (
              <Reveal key={faq.question} delay={i * 40}>
                <div className="rounded-xl border border-[var(--color-line)] bg-white shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={openIndex === i}
                  >
                    <span className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">
                      {faq.question}
                    </span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-teal)] transition-transform duration-200"
                      style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  {openIndex === i && (
                    <div className="border-t border-[var(--color-line)] px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-[var(--color-muted)]">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
