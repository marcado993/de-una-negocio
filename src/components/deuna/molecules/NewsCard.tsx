"use client";

import Image from "next/image";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

import { cn } from "@/lib/cn";
import { Card } from "./Card";

export type NewsCardTone = "teal" | "coral" | "pink" | "green" | "lavender";

export type NewsCardOrientation = "square" | "wide";

export type NewsCardProps = {
  title: string;
  /** Brand label at the bottom. When omitted, only the title is shown. */
  brand?: string;
  /** Image rendered as the brand lockup. Takes priority over `brand` text. */
  logoSrc?: string;
  logoAlt?: string;
  /** Optional hero image rendered on the left edge of the wide layout. */
  imageSrc?: string;
  imageAlt?: string;
  tone?: NewsCardTone;
  /**
   * `square` is the legacy compact tile (150×130). `wide` stretches the
   * card to fill its container and lays out content in a single row
   * with a trailing chevron, matching the banking-app style vertical
   * feed on Gestionar.
   */
  orientation?: NewsCardOrientation;
  /** When provided, the card renders as an anchor. Mutually exclusive with `onPress`. */
  href?: string;
  onPress?: () => void;
  className?: string;
};

const toneMap: Record<NewsCardTone, string> = {
  teal: "bg-[#d3f5ef] text-[#0b6b60]",
  coral: "bg-[#fde8df] text-[#8a3a1f]",
  pink: "bg-[#ffe4ec] text-[#8a2446]",
  green: "bg-accent-green-soft text-[#1b7a3f]",
  lavender: "bg-primary-soft text-primary",
};

/**
 * Molecule — "Novedades" card. Two layouts:
 * - `square`: compact 150×130 tile (legacy horizontal carousel look).
 * - `wide`: full-width row with optional left image, title + brand
 *   stacked in the middle, and a trailing chevron — the vertical
 *   banking-app feed style.
 * Passing `href` / `onPress` promotes the card to a tappable surface.
 */
export function NewsCard({
  title,
  brand,
  logoSrc,
  logoAlt,
  imageSrc,
  imageAlt,
  tone = "teal",
  orientation = "square",
  href,
  onPress,
  className,
}: NewsCardProps) {
  const isInteractive = Boolean(href || onPress);
  const isWide = orientation === "wide";

  const body = isWide ? (
    <div className="flex w-full items-center gap-3">
      {imageSrc ? (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-white/60">
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            sizes="64px"
            className="object-contain p-1"
          />
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[14px] font-semibold leading-snug">{title}</p>
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={logoAlt ?? brand ?? "logo"}
            width={56}
            height={20}
            className="h-5 w-auto object-contain"
          />
        ) : brand ? (
          <span className="w-fit rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-extrabold italic tracking-tight">
            {brand}
          </span>
        ) : null}
      </div>
      {isInteractive ? (
        <IoChevronForward
          aria-hidden
          className="h-4 w-4 shrink-0 opacity-70"
        />
      ) : null}
    </div>
  ) : (
    <>
      <p className="text-[13px] font-semibold leading-tight">{title}</p>
      <div className="flex items-center">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={logoAlt ?? brand ?? "logo"}
            width={56}
            height={28}
            className="h-7 w-auto object-contain"
          />
        ) : brand ? (
          <span className="rounded-md bg-white/80 px-2 py-0.5 text-[11px] font-extrabold italic tracking-tight">
            {brand}
          </span>
        ) : null}
      </div>
    </>
  );

  const cardClassName = cn(
    isWide
      ? "flex w-full items-center"
      : "flex h-[130px] w-full flex-col justify-between",
    toneMap[tone],
    isInteractive && "cursor-pointer transition-opacity active:opacity-85",
    className,
  );

  if (href) {
    return (
      <Link href={href} className="block">
        <Card variant="flat" padding="md" className={cardClassName}>
          {body}
        </Card>
      </Link>
    );
  }
  if (onPress) {
    return (
      <button
        type="button"
        onClick={onPress}
        className="block w-full text-left"
      >
        <Card variant="flat" padding="md" className={cardClassName}>
          {body}
        </Card>
      </button>
    );
  }
  return (
    <Card variant="flat" padding="md" className={cardClassName}>
      {body}
    </Card>
  );
}
