import Reveal from "./Reveal";
import Link from "next/link";
import {
  StethoscopeIcon,
  FacilitiesIcon,
  HubIcon,
  AwardIcon,
  DiagnosticsIcon,
  GrowthIcon,
} from "./CollaborateIcons";

const collaborators = [
  {
    title: "Specialty & Multi-Specialty Physician Practices",
    description:
      "Supporting practices of all sizes across 20+ clinical specialties with unified revenue cycle operations and dedicated billing expertise.",
    gradient: "from-[#0b1f33] to-[#0b8f87]",
    tags: ["20+ specialties", "Dedicated billers", "Unified reporting"],
    // Stethoscope — physician practices
    icon: <StethoscopeIcon />,
  },
  {
    title: "High-Growth & Complex Care Delivery Organizations",
    description:
      "Organizations managing high encounter volumes, multiple locations, and complex payer mixes under a single revenue framework.",
    gradient: "from-[#173b57] to-[#0b3330]",
    tags: ["Multi-location", "High volume", "Complex payer mix"],
    // Two care facilities — multi-location organizations
    icon: <FacilitiesIcon />,
  },
  {
    title: "Healthcare Technology & Platform Partners",
    description:
      "EMR, PM, analytics, clearinghouse, and payer-connectivity platforms enabling a connected, efficient RCM ecosystem.",
    gradient: "from-[#0b3330] to-[#173b57]",
    tags: ["EHR / PM", "Clearinghouses", "Integrations"],
    // Connected hub — platform integrations
    icon: <HubIcon />,
  },
  {
    title: "Centers of Excellence & Specialty Clinics",
    description:
      "Including oncology, cardiology, orthopedics, ophthalmology, dermatology, gastroenterology, pain management, and more.",
    gradient: "from-[#0b1f33] to-[#0b3330]",
    tags: ["Oncology", "Cardiology", "Orthopedics"],
    // Award badge with a medical cross — centers of excellence
    icon: <AwardIcon />,
  },
  {
    title: "Diagnostics, Imaging & Ancillary Care Providers",
    description:
      "Revenue operations for labs, imaging centers, and ancillary services requiring tight compliance, accuracy, and fast claim cycles.",
    gradient: "from-[#173b57] to-[#0b8f87]",
    tags: ["Labs", "Imaging centers", "Ancillary"],
    // Scan frame with a pulse line — diagnostics & imaging
    icon: <DiagnosticsIcon />,
  },
  {
    title: "Investors, MSOs & Enterprise Healthcare Platforms",
    description:
      "PE-backed networks and healthcare groups scaling through growth, consolidation, and digital transformation in revenue cycle.",
    gradient: "from-[#0b3330] to-[#0b1f33]",
    tags: ["PE-backed", "MSOs", "Scale-ready RCM"],
    // Briefcase with a growth trend — investors & enterprise
    icon: <GrowthIcon />,
  },
];

export default function CollaborateWith() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-3xl">
            We Collaborate With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-muted)]">
            A comprehensive healthcare ecosystem powered by intelligent, scalable revenue-cycle operations — built to serve every type of practice and organization.
          </p>
        </Reveal>

        {/* Hover focus effect lives in globals.css (.collab-*) and only runs on
            large, hover-capable screens — phones/tablets get static cards. */}
        <div className="collab-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collaborators.map((item, i) => (
            <Reveal key={item.title} delay={i * 60} className="h-full">
              <div className="collab-card relative flex h-full flex-col overflow-hidden rounded-2xl shadow-md">
                {/* Gradient header — expands to fill the card on hover */}
                <div className={`collab-head absolute inset-x-0 top-0 h-32 overflow-hidden bg-gradient-to-br ${item.gradient}`}>
                  {/* Hex pattern overlay */}
                  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-10" aria-hidden xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`hex-${i}`} x="0" y="0" width="40" height="34" patternUnits="userSpaceOnUse">
                        <polygon points="20,1 37,10 37,28 20,37 3,28 3,10" fill="none" stroke="#20c4d6" strokeWidth="0.8" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#hex-${i})`} />
                  </svg>
                </div>

                {/* Icon — sinks into the background as a large watermark on hover */}
                <div className="collab-icon pointer-events-none absolute left-1/2 top-16 h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2">
                  {/* Raised glass tile behind the 3D icon */}
                  <div
                    className="collab-icon-tile absolute inset-0 rounded-2xl border border-white/20"
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04))",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -6px 12px rgba(0,0,0,0.18), 0 18px 28px -12px rgba(0,0,0,0.55)",
                    }}
                  />
                  <div className="absolute inset-2 drop-shadow-[0_6px_6px_rgba(0,0,0,0.35)]">{item.icon}</div>
                </div>

                {/* Content */}
                <div className="collab-body relative mt-32 flex-1 rounded-b-2xl border border-t-0 border-[var(--color-line)] bg-white p-5">
                  <p className="collab-kicker hidden font-mono text-[10px] font-semibold uppercase tracking-widest text-[#20c4d6] lg:block">
                    We serve
                  </p>
                  <h3 className="collab-title font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-navy)]">
                    {item.title}
                  </h3>
                  <p className="collab-desc mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </div>

                {/* Tags — revealed on hover (desktop only) */}
                <div className="collab-tags pointer-events-none absolute inset-x-5 bottom-5 hidden flex-wrap gap-2 lg:flex">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#20c4d6]/40 bg-[#20c4d6]/10 px-3 py-1 text-[11px] font-semibold text-[#9ff0f8]"
                    >
                      {tag}
                    </span>
                  ))}
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
