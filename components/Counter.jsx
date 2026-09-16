"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up from 0 to `value` when it enters view (or on mount, if
 * `onMount` is set — used for above-the-fold stats like the hero).
 * Desktop only: on mobile or with reduced motion, the final number
 * renders immediately with no animation frame loop at all.
 */
export default function Counter({ value, prefix = "", suffix = "", duration = 1200, onMount = false }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(onMount ? 0 : value);
  const started = useRef(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || reducedMotion) {
      // One-time client capability check on mount (empty dep array below);
      // intentionally not a subscription — mobile/reduced-motion just skips
      // animation and shows the final value immediately.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      return;
    }

    const runCountUp = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (onMount) {
      runCountUp();
      return;
    }

    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCountUp();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, onMount]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
