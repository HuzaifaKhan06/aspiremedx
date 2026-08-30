"use client";

import { useState } from "react";
import { nav } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-navy)] font-mono text-sm font-medium text-white">
            AX
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-navy)]">
            AspireMedX
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-navy)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-md bg-[var(--color-navy)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-navy-dark)] md:inline-block"
        >
          Request a Demo
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-line)] md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-[var(--color-ink)]" />
            <span className="block h-0.5 w-5 bg-[var(--color-ink)]" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-[var(--color-line)] px-6 py-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-[var(--color-muted)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-[var(--color-navy)] px-4 py-2 text-center text-sm font-medium text-white"
          >
            Request a Demo
          </a>
        </nav>
      )}
    </header>
  );
}
