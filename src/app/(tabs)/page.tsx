"use client";

import Image from "next/image";
import {
  IoAddOutline,
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoMegaphoneOutline,
  IoPersonAddOutline,
  IoPricetagsOutline,
  IoQrCodeOutline,
  IoStorefrontOutline,
} from "react-icons/io5";

import {
  BalanceCard,
  BusinessHeader,
  Card,
  QuickAction,
} from "@/components/deuna";
import { cn } from "@/lib/cn";

/**
 * Pantalla de Inicio — mockup del panel de Martha.
 *
 * Layout inspirado en la captura de diseño: header, botón "Cobrar",
 * `BalanceCard`, grilla de accesos rápidos y carrusel de novedades.
 *
 * Casi todo acá es visual (los botones no disparan navegación), con la
 * excepción de **Promociones**, que sí lleva a `/promociones` como
 * shortcut al módulo real.
 */
export default function InicioScreen() {
  return (
    <div className="flex flex-col pt-[max(env(safe-area-inset-top),0.5rem)]">
      <BusinessHeader
        ownerName="Martha"
        ownerRole="Administrador"
        businessName="Fruteria Martha Kiting"
        notificationCount={2}
      />

      <div className="flex flex-col gap-4 px-4 pt-2 pb-24">
        <CobrarButton />

        <BalanceCard balance={1000.5} pending={481.03} />

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
              label="Vender"
              icon={IoStorefrontOutline}
              tone="primary"
            />
            <QuickAction
              label="Agregar vendedor"
              icon={IoPersonAddOutline}
              tone="primary"
            />
            <QuickAction
              label="Promociones"
              icon={IoMegaphoneOutline}
              href="/promociones"
              tone="success"
            />
            <QuickAction
              label="Ofertas"
              icon={IoPricetagsOutline}
              tone="warning"
            />
            <QuickAction label="Agregar" icon={IoAddOutline} tone="neutral" />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-title-sm text-primary">Novedades Deuna Negocios</h2>
          <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <NewsCard
              tone="coral"
              title="¡Ahora pagos servicios con Mi Vecino!"
              brand="Pago Cash"
            />
            <NewsCard
              tone="green"
              title="Abre una cuenta personal"
              brand="deuna!"
            />
            <NewsCard
              tone="pink"
              title="Lanza promos en 2 toques"
              brand="Promociones"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/** Pill negro estilo POS. Visual únicamente — el flujo real vive en el
 *  módulo de venta (fuera de alcance para este mockup). */
function CobrarButton() {
  return (
    <button
      type="button"
      className="flex items-center justify-between rounded-full bg-ink px-5 py-3 text-white shadow-[var(--shadow-card)] active:opacity-85"
    >
      <span className="flex items-center gap-2 text-base font-bold">
        <IoQrCodeOutline className="h-5 w-5" />
        Cobrar
      </span>
      <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold">
        QR
      </span>
    </button>
  );
}

type NewsTone = "coral" | "green" | "pink";

const newsToneMap: Record<NewsTone, string> = {
  coral: "bg-[#fde8df] text-[#8a3a1f]",
  green: "bg-accent-green-soft text-[#1b7a3f]",
  pink: "bg-[#ffe4ec] text-[#8a2446]",
};

function NewsCard({
  tone,
  title,
  brand,
}: {
  tone: NewsTone;
  title: string;
  brand: string;
}) {
  const srcCandidates: Record<string, string> = {
    "Pago Cash": "/assets/pago-cash.png",
    "deuna!": "/assets/deuna.png",
  };
  const src = srcCandidates[brand];

  return (
    <Card
      variant="flat"
      padding="md"
      className={cn(
        "flex min-w-[200px] max-w-[240px] shrink-0 flex-col gap-3",
        newsToneMap[tone],
      )}
    >
      <p className="text-[13px] font-semibold leading-tight">{title}</p>
      <div className="flex h-7 items-center justify-start">
        {src ? (
          <Image
            src={src}
            alt={brand}
            width={80}
            height={20}
            className="h-5 w-auto object-contain"
          />
        ) : (
          <span className="rounded-md bg-white/70 px-2 py-0.5 text-[11px] font-extrabold italic tracking-tight">
            {brand}
          </span>
        )}
      </div>
    </Card>
  );
}
