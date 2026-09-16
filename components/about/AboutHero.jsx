import Link from "next/link";

export default function AboutHero() {
  return (
    <section
      className="relative flex min-h-[70vh] items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 55%, #0b3330 100%)" }}
    >
      {/* Hex pattern overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="about-hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="none" stroke="#20c4d6" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-hex)" />
      </svg>

      {/* Glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-[60%] w-[45%] opacity-15"
        style={{ background: "radial-gradient(ellipse at top right, #20c4d6, transparent 70%)" }} aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-[40%] opacity-10"
        style={{ background: "radial-gradient(ellipse at bottom left, #0b8f87, transparent 70%)" }} aria-hidden />

      {/* Floating circles */}
      <div className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden>
        <div className="relative h-72 w-72">
          <div className="absolute inset-0 rounded-full border border-white/5" />
          <div className="absolute inset-8 rounded-full border border-[#0b8f87]/20" />
          <div className="absolute inset-16 rounded-full border border-[#20c4d6]/20" />
          <div className="absolute inset-24 flex items-center justify-center rounded-full border border-[#20c4d6]/30 bg-[#20c4d6]/5">
            <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" aria-hidden>
              <path d="M24 4 L44 14 L44 34 L24 44 L4 34 L4 14 Z" stroke="#20c4d6" strokeWidth="1.5" />
              <path d="M24 14 L34 20 L34 32 L24 38 L14 32 L14 20 Z" stroke="#0b8f87" strokeWidth="1" />
              <circle cx="24" cy="26" r="4" fill="#20c4d6" opacity="0.6" />
            </svg>
          </div>
          {/* Orbiting dots */}
          {[0, 72, 144, 216, 288].map((deg) => (
            <div
              key={deg}
              className="absolute h-2 w-2 rounded-full bg-[#20c4d6]"
              style={{
                top: "50%",
                left: "50%",
                opacity: 0.4,
                transform: `rotate(${deg}deg) translateX(128px) translateY(-50%)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-white/30">
            <Link href="/" className="transition-colors hover:text-[#20c4d6]">Home</Link>
            <span>/</span>
            <span className="text-white/60">About Us</span>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-[#20c4d6]/30 bg-[#20c4d6]/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#20c4d6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#20c4d6]" />
            Our Story
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            Intelligence-Driven
            <br />
            <span style={{ color: "#20c4d6" }}>Revenue Cycle</span>
            <br />
            Management
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
            AspireMedX was built with a single purpose: to give healthcare organizations the billing accuracy, credentialing speed, and financial visibility they need to grow — without the overhead of building it themselves.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="rounded-lg px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_24px_-4px_rgba(32,196,214,0.4)] transition-all hover:shadow-[0_6px_32px_-4px_rgba(32,196,214,0.6)] hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
            >
              Work With Us
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#20c4d6]/40 hover:bg-white/10"
            >
              Our Services <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20"
        style={{ background: "linear-gradient(to bottom, transparent, #f3f8fa)" }} aria-hidden />
    </section>
  );
}
