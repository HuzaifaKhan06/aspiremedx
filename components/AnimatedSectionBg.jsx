"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Section background photo with a subtle motion: when the section scrolls into
 * view the image eases from a slight zoom to its resting size, then drifts very
 * slowly. Skipped entirely for users who prefer reduced motion.
 */
export default function AnimatedSectionBg({ src }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          opacity: visible ? 1 : 0.35,
          transform: visible ? "scale(1)" : "scale(1.08)",
          transition: "opacity 1.4s ease, transform 2.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className={`absolute inset-0 ${visible ? "section-bg-drift" : ""}`}>
          <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
