import Image from "next/image";

import { cn } from "@/lib/cn";

export type PeopleStackProps = {
  /** Optional PNG path under `/public` to swap the SVG placeholder. */
  src?: string;
  size?: number;
  alt?: string;
  className?: string;
};

const ROWS = [
  [50],
  [36, 64],
  [22, 50, 78],
];

/**
 * Molecule — pyramid of stylized people used on the "Alcance" screen to
 * visualize the estimated reach. Inline SVG placeholder that can be
 * swapped for final artwork via `src`.
 */
export function PeopleStack({
  src,
  size = 180,
  alt = "Ilustración de personas",
  className,
}: PeopleStackProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn("object-contain", className)}
      />
    );
  }

  const ROW_HEIGHT = 34;
  const startY = 28;

  return (
    <svg
      viewBox="0 0 100 120"
      width={size}
      height={size}
      role="img"
      aria-label={alt}
      className={className}
    >
      <defs>
        <linearGradient id="dn-person" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9362da" />
          <stop offset="100%" stopColor="#4b1d8c" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="50" cy="110" rx="40" ry="5" fill="#4b1d8c" opacity="0.12" />

      {ROWS.map((row, rowIdx) => {
        const y = startY + rowIdx * ROW_HEIGHT;
        return row.map((cx, i) => (
          <g key={`${rowIdx}-${i}`} transform={`translate(${cx} ${y})`}>
            {/* Head */}
            <circle cx="0" cy="-4" r="5" fill="url(#dn-person)" />
            {/* Shoulders */}
            <path
              d="M -10 14 Q 0 2 10 14 L 10 18 L -10 18 Z"
              fill="url(#dn-person)"
            />
          </g>
        ));
      })}
    </svg>
  );
}
