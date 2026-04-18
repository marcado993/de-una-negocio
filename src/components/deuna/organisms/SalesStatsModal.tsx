"use client";

import { BarChart, type BarChartDatum } from "../molecules/BarChart";
import { Card } from "../molecules/Card";
import { Modal } from "./Modal";

/** Default synthetic data used when the modal is opened without a
 *  custom `data` prop. Intentionally mocked — in the real product this
 *  would come from the sales API, scoped to the current week. */
const DEFAULT_DATA: readonly BarChartDatum[] = [
  { label: "Lun", value: 58 },
  { label: "Mar", value: 40 },
  { label: "Mié", value: 52 },
  { label: "Jue", value: 70 },
  { label: "Vie", value: 86 },
  { label: "Sáb", value: 94 },
  { label: "Dom", value: 60 },
];

export type SalesStatsModalProps = {
  open: boolean;
  onClose: () => void;
  /** Headline inside the card — defaults to the current week range. */
  weekLabel?: string;
  /** Optional chart data override. */
  data?: readonly BarChartDatum[];
  /** When set, rendered as a purple line above the headline to surface
   *  the discount that triggered this view (e.g. "Aplicaste 10%"). */
  appliedDiscountLabel?: string;
};

/**
 * Organism — post-promo summary modal. Shows the week's sales ticker
 * in a single elevated card and leaves the bottom nav visible, so the
 * shopkeeper can dismiss by tapping the close X in the top-left.
 */
export function SalesStatsModal({
  open,
  onClose,
  weekLabel = "Ventas Semana del 13 al 19 de abril",
  data = DEFAULT_DATA,
  appliedDiscountLabel,
}: SalesStatsModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Estadísticas">
      <div className="flex flex-col gap-3 px-4 py-4">
        {appliedDiscountLabel ? (
          <div className="self-start rounded-full bg-primary-soft px-3 py-1 text-[12px] font-bold text-primary">
            {appliedDiscountLabel}
          </div>
        ) : null}

        <Card variant="elevated" padding="lg" className="flex flex-col gap-4">
          <h3 className="text-title-sm text-primary">{weekLabel}</h3>
          <BarChart data={data} height={240} />
        </Card>
      </div>
    </Modal>
  );
}
