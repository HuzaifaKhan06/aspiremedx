/*
 * Line icons for each service (24×24, stroke = currentColor), so the
 * container decides the colour — white on the navy badge in the nav
 * dropdown, teal on light cards, etc.
 */
const icons = {
  // Invoice with dollar sign
  "medical-billing": (
    <>
      <path d="M6 2h9l4 4v16l-2.5-1.5L14 22l-2.5-1.5L9 22l-3-1.5z" />
      <path d="M15 2v4h4" />
      <path d="M12 9v8M14 10.5h-3a1.25 1.25 0 0 0 0 2.5h2a1.25 1.25 0 0 1 0 2.5h-3" />
    </>
  ),
  // ID badge with check
  "provider-credentialing": (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="9" r="2.5" />
      <path d="M8 15.5a4 4 0 0 1 8 0" />
      <path d="m14.5 18.5 1.5 1.5 3-3" />
    </>
  ),
  // Code brackets on a document
  "medical-coding": (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 22h8M12 18v4" />
      <path d="m9 9-2 2 2 2M15 9l2 2-2 2M13 8l-2 6" />
    </>
  ),
  // Clipboard with plus
  "provider-enrollment": (
    <>
      <rect x="5" y="4" width="14" height="18" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M12 10v6M9 13h6" />
    </>
  ),
  // Handshake
  "payer-contracting": (
    <>
      <path d="m11 17 2 2a1.5 1.5 0 0 0 2-2" />
      <path d="m14 14 2.5 2.5a1.5 1.5 0 0 0 2-2L15 11l-3 2-1-1 3-3h3l3 3" />
      <path d="m3 11 3-3h3l3 3" />
      <path d="M6 13.5 9.5 17a1.5 1.5 0 0 0 2-2" />
    </>
  ),
  // Circular arrows around dollar
  "revenue-cycle-management": (
    <>
      <path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3" />
      <path d="M18 3v4h-4M6 21v-4h4" />
      <path d="M12 8v8M14 9.5h-3a1.25 1.25 0 0 0 0 2.5h2a1.25 1.25 0 0 1 0 2.5h-3" />
    </>
  ),
  // Bar chart
  "reporting-analytics": (
    <>
      <path d="M3 3v18h18" />
      <path d="M8 17v-5M12 17V8M16 17v-7M20 17V5" />
    </>
  ),
  // Headset
  "virtual-medical-assistant": (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
      <path d="M19 20a3 3 0 0 1-3 3h-3" />
    </>
  ),
  // Notepad with pen
  "medical-scribing": (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
      <path d="M8 9h5M8 13h4M8 17h6" />
      <path d="m18.5 2.5 3 3L15 12l-3.5.5.5-3.5z" />
    </>
  ),
  // Browser window with code
  "web-development": (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 8h20M5 6h.01M7.5 6h.01" />
      <path d="m9 12-2 2 2 2M15 12l2 2-2 2" />
    </>
  ),
  // Magnifier with rising trend
  "healthcare-seo": (
    <>
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="m21 21-5.5-5.5" />
      <path d="m7 12.5 2.5-2.5 1.5 1.5 3-3" />
    </>
  ),
  // Megaphone
  "digital-marketing": (
    <>
      <path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1z" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
    </>
  ),
};

export default function ServiceIcon({ slug, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {icons[slug] ?? icons["medical-billing"]}
    </svg>
  );
}
