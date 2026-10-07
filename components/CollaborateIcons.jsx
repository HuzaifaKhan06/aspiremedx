// Glossy, dimensional icons for the "We Collaborate With" cards.
// Each icon uses gradient fills, highlight and shade faces for a 3D look.
// Gradient ids are prefixed per icon so they never collide on the page.

function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-cyan`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8ff6ff" />
        <stop offset="45%" stopColor="#20c4d6" />
        <stop offset="100%" stopColor="#0b8f87" />
      </linearGradient>
      <linearGradient id={`${id}-cyanDark`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#14a9b8" />
        <stop offset="100%" stopColor="#086a66" />
      </linearGradient>
      <linearGradient id={`${id}-light`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#bfe3ea" />
      </linearGradient>
      <linearGradient id={`${id}-silver`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#c9d6de" />
        <stop offset="100%" stopColor="#7d93a3" />
      </linearGradient>
      <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff1b8" />
        <stop offset="50%" stopColor="#f5c542" />
        <stop offset="100%" stopColor="#c98a07" />
      </linearGradient>
      <linearGradient id={`${id}-navy`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2a5f84" />
        <stop offset="100%" stopColor="#0d2840" />
      </linearGradient>
      <radialGradient id={`${id}-sphere`} cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#5fe6f3" />
        <stop offset="100%" stopColor="#0b7f78" />
      </radialGradient>
      <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#000" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

const svgProps = { viewBox: "0 0 64 64", className: "h-full w-full", "aria-hidden": true };

export function StethoscopeIcon() {
  const id = "ci-steth";
  return (
    <svg {...svgProps}>
      <Defs id={id} />
      <ellipse cx="32" cy="58" rx="18" ry="3" fill={`url(#${id}-shadow)`} />
      {/* Binaural tubes */}
      <path d="M18 10v14a8 8 0 0 0 16 0V10" fill="none" stroke={`url(#${id}-cyanDark)`} strokeWidth="5" strokeLinecap="round" />
      <path d="M18 10v14a8 8 0 0 0 16 0V10" fill="none" stroke={`url(#${id}-cyan)`} strokeWidth="3" strokeLinecap="round" />
      {/* Tubing down to the chest piece */}
      <path d="M26 32v8a10 10 0 0 0 20 0v-3" fill="none" stroke={`url(#${id}-cyanDark)`} strokeWidth="5" strokeLinecap="round" />
      <path d="M26 32v8a10 10 0 0 0 20 0v-3" fill="none" stroke={`url(#${id}-cyan)`} strokeWidth="3" strokeLinecap="round" />
      {/* Ear tips */}
      <circle cx="18" cy="9" r="3.2" fill={`url(#${id}-silver)`} />
      <circle cx="34" cy="9" r="3.2" fill={`url(#${id}-silver)`} />
      {/* Chest piece */}
      <circle cx="46" cy="30" r="8.5" fill={`url(#${id}-silver)`} />
      <circle cx="46" cy="30" r="5.5" fill={`url(#${id}-sphere)`} />
      <ellipse cx="43.5" cy="26.5" rx="2.5" ry="1.4" fill="#fff" opacity="0.8" />
    </svg>
  );
}

export function FacilitiesIcon() {
  const id = "ci-fac";
  return (
    <svg {...svgProps}>
      <Defs id={id} />
      <ellipse cx="34" cy="57" rx="24" ry="3.2" fill={`url(#${id}-shadow)`} />
      {/* Tall hospital building */}
      <polygon points="32,14 38,9 58,9 52,14" fill="#b9f3fa" />
      <polygon points="52,14 58,9 58,50 52,55" fill={`url(#${id}-cyanDark)`} />
      <rect x="32" y="14" width="20" height="41" fill={`url(#${id}-cyan)`} />
      <rect x="39.5" y="18" width="5" height="12" rx="1" fill="#fff" />
      <rect x="36" y="21.5" width="12" height="5" rx="1" fill="#fff" />
      {[34, 40, 46].map((y) => (
        <g key={y}>
          <rect x="35" y={y} width="5" height="3.5" rx="0.6" fill="#e9fdff" opacity="0.85" />
          <rect x="44" y={y} width="5" height="3.5" rx="0.6" fill="#e9fdff" opacity="0.85" />
        </g>
      ))}
      {/* Clinic building in front */}
      <polygon points="8,30 14,25 34,25 28,30" fill="#e6f2f6" />
      <polygon points="28,30 34,25 34,51 28,56" fill="#5d7a8e" />
      <rect x="8" y="30" width="20" height="26" fill={`url(#${id}-light)`} />
      {[34, 41].map((y) => (
        <g key={y}>
          <rect x="11" y={y} width="5" height="4" rx="0.6" fill={`url(#${id}-navy)`} />
          <rect x="20" y={y} width="5" height="4" rx="0.6" fill={`url(#${id}-navy)`} />
        </g>
      ))}
      <rect x="15" y="48" width="6" height="8" rx="1" fill={`url(#${id}-cyan)`} />
    </svg>
  );
}

