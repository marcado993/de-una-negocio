"use client";

import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";

import { IconButton } from "../atoms/IconButton";
import { cn } from "@/lib/cn";

export type HeroBannerProps = {
  /** Source for the mascot illustration shown on the left half. */
  imageSrc: string;
  /** Accessible alt text for the illustration. */
  imageAlt: string;
  /**
   * Title rendered on the right side. Accepts ReactNode so callers
   * can mix in lowercase / brand spans (e.g. `yaPass`).
   */
  title: React.ReactNode;
  /**
   * Width of the mascot artwork in pixels. Heights are derived from
   * the artwork's intrinsic aspect ratio at runtime via `object-contain`
   * so callers only need to pass `imageWidth`.
   */
  imageWidth?: number;
  /** Fine-tunes the artwork's vertical size when it doesn't fill the band. */
  imageHeight?: number;
  /** Total band height in px. Defaults to 180 — the compact size that
   *  lets three cards fit on Beneficios without scrolling. Promos and
   *  other screens can override when they need more mascot presence. */
  height?: number;
  /**
   * When provided, renders a top-left back arrow that calls this
   * handler. Used by the Promos screen; omitted on Desafíos because
   * the bottom Beneficios tab is the navigation source.
   */
  onBack?: () => void;
  /**
   * Whether the banner should stay pinned while the content below scrolls.
   * Defaults to `true` (used by feed-like screens). Promos disables it
   * to avoid any sticky + viewport overflow quirks on mobile.
   */
  sticky?: boolean;
  className?: string;
};

/**
 * Molecule — fixed-height lavender hero band shared by Promos and
 * Beneficios (Desafíos). It is `sticky top-0` so it stays pinned at
 * the top of the scrollable area while the cards below move; its
 * dimensions are locked (202px tall, full shell width) so it never
 * grows or pushes the rest of the layout around. The safe-area inset
 * at the top is absorbed by the band itself, not by the scrolling
 * content underneath.
 */
export function HeroBanner({
  imageSrc,
  imageAlt,
  title,
  imageWidth = 145,
  imageHeight = 167,
  height = 180,
  onBack,
  sticky = true,
  className,
}: HeroBannerProps) {
  return (
    <section
      aria-label={typeof title === "string" ? title : undefined}
      style={{ height }}
      className={cn(
        sticky ? "sticky top-0 z-20" : "relative z-10",
        "w-full shrink-0 overflow-hidden",
        "bg-linear-to-b from-[#f6eeff] to-[#e7dcf2]",
        "pt-[max(env(safe-area-inset-top),0.5rem)]",
        className,
      )}
    >
      {onBack ? (
        <IconButton
          aria-label="Volver"
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute left-2 top-3 z-10 text-primary"
          icon={<IoArrowBack className="h-5 w-5" />}
        />
      ) : null}
      <div className="relative flex h-full items-center">
        <div
          className="relative shrink-0 pl-3"
          style={{ width: imageWidth, height: imageHeight }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes={`${imageWidth}px`}
            className="object-contain"
            priority
          />
        </div>
        <p className="pr-4 text-[22px] font-extrabold leading-[26px] text-primary">
          {title}
        </p>
      </div>
    </section>
  );
}
