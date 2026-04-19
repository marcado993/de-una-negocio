"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import {
  IoGift,
  IoGiftOutline,
  IoHome,
  IoHomeOutline,
  IoMenuOutline,
  IoWallet,
  IoWalletOutline,
} from "react-icons/io5";

import { cn } from "@/lib/cn";

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

export type AppBottomNavTabId = "inicio" | "mi-caja" | "beneficios" | "menu";

type TabDef = {
  id: AppBottomNavTabId;
  label: string;
  href: string;
  /** Path prefixes that should also light this tab (so nested routes
   *  like `/desafios/uno` keep "Beneficios" active). */
  matchPrefixes?: readonly string[];
  ActiveIcon: IconComp;
  InactiveIcon: IconComp;
};

const TABS: readonly TabDef[] = [
  {
    id: "inicio",
    label: "Inicio",
    href: "/",
    ActiveIcon: IoHome,
    InactiveIcon: IoHomeOutline,
  },
  {
    id: "mi-caja",
    label: "Mi Caja",
    href: "/",
    ActiveIcon: IoWallet,
    InactiveIcon: IoWalletOutline,
  },
  {
    id: "beneficios",
    label: "Beneficios",
    href: "/desafios",
    matchPrefixes: ["/desafios", "/promos", "/estadisticas"],
    ActiveIcon: IoGift,
    InactiveIcon: IoGiftOutline,
  },
  {
    id: "menu",
    label: "Menú",
    href: "/",
    ActiveIcon: IoMenuOutline,
    InactiveIcon: IoMenuOutline,
  },
];

export type AppBottomNavProps = {
  /** Override the auto-detected active tab. When omitted, the nav
   *  resolves the active tab from the current pathname so that nested
   *  routes (e.g. `/desafios/uno`) keep their parent tab highlighted. */
  active?: AppBottomNavTabId;
  className?: string;
};

/**
 * Picks the tab that owns the given pathname. The root path always
 * resolves to "inicio" — even though several unbuilt tabs (Mi Caja,
 * Menú) currently point at `/`, we don't want them to steal the
 * highlight from the home screen. Other tabs only match when their
 * declared prefix is the pathname itself or a parent of a nested
 * route.
 */
function resolveActive(pathname: string | null): AppBottomNavTabId {
  if (!pathname || pathname === "/") return "inicio";
  for (const tab of TABS) {
    if (tab.id === "inicio") continue;
    const prefixes = tab.matchPrefixes ?? [tab.href];
    // Skip the root href to avoid every tab pointing at `/` from
    // claiming the home pathname.
    if (
      prefixes.some(
        (p) => p !== "/" && (pathname === p || pathname.startsWith(`${p}/`)),
      )
    ) {
      return tab.id;
    }
  }
  return "inicio";
}

/**
 * Organism — fixed bottom tab bar (Inicio · Mi Caja · Beneficios ·
 * Menú). The active tab is derived from the current pathname so any
 * screen rendered under the tabs layout — including nested routes like
 * `/desafios/uno` — lights the right entry without having to thread
 * `active` through every page.
 */
export function AppBottomNav({ active, className }: AppBottomNavProps) {
  const pathname = usePathname();
  const current = active ?? resolveActive(pathname);

  return (
    <nav
      aria-label="Navegación principal"
      className={cn(
        "fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2",
        "border-t border-divider bg-white px-2 pt-1 pb-[max(env(safe-area-inset-bottom),0.25rem)]",
        className,
      )}
    >
      <ul className="flex h-16 items-center justify-around">
        {TABS.map(({ id, label, href, ActiveIcon, InactiveIcon }) => {
          const isActive = id === current;
          const Icon = isActive ? ActiveIcon : InactiveIcon;
          return (
            <li key={id} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-1 text-[11px] font-semibold transition-colors",
                  isActive ? "text-primary" : "text-text-muted",
                )}
              >
                <Icon className="h-[22px] w-[22px]" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
