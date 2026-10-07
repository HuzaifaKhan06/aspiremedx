"use client";

import { useState } from "react";
import Link from "next/link";
import SpecialityIcon from "./SpecialityIcon";

const shortName = (title) => title.replace(/ Billing( Services)?$/, "");

const filters = [
  { id: "all", label: "All Specialities" },
  { id: "core", label: "Core" },
  { id: "more", label: "More" },
];

export default function SpecialityExplorer({ core, more }) {
  const [filter, setFilter] = useState("core");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const match = (s) => !q || s.title.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q);

  const visibleCore = filter === "more" ? [] : core.filter(match);
  const visibleMore = filter === "core" ? [] : more.filter(match);
  const animKey = `${filter}-${q}`;

  return (
    <section className="relative py-16">
      <style>{`
        @keyframes spec-card-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .spec-card-in {
          opacity: 0;
          animation: spec-card-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6">
        {/* Toolbar: filter tabs + search */}
        <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-3 shadow-[0_10px_30px_-20px_rgba(11,31,51,0.25)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 rounded-xl bg-[var(--color-bg)] p-1" role="tablist" aria-label="Filter specialities">
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "bg-[var(--color-navy)] text-white shadow-[0_6px_16px_-8px_rgba(11,31,51,0.6)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-navy)]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <label className="relative block sm:w-72">
            <span className="sr-only">Search specialities</span>
            <svg viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a speciality…"
              className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] py-2.5 pl-9 pr-3 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-teal)] focus:bg-white"
            />
          </label>
        </div>

        {/* Core specialities — gradient tiles */}
        {visibleCore.length > 0 && (
          <div className="mt-12">
            <GroupHeading eyebrow="Core Specialities" title="Our most requested specialities" count={visibleCore.length} />
            <div key={`core-${animKey}`} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCore.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/speciality/${s.slug}`}
                  className="spec-card-in group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl p-6 text-white ring-1 ring-white/5 shadow-[0_14px_34px_-20px_rgba(11,31,51,0.75)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_44px_-20px_rgba(11,143,135,0.6)]"
                  style={{
                    animationDelay: `${i * 45}ms`,
                    background: "linear-gradient(135deg, #1f5f99 0%, #173b57 55%, #0b1f33 100%)",
                  }}
                >
                  {/* Teal wash on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "linear-gradient(135deg, #0b8f87 0%, #173b57 60%, #0b1f33 100%)" }}
                  />
                  {/* Hex accent */}
                  <svg className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 opacity-[0.07] transition-transform duration-700 group-hover:rotate-45 group-hover:opacity-20" viewBox="0 0 64 64" aria-hidden>
                    <polygon points="32,2 60,17 60,47 32,62 4,47 4,17" fill="none" stroke="#20c4d6" strokeWidth="2" />
                  </svg>

                  <div className="relative flex items-start justify-between">
                    {/* Raised glass tile with a glossy 3D icon; lifts and tilts on hover */}
                    <span
                      className="relative flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ring-white/15 transition-all duration-500 group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:scale-110 group-hover:ring-[#20c4d6]/50"
                      style={{
                        background: "linear-gradient(160deg, #1d4a6e 0%, #143a58 55%, #0e2a42 100%)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -4px 8px rgba(0,0,0,0.25), 0 12px 22px -10px rgba(0,0,0,0.6)",
                      }}
                    >
                      <SpecialityIcon slug={s.slug} variant="3d-dark" cutout="#143a58" className="h-11 w-11" />
                    </span>
                    <span className="rounded-full border border-[#20c4d6]/25 bg-[#20c4d6]/10 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-[#20c4d6]">
                      {String(core.indexOf(s) + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative mt-6 flex flex-1 flex-col">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold leading-tight">
                      {shortName(s.title)}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-white/60">{s.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 border-t border-white/10 pt-3 text-xs font-semibold text-white/70 transition-all duration-300 group-hover:gap-2 group-hover:text-[#20c4d6]">
                      Explore <span aria-hidden>→</span>
                    </span>
                  </div>
                  {/* Bottom accent */}
                  <span aria-hidden className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#0b8f87] to-[#20c4d6] transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* More specialities — light cards with tagline */}
        {visibleMore.length > 0 && (
          <div className="mt-16">
            <GroupHeading eyebrow="More Specialities" title="Facility, ancillary & niche billing" count={visibleMore.length} />
            <div key={`more-${animKey}`} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleMore.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/speciality/${s.slug}`}
                  className="spec-card-in group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[0_8px_24px_-20px_rgba(11,31,51,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-teal)]/40 hover:shadow-[0_24px_48px_-24px_rgba(11,31,51,0.4)]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {/* Top accent bar */}
                  <span aria-hidden className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0b8f87] to-[#20c4d6] transition-transform duration-500 group-hover:scale-x-100" />
                  {/* Oversized watermark icon */}
                  <span aria-hidden className="pointer-events-none absolute -bottom-6 -right-6 opacity-[0.05] transition-all duration-700 [--ic-1:#0b1f33] [--ic-2:#0b1f33] [--ic-3:transparent] group-hover:-rotate-12 group-hover:opacity-[0.09]">
                    <SpecialityIcon slug={s.slug} className="h-32 w-32" />
                  </span>

                  <div className="relative flex items-start justify-between">
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ring-[var(--color-teal)]/15 transition-all duration-500 group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:scale-110 group-hover:ring-[var(--color-teal)]/40"
                      style={{
                        background: "linear-gradient(160deg, #f4fbfb 0%, #e5f3f2 55%, #d3eceb 100%)",
                        boxShadow:
                          "inset 0 1px 0 #ffffff, inset 0 -4px 8px rgba(11,143,135,0.12), 0 12px 22px -12px rgba(11,31,51,0.35)",
                      }}
                    >
                      <SpecialityIcon slug={s.slug} variant="3d-light" cutout="#e5f3f2" className="h-11 w-11" />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] transition-all duration-300 group-hover:-rotate-45 group-hover:border-[var(--color-teal)] group-hover:bg-[var(--color-teal)] group-hover:text-white">
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>

                  <h3 className="relative mt-5 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)] transition-colors group-hover:text-[var(--color-teal)]">
                    {s.title}
                  </h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{s.tagline}</p>
                  <span className="relative mt-5 inline-flex items-center gap-2 border-t border-[var(--color-line)] pt-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">
                    Learn more
                    <span aria-hidden className="h-px w-6 bg-[var(--color-teal)] transition-all duration-300 group-hover:w-12" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {visibleCore.length === 0 && visibleMore.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-[var(--color-line)] bg-white p-10 text-center">
            <p className="font-semibold text-[var(--color-navy)]">No speciality matches “{query}”.</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              We likely still support it —{" "}
              <Link href="/contact" className="font-semibold text-[var(--color-teal)] hover:text-[var(--color-navy)]">
                ask our team
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function GroupHeading({ eyebrow, title, count }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-[var(--color-line)] pb-4">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">{eyebrow}</p>
        <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--color-navy)]">
          {title}
        </h2>
      </div>
      <span className="shrink-0 rounded-full bg-[var(--color-teal-tint)] px-3 py-1 font-mono text-xs font-semibold text-[var(--color-teal)]">
        {count} {count === 1 ? "speciality" : "specialities"}
      </span>
    </div>
  );
}
