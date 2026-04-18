"use client";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

import { cn } from "@/lib/cn";
import { IconButton } from "../atoms/IconButton";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Title rendered in the small top app-bar. */
  title?: string;
  /** Hides the close X (useful when a footer CTA is the only exit). */
  hideClose?: boolean;
  children: React.ReactNode;
  /** Extra classes applied to the inner content wrapper. */
  className?: string;
};

/**
 * Organism — full-screen modal/sheet used on mobile to overlay content
 * above the main tab. Styled to stop just above the fixed bottom nav
 * so the underlying tab bar stays visible, matching the Deuna design
 * reference. Keyboard: closes on Esc.
 */
export function Modal({
  open,
  onClose,
  title,
  hideClose = false,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={cn(
        "fixed left-1/2 top-0 z-50 w-full max-w-[480px] -translate-x-1/2",
        "h-[calc(100vh-64px)] bg-background",
        "flex flex-col overflow-hidden",
      )}
    >
      <div className="flex items-center gap-2 border-b border-divider bg-surface px-2 py-2">
        {hideClose ? (
          <span className="w-9" />
        ) : (
          <IconButton
            aria-label="Cerrar"
            onClick={onClose}
            variant="ghost"
            size="sm"
            icon={<IoClose className="h-[22px] w-[22px] text-primary" />}
          />
        )}
        {title ? (
          <h2 className="text-title-sm flex-1 text-center text-text-primary">
            {title}
          </h2>
        ) : (
          <span className="flex-1" />
        )}
        <span className="w-9" />
      </div>

      <div
        className={cn(
          "flex-1 overflow-y-auto",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
