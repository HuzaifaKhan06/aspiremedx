/*
 * Duotone speciality icons (48×48). Colours come from CSS custom properties so
 * each card can theme them:
 *   --ic-1  primary shape colour
 *   --ic-2  accent colour
 *   --ic-3  "cut-out" colour — should match the surface behind the icon
 * Defaults suit a light surface (teal / cyan / white).
 */
const P = "var(--ic-1, #0b8f87)";
const S = "var(--ic-2, #20c4d6)";
const H = "var(--ic-3, #ffffff)";

const round = { strokeLinecap: "round", strokeLinejoin: "round" };

const icons = {
  // Stethoscope
  "internal-medicine-billing": (
    <>
      <path d="M12 6v11a10 10 0 0 0 20 0V6" fill="none" stroke={P} strokeWidth="3.5" {...round} />
      <path d="M22 27v5a9 9 0 0 0 18 0v-4" fill="none" stroke={P} strokeWidth="3.5" {...round} />
      <circle cx="12" cy="5" r="2.8" fill={S} />
      <circle cx="32" cy="5" r="2.8" fill={S} />
      <circle cx="40" cy="24" r="6" fill={S} />
      <circle cx="40" cy="24" r="2.4" fill={H} />
    </>
  ),
  // Family group
  "family-medicine-billing": (
    <>
      <circle cx="13" cy="12" r="5.5" fill={P} />
      <path d="M3 40v-8a10 10 0 0 1 20 0v8z" fill={P} />
      <circle cx="35" cy="12" r="5.5" fill={S} />
      <path d="M25 40v-8a10 10 0 0 1 20 0v8z" fill={S} />
      <circle cx="24" cy="26" r="5" fill={H} />
      <circle cx="24" cy="26" r="3.6" fill={P} />
      <path d="M16 44a8 8 0 0 1 16 0z" fill={H} />
      <path d="M17.5 44a6.5 6.5 0 0 1 13 0z" fill={P} />
    </>
  ),
  // Heart with ECG trace
  "cardiology-billing": (
    <>
      <path d="M24 42C10 33 4 25 4 16.5A9.5 9.5 0 0 1 24 12a9.5 9.5 0 0 1 20 4.5C44 25 38 33 24 42z" fill={P} />
      <path d="M2 24h11l3-6 5 12 4-9 3 3h18" fill="none" stroke={S} strokeWidth="3.2" {...round} />
    </>
  ),
  // Kidneys
  "nephrology-billing": (
    <>
      <path d="M15 5C8 5 4 12 4 20s4 17 11 17c4 0 6-2 6-5 0-4-4-5-4-10s4-6 4-10c0-4-2-7-6-7z" fill={P} />
      <path d="M33 5c7 0 11 7 11 15s-4 17-11 17c-4 0-6-2-6-5 0-4 4-5 4-10s-4-6-4-10c0-4 2-7 6-7z" fill={P} />
      <path d="M19 27c2 3 5 6 5 17M29 27c-2 3-5 6-5 17" fill="none" stroke={S} strokeWidth="3" {...round} />
      <ellipse cx="10.5" cy="17" rx="2" ry="4" fill={H} opacity="0.55" />
      <ellipse cx="37.5" cy="17" rx="2" ry="4" fill={H} opacity="0.55" />
    </>
  ),
  // Baby face with pacifier
  "pediatrics-billing": (
    <>
      <circle cx="8" cy="26" r="4.5" fill={P} />
      <circle cx="40" cy="26" r="4.5" fill={P} />
      <circle cx="24" cy="26" r="16" fill={P} />
      <path d="M21 10.5c-1-4 2-7 5-6 3 1 3 5 0 6" fill="none" stroke={S} strokeWidth="2.8" {...round} />
      <circle cx="18" cy="23" r="2.2" fill={H} />
      <circle cx="30" cy="23" r="2.2" fill={H} />
      <circle cx="24" cy="33" r="5" fill={S} />
      <circle cx="24" cy="33" r="2" fill={H} />
    </>
  ),
  // Brain
  "neurology-billing": (
    <>
      <path d="M23 7c-3-3-9-2-10 2-4 0-7 4-6 8-3 2-3 7 0 9-1 4 2 8 6 8 1 3 5 5 10 3z" fill={P} />
      <path d="M25 7c3-3 9-2 10 2 4 0 7 4 6 8 3 2 3 7 0 9 1 4-2 8-6 8-1 3-5 5-10 3z" fill={S} />
      <path d="M13 15c3 0 5 2 5 5M10 26c3-1 6 0 7 3M35 15c-3 0-5 2-5 5M38 26c-3-1-6 0-7 3" fill="none" stroke={H} strokeWidth="2" opacity="0.8" {...round} />
      <path d="M21 37h6v7h-6z" fill={P} />
    </>
  ),
  // Head profile with mind gear
  "psychiatry-billing": (
    <>
      <path d="M25 4C14 4 7 12 7 21c0 6 3 10 6 13v10h17v-6h5a3 3 0 0 0 3-3v-6l4-1.5-4-8C38 11 33 4 25 4z" fill={P} />
      <circle cx="23" cy="20" r="8" fill={S} />
      <path d="M23 9.5v3M23 27.5v3M12.5 20h3M30.5 20h3M15.6 12.6l2.1 2.1M28.3 25.3l2.1 2.1M15.6 27.4l2.1-2.1M28.3 14.7l2.1-2.1" stroke={S} strokeWidth="3" {...round} />
      <circle cx="23" cy="20" r="3.2" fill={H} />
    </>
  ),
  // Lungs
  "pulmonology-billing": (
    <>
      <path d="M19 11c-7 2-14 12-14 24 0 5 3 7 8 6l7-3c2-1 3-3 3-5V15c0-3-2-5-4-4z" fill={P} />
      <path d="M29 11c7 2 14 12 14 24 0 5-3 7-8 6l-7-3c-2-1-3-3-3-5V15c0-3 2-5 4-4z" fill={P} />
      <path d="M24 3v16M24 19l-6 6M24 19l6 6" fill="none" stroke={S} strokeWidth="3.4" {...round} />
      <path d="M12 26c2-3 4-5 6-6M36 26c-2-3-4-5-6-6" fill="none" stroke={H} strokeWidth="2" opacity="0.6" {...round} />
    </>
  ),
  // Awareness ribbon
  "oncology-billing": (
    <>
      <path
        fillRule="evenodd"
        d="M24 3c-5.5 0-9 4-9 9.5 0 4.5 2.4 8.6 4.8 11.8L9 41.5l6.5 2.5L24 30.7l8.5 13.3 6.5-2.5-10.8-17.2c2.4-3.2 4.8-7.3 4.8-11.8C33 7 29.5 3 24 3zm0 6c-2 0-3.2 1.6-3.2 3.6 0 2.3 1.2 5 3.2 7.8 2-2.8 3.2-5.5 3.2-7.8C27.2 10.6 26 9 24 9z"
        fill={P}
      />
      <path d="M28.2 24.3 39 41.5 32.5 44 24 30.7z" fill={S} />
    </>
  ),
  // Footprint
  "podiatry-billing": (
    <>
      <path d="M23 16c-7 0-11 4.5-11 11 0 4 1.2 7 2.2 10 1.2 4 3 8 7.8 8 4 0 6-3 6-7 0-3-1.6-5-.8-8 .8-3 5.8-5 6.8-9 .8-3.2-2-5-11-5z" fill={P} />
      <circle cx="18" cy="9.5" r="3.8" fill={S} />
      <circle cx="25.5" cy="8" r="2.9" fill={S} />
      <circle cx="31" cy="10" r="2.5" fill={S} />
      <circle cx="35" cy="13.5" r="2.1" fill={S} />
      <circle cx="37.5" cy="18" r="1.8" fill={S} />
    </>
  ),
  // Inflamed knee joint
  "rheumatology-billing": (
    <>
      <circle cx="24" cy="26" r="11" fill={S} opacity="0.3" />
      <path d="M18 3h12v16c0 3.5-2.5 5.5-6 5.5S18 22.5 18 19z" fill={P} />
      <path d="M18 45h12V32c0-2.5-2.5-3.5-6-3.5s-6 1-6 3.5z" fill={P} />
      <path d="M8 26H4M44 26h-4M11 15l-3-3M37 15l3-3M11 37l-3 3M37 37l3 3" fill="none" stroke={S} strokeWidth="3" {...round} />
    </>
  ),
  // Spine
  "chiropractic-billing": (
    <>
      {[
        [21, 3],
        [23, 10.5],
        [25, 18],
        [25.5, 25.5],
        [24, 33],
        [21.5, 40.5],
      ].map(([cx, y], i) => (
        <g key={i}>
          <rect x={cx - 8} y={y} width="16" height="5.5" rx="2.6" fill={P} />
          <rect x={cx - 11} y={y + 1.6} width="22" height="2.3" rx="1.15" fill={P} />
          {i < 5 && <rect x={cx - 5} y={y + 5.9} width="10" height="1.4" rx="0.7" fill={S} />}
        </g>
      ))}
    </>
  ),
  // Person exercising with resistance band
  "physical-therapy-billing": (
    <>
      <path d="M4 44h40" stroke={S} strokeWidth="3" {...round} />
      <path d="M10 12c-2 10-1 22 4 32" fill="none" stroke={S} strokeWidth="2.4" strokeDasharray="3 3" {...round} />
      <circle cx="28" cy="7" r="4.5" fill={P} />
      <path d="M27 14l-3 13M11 13l15 4 10-7M24 27l-9 7v10M24 27l9 4 2 13" fill="none" stroke={P} strokeWidth="4" {...round} />
    </>
  ),
  // Uterus
  "obgyn-billing": (
    <>
      <path d="M16 16C12 11 8 11 5.5 14M32 16c4-5 8-5 10.5-2" fill="none" stroke={P} strokeWidth="3" {...round} />
      <ellipse cx="6" cy="20" rx="3.5" ry="4.5" fill={S} />
      <ellipse cx="42" cy="20" rx="3.5" ry="4.5" fill={S} />
      <path d="M14 12h20c0 10-3.5 16-7 18.5V38h-6v-7.5C17.5 28 14 22 14 12z" fill={P} />
      <path d="M19.5 16h9c0 5-2 8.5-4.5 10-2.5-1.5-4.5-5-4.5-10z" fill={H} />
      <path d="M17 42c2-2 4.5-3 7-3s5 1 7 3" fill="none" stroke={S} strokeWidth="3" {...round} />
    </>
  ),
  // Eye
  "ophthalmology-billing": (
    <>
      <path d="M2 24C8 13 15.5 8.5 24 8.5S40 13 46 24c-6 11-13.5 15.5-22 15.5S8 35 2 24z" fill={P} />
      <path d="M8 24c5-7.5 10-10.5 16-10.5S35 16.5 40 24c-5 7.5-10 10.5-16 10.5S13 31.5 8 24z" fill={H} />
      <circle cx="24" cy="24" r="8.5" fill={S} />
      <circle cx="24" cy="24" r="4" fill={P} />
      <circle cx="27" cy="21" r="1.6" fill={H} />
    </>
  ),
  // Wheelchair
  "dme-billing": (
    <>
      <circle cx="19" cy="32" r="11" fill="none" stroke={P} strokeWidth="3.5" />
      <circle cx="19" cy="32" r="3.2" fill={S} />
      <path d="M9 5h4v17h15l6 12h6" fill="none" stroke={P} strokeWidth="3.5" {...round} />
      <path d="M13 14h13" stroke={S} strokeWidth="3.5" {...round} />
      <circle cx="39" cy="41" r="3.4" fill={S} />
    </>
  ),
  // Capsule and tablet
  "pharmacy-billing-services": (
    <>
      <g transform="rotate(-45 19 19)">
        <rect x="5" y="12" width="28" height="14" rx="7" fill={S} />
        <path d="M12 12h7v14h-7a7 7 0 0 1 0-14z" fill={P} />
      </g>
      <circle cx="35" cy="35" r="9" fill={P} />
      <path d="M29.5 29.5l11 11" stroke={H} strokeWidth="2.4" {...round} />
    </>
  ),
  // Counselling speech bubbles with heart
  "mental-health-billing": (
    <>
      <path d="M7 5h26a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H19l-8 7v-7H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" fill={P} />
      <path d="M20 24c-6-3.8-8.5-6.8-8.5-9.6a4.2 4.2 0 0 1 8.5-1.6 4.2 4.2 0 0 1 8.5 1.6c0 2.8-2.5 5.8-8.5 9.6z" fill={H} />
      <path d="M30 31h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-2v4l-5-4h-5a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3z" fill={S} />
      <circle cx="31.5" cy="37" r="1.4" fill={H} />
      <circle cx="36" cy="37" r="1.4" fill={H} />
      <circle cx="40.5" cy="37" r="1.4" fill={H} />
    </>
  ),
  // Ambulance
  "emergency-room-billing": (
    <>
      <rect x="11" y="9" width="7" height="5" rx="1.5" fill={S} />
      <rect x="2" y="14" width="28" height="22" rx="3" fill={P} />
      <path d="M30 20h8.5l7 8.5V36H30z" fill={S} />
      <path d="M32.5 23h5l4 5h-9z" fill={H} />
      <path d="M14 18h4v5h5v4h-5v5h-4v-5H9v-4h5z" fill={H} />
      <circle cx="11" cy="37" r="5" fill={P} />
      <circle cx="11" cy="37" r="2" fill={H} />
      <circle cx="37" cy="37" r="5" fill={P} />
      <circle cx="37" cy="37" r="2" fill={H} />
    </>
  ),
  // Surgical light
  "asc-billing-services": (
    <>
      <path d="M24 2v9" stroke={P} strokeWidth="3.5" {...round} />
      <path d="M11 24h26l-5 19H16z" fill={S} opacity="0.35" />
      <path d="M5 24a19 13 0 0 1 38 0z" fill={P} />
      <circle cx="15" cy="20" r="2.6" fill={H} />
      <circle cx="24" cy="17.5" r="2.6" fill={H} />
      <circle cx="33" cy="20" r="2.6" fill={H} />
      <path d="M21.5 31h5v3.5H30v5h-3.5V43h-5v-3.5H18v-5h3.5z" fill={S} />
    </>
  ),
  // MRI scanner
  "radiology-billing-services": (
    <>
      <circle cx="24" cy="21" r="17" fill={P} />
      <circle cx="24" cy="21" r="9.5" fill={H} />
      <circle cx="24" cy="22.5" r="4.5" fill={S} />
      <path d="M12 7.5a17 17 0 0 1 24 0" fill="none" stroke={S} strokeWidth="2.5" opacity="0.8" {...round} />
      <rect x="3" y="33" width="42" height="5" rx="2.5" fill={S} />
      <path d="M10 38h4v7h-4zM34 38h4v7h-4z" fill={P} />
    </>
  ),
  // Clock with medical badge
  "urgent-care-billing": (
    <>
      <circle cx="20" cy="27" r="17" fill={P} />
      <circle cx="20" cy="27" r="12.5" fill="none" stroke={H} strokeWidth="1.5" opacity="0.5" />
      <path d="M20 17v10l7 4" fill="none" stroke={H} strokeWidth="3" {...round} />
      <circle cx="37" cy="11" r="9.5" fill={S} />
      <path d="M35.2 5.5h3.6v3.7h3.7v3.6h-3.7v3.7h-3.6v-3.7h-3.7V9.2h3.7z" fill={H} />
    </>
  ),
  // Skin layers with follicles
  "dermatology-billing": (
    <>
      <path d="M13 4v14M24 7v11M35 4v14" stroke={P} strokeWidth="2.4" {...round} />
      <path d="M3 18c4-2 8-2 12 0s8 2 12 0 8-2 12 0 6 0 6 0v6H3z" fill={S} />
      <rect x="3" y="24" width="42" height="9" fill={P} />
      <rect x="3" y="33" width="42" height="11" rx="2" fill={P} opacity="0.55" />
      <circle cx="13" cy="28.5" r="2.4" fill={H} />
      <circle cx="24" cy="28.5" r="2.4" fill={H} />
      <circle cx="35" cy="28.5" r="2.4" fill={H} />
    </>
  ),
  // Bone with splint band
  "orthopedics-billing": (
    <>
      <g transform="rotate(-45 24 24)">
        <rect x="11" y="20" width="26" height="8" fill={P} />
        <circle cx="11" cy="18.5" r="5.5" fill={P} />
        <circle cx="11" cy="29.5" r="5.5" fill={P} />
        <circle cx="37" cy="18.5" r="5.5" fill={P} />
        <circle cx="37" cy="29.5" r="5.5" fill={P} />
        <rect x="20" y="17" width="8" height="14" rx="1.5" fill={S} />
        <path d="M22 20.5h4M22 24h4M22 27.5h4" stroke={H} strokeWidth="1.4" {...round} />
      </g>
    </>
  ),
  // Stomach
  "gastroenterology-billing": (
    <>
      <path d="M16 3h7v7c4.5 1.5 7 4.5 7 8.5 0 4-3 6-3 9.5 0 2.8 2 4.5 4.5 4.5 2.8 0 4.6-2 5.5-4.5l1-3h7v6c-1 8-7 13.5-16 13.5C15.5 44.5 7 37.5 7 27.5c0-8 3.8-13.3 9-16.3z" fill={P} />
      <path d="M12.5 28c.8 6 5 10 11 10.5" fill="none" stroke={H} strokeWidth="2.5" opacity="0.7" {...round} />
      <path d="M16 3h7" stroke={S} strokeWidth="3.5" {...round} />
      <path d="M38 24h7" stroke={S} strokeWidth="3.5" {...round} />
    </>
  ),
  // Thyroid gland
  "endocrinology-billing": (
    <>
      <path d="M24 2v44" stroke={S} strokeWidth="4.5" {...round} opacity="0.6" />
      <path d="M21.5 16C19.5 9.5 15.5 6 11.5 6 7.5 6 5 12 6 20c1.2 9.5 6.2 16 10.5 16 3.2 0 5-3 5-8z" fill={P} />
      <path d="M26.5 16c2-6.5 6-10 10-10 4 0 6.5 6 5.5 14-1.2 9.5-6.2 16-10.5 16-3.2 0-5-3-5-8z" fill={P} />
      <rect x="19" y="24" width="10" height="7" rx="3" fill={S} />
      <ellipse cx="12" cy="18" rx="2" ry="4.5" fill={H} opacity="0.5" />
      <ellipse cx="36" cy="18" rx="2" ry="4.5" fill={H} opacity="0.5" />
    </>
  ),
  // Body with pain burst
  "pain-management-billing": (
    <>
      <circle cx="24" cy="9" r="6" fill={P} />
      <path d="M11 46V29c0-7 5.5-11.5 13-11.5S37 22 37 29v17z" fill={P} />
      <path d="M24 25l2.3 4.2 4.4-2-1 4.8 4.6 1.2-4.2 2.8 2.4 4.1-4.7-.8-.9 4.7-2.9-3.6-2.9 3.6-.9-4.7-4.7.8 2.4-4.1-4.2-2.8 4.6-1.2-1-4.8 4.4 2z" fill={S} />
      <circle cx="24" cy="34" r="2.6" fill={H} />
    </>
  ),
  // Test tubes in rack
  "diagnostic-laboratory-billing": (
    <>
      {[6, 19, 32].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 5h10`} stroke={P} strokeWidth="3" {...round} />
          <path d={`M${x + 1.5} 6v28a3.5 3.5 0 0 0 7 0V6`} fill="none" stroke={P} strokeWidth="2.5" />
          <path d={`M${x + 1.5} ${[20, 15, 24][i]}h7v14a3.5 3.5 0 0 1-7 0z`} fill={i === 1 ? P : S} />
        </g>
      ))}
      <rect x="2" y="28" width="44" height="4.5" rx="2" fill={P} />
      <path d="M5 32.5v12M43 32.5v12" stroke={P} strokeWidth="3" {...round} />
    </>
  ),
  // House with heart
  "home-health-billing": (
    <>
      <path d="M32 7h5v9l-5-4z" fill={S} />
      <path d="M24 4 3 22h6v21h30V22h6z" fill={P} />
      <path d="M24 38c-6.5-4.2-9.5-7.5-9.5-10.6a4.6 4.6 0 0 1 9.5-1.8 4.6 4.6 0 0 1 9.5 1.8c0 3.1-3 6.4-9.5 10.6z" fill={S} />
    </>
  ),
  // Doctor's bag
  "primary-care-billing": (
    <>
      <path d="M16 14v-4a3.5 3.5 0 0 1 3.5-3.5h9A3.5 3.5 0 0 1 32 10v4" fill="none" stroke={P} strokeWidth="3.5" {...round} />
      <rect x="3" y="14" width="42" height="29" rx="4" fill={P} />
      <path d="M3 22h42" stroke={H} strokeWidth="1.5" opacity="0.4" />
      <path d="M21 23h6v6h6v6h-6v6h-6v-6h-6v-6h6z" fill={S} />
    </>
  ),
  // Hospital building
  "multi-specialty-billing": (
    <>
      <rect x="15" y="3" width="18" height="13" rx="2" fill={S} />
      <path d="M22.5 5.5h3v3h3v3h-3v3h-3v-3h-3v-3h3z" fill={H} />
      <rect x="6" y="16" width="36" height="28" rx="2" fill={P} />
      {[11, 19, 26, 34].map((x) =>
        [20, 27].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="3.5" height="4" rx="0.8" fill={H} />)
      )}
      <path d="M19.5 35h9v9h-9z" fill={S} />
    </>
  ),
};

export default function SpecialityIcon({ slug, className = "h-10 w-10", title }) {
  const icon = icons[slug] ?? icons["internal-medicine-billing"];
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {icon}
    </svg>
  );
}
