"use client";

import { useState } from "react";

import { Button } from "../atoms/Button";
import { PercentGrid, type PercentChoice } from "../molecules/PercentGrid";
import { PromoBanner } from "../molecules/PromoBanner";
import { Modal } from "./Modal";

export type PromoDiscountPayload = {
  choice: PercentChoice;
  /** Numeric percent when `choice` is a number; `null` when "OTRO". */
  percent: number | null;
};

export type PromoDiscountModalProps = {
  open: boolean;
  onClose: () => void;
  /** Fired when the user taps "Empezar" with a selection made. */
  onConfirm: (payload: PromoDiscountPayload) => void;
  brand?: string;
  bannerImageSrc?: string;
  options?: readonly number[];
  title?: string;
  helper?: string;
  /** Shown right below the grid in gray. */
  smallPrint?: string;
  /** Text of the main CTA. Defaults to "Empezar". */
  ctaLabel?: string;
};

/**
 * Organism — full-screen sheet that asks the shopkeeper to pick a
 * discount percentage backed by a brand partner (e.g. Netlife). The
 * inner content is a dedicated component that only mounts while the
 * modal is open, which naturally resets the selection between
 * openings without needing an effect to clear it manually.
 */
export function PromoDiscountModal({
  open,
  onClose,
  onConfirm,
  brand = "Netlife",
  bannerImageSrc = "/assets/mascota.png",
  options = [5, 10, 15],
  title = "Aplica un descuento al Total",
  helper = "Elije el porcentaje a aplicar:",
  smallPrint = "El descuento aplicado será asumido por tu tienda.",
  ctaLabel = "Empezar",
}: PromoDiscountModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Promos">
      {open ? (
        <PromoDiscountContent
          onConfirm={onConfirm}
          brand={brand}
          bannerImageSrc={bannerImageSrc}
          options={options}
          title={title}
          helper={helper}
          smallPrint={smallPrint}
          ctaLabel={ctaLabel}
        />
      ) : null}
    </Modal>
  );
}

type PromoDiscountContentProps = Required<
  Pick<
    PromoDiscountModalProps,
    | "onConfirm"
    | "brand"
    | "bannerImageSrc"
    | "options"
    | "title"
    | "helper"
    | "smallPrint"
    | "ctaLabel"
  >
>;

function PromoDiscountContent({
  onConfirm,
  brand,
  bannerImageSrc,
  options,
  title,
  helper,
  smallPrint,
  ctaLabel,
}: PromoDiscountContentProps) {
  const [choice, setChoice] = useState<PercentChoice | null>(null);

  const disabled = choice === null;

  const handleConfirm = () => {
    if (choice === null) return;
    onConfirm({
      choice,
      percent: typeof choice === "number" ? choice : null,
    });
  };

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col gap-4 px-4 pt-3">
        <PromoBanner brand={brand} imageSrc={bannerImageSrc} />

        <div className="flex flex-col gap-1">
          <h3 className="text-title-md text-primary">{title}</h3>
          <p className="text-[13px] font-medium text-text-secondary">
            {helper}
          </p>
        </div>

        <PercentGrid options={options} value={choice} onChange={setChoice} />

        {smallPrint ? (
          <p className="px-1 text-center text-[12px] font-medium text-text-secondary">
            {smallPrint}
          </p>
        ) : null}
      </div>

      <div className="sticky bottom-0 flex flex-col gap-2 border-t border-divider bg-surface-alt px-4 py-3">
        <p className="text-center text-[11px] text-text-secondary">
          Al presionar &quot;{ctaLabel}&quot; aceptas los{" "}
          <span className="font-bold text-primary underline underline-offset-2">
            Términos y condiciones
          </span>
        </p>
        <Button
          label={ctaLabel}
          size="lg"
          disabled={disabled}
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
}
