import Reveal from "./Reveal";
import Link from "next/link";

const collaborators = [
  {
    title: "Specialty & Multi-Specialty Physician Practices",
    description:
      "Supporting practices of all sizes across 20+ clinical specialties with unified revenue cycle operations and dedicated billing expertise.",
    gradient: "from-[#0b1f33] to-[#0b8f87]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <circle cx="24" cy="16" r="8" stroke="#20c4d6" strokeWidth="2" />
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "High-Growth & Complex Care Delivery Organizations",
    description:
      "Organizations managing high encounter volumes, multiple locations, and complex payer mixes under a single revenue framework.",
    gradient: "from-[#173b57] to-[#0b3330]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <path d="M6 38V24l18-14 18 14v14H30V28h-12v10z" stroke="#20c4d6" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Healthcare Technology & Platform Partners",
    description:
      "EMR, PM, analytics, clearinghouse, and payer-connectivity platforms enabling a connected, efficient RCM ecosystem.",
    gradient: "from-[#0b3330] to-[#173b57]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <rect x="6" y="6" width="36" height="28" rx="3" stroke="#20c4d6" strokeWidth="2" />
        <path d="M16 42h16M24 34v8" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 20l6 6 14-14" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Centers of Excellence & Specialty Clinics",
    description:
      "Including oncology, cardiology, orthopedics, ophthalmology, dermatology, gastroenterology, pain management, and more.",
    gradient: "from-[#0b1f33] to-[#0b3330]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <path d="M24 8L28 18H40L30 25L34 36L24 29L14 36L18 25L8 18H20Z" stroke="#20c4d6" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Diagnostics, Imaging & Ancillary Care Providers",
    description:
      "Revenue operations for labs, imaging centers, and ancillary services requiring tight compliance, accuracy, and fast claim cycles.",
    gradient: "from-[#173b57] to-[#0b8f87]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <circle cx="22" cy="22" r="14" stroke="#20c4d6" strokeWidth="2" />
        <path d="M32 32l8 8" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 16v12M16 22h12" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Investors, MSOs & Enterprise Healthcare Platforms",
    description:
      "PE-backed networks and healthcare groups scaling through growth, consolidation, and digital transformation in revenue cycle.",
    gradient: "from-[#0b3330] to-[#0b1f33]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden>
        <path d="M6 36L18 24L26 32L42 14" stroke="#20c4d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="42" cy="14" r="3" fill="#20c4d6" />
      </svg>
    ),
  },
];

export default function CollaborateWith() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            We Collaborate With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-muted)]">
            A comprehensive healthcare ecosystem powered by intelligent, scalable revenue-cycle operations — built to serve every type of practice and organization.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collaborators.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="group relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Gradient background */}
                <div
                  className={`bg-gradient-to-br ${item.gradient} relative flex h-48 items-center justify-center overflow-hidden`}
                >
                  {/* Hex pattern overlay */}
                  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-10" aria-hidden xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`hex-${i}`} x="0" y="0" width="40" height="34" patternUnits="userSpaceOnUse">
                        <polygon points="20,1 37,10 37,28 20,37 3,28 3,10" fill="none" stroke="#20c4d6" strokeWidth="0.8" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#hex-${i})`} />
                  </svg>
                  <div className="relative">{item.icon}</div>
                </div>

                {/* Content */}
                <div className="border border-[var(--color-line)] border-t-0 rounded-b-2xl bg-white p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-navy)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4 text-center" delay={400}>
          <p className="mt-8 text-sm text-[var(--color-muted)]">
            No matter the specialty, scale, or complexity — AspireMedX delivers consistent revenue performance.
          </p>
          <Link
            href="/speciality"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-navy)] shadow-sm transition-all hover:border-[var(--color-navy)] hover:shadow-md"
          >
            Explore Specialties <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
