import { cn } from "@/lib/cn";

export type BarChartDatum = {
  label: string;
  value: number;
  /** Override the bar color for this datum. Otherwise an alternating
   *  primary/accent-mint palette is applied. */
  color?: string;
};

export type BarChartProps = {
  data: readonly BarChartDatum[];
  /** Total height of the chart in pixels. Defaults to 220. */
  height?: number;
  /** Palette used when a datum doesn't override its color. */
  palette?: readonly [string, string];
  className?: string;
};

const DEFAULT_PALETTE: readonly [string, string] = [
  "var(--color-primary-light)",
  "var(--color-accent-mint)",
];

/**
 * Molecule — lightweight vertical bar chart rendered with pure SVG.
 * Bars auto-alternate across the provided palette, share a consistent
 * top-round radius and show day labels under each bar. No tooltip or
 * axis ticks — kept intentionally simple for summary cards.
 */
export function BarChart({
  data,
  height = 220,
  palette = DEFAULT_PALETTE,
  className,
}: BarChartProps) {
  const chartHeight = height - 28;
  const maxValue = Math.max(1, ...data.map((d) => d.value));

  const barGap = 10;
  const barWidth = 28;
  const totalWidth = data.length * (barWidth + barGap) - barGap;

  return (
    <div
      className={cn("flex w-full justify-center", className)}
      role="img"
      aria-label="Gráfico de ventas por día"
    >
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="xMidYMid meet"
      >
        {data.map((d, i) => {
          const x = i * (barWidth + barGap);
          const h = Math.max(4, (d.value / maxValue) * chartHeight);
          const y = chartHeight - h;
          const fill = d.color ?? palette[i % palette.length];
          return (
            <g key={`${d.label}-${i}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                rx={6}
                ry={6}
                fill={fill}
              />
              <text
                x={x + barWidth / 2}
                y={height - 8}
                textAnchor="middle"
                fontSize="11"
                fontWeight={600}
                fill="var(--color-text-secondary)"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
