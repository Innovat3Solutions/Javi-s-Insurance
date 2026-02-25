// Brand Icons based on Javi's Insurance Design Elements

interface IconProps {
  className?: string;
  size?: number;
}

// Shield Logo - Main brand shield with checkmark
export const ShieldLogo = ({ className = "w-10 h-10" }: IconProps) => (
  <svg viewBox="0 0 40 44" fill="none" className={className}>
    <path
      d="M20 0L0 8v12c0 11.1 8.5 21.5 20 24 11.5-2.5 20-12.9 20-24V8L20 0z"
      fill="#1A459D"
    />
    <path
      d="M20 4L4 10.5v9.5c0 9.2 7 17.8 16 20 9-2.2 16-10.8 16-20v-9.5L20 4z"
      fill="#C81D21"
    />
    <path
      d="M20 8L8 13v7c0 7.4 5.5 14.3 12 16 6.5-1.7 12-8.6 12-16v-7L20 8z"
      fill="white"
    />
    <path
      d="M15 22l3 3 7-7-1.5-1.5L18 22l-1.5-1.5L15 22z"
      fill="#1A459D"
    />
  </svg>
);

// Shield Icon - Simple shield shape (blue filled)
export const ShieldIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 36" fill="none" className={className}>
    <path
      d="M16 0L0 6v10c0 9 6.8 17.4 16 20 9.2-2.6 16-11 16-20V6L16 0z"
      fill="currentColor"
    />
  </svg>
);

// Shield Outline - Outlined shield
export const ShieldOutline = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 36" fill="none" className={className}>
    <path
      d="M16 2L2 7.2v8.8c0 8 6 15.4 14 17.8 8-2.4 14-9.8 14-17.8V7.2L16 2z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
    />
  </svg>
);

// Shield with Plus - Healthcare shield
export const ShieldPlus = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 36" fill="none" className={className}>
    <path
      d="M16 0L0 6v10c0 9 6.8 17.4 16 20 9.2-2.6 16-11 16-20V6L16 0z"
      fill="currentColor"
    />
    <path
      d="M14 12v10M9 17h14"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Plus Icon - Medical cross
export const PlusIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path
      d="M16 4v24M4 16h24"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

// Plus Circle - Circled plus
export const PlusCircle = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <path
      d="M16 10v12M10 16h12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// Filled Plus Circle
export const PlusCircleFilled = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="currentColor" />
    <path
      d="M16 10v12M10 16h12"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// Arrow Right - Brand arrow
export const ArrowRightIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path
      d="M6 16h20M18 8l8 8-8 8"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Arrow Circle Right - Circled arrow
export const ArrowCircleRight = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <path
      d="M12 16h10M18 12l4 4-4 4"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Checkmark Icon
export const CheckIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path
      d="M6 16l7 7L26 9"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Circle Check - Circled checkmark
export const CircleCheck = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <path
      d="M10 16l4 4 8-8"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Filled Circle Check
export const CircleCheckFilled = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="currentColor" />
    <path
      d="M10 16l4 4 8-8"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Star Icon
export const StarIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path
      d="M16 2l4 8 9 1.5-6.5 6.5 1.5 9L16 22l-8 5 1.5-9L3 11.5 12 10l4-8z"
      fill="currentColor"
    />
  </svg>
);

// Heart Icon (for Life Insurance)
export const HeartIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path
      d="M16 28S3 20 3 11.5C3 7 6.5 3 11 3c2.5 0 4.5 1.5 5 3 .5-1.5 2.5-3 5-3 4.5 0 8 4 8 8.5C29 20 16 28 16 28z"
      fill="currentColor"
    />
  </svg>
);

// Person Icon (for Medicare)
export const PersonIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="9" r="6" fill="currentColor" />
    <path
      d="M4 30c0-6.6 5.4-12 12-12s12 5.4 12 12"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Family Icon
export const FamilyIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 32" fill="none" className={className}>
    <circle cx="20" cy="7" r="5" fill="currentColor" />
    <path d="M10 30c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="8" cy="10" r="4" fill="currentColor" opacity="0.7" />
    <path d="M0 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <circle cx="32" cy="10" r="4" fill="currentColor" opacity="0.7" />
    <path d="M24 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
  </svg>
);

// Document/Policy Icon
export const DocumentIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path
      d="M6 4h14l6 6v18a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
      fill="currentColor"
    />
    <path d="M20 4v6h6" fill="white" fillOpacity="0.3" />
    <path d="M10 16h12M10 20h12M10 24h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Phone Icon
export const PhoneIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path
      d="M28 22.5v3.5a2 2 0 01-2.2 2 20 20 0 01-8.7-3.1 19.5 19.5 0 01-6-6 20 20 0 01-3.1-8.7A2 2 0 0110 6h3.5a2 2 0 012 1.7c.1.9.4 1.8.7 2.6a2 2 0 01-.5 2.1l-1.5 1.5a16 16 0 006 6l1.5-1.5a2 2 0 012.1-.5c.8.3 1.7.5 2.6.7a2 2 0 011.6 2z"
      fill="currentColor"
    />
  </svg>
);

// Email Icon
export const EmailIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="3" y="6" width="26" height="20" rx="2" fill="currentColor" />
    <path d="M3 8l13 8 13-8" stroke="white" strokeWidth="2" />
  </svg>
);

// Dollar Icon
export const DollarIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <path
      d="M16 8v16M12 12c0-1.7 1.8-3 4-3s4 1.3 4 3-1.8 3-4 3-4 1.3-4 3 1.8 3 4 3 4-1.3 4-3"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// Calendar Icon
export const CalendarIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="4" y="6" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <path d="M4 12h24" stroke="currentColor" strokeWidth="2.5" />
    <path d="M10 4v4M22 4v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Pill/Medicine Icon
export const PillIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="8" y="4" width="16" height="24" rx="8" fill="currentColor" />
    <path d="M8 16h16" stroke="white" strokeWidth="2" />
  </svg>
);

// Stethoscope Icon
export const StethoscopeIcon = ({ className = "w-8 h-8", size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path
      d="M8 4v6a8 8 0 0016 0V4"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="24" cy="20" r="4" fill="currentColor" />
    <path
      d="M24 24v4a4 4 0 01-4 4h-4a4 4 0 01-4-4v-4"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Background Pattern - Grid
export const GridPattern = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg className={className} width="100%" height="100%">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

// Background Pattern - Shield Pattern
export const ShieldPattern = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg className={className} width="100%" height="100%">
    <defs>
      <pattern id="shields" width="60" height="70" patternUnits="userSpaceOnUse">
        <path
          d="M30 5L15 10v8c0 7 5 13 15 16 10-3 15-9 15-16v-8L30 5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#shields)" />
  </svg>
);

// Background Pattern - Plus Pattern
export const PlusPattern = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg className={className} width="100%" height="100%">
    <defs>
      <pattern id="plus" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M20 10v20M10 20h20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#plus)" />
  </svg>
);
