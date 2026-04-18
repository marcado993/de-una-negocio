"use client";

import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { cn } from "@/lib/cn";
import { AmountText } from "../atoms/AmountText";
import { Card } from "./Card";

export type BalanceCardProps = {
  /** Main balance amount in cents-less float (1000.5 → "$1.000,50"). */
  balance: number;
  /** Pending-to-receive amount, rendered below in green. */
  pending?: number;
  /** Currency prefix. Defaults to "$". */
  currency?: string;
  /** Label shown above the balance ("Mi Saldo"). */
  label?: string;
  /** Label for the pending line ("Por recibir"). */
  pendingLabel?: string;
  /** Controls initial visibility. */
  defaultVisible?: boolean;
  className?: string;
};

/** Formats 1000.5 → "1.000,50" (es-EC). Kept local because this is the
 *  only spot that needs LATAM number formatting so far. */
function formatLatam(value: number): string {
  const fixed = value.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withThousands},${decPart}`;
}

/**
 * Molecule — "Mi Saldo" balance tile with an eye-toggle that masks the
 * amount when the shopkeeper hands the phone to a customer. The
 * `pending` figure is styled in green and sits right below.
 */
export function BalanceCard({
  balance,
  pending,
  currency = "$",
  label = "Mi Saldo",
  pendingLabel = "Por recibir",
  defaultVisible = true,
  className,
}: BalanceCardProps) {
  const [visible, setVisible] = useState(defaultVisible);

  return (
    <Card
      variant="elevated"
      padding="lg"
      className={cn("flex flex-col gap-1", className)}
    >
      <span className="text-[12px] font-semibold text-text-secondary">
        {label}
      </span>

      <div className="flex items-center gap-2">
        <AmountText
          value={`${currency}${formatLatam(balance)}`}
          visible={visible}
          size="xl"
          className="text-primary"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar saldo" : "Mostrar saldo"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-alt"
        >
          {visible ? (
            <IoEyeOutline className="h-[18px] w-[18px]" />
          ) : (
            <IoEyeOffOutline className="h-[18px] w-[18px]" />
          )}
        </button>
      </div>

      {pending != null ? (
        <span className="text-[12px] font-medium text-text-secondary">
          {pendingLabel}{" "}
          <span className="font-bold text-accent-green">
            {currency}
            {formatLatam(pending)}
          </span>
        </span>
      ) : null}
    </Card>
  );
}
