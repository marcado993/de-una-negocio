import Image from "next/image";

import { cn } from "@/lib/cn";

export type PromoBannerProps = {
  /** Brand name shown as a stylized lockup on the right side. */
  brand: string;
  /** Optional mascot / illustration rendered on the left. */
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

/**
 * Molecule — wide promotional banner (the orange "Netlife" hero in the
 * discount modal). The left half holds an optional mascot illustration
 * and the right half renders the brand name as a curvy, playful
 * wordmark that doesn't depend on a brand-specific asset.
 */
export function PromoBanner({
  brand,
  imageSrc,
  imageAlt,
  className,
}: PromoBannerProps) {
  return (
    <div
      className={cn(
        "relative flex h-[150px] w-full items-center overflow-hidden rounded-[var(--radius-lg)]",
        "bg-gradient-to-r from-[#ff7a00] via-[#ff8a2e] to-[#ffb347]",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -right-10 -top-8 h-40 w-40 rounded-full bg-white/15"
      />
      <span
        aria-hidden
        className="absolute bottom-[-30px] left-[-20px] h-32 w-32 rounded-full bg-white/10"
      />

      <div className="relative z-10 flex h-full w-[55%] items-end justify-start pl-2">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? brand}
            width={160}
            height={160}
            className="h-[140px] w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
          />
        ) : null}
      </div>

      <div className="relative z-10 ml-auto flex h-full items-center pr-4">
        <span
          className="text-[28px] font-extrabold italic tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
          style={{ fontFamily: "system-ui" }}
        >
          {brand}
          <span className="ml-1 text-[18px] font-black">~</span>
        </span>
      </div>
    </div>
  );
}
