"use client";

import { BusinessMascot } from "../atoms/BusinessMascot";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { PopupModal } from "./PopupModal";

export type PromoLaunchedModalProps = {
  visible: boolean;
  campaignTitle: string;
  reachPeople: number;
  radiusM: number;
  /** Subscribers that had an open stream at the exact broadcast moment. */
  deliveredNow: number;
  onCreateAnother: () => void;
  onViewHistory: () => void;
  onClose: () => void;
};

/**
 * Organism — celebratory confirmation shown right after a POST /campaigns
 * succeeds. Surfaces the `delivered` count the backend returns so the
 * owner immediately knows how many nearby users actually got the push.
 */
export function PromoLaunchedModal({
  visible,
  campaignTitle,
  reachPeople,
  radiusM,
  deliveredNow,
  onCreateAnother,
  onViewHistory,
  onClose,
}: PromoLaunchedModalProps) {
  const deliveredCopy =
    deliveredNow === 1 ? "1 persona cerca" : `${deliveredNow} personas cerca`;

  return (
    <PopupModal visible={visible} title="" onClose={onClose} size="md">
      <div className="flex flex-col items-center gap-3 text-center">
        <BusinessMascot size={110} />

        <div className="flex flex-col items-center gap-1">
          <Badge tone="success" size="sm">
            Promo lanzada
          </Badge>
          <span className="text-title-md text-primary">
            ¡Tu promo ya está en el aire!
          </span>
          <span className="text-sm text-ink/80">
            {campaignTitle} · radio {radiusM} m
          </span>
        </div>

        <div className="grid w-full grid-cols-2 gap-2">
          <div className="rounded-[var(--radius-md)] bg-white/70 p-3 text-left">
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              Llegó ahora
            </span>
            <span className="text-title-sm text-primary">{deliveredCopy}</span>
          </div>
          <div className="rounded-[var(--radius-md)] bg-white/70 p-3 text-left">
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              Alcance estimado
            </span>
            <span className="text-title-sm text-primary">
              {reachPeople} personas
            </span>
          </div>
        </div>

        {deliveredNow === 0 ? (
          <span className="text-[11px] leading-4 text-text-secondary">
            No había clientes conectados justo ahora — la promo sigue activa y
            la verán al abrir la app en el barrio.
          </span>
        ) : null}

        <div className="flex w-full flex-col gap-2 pt-1">
          <Button label="Ver historial" onClick={onViewHistory} size="md" />
          <Button
            label="Crear otra"
            variant="ghost"
            onClick={onCreateAnother}
            size="md"
          />
        </div>
      </div>
    </PopupModal>
  );
}
