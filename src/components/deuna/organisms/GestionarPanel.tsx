"use client";

import { useState } from "react";
import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoCashOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

import { BalanceCard } from "../molecules/BalanceCard";
import { NewsCard } from "../molecules/NewsCard";
import { QuickAction } from "../molecules/QuickAction";
import {
  PromoDiscountModal,
  type PromoDiscountPayload,
} from "./PromoDiscountModal";
import { SalesStatsModal } from "./SalesStatsModal";

export type GestionarPanelProps = {
  /** Balance shown by the top `BalanceCard` (masked by default). */
  balance?: number;
  /** Pending amount to receive — hidden when omitted. */
  pending?: number;
};

/** Tracks which of the two secondary modals (discount picker, sales
 *  stats) is currently visible. Only one can be open at a time. */
type ActiveModal = "none" | "promo" | "stats";

/**
 * Organism — Gestionar panel: balance card, quick-action grid and a
 * horizontal "Novedades" carousel. Owns the flow that launches the
 * Netlife discount promo: picking a percentage closes the promo modal
 * and opens the sales-stats modal as the natural consequence.
 */
export function GestionarPanel({
  balance = 0,
  pending,
}: GestionarPanelProps = {}) {
  const [modal, setModal] = useState<ActiveModal>("none");
  const [lastPayload, setLastPayload] = useState<PromoDiscountPayload | null>(
    null,
  );

  const handlePromoConfirm = (payload: PromoDiscountPayload) => {
    setLastPayload(payload);
    setModal("stats");
  };

  const discountLabel = lastPayload
    ? lastPayload.percent != null
      ? `Aplicaste ${lastPayload.percent}% con Netlife`
      : "Promo personalizada activa"
    : undefined;

  return (
    <div className="flex flex-col gap-5 px-4 pt-2 pb-4">
      <BalanceCard
        balance={balance}
        pending={pending}
        defaultVisible={false}
        onPress={() => {
          /* mockup — hook up to the real balance detail screen */
        }}
      />

      <section className="flex flex-col gap-3">
        <h2 className="text-title-sm text-primary">Accesos rápidos</h2>
        <div className="grid grid-cols-4 gap-y-4">
          <QuickAction
            label="Recargar saldo"
            icon={IoArrowDownOutline}
            tone="primary"
          />
          <QuickAction
            label="Transferir saldo"
            icon={IoArrowUpOutline}
            tone="primary"
          />
          <QuickAction
            label="Venta Manual"
            icon={IoCashOutline}
            tone="primary"
          />
          <QuickAction
            label="Verificar pago"
            icon={IoShieldCheckmarkOutline}
            tone="primary"
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-title-sm text-primary">Novedades Deuna Negocios</h2>
        <div
          className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1"
          role="list"
        >
          <div role="listitem" className="w-[150px] shrink-0">
            <NewsCard
              tone="teal"
              title="Agrega vendedores a tu equipo"
              brand="deuna!"
            />
          </div>
          <div role="listitem" className="w-[150px] shrink-0">
            <NewsCard
              tone="teal"
              title="Administra tus ventas con tu caja"
              brand="deuna!"
            />
          </div>
          <div role="listitem" className="w-[150px] shrink-0">
            <NewsCard
              tone="teal"
              title="Lanzar Promociones"
              brand="deuna!"
              onPress={() => setModal("promo")}
            />
          </div>
        </div>
      </section>

      <PromoDiscountModal
        open={modal === "promo"}
        onClose={() => setModal("none")}
        onConfirm={handlePromoConfirm}
      />

      <SalesStatsModal
        open={modal === "stats"}
        onClose={() => setModal("none")}
        appliedDiscountLabel={discountLabel}
      />
    </div>
  );
}
