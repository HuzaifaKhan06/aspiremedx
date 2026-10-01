import Image from "next/image";
import Reveal from "@/components/Reveal";

/*
 * Software & platforms AspireMedX works in, grouped by category.
 * `logo` points to a file in /public/software — entries without one render a
 * clean wordmark tile instead. Drop a PNG/SVG into /public/software and add
 * the `logo` path here to swap a wordmark for the real logo.
 */
const categories = [
  {
    id: "ehr",
    title: "EHR Systems",
    body: "Charge capture, documentation review, and claim creation directly inside your electronic health record.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    software: [
      { name: "eClinicalWorks", logo: "/software/eclinicalworks.png" },
      { name: "NextGen Healthcare", logo: "/software/nextgen.png" },
      { name: "athenahealth" },
      { name: "ModMed" },
      { name: "DrChrono" },
      { name: "Experity" },
      { name: "CureMD", logo: "/software/curemd.png" },
      { name: "RXNT", logo: "/software/rxnt.png" },
    ],
  },
  {
    id: "pm",
    title: "Practice Management",
    body: "Scheduling, eligibility, billing workflows, and A/R follow-up in the PM platform your front desk already knows.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 9h18M8 2v4M16 2v4M8 14h3M8 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    software: [
      { name: "Tebra", sub: "formerly Kareo", logo: "/software/tebra.png" },
      { name: "AdvancedMD", logo: "/software/advancedmd.png" },
      { name: "CareCloud" },
      { name: "CollaborateMD" },
      { name: "PracticeSuite" },
    ],
  },
  {
    id: "clearinghouse",
    title: "Clearinghouses",
    body: "Claim scrubbing, rejection monitoring, and submission routing for the highest possible clean-claim rate.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M4 7h13l-3-3M20 17H7l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    software: [
      { name: "Waystar" },
      { name: "Office Ally", logo: "/software/office-ally.png" },
      { name: "Optum" },
      { name: "Change Healthcare" },
    ],
  },
  {
    id: "portals",
    title: "Payer Portals",
    body: "Eligibility checks, prior authorizations, claim status, and appeals handled across payer portals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    software: [
      { name: "Availity" },
      { name: "NaviNet" },
      { name: "TMHP" },
      { name: "eMedNY" },
    ],
  },
  {
    id: "payments",
    title: "Payments (ERA / EFT)",
    body: "Electronic remittance and funds-transfer enrollment, reconciliation, and accurate payment posting.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2.5 10h19M6.5 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    software: [
      { name: "ECHO Health" },
      { name: "Zelis" },
      { name: "Optum" },
    ],
  },
];

const allSoftware = Array.from(
  new Map(categories.flatMap((c) => c.software).map((s) => [s.name, s])).values()
);

function LogoMark({ item, size = "tile" }) {
  if (item.logo) {
    return (
      <Image
        src={item.logo}
        alt={`${item.name} logo`}
        width={240}
        height={96}
        className={
          size === "tile"
            ? "h-8 w-auto max-w-[78%] object-contain transition-transform duration-500 group-hover:scale-105"
            : "h-8 w-auto max-w-[150px] object-contain"
        }
      />
    );
  }

  return (
    <span
      className={`text-center font-[family-name:var(--font-display)] font-extrabold leading-tight tracking-tight text-[#1f5fa8] transition-transform duration-500 group-hover:scale-105 ${
        size === "tile" ? "text-base" : "whitespace-nowrap text-base"
      }`}
    >
      {item.name}
    </span>
  );
}

function SoftwareTile({ item, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group relative flex h-20 flex-col items-center justify-center overflow-hidden rounded-xl border border-[var(--color-line)] bg-white px-4 shadow-[0_6px_18px_-12px_rgba(11,31,51,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-teal)]/40 hover:shadow-[0_18px_40px_-18px_rgba(11,31,51,0.35)]">
        {/* Sheen sweep on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[var(--color-cyan)]/10 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100"
        />
        <LogoMark item={item} />
        {item.sub && (
          <span className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
            {item.sub}
          </span>
        )}
        {/* Bottom accent line */}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-teal)] to-[var(--color-cyan)] transition-all duration-500 group-hover:w-full"
        />
      </div>
    </Reveal>
  );
}

export default function AboutSoftware() {
  return (
    <section
      id="software"
      className="relative overflow-hidden py-12"
      style={{ background: "linear-gradient(180deg, #f3f8fa 0%, #eaf4f8 100%)" }}
    >
      <style>{`
        @keyframes software-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .software-marquee-track {
          animation: software-marquee 40s linear infinite;
        }
        .software-marquee:hover .software-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-8 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-teal)]">
            Technology We Work In
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-2xl">
            Software &amp; Platforms
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--color-muted)]">
            Our team works fluently inside the EHRs, practice management systems,
            clearinghouses, payer portals, and payment networks your practice
            already relies on — no forced platform switch required.
          </p>
        </Reveal>
      </div>

      {/* Auto-scrolling logo strip */}
      <Reveal className="software-marquee relative mb-10 overflow-hidden border-y border-[var(--color-line)] bg-white/70 py-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32"
        />
        <div className="software-marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {allSoftware.map((item) => (
                <li key={`${copy}-${item.name}`} className="flex h-10 items-center px-8 opacity-80">
                  <LogoMark item={item} size="strip" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto max-w-6xl space-y-4 px-6">
        {categories.map((cat, ci) => (
          <Reveal key={cat.id} delay={ci * 40}>
            <div className="grid gap-4 rounded-xl border border-[var(--color-line)] bg-white/60 p-5 backdrop-blur-sm sm:p-6 lg:grid-cols-[240px_1fr] lg:gap-8">
              {/* Category label */}
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ background: "linear-gradient(135deg, #0b8f87, #20c4d6)" }}
                  >
                    {cat.icon}
                  </span>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--color-teal)]">
                    {String(ci + 1).padStart(2, "0")} · {cat.software.length} platforms
                  </span>
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                  {cat.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-muted)]">{cat.body}</p>
              </div>

              {/* Software tiles */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-5">
                {cat.software.map((item, i) => (
                  <SoftwareTile key={item.name} item={item} delay={i * 70} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
