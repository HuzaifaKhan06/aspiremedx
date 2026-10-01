"use client";

import Link from "next/link";
import { hero, cta, heroOffers } from "@/lib/content";
import Counter from "./Counter";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
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

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-6 pb-12 pt-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:pb-14 lg:pt-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#20c4d6]/30 bg-[#20c4d6]/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#20c4d6]">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#20c4d6]" />
            Medical Billing · Credentialing · RCM
          </span>

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-[2.1rem]">
            Maximize Revenue.
            <br />
            <span style={{ color: "#20c4d6" }}>Reduce Denials.</span>
            <br />
            Stay Fully Credentialed.
          </h1>

          <p className="mt-3 max-w-[540px] text-sm leading-relaxed text-white/70">
            {hero.subheadline}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              className="rounded-lg px-5 py-3 text-[13px] font-bold text-white shadow-[0_4px_24px_-4px_rgba(32,196,214,0.5)] transition-all hover:shadow-[0_6px_32px_-4px_rgba(32,196,214,0.7)] hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
            >
              {cta.primary}
            </a>
            <a
              href="/contact"
              className="flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              {cta.secondary}
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-6 flex flex-wrap gap-6 border-t border-white/10 pt-5">
            {[
              { value: 98, suffix: "%+", label: "First-pass clean claim rate" },
              { value: 30, prefix: "Up to ", suffix: "%", label: "A/R reduction" },
              { value: 120, suffix: "+", label: "Payer relationships" },
            ].map((stat, i) => (
              <div key={stat.label} className={i > 0 ? "border-l border-white/10 pl-6" : ""}>
                <p className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} onMount />
                </p>
                <p className="mt-0.5 text-[11px] text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroOffers />
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-12"
        style={{ background: "linear-gradient(to bottom, transparent, #f3f8fa)" }}
        aria-hidden
      />
    </section>
  );
}

/* ─── Offers beside the hero — every card goes to /contact ─── */

const OFFER_ICONS = {
  credentialing: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="9" r="2.5" />
      <path d="M8 15.5a4 4 0 0 1 8 0" />
    </>
  ),
  audit: (
    <>
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="m21 21-5.5-5.5M10.5 7v7M12.5 8.5h-3a1.2 1.2 0 0 0 0 2.4h2a1.2 1.2 0 0 1 0 2.4h-3" />
    </>
  ),
  billing: (
    <>
      <path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </>
  ),
  ar: (
    <>
      <path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3" />
      <path d="M18 3v4h-4M6 21v-4h4" />
    </>
  ),
};

function OfferIcon({ id, className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {OFFER_ICONS[id] ?? OFFER_ICONS.audit}
    </svg>
  );
}

function HeroOffers() {
  const [featured, ...rest] = heroOffers;
  return (
    <div className="relative">
      <style>{`
        @keyframes offer-shine { 0% { transform: translateX(-120%) skewX(-20deg); } 60%, 100% { transform: translateX(320%) skewX(-20deg); } }
        @keyframes offer-glow { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
        @keyframes offer-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes offer-in { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }
        .offer-shine::after { content: ""; position: absolute; inset: 0 auto 0 0; width: 35%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent); animation: offer-shine 3.8s ease-in-out infinite; pointer-events: none; }
        .offer-glow { animation: offer-glow 2.4s ease-in-out infinite; }
        .offer-float { animation: offer-float 5s ease-in-out infinite; }
        .offer-in { animation: offer-in .6s cubic-bezier(.2,.8,.3,1) both; }
        @media (prefers-reduced-motion: reduce) { .offer-shine::after, .offer-glow, .offer-float, .offer-in { animation: none; } }
      `}</style>

      <div className="mb-3 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
        </span>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-amber-300">Exclusive offers this month</p>
      </div>

      {/* Featured offer */}
      <Link
        href={`/contact?offer=${featured.id}`}
        className="offer-float group relative block rounded-2xl p-[1.5px] shadow-[0_20px_50px_-15px_rgba(251,191,36,0.45)] transition-transform hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b 40%, #20c4d6)" }}
      >
        <span className="offer-glow pointer-events-none absolute -inset-1 rounded-2xl bg-amber-400/25 blur-xl" aria-hidden />
        <div
          className="offer-shine relative overflow-hidden rounded-[15px] px-5 py-4"
          style={{ background: "linear-gradient(135deg, #1a2a3f 0%, #0f2236 60%, #0b3330 100%)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0b1f33]">
              🔥 {featured.badge}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
              <OfferIcon id={featured.id} className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-1 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-none tracking-tight">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">{featured.highlight}</span>
          </p>
          <p className="mt-1.5 font-[family-name:var(--font-display)] text-base font-bold text-white">{featured.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">{featured.detail}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-xs font-extrabold text-[#0b1f33] shadow-[0_6px_20px_-6px_rgba(251,146,60,0.8)] transition-all group-hover:gap-2.5 group-hover:brightness-110">
            Claim {featured.highlight.toLowerCase()} now <span aria-hidden>→</span>
          </span>
        </div>
      </Link>

      {/* Smaller offers */}
      <div className="mt-3 space-y-2.5">
        {rest.map((offer, i) => (
          <Link
            key={offer.id}
            href={`/contact?offer=${offer.id}`}
            className="offer-in group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 backdrop-blur-sm transition-all hover:-translate-x-1 hover:border-[#20c4d6]/60 hover:bg-white/[0.1] hover:shadow-[0_10px_30px_-12px_rgba(32,196,214,0.6)]"
            style={{ animationDelay: `${(i + 1) * 120}ms` }}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
              style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
            >
              <OfferIcon id={offer.id} className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-[13px] font-bold text-white">{offer.title}</span>
                <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-px text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                  {offer.badge}
                </span>
              </span>
              <span className="block truncate text-[11px] text-white/55">{offer.detail}</span>
            </span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm text-white transition-colors group-hover:bg-[#20c4d6] group-hover:text-[#0b1f33]" aria-hidden>
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
