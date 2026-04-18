import { Badge } from "../atoms/Badge";
import { PercentPill } from "../atoms/PercentPill";
import { Card } from "./Card";

export type PromoHistoryItemProps = {
  title: string;
  description?: string;
  discountPct?: number;
  radiusM: number;
  createdAtISO: string;
  expiresAtISO: string;
  isActive: boolean;
};

const TIME_FMT = new Intl.DateTimeFormat("es-EC", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function minutesBetween(a: string, b: string): number {
  return Math.max(0, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 60_000));
}

/**
 * Molecule — one row of the admin promo history list.
 * Shows the campaign title, status badge (activa/vencida), radius,
 * duration and launch timestamp. Meant to live inside a stacked list.
 */
export function PromoHistoryItem({
  title,
  description,
  discountPct,
  radiusM,
  createdAtISO,
  expiresAtISO,
  isActive,
}: PromoHistoryItemProps) {
  const duration = minutesBetween(createdAtISO, expiresAtISO);

  return (
    <Card variant="surface" padding="md" className="flex items-start gap-3">
      <PercentPill size="sm" />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-title-sm text-primary">{title}</span>
          <Badge tone={isActive ? "success" : "warning"} size="xs">
            {isActive ? "Activa" : "Vencida"}
          </Badge>
        </div>
        {description ? (
          <span className="line-clamp-2 text-xs leading-4 text-ink/75">
            {description}
          </span>
        ) : null}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-secondary">
          <span>{TIME_FMT.format(new Date(createdAtISO))}</span>
          <span aria-hidden>·</span>
          <span>radio {radiusM} m</span>
          <span aria-hidden>·</span>
          <span>{duration} min</span>
          {typeof discountPct === "number" ? (
            <>
              <span aria-hidden>·</span>
              <span>-{discountPct}%</span>
            </>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
