"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades/slides content in when it scrolls into view — desktop only.
 * On mobile (narrower than 768px) or when the user prefers reduced motion,
 * this renders children immediately with no observer, no transition, and
 * no layout cost, per the "no animations on mobile" requirement.
 */
export default function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || reducedMotion) {
      // One-time client capability check on mount (empty dep array below);
      // intentionally not a subscription — mobile/reduced-motion just skips
      // animation and shows content immediately.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    setAnimated(true);
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={
        animated
          ? {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
              willChange: "opacity, transform",
            }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
