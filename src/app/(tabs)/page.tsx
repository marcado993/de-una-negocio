import { IoTrendingUp } from "react-icons/io5";

import { BusinessHeader, Card } from "@/components/deuna";

/**
 * Inicio (placeholder) — fuera del alcance del primer pase. La imagen
 * original muestra un balance, accesos rápidos y un carrusel de
 * novedades; se arma cuando se amplíe el scope más allá de Promociones.
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

      <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
        <Card variant="elevated" padding="lg" className="flex flex-col gap-2">
          <span className="text-title-md">Bienvenida al panel</span>
          <p className="text-body-sm">
            Aquí verás tu saldo, accesos rápidos y novedades para tu negocio.
            Próximamente en esta vista.
          </p>
        </Card>

        <Card variant="soft" padding="lg" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
            <IoTrendingUp className="h-6 w-6" />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-title-sm text-primary">
              Lanza tu próxima campaña
            </span>
            <span className="text-sm text-ink/80">
              Abrí la pestaña <b>Promociones</b> para crear descuentos
              personalizados.
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
