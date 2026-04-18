"use client";

import { PercentOption } from "../atoms/PercentOption";

export type PercentChoice = number | "other";

export type PercentGridProps = {
  /** Discount percentages rendered in-order before the "OTRO" cell. */
  options?: readonly number[];
  value: PercentChoice | null;
  onChange: (choice: PercentChoice) => void;
  /** Label of the fallback cell. Defaults to "OTRO". */
  otherLabel?: string;
};

/**
 * Molecule — 2×2 grid of `PercentOption` atoms used as a single-select
 * discount picker ("5% · 10% · 15% · OTRO"). Leaves the specific
 * percentages configurable so the same component can power other
 * promo types.
 */
export function PercentGrid({
  options = [5, 10, 15],
  value,
  onChange,
  otherLabel = "OTRO",
}: PercentGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((pct) => (
        <PercentOption
          key={pct}
          label={`${pct}%`}
          selected={value === pct}
          onClick={() => onChange(pct)}
        />
      ))}
      <PercentOption
        label={otherLabel}
        selected={value === "other"}
        onClick={() => onChange("other")}
      />
    </div>
  );
}
