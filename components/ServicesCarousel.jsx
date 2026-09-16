"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { services } from "@/lib/content";
import Reveal from "./Reveal";

const extendedServices = [
  ...services,
  { code: "07", slug: "provider-credentialing", title: "CAQH ProView Maintenance", description: "Profile creation, attestation, document management, and status monitoring for full payer-ready credentialing across all providers." },
  { code: "08", slug: "provider-enrollment", title: "Medicare & Medicaid Enrollment", description: "PECOS enrollment, Medicaid enrollment across all 50 states, and commercial payer panel applications through to active participation status." },
  { code: "09", slug: "payer-contracting", title: "Payer Contract Benchmarking", description: "Fee schedule benchmarking against market data, negotiation support, and payment variance monitoring to ensure payers honor what they agreed to pay." },
  { code: "10", slug: "reporting-analytics", title: "KPI Dashboards & Analytics", description: "Real-time performance reporting across claims, denials, and collections — built for practice owners and finance leaders, not just billers." },
  { code: "11", slug: "revenue-cycle-management", title: "Eligibility & Benefits Verification", description: "Front-end eligibility checks and benefits coordination to prevent downstream denials before claims are ever submitted." },
  { code: "12", slug: "medical-billing", title: "Denial Management & Appeals", description: "Root-cause denial analysis, targeted appeal filing, and corrective action workflows that continuously improve first-pass rates." },
];

const gradients = [
  "from-[#0b1f33] to-[#173b57]",
  "from-[#173b57] to-[#0b8f87]",
  "from-[#0b8f87] to-[#0b3330]",
  "from-[#0b3330] to-[#0b1f33]",
  "from-[#0b1f33] to-[#0b3330]",
  "from-[#173b57] to-[#0b1f33]",
  "from-[#0b8f87] to-[#173b57]",
  "from-[#0b3330] to-[#0b8f87]",
  "from-[#0b1f33] to-[#0b8f87]",
  "from-[#173b57] to-[#0b3330]",
  "from-[#0b8f87] to-[#0b1f33]",
  "from-[#0b3330] to-[#173b57]",
];

export default function ServicesCarousel() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function scroll(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: "smooth" });
    setTimeout(() => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }, 350);
  }

  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  return (
    <section
      id="services"
      className="overflow-hidden py-20"
      style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 100%)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header row */}
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#20c4d6]">
                Our Services
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                End-to-End RCM Services
              </h2>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 disabled:opacity-30"
              >
                ←
              </button>
              <button
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 disabled:opacity-30"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>

        {/* Scrollable track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-8 flex gap-5 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {extendedServices.map((service, i) => (
            <Link
              key={service.code + "-" + i}
              href={`/services/${service.slug}`}
              className="group relative flex h-72 w-72 shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]}`} />

              {/* Hex pattern overlay */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`sc-hex-${i}`} x="0" y="0" width="36" height="31" patternUnits="userSpaceOnUse">
                    <polygon points="18,1 33,9 33,25 18,33 3,25 3,9" fill="none" stroke="#20c4d6" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#sc-hex-${i})`} />
              </svg>

              {/* Glow dot top-right */}
              <div className="absolute right-5 top-5 h-2 w-2 rounded-full bg-[#20c4d6] opacity-70 transition-opacity group-hover:opacity-100" />

              {/* Number */}
              <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-widest text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="relative">
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                  {service.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/60 line-clamp-3">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#20c4d6] transition-all group-hover:gap-2">
                  Learn more <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
