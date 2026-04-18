"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IoArrowBack, IoRefresh } from "react-icons/io5";

import {
  BusinessHeader,
  Button,
  Card,
  IconButton,
  PromoHistoryItem,
  SpinnerRing,
} from "@/components/deuna";
import { listBusinessCampaigns, type BusinessCampaign } from "@/lib/api";
import { SEED_BUSINESS } from "@/lib/seed-location";

type Status = "loading" | "ready" | "error";

export default function PromoHistoryScreen() {
  const [campaigns, setCampaigns] = useState<BusinessCampaign[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(() => {
    setRefreshing(true);
    listBusinessCampaigns(SEED_BUSINESS.id).then(
      (data) => {
        setCampaigns(data);
        setStatus("ready");
        setErrorMsg(null);
        setRefreshing(false);
      },
      (err: unknown) => {
        setStatus("error");
        setErrorMsg(
          err instanceof Error
            ? err.message
            : "No pudimos cargar el historial.",
        );
        setRefreshing(false);
      },
    );
  }, []);

  useEffect(() => {
    // We kick off the first fetch asynchronously (in a microtask) so we
    // don't call setState synchronously inside the effect body — the
    // `react-hooks/set-state-in-effect` rule forbids that pattern.
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      load();
    });
    return () => {
      cancelled = true;
    };
  }, [load]);

  const activeCount = campaigns.filter((c) => c.isActive).length;

  return (
    <div className="flex flex-col pt-[max(env(safe-area-inset-top),0.5rem)]">
      <BusinessHeader
        ownerName="Martha"
        ownerRole="Administrador"
        businessName="Fruteria Martha Kiting"
      />

      <div className="flex flex-col gap-4 px-4 pt-2 pb-32">
        <div className="flex items-center gap-2">
          <Link href="/promociones" aria-label="Volver a promociones">
            <IconButton
              aria-label="Volver"
              size="sm"
              icon={<IoArrowBack className="h-[20px] w-[20px] text-primary" />}
            />
          </Link>
          <h1 className="flex-1 text-title-md text-primary">
            Historial De Promos
          </h1>
          <IconButton
            aria-label="Actualizar"
            size="sm"
            onClick={() => load()}
            icon={
              refreshing ? (
                <SpinnerRing size="sm" />
              ) : (
                <IoRefresh className="h-[20px] w-[20px] text-primary" />
              )
            }
          />
        </div>

        <Card variant="soft" padding="lg" className="flex items-center gap-3">
          <div className="flex-1">
            <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              Promos activas ahora
            </span>
            <span className="text-title-lg text-primary">{activeCount}</span>
          </div>
          <div className="text-right">
            <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              Total lanzadas
            </span>
            <span className="text-title-lg text-primary">
              {campaigns.length}
            </span>
          </div>
        </Card>

        {status === "loading" ? (
          <div className="flex items-center justify-center py-12">
            <SpinnerRing size="md" />
          </div>
        ) : null}

        {status === "error" ? (
          <Card variant="surface" padding="lg" className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-danger">
              No pudimos cargar el historial
            </span>
            {errorMsg ? (
              <span className="break-all text-xs text-text-secondary">
                {errorMsg}
              </span>
            ) : null}
            <Button
              label="Reintentar"
              size="sm"
              variant="outline"
              onClick={() => load()}
            />
          </Card>
        ) : null}

        {status === "ready" && campaigns.length === 0 ? (
          <Card
            variant="surface"
            padding="xl"
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="text-2xl" aria-hidden>
              📣
            </span>
            <span className="text-title-sm text-primary">
              Todavía no lanzás promos
            </span>
            <span className="text-xs text-text-secondary">
              Cuando crees una, aparecerá acá con su alcance y estado.
            </span>
            <Link href="/promociones" className="pt-1">
              <Button label="Crear mi primera promo" size="sm" />
            </Link>
          </Card>
        ) : null}

        {status === "ready" && campaigns.length > 0 ? (
          <div className="flex flex-col gap-2">
            {campaigns.map((c) => (
              <PromoHistoryItem
                key={c.id}
                title={c.title}
                description={c.description}
                discountPct={c.discountPct}
                radiusM={c.radiusM}
                createdAtISO={c.createdAt}
                expiresAtISO={c.expiresAt}
                isActive={c.isActive}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
