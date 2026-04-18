"use client";

import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";

import { cn } from "@/lib/cn";

export type QuickActionProps = {
  /** Shown below the circular icon ("Recargar saldo"). */
  label: string;
  /** Icon component from `react-icons` (or any SVG component). */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Alternative: supply any ReactNode instead of `icon`. */
  iconNode?: ReactNode;
  /** Navigates to `href` when provided; otherwise behaves as a button. */
  href?: string;
  onClick?: () => void;
  /** Tints the icon circle — defaults to `primary-soft`. */
  tone?: "primary" | "success" | "warning" | "neutral";
  className?: string;
};

const toneMap: Record<NonNullable<QuickActionProps["tone"]>, string> = {
  primary: "bg-primary-soft text-primary",
  success: "bg-accent-green-soft text-accent-green",
  warning: "bg-[#fff4dc] text-[#b78200]",
  neutral: "bg-surface-alt text-text-secondary",
};

/**
 * Molecule — single tile in the "Accesos rápidos" grid: a circular
 * icon on top and a short label below. Works as both a `<Link>` (when
 * `href` is set) and a `<button>` so the home screen can mix
 * fully-wired actions with pure mockups.
 */
export function QuickAction({
  label,
  icon: Icon,
  iconNode,
  href,
  onClick,
  tone = "primary",
  className,
}: QuickActionProps) {
  const inner = (
    <>
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          toneMap[tone],
        )}
      >
        {Icon ? <Icon className="h-[22px] w-[22px]" /> : iconNode}
      </span>
      <span className="text-center text-[11px] font-semibold leading-tight text-text-primary">
        {label}
      </span>
    </>
  );

  const base = cn(
    "flex min-w-[72px] flex-col items-center gap-2 px-1 transition-opacity active:opacity-80",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(base, "cursor-pointer")}>
      {inner}
    </button>
  );
}
