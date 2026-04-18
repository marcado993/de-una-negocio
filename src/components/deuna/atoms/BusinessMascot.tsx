import Image from "next/image";

import { cn } from "@/lib/cn";

export type BusinessMascotProps = {
  /** Absolute path under `/public` (e.g. `/assets/mascot-basket.png`). When
   *  omitted the component renders an SVG placeholder so screens still
   *  look reasonable before the final artwork ships. */
  src?: string;
  /** Alternative text for accessibility. */
  alt?: string;
  /** Square size in px. Defaults to 90. */
  size?: number;
  className?: string;
};

/**
 * Atom — Deuna Negocios mascot. Swappable PNG/SVG slot used on campaign
 * cards, empty states, and onboarding illustrations. Falls back to an
 * inline SVG "purple blob" when no `src` is provided.
 */
export function BusinessMascot({
  src,
  alt = "Mascota Deuna",
  size = 90,
  className,
}: BusinessMascotProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn("object-contain", className)}
        priority={false}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <linearGradient id="dn-mascot-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9362da" />
            <stop offset="60%" stopColor="#6c36b8" />
            <stop offset="100%" stopColor="#4b1d8c" />
          </linearGradient>
        </defs>
        {/* Body */}
        <ellipse cx="50" cy="58" rx="32" ry="36" fill="url(#dn-mascot-body)" />
        {/* Belly */}
        <ellipse cx="50" cy="68" rx="18" ry="20" fill="#c9a8ee" opacity="0.6" />
        {/* Eyes */}
        <circle cx="40" cy="48" r="4.5" fill="#1c1c1c" />
        <circle cx="60" cy="48" r="4.5" fill="#1c1c1c" />
        <circle cx="41" cy="46.5" r="1.5" fill="#ffffff" />
        <circle cx="61" cy="46.5" r="1.5" fill="#ffffff" />
        {/* Smile */}
        <path
          d="M42 62 Q50 70 58 62"
          stroke="#1c1c1c"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Basket */}
        <g>
          <rect
            x="54"
            y="70"
            width="22"
            height="14"
            rx="3"
            fill="#e8c988"
            stroke="#a0793a"
            strokeWidth="1.5"
          />
          <path
            d="M56 70 Q65 62 74 70"
            stroke="#a0793a"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="60" cy="72" r="2.5" fill="#e0543b" />
          <circle cx="65" cy="72" r="2.5" fill="#f4c542" />
          <circle cx="70" cy="72" r="2.5" fill="#22c55e" />
        </g>
      </svg>
    </div>
  );
}
