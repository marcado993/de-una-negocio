import { cn } from "@/lib/cn";

export type PercentPillTone = "primary" | "accent-green" | "accent-yellow";
export type PercentPillSize = "sm" | "md";

export type PercentPillProps = {
  tone?: PercentPillTone;
  size?: PercentPillSize;
  className?: string;
  /** Character shown inside the pill. Defaults to "%". */
  symbol?: string;
};

const sizeMap: Record<PercentPillSize, string> = {
  sm: "h-7 w-7 text-[13px]",
  md: "h-9 w-9 text-[16px]",
};

const toneMap: Record<PercentPillTone, string> = {
  primary: "bg-primary text-white",
  "accent-green": "bg-accent-green text-white",
  "accent-yellow": "bg-accent-yellow text-ink",
};

/**
 * Atom — circular badge used on Promociones cards to signal a
 * discount / percentage-based reward. Renders a single glyph by
 * default (defaults to `%`) and swaps color via the `tone` prop.
 */
export function PercentPill({
  tone = "primary",
  size = "md",
  symbol = "%",
  className,
}: PercentPillProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center rounded-full font-extrabold leading-none",
        "shadow-[0_2px_6px_rgba(0,0,0,0.12)]",
        sizeMap[size],
        toneMap[tone],
        className,
      )}
    >
      {symbol}
    </span>
  );
}
