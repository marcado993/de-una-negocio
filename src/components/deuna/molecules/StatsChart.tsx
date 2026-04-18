import Image from "next/image";

import { cn } from "@/lib/cn";

export type StatsChartProps = {
  /** Path under `/public` to swap this SVG placeholder for the final art. */
  src?: string;
  /** Square size in px. Defaults to 200. */
  size?: number;
  alt?: string;
  className?: string;
};

const BARS = [
  { heightPct: 38, fill: "#8ed9b8" },
  { heightPct: 55, fill: "#f4c542" },
  { heightPct: 72, fill: "#ef6e8f" },
  { heightPct: 92, fill: "#7a4ec7" },
];

/**
 * Molecule — celebratory bar-chart illustration used as the hero of the
 * "Alcance De Tu Campaña" screen. Inline SVG placeholder that can be
 * swapped for a higher-fidelity PNG via the `src` prop when the final
 * artwork is delivered.
 *
 * Bars grow with a CSS keyframe (`dn-bar-grow`) on mount, and a few
 * sparkles twinkle to give it a celebratory feel.
 */
export function StatsChart({
  src,
  size = 200,
  alt = "Ilustración de estadísticas",
  className,
}: StatsChartProps) {
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

  return (
    <svg
      viewBox="0 0 200 180"
      width={size}
      height={size}
      role="img"
      aria-label={alt}
      className={className}
    >
      {/* Baseline */}
      <line
        x1="20"
        y1="150"
        x2="180"
        y2="150"
        stroke="#4b1d8c"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Bars */}
      {BARS.map((bar, i) => {
        const h = bar.heightPct * 1.1;
        const x = 32 + i * 30;
        const y = 150 - h;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={22}
            height={h}
            rx={5}
            fill={bar.fill}
            style={{
              transformOrigin: `${x + 11}px 150px`,
              transformBox: "fill-box",
              animation: `dn-bar-grow 700ms cubic-bezier(0.22, 1, 0.36, 1) ${
                i * 120
              }ms both`,
            }}
          />
        );
      })}

      {/* Trend dots + connecting line */}
      <polyline
        points="43,112 73,92 103,70 133,44"
        stroke="#4b1d8c"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [43, 112],
        [73, 92],
        [103, 70],
        [133, 44],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="#ffffff" />
          <circle cx={x} cy={y} r="3" fill="#4b1d8c" />
        </g>
      ))}

      {/* Sparkle stars */}
      {[
        { x: 155, y: 30, size: 7, delay: 0 },
        { x: 175, y: 70, size: 5, delay: 400 },
        { x: 25, y: 40, size: 6, delay: 200 },
      ].map((s, i) => (
        <path
          key={i}
          d={`M ${s.x} ${s.y - s.size} L ${s.x + s.size * 0.3} ${s.y - s.size * 0.3} L ${s.x + s.size} ${s.y} L ${s.x + s.size * 0.3} ${s.y + s.size * 0.3} L ${s.x} ${s.y + s.size} L ${s.x - s.size * 0.3} ${s.y + s.size * 0.3} L ${s.x - s.size} ${s.y} L ${s.x - s.size * 0.3} ${s.y - s.size * 0.3} Z`}
          fill="#f4c542"
          style={{
            transformOrigin: `${s.x}px ${s.y}px`,
            transformBox: "fill-box",
            animation: `dn-star-twinkle 1.6s ease-in-out ${s.delay}ms infinite`,
          }}
        />
      ))}
    </svg>
  );
}