export function HubIcon() {
  const id = "ci-hub";
  const nodes = [
    [12, 12],
    [52, 12],
    [12, 50],
    [52, 50],
  ];
  return (
    <svg {...svgProps}>
      <Defs id={id} />
      <ellipse cx="32" cy="59" rx="22" ry="3" fill={`url(#${id}-shadow)`} />
      {nodes.map(([x, y]) => (
        <line key={`l${x}${y}`} x1={x} y1={y} x2="32" y2="32" stroke="#20c4d6" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      ))}
      {/* Center cube */}
      <polygon points="23,27 28,22 42,22 37,27" fill="#c6f8fd" />
      <polygon points="37,27 42,22 42,36 37,41" fill={`url(#${id}-cyanDark)`} />
      <rect x="23" y="27" width="14" height="14" fill={`url(#${id}-cyan)`} />
      <rect x="25" y="29" width="4" height="2" rx="1" fill="#fff" opacity="0.7" />
      {/* Glossy nodes */}
      {nodes.map(([x, y]) => (
        <g key={`n${x}${y}`}>
          <circle cx={x} cy={y} r="7" fill={`url(#${id}-sphere)`} />
          <ellipse cx={x - 2.2} cy={y - 2.6} rx="2.4" ry="1.4" fill="#fff" opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

export function AwardIcon() {
  const id = "ci-award";
  return (
    <svg {...svgProps}>
      <Defs id={id} />
      <ellipse cx="32" cy="60" rx="16" ry="2.6" fill={`url(#${id}-shadow)`} />
      {/* Ribbons */}
      <polygon points="22,36 15,57 23,53 27,59 32,41" fill={`url(#${id}-cyanDark)`} />
      <polygon points="42,36 49,57 41,53 37,59 32,41" fill={`url(#${id}-cyan)`} />
      {/* Medal */}
      <circle cx="32" cy="25" r="17" fill={`url(#${id}-gold)`} />
      <circle cx="32" cy="25" r="12.5" fill={`url(#${id}-light)`} />
      <circle cx="32" cy="25" r="12.5" fill="none" stroke="#c98a07" strokeWidth="1" opacity="0.5" />
      {/* Medical cross */}
      <rect x="29" y="17" width="6" height="16" rx="1.5" fill={`url(#${id}-cyan)`} />
      <rect x="24" y="22" width="16" height="6" rx="1.5" fill={`url(#${id}-cyan)`} />
      <path d="M20 18a14 14 0 0 1 10-8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export function DiagnosticsIcon() {
  const id = "ci-diag";
  return (
    <svg {...svgProps}>
      <Defs id={id} />
      <ellipse cx="32" cy="60" rx="18" ry="2.6" fill={`url(#${id}-shadow)`} />
      {/* Stand */}
      <polygon points="28,44 36,44 39,54 25,54" fill={`url(#${id}-silver)`} />
      <ellipse cx="32" cy="55" rx="13" ry="3" fill={`url(#${id}-silver)`} />
      {/* Monitor */}
      <rect x="6" y="10" width="52" height="36" rx="5" fill={`url(#${id}-silver)`} />
      <rect x="9" y="13" width="46" height="30" rx="3" fill={`url(#${id}-navy)`} />
      {/* Scan brackets */}
      <path d="M13 21v-4h4M47 17h4v4M51 35v4h-4M17 39h-4v-4" fill="none" stroke="#5fe6f3" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      {/* Glowing pulse */}
      <path d="M13 29h9l3-7 5 14 4-10 2 3h15" fill="none" stroke="#20c4d6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
      <path d="M13 29h9l3-7 5 14 4-10 2 3h15" fill="none" stroke="#a6fbff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Glare */}
      <polygon points="9,13 26,13 14,43 9,43" fill="#fff" opacity="0.08" />
    </svg>
  );
}

export function GrowthIcon() {
  const id = "ci-grow";
  return (
    <svg {...svgProps}>
      <Defs id={id} />
      <ellipse cx="32" cy="59" rx="24" ry="3" fill={`url(#${id}-shadow)`} />
      {/* Handle */}
      <path d="M24 20v-5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5" fill="none" stroke={`url(#${id}-silver)`} strokeWidth="3.5" />
      {/* Briefcase body with top face for depth */}
      <polygon points="8,24 12,20 60,20 56,24" fill="#3d7ba3" />
      <polygon points="56,24 60,20 60,50 56,54" fill="#0a2236" />
      <rect x="8" y="24" width="48" height="30" rx="3" fill={`url(#${id}-navy)`} />
      <rect x="8" y="33" width="48" height="3" fill="#0a2236" opacity="0.6" />
      <rect x="28" y="31" width="8" height="7" rx="1.5" fill={`url(#${id}-gold)`} />
      {/* Rising growth arrow */}
      <path d="M12 48l11-10 8 6 17-17" fill="none" stroke="#06615c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M12 48l11-10 8 6 17-17" fill="none" stroke={`url(#${id}-cyan)`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="41,24 53,21 50,33" fill={`url(#${id}-cyan)`} />
    </svg>
  );
}
