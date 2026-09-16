"use client";

import { hero, cta } from "@/lib/content";
import Counter from "./Counter";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 50%, #0b3330 100%)" }}
    >
      {/* Circuit / mesh SVG overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon
              points="30,2 56,16 56,44 30,58 4,44 4,16"
              fill="none"
              stroke="#20c4d6"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-hex)" />
      </svg>

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[70%] w-[50%] opacity-20"
        style={{
          background: "radial-gradient(ellipse at top right, #20c4d6 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-[40%] opacity-10"
        style={{
          background: "radial-gradient(ellipse at bottom left, #0b8f87 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#20c4d6]/30 bg-[#20c4d6]/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#20c4d6]">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#20c4d6]" />
            Medical Billing · Credentialing · RCM
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
            Maximize Revenue.
            <br />
            <span style={{ color: "#20c4d6" }}>Reduce Denials.</span>
            <br />
            Stay Fully Credentialed.
          </h1>

          <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-white/70">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-lg px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_24px_-4px_rgba(32,196,214,0.5)] transition-all hover:shadow-[0_6px_32px_-4px_rgba(32,196,214,0.7)] hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
            >
              {cta.primary}
            </a>
            <a
              href="#contact"
              className="flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              {cta.secondary}
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-10">
            {[
              { value: 98, suffix: "%+", label: "First-pass clean claim rate" },
              { value: 30, prefix: "Up to ", suffix: "%", label: "A/R reduction" },
              { value: 120, suffix: "+", label: "Payer relationships" },
            ].map((stat, i) => (
              <div key={stat.label} className={i > 0 ? "border-l border-white/10 pl-8" : ""}>
                <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-white">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} onMount />
                </p>
                <p className="mt-1 text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{ background: "linear-gradient(to bottom, transparent, #f3f8fa)" }}
        aria-hidden
      />
    </section>
  );
}
