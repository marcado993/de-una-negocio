import { IoConstructOutline } from "react-icons/io5";

import { BusinessHeader, Card } from "@/components/deuna";

/** Mi Caja (placeholder) — fuera del alcance del primer pase. */
export default function MiCajaScreen() {
  return (
    <div className="flex flex-col pt-[max(env(safe-area-inset-top),0.5rem)]">
      <BusinessHeader
        ownerName="Martha"
        ownerRole="Administrador"
        businessName="Fruteria Martha Kiting"
      />
      <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
        <Card variant="elevated" padding="lg" className="flex items-start gap-3">
          <IoConstructOutline className="h-6 w-6 shrink-0 text-primary" />
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-title-sm">Mi Caja · próximamente</span>
            <p className="text-body-sm">
              El teclado de cobro, el QR y el historial de ventas se
              construyen en la próxima iteración.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
