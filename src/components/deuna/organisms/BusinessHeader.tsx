"use client";

import { IoHeadsetOutline, IoNotificationsOutline, IoStorefront } from "react-icons/io5";

import { cn } from "@/lib/cn";
import { Badge } from "../atoms/Badge";
import { IconButton } from "../atoms/IconButton";

export type BusinessHeaderProps = {
  /** Display name of the shop owner (e.g. "Martha"). */
  ownerName: string;
  /** Role pill shown next to the name (e.g. "Administrador"). */
  ownerRole?: string;
  /** Business name below the greeting ("Fruteria Martha Kiting"). */
  businessName: string;
  /** Unread notifications count. Shows a red dot/badge on the bell. */
  notificationCount?: number;
  onBellPress?: () => void;
  onSupportPress?: () => void;
  className?: string;
};

/**
 * Organism — top bar used across Deuna Negocios screens. Shows a
 * storefront glyph, owner greeting + role pill, business name, and two
 * icon actions (notifications + live support).
 *
 * The role pill uses `primary-soft` and stays inline with the name; the
 * notification bell carries an optional `Badge` atom when there are
 * unread items.
 */
export function BusinessHeader({
  ownerName,
  ownerRole,
  businessName,
  notificationCount = 0,
  onBellPress,
  onSupportPress,
  className,
}: BusinessHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center gap-3 px-4 pt-3 pb-3",
        className,
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft">
        <IoStorefront className="h-[22px] w-[22px] text-primary" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="text-title-sm truncate text-primary">
            ¡Hola! {ownerName}
          </span>
          {ownerRole ? (
            <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary">
              {ownerRole}
            </span>
          ) : null}
        </div>
        <span className="truncate text-[12px] font-medium text-text-secondary">
          {businessName}
        </span>
      </div>

      <div className="relative flex shrink-0 items-center gap-1">
        <IconButton
          aria-label="Notificaciones"
          onClick={onBellPress}
          variant="ghost"
          size="sm"
          icon={<IoNotificationsOutline className="h-[22px] w-[22px] text-primary" />}
        />
        {notificationCount > 0 ? (
          <Badge
            className="absolute right-[34px] top-1"
            tone="danger"
            size="xs"
          >
            {notificationCount > 9 ? "9+" : String(notificationCount)}
          </Badge>
        ) : null}
        <IconButton
          aria-label="Soporte"
          onClick={onSupportPress}
          variant="ghost"
          size="sm"
          icon={<IoHeadsetOutline className="h-[22px] w-[22px] text-primary" />}
        />
      </div>
    </header>
  );
}
