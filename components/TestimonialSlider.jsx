"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/content";
import Reveal from "./Reveal";

const AUTOPLAY_MS = 5000;

// Signed distance of card `i` from the active card, wrapped so the slider loops
// (e.g. with 4 cards: -1 = left, 0 = center, 1 = right, 2 = hidden behind).
function offsetOf(i, active, n) {
  let off = (((i - active) % n) + n) % n;
  if (off > n / 2) off -= n;
  return off;
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-[#f5b301]" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialSlider() {
  const n = testimonials.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focusImg, setFocusImg] = useState(false); // hovering the active photo
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [narrow, setNarrow] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef(null);

  const go = useCallback((dir) => setActive((a) => (a + dir + n) % n), [n]);

  useEffect(() => {
    const mqNarrow = window.matchMedia("(max-width: 639px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setNarrow(mqNarrow.matches);
      setReduced(mqReduced.matches);
    };
    sync();
    mqNarrow.addEventListener("change", sync);
    return () => mqNarrow.removeEventListener("change", sync);
  }, []);

  function onImgMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 14, y: px * 14 });
  }

  function onImgLeave() {
    setFocusImg(false);
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)] py-20">
      <style>{`
        @keyframes tst-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>

      {/* Soft brand glows */}
      <div
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(32,196,214,0.35), transparent 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(11,143,135,0.3), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-10 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">
            Client Stories
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-3xl">
            What Practices Say About AspireMedX
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
            Physicians, owners, and administrators who handed us their revenue cycle — and got their time back.
          </p>
        </Reveal>

        {/* 3D stage */}
        <div
          className="relative h-[540px] sm:h-[370px]"
          style={{ perspective: "1600px" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            onImgLeave();
          }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
            setPaused(true);
          }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            touchX.current = null;
            setPaused(false);
            if (start == null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
        >
          {testimonials.map((t, i) => {
            const off = offsetOf(i, active, n);
            const abs = Math.abs(off);
            const isActive = off === 0;
            const hidden = abs > 1 || (narrow && !isActive);

            let opacity = isActive ? 1 : hidden ? 0 : 0.55;
            if (focusImg && !isActive) opacity = hidden ? 0 : 0.15;

            return (
              <article
                key={t.image}
                aria-hidden={!isActive}
                onClick={() => !isActive && !hidden && setActive(i)}
                className={`absolute left-1/2 top-0 w-[92%] max-w-[760px] ${isActive ? "" : "cursor-pointer"}`}
                style={{
                  // Phones get a flat slide; larger screens get the 3D coverflow.
                  transform: narrow
                    ? `translateX(calc(-50% + ${off * 110}%)) scale(${isActive ? 1 : 0.92})`
                    : `translateX(calc(-50% + ${off * 62}%)) translateZ(${-abs * 220}px) rotateY(${-off * 32}deg)`,
                  opacity,
                  zIndex: 10 - abs,
                  pointerEvents: hidden ? "none" : "auto",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease",
                }}
              >
                <div
                  className={`grid gap-6 rounded-2xl border bg-white p-5 transition-shadow duration-500 sm:grid-cols-[220px_1fr] sm:p-7 ${
                    isActive
                      ? "border-[var(--color-teal)]/20 shadow-[0_30px_60px_-30px_rgba(11,31,51,0.45)]"
                      : "border-[var(--color-line)] shadow-sm"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Photo — pops out in 3D on hover */}
                  <div
                    className="relative h-56 sm:h-[300px]"
                    style={{
                      transformStyle: "preserve-3d",
                      transform:
                        isActive && focusImg
                          ? `translateZ(80px) translateY(-14px) scale(1.1) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                          : "translateZ(0) scale(1)",
                      transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                      zIndex: 2,
                    }}
                    onMouseEnter={() => isActive && setFocusImg(true)}
                    onMouseMove={(e) => isActive && onImgMove(e)}
                    onMouseLeave={onImgLeave}
                  >
                    <div
                      className="relative h-full w-full overflow-hidden rounded-xl transition-shadow duration-500"
                      style={{
                        boxShadow:
                          isActive && focusImg
                            ? "0 40px 70px -20px rgba(11,31,51,0.55), 0 0 0 3px rgba(32,196,214,0.55)"
                            : "0 10px 25px -15px rgba(11,31,51,0.35)",
                      }}
                    >
                      <Image
                        src={t.image}
                        alt={`${t.name}, ${t.role}`}
                        fill
                        sizes="(min-width: 640px) 220px, 90vw"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33]/70 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-teal)]">
                        {t.metric}
                      </span>
                    </div>
                  </div>

                  {/* Copy — fades back while the photo is in focus */}
                  <div
                    className="flex flex-col justify-center"
                    style={{
                      opacity: isActive && focusImg ? 0.25 : 1,
                      filter: isActive && focusImg ? "blur(2px)" : "none",
                      transition: "opacity 0.4s ease, filter 0.4s ease",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <Stars />
                      <span
                        className="font-serif text-6xl leading-none text-[var(--color-cyan)] opacity-30 select-none"
                        aria-hidden
                      >
                        &rdquo;
                      </span>
                    </div>
                    <blockquote className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink)] sm:text-base">
                      {t.quote}
                    </blockquote>
                    <div className="mt-5 flex items-center gap-3 border-t border-[var(--color-line)] pt-4">
                      <span className="h-8 w-1 rounded-full bg-gradient-to-b from-[var(--color-teal)] to-[var(--color-cyan)]" />
                      <div>
                        <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-navy)]">
                          {t.name}
                        </p>
                        <p className="text-xs text-[var(--color-muted)]">
                          {t.role} · {t.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-navy)] shadow-sm transition-all hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.image}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`relative h-2 overflow-hidden rounded-full transition-all duration-500 ${
                  i === active ? "w-10 bg-[var(--color-teal)]/20" : "w-2 bg-[var(--color-navy)]/20 hover:bg-[var(--color-navy)]/40"
                }`}
              >
                {i === active && (
                  <span
                    key={active}
                    className="absolute inset-0 origin-left rounded-full bg-[var(--color-teal)]"
                    style={{
                      animation: reduced ? "none" : `tst-progress ${AUTOPLAY_MS}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                      transform: reduced ? "scaleX(1)" : undefined,
                    }}
                    // Auto-advance when the progress bar fills, so pausing on hover
                    // freezes both the bar and the timer together.
                    onAnimationEnd={() => go(1)}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-navy)] shadow-sm transition-all hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
