"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/*
 * Branded page-transition overlay. Shows a frosted, transparent-blur layer with
 * a bouncy "AspireMedX" wordmark whenever the route changes (and once on first
 * load), instead of a plain loading spinner or solid splash screen.
 *
 * It starts the moment an internal link is clicked (so the animation covers
 * the wait for the next page) and finishes once the new pathname has rendered
 * and a minimum display time has passed. Styles live in globals.css (.amx-*).
 * Skipped entirely for users who prefer reduced motion.
 */
const MIN_VISIBLE_MS = 1500;
const EXIT_MS = 450;
const FAILSAFE_MS = 6000;

// Letter colours follow the logo: "Aspire" royal blue, "Med" teal → green,
// and a green lowercase "x".
const ASPIRE = ["#1e3a8a", "#1d43a0", "#1f4db5", "#2257c6", "#2563d4", "#2a6fe0"];
const MED = ["#0f9fa8", "#14b39a", "#22c08a"];
const LETTERS = [
  ..."Aspire".split("").map((ch, i) => ({ ch, kind: "", color: ASPIRE[i] })),
  ..."Med".split("").map((ch, i) => ({ ch, kind: "med", color: MED[i] })),
  { ch: "x", kind: "x", color: "#3ccf6e" },
];

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  angle: i * 36 + (i % 2 ? 10 : -6),
  distance: i % 2 ? 190 : 230,
  plus: i % 3 === 0,
  color: ["#1f4db5", "#14b39a", "#3ccf6e", "#20c4d6"][i % 4],
}));

export default function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState("hidden"); // hidden | show | exit
  const [run, setRun] = useState(0);
  const startedAt = useRef(0);
  const showing = useRef(false);
  const timers = useRef([]);
  const lastPath = useRef(pathname);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const reducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finish = useCallback(() => {
    if (!showing.current) return;
    clearTimers();
    const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt.current));
    timers.current.push(
      setTimeout(() => setPhase("exit"), wait),
      setTimeout(() => {
        showing.current = false;
        setPhase("hidden");
      }, wait + EXIT_MS)
    );
  }, []);

  const start = useCallback(() => {
    if (reducedMotion()) return;
    clearTimers();
    startedAt.current = Date.now();
    showing.current = true;
    setRun((r) => r + 1);
    setPhase("show");
    // Never leave the overlay stuck if a navigation is cancelled.
    timers.current.push(setTimeout(finish, FAILSAFE_MS));
  }, [finish]);

  // Intro on first load.
  useEffect(() => {
    // One-time intro on mount; start() is a no-op under reduced motion.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    start();
    finish();
    return clearTimers;
  }, [start, finish]);

  // Start as soon as an internal link to another page is clicked.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page / in-page anchor
      start();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  // Finish once the new route has rendered (covers back/forward too).
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (!showing.current) {
      // Navigation that didn't come from a link click (e.g. browser back).
      start();
    }
    finish();
  }, [pathname, start, finish]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`amx-overlay ${phase === "exit" ? "amx-out" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div key={run} className="amx-stage">
        <div className="amx-mark">
          <span className="amx-blob amx-blob-shadow" aria-hidden />
          <span className="amx-blob" aria-hidden />

          {SPARKS.map((s, i) => (
            <span
              key={i}
              aria-hidden
              className={`amx-spark ${s.plus ? "amx-plus" : ""}`}
              style={{ "--a": `${s.angle}deg`, "--d": `${s.distance}px`, "--c": s.color }}
            />
          ))}

          {/* Rising growth arrow from the logo, drawn over the word */}
          <svg className="amx-arrow" viewBox="0 0 220 90" aria-hidden>
            <defs>
              <linearGradient id="amx-arrow-grad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#14b39a" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>
            </defs>
            <path className="amx-arrow-line" d="M6 80 C70 70 120 55 196 14" />
            <path className="amx-arrow-head" d="M178 10 L204 8 L194 32 Z" />
          </svg>

          <p className="amx-word" aria-hidden>
            {LETTERS.map(({ ch, kind, color }, i) => (
              <span
                key={i}
                className={`amx-l ${kind ? `amx-${kind}` : ""}`}
                style={{ "--i": i, "--r": `${i % 2 ? 14 : -14}deg`, "--w": `${i % 2 ? 3 : -3}deg`, color }}
              >
                {ch}
              </span>
            ))}
          </p>
        </div>

        <svg className="amx-ecg" viewBox="0 0 260 40" aria-hidden>
          <path d="M2 22h78l10-14 12 28 12-34 12 30 8-10h124" />
        </svg>
        <p className="amx-tagline" aria-hidden>Smart Revenue Cycle Solutions</p>
      </div>
    </div>
  );
}
