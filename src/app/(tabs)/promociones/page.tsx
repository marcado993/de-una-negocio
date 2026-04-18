"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTimeOutline } from "react-icons/io5";

import {
  BusinessHeader,
  Button,
  CampaignTypeCard,
  type CampaignTypeCardProps,
} from "@/components/deuna";

/**
 * Definiciones de las 4 campañas que puede lanzar el dueño de negocio
 * (tomadas de la captura "Campaña Promocodes"). Cada entry es una
 * prop-config directa para el molecule `CampaignTypeCard`, así cambiar
 * un copy o tono no requiere tocar JSX.
 */
type Campaign = Omit<CampaignTypeCardProps, "selected" | "onSelect">;

const CAMPAIGNS: Campaign[] = [
  {
    id: "vuelve-veci",
    title: "Vuelva Veci",
    description:
      "Cuando compra por una vez, se le da un descuento personalizado.",
  },
  {
    id: "refiera-una-vez",
    title: "Refiera Una Vez",
    description:
      "Si un cliente es referido a su local gana un descuento.",
  },
  {
    id: "compre-3-veces",
    title: "Compre 3 Veces",
    description:
      "Si un cliente compra 3 veces, se puede hacer un descuento.",
  },
  {
    id: "apure-veci",
    title: "Apure, Veci",
    description: "Descuentos en productos por vencer.",
  },
];

export default function PromocionesScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedId) return;
    router.push(`/promociones/alcance?campaign=${selectedId}`);
  };

  return (
    <div className="flex flex-col pt-[max(env(safe-area-inset-top),0.5rem)]">
      <BusinessHeader
        ownerName="Martha"
        ownerRole="Administrador"
        businessName="Fruteria Martha Kiting"
        notificationCount={2}
      />

      <div className="flex flex-col gap-4 px-4 pt-2 pb-32">
        <div className="flex items-center gap-2">
          <h1 className="flex-1 text-title-md text-primary">
            Lanza Tu Próxima Campaña
          </h1>
          <Link
            href="/promociones/historial"
            className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary active:opacity-85"
          >
            <IoTimeOutline className="h-[16px] w-[16px]" />
            Historial
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {CAMPAIGNS.map((c) => (
            <CampaignTypeCard
              key={c.id}
              {...c}
              selected={selectedId === c.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 px-4 pb-[max(env(safe-area-inset-bottom),1.5rem)]">
        <div className="pointer-events-auto mb-20">
          <Button
            label="Continuar"
            size="lg"
            disabled={!selectedId}
            onClick={handleContinue}
          />
        </div>
      </div>
    </div>
  );
}
