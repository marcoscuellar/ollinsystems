// OLLIN icon set — 1.7-stroke outline glyphs + the Signal mark.

type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** The OLLIN mark — a mint signal dot inside a mist ring. Intelligence (ring)
 *  converging on action (dot). */
export function OllinMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="13" stroke="#E3E9E7" strokeWidth="2.4" />
      <circle cx="16" cy="16" r="5.5" fill="#64D99E" />
    </svg>
  );
}

/** Light-surface variant (login, docs). */
export function OllinMarkInk({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="13" stroke="#0A100E" strokeWidth="2.4" />
      <circle cx="16" cy="16" r="5.5" fill="#64D99E" />
    </svg>
  );
}

// Back-compat aliases so untouched shared components keep compiling.
export const MuulMark = OllinMarkInk;
export const MuulMarkVolt = OllinMark;

export const TodayIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const HuntIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M15.8 15.8 20 20" />
    <path d="M11 8.5v5M8.5 11h5" />
  </svg>
);

export const PipelineIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="5" cy="7" r="1.5" />
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="5" cy="17" r="1.5" />
    <path d="M8.5 7H20M8.5 12H17M8.5 17H14" />
  </svg>
);

export const AccountsIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 20V6.5A1.5 1.5 0 0 1 5.5 5h7A1.5 1.5 0 0 1 14 6.5V20" />
    <path d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5V20" />
    <path d="M3 20h18" />
    <path d="M7.5 9h3M7.5 12.5h3M7.5 16h3M17 13.5v.01M17 16.5v.01" />
  </svg>
);

export const CampaignsIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 11v3" />
    <path d="M4 12.5l12-5v10l-12-5Z" />
    <path d="M16 9.5a3 3 0 0 1 0 6" />
    <path d="M8 15.5V19a1 1 0 0 0 1 1h1.5" />
  </svg>
);

export const ActivityIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3.5 12h4l2.5-6 4 12 2.5-6h4" />
  </svg>
);

// Chevrons-left « — points inward to collapse; rotated 180° to expand.
export const CollapseIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M13 6 7 12l6 6" />
    <path d="M18.5 6l-6 6 6 6" />
  </svg>
);

export const TalentIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
  </svg>
);

export const PlusIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const ArrowIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />
  </svg>
);

export const CheckIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4.5 12.5 10 18 19.5 7" />
  </svg>
);

export const LinkOutIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M9 5H5.8A1.8 1.8 0 0 0 4 6.8v11.4A1.8 1.8 0 0 0 5.8 20h11.4a1.8 1.8 0 0 0 1.8-1.8V15" />
    <path d="M13.5 4H20v6.5M20 4l-9 9" />
  </svg>
);

export const SearchIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4.3-4.3" />
  </svg>
);

// Legacy names some shared components may still reference.
export const HomeIcon = TodayIcon;
export const ComposeIcon = CampaignsIcon;
export const CalendarIcon = TodayIcon;
export const CoachIcon = ActivityIcon;
export const WingmanIcon = HuntIcon;
export const TrendingIcon = HuntIcon;
export const AnalyticsIcon = ActivityIcon;
export const LibraryIcon = AccountsIcon;
