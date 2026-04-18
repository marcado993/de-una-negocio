"use client";

import { cn } from "@/lib/cn";
import { BusinessMascot } from "../atoms/BusinessMascot";
import { PercentPill, type PercentPillTone } from "../atoms/PercentPill";

export type CampaignTypeCardProps = {
  id: string;
  title: string;
  description: string;
  /** Tone for the discount pill on the top-right corner. */
  pillTone?: PercentPillTone;
  /** Path of the mascot PNG (optional — falls back to the SVG placeholder). */
  mascotSrc?: string;
  /** Currently-selected id from the parent. Triggers the purple ring. */
  selected?: boolean;
  onSelect?: (id: string) => void;
};

/**
 * Molecule — one of the four campaign types on the "Lanza Tu Próxima
 * Campaña" screen. Composed from:
 *   PercentPill   (atom — corner discount badge)
 *   BusinessMascot (atom — right-aligned illustration)
 *   title + description (pure text primitives)
 *
 * Acts as a radio-style selector: tapping it fires `onSelect(id)`.
 */
export function CampaignTypeCard({
  id,
  title,
  description,
  pillTone = "accent-green",
  mascotSrc,
  selected = false,
  onSelect,
}: CampaignTypeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(id)}
      aria-pressed={selected}
      className={cn(
        "relative flex w-full items-stretch gap-3 rounded-[var(--radius-lg)] bg-primary-soft px-4 py-4 text-left transition-all",
        "cursor-pointer active:scale-[0.99] hover:bg-primary-soft/80",
        selected
          ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-[var(--shadow-card)]"
          : "ring-1 ring-transparent",
      )}
    >
      <div className="flex flex-1 flex-col justify-center gap-1 pr-16">
        <span className="text-title-sm text-primary">{title}</span>
        <span className="text-sm leading-[18px] text-ink/80">{description}</span>
      </div>

      <div className="flex items-center">
        <BusinessMascot src={mascotSrc} size={72} />
      </div>

      <PercentPill
        tone={pillTone}
        size="md"
        className="absolute right-3 top-3"
      />
    </button>
  );
}
