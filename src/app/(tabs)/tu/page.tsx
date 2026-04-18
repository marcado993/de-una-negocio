import type { ComponentType, SVGProps } from "react";
import {
  IoChevronForward,
  IoHelpCircleOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

import { BusinessHeader, Card } from "@/components/deuna";
import { cn } from "@/lib/cn";

type MenuItem = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

const MENU: MenuItem[] = [
  { Icon: IoPersonOutline, label: "Datos del negocio" },
  { Icon: IoShieldCheckmarkOutline, label: "Seguridad" },
  { Icon: IoNotificationsOutline, label: "Notificaciones" },
  { Icon: IoHelpCircleOutline, label: "Soporte" },
];

export default function TuScreen() {
  return (
    <div className="flex flex-col pt-[max(env(safe-area-inset-top),0.5rem)]">
      <BusinessHeader
        ownerName="Martha"
        ownerRole="Administrador"
        businessName="Fruteria Martha Kiting"
      />
      <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
        <Card variant="elevated" padding="lg">
          <h2 className="text-title-md">Hola, Martha 👋</h2>
          <p className="text-body-sm mt-1">
            Administra tu negocio, tu equipo y tus preferencias desde aquí.
          </p>
        </Card>

        <Card variant="surface" padding={0}>
          {MENU.map(({ Icon, label }, i) => (
            <button
              key={label}
              type="button"
              className={cn(
                "flex w-full items-center gap-3 rounded-[var(--radius-md)] px-4 py-3 text-left transition-colors hover:bg-surface-alt cursor-pointer",
                i < MENU.length - 1 && "border-b border-divider",
              )}
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-body flex-1 font-semibold">{label}</span>
              <IoChevronForward className="h-[18px] w-[18px] text-text-muted" />
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
}
