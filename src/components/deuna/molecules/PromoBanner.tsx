import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type PromoBannerTone = "lavender" | "orange";

export type PromoBannerProps = {
  /** Brand name used both for the right-side heading fallback and the
   *  image alt-text. */
  brand: string;
  /** Optional mascot / illustration rendered on the left. */
  imageSrc?: string;
  imageAlt?: string;
  /**
   * Visual treatment. `lavender` matches the in-app YaPass promo
   * header; `orange` keeps the original Netlife gradient for backward
   * compatibility.
   */
  tone?: PromoBannerTone;
  /**
   * Rich heading rendered on the right side. When omitted we fall back
   * to a stylized brand wordmark (legacy behaviour). Pass a ReactNode
   * (with `<br />`s) to control line breaks manually.
   */
  heading?: ReactNode;
  className?: string;
};

/**
 * Molecule — wide promotional banner used as the hero inside the
 * discount-launch modal. Defaults to the YaPass lavender look with
 * the SALE mascot and the "Crea descuentos…" copy on the right; can
 * be switched back to the orange Netlife treatment via `tone`.
 */
export function PromoBanner({
  brand,
  imageSrc,
  imageAlt,
  tone = "lavender",
  heading,
  className,
}: PromoBannerProps) {
  const isLavender = tone === "lavender";

  return (
    <div
      className={cn(
        "relative flex h-[150px] w-full items-center overflow-hidden rounded-[var(--radius-lg)]",
        isLavender
          ? "bg-primary-soft"
          : "bg-gradient-to-r from-[#ff7a00] via-[#ff8a2e] to-[#ffb347]",
        className,
      )}
    >
      {!isLavender ? (
        <>
          <span
            aria-hidden
            className="absolute -right-10 -top-8 h-40 w-40 rounded-full bg-white/15"
          />
          <span
            aria-hidden
            className="absolute bottom-[-30px] left-[-20px] h-32 w-32 rounded-full bg-white/10"
          />
        </>
      ) : null}

      <div
        className={cn(
          "relative z-10 flex h-full items-end justify-start",
          isLavender ? "w-[46%] pl-2" : "w-[55%] pl-2",
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? brand}
            width={180}
            height={180}
            className={cn(
              "h-[138px] w-auto object-contain",
              isLavender
                ? "drop-shadow-[0_6px_14px_rgba(75,29,140,0.18)]"
                : "drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)]",
            )}
          />
        ) : null}
      </div>

      <div
        className={cn(
          "relative z-10 ml-auto flex h-full items-center",
          isLavender ? "w-[54%] pr-4" : "pr-4",
        )}
      >
        {heading ? (
          <p
            className={cn(
              "text-[19px] font-extrabold leading-[1.1]",
              isLavender ? "text-primary" : "text-white",
            )}
          >
            {heading}
          </p>
        ) : (
          <span
            className={cn(
              "text-[28px] font-extrabold italic tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]",
              isLavender ? "text-primary" : "text-white",
            )}
            style={{ fontFamily: "system-ui" }}
          >
            {brand}
            <span className="ml-1 text-[18px] font-black">~</span>
          </span>
        )}
      </div>
    </div>
  );
}
