"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { Card } from "./Card";

export type NewsCardTone = "teal" | "coral" | "pink" | "green";

export type NewsCardProps = {
  title: string;
  /** Brand label at the bottom. When omitted, only the title is shown. */
  brand?: string;
  /** Image rendered as the brand lockup. Takes priority over `brand` text. */
  logoSrc?: string;
  logoAlt?: string;
  tone?: NewsCardTone;
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
};

/**
 * Molecule — compact "Novedades" card. Square-ish tile with a short
 * headline on top and a brand lockup (text or image) anchored to the
 * bottom-left. Passing `href` / `onPress` promotes it to a tappable
 * surface (used for the "Lanzar Promociones" shortcut on Gestionar).
 */
export function NewsCard({
  title,
  brand,
  logoSrc,
  logoAlt,
  tone = "teal",
  href,
  onPress,
  className,
}: NewsCardProps) {
  const body = (
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
    "flex h-[130px] w-full flex-col justify-between",
    toneMap[tone],
    (href || onPress) && "cursor-pointer transition-opacity active:opacity-85",
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
