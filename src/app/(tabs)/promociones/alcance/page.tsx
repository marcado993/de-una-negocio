"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

import {
  BusinessHeader,
  Button,
  Card,
  PeopleStack,
  StatsChart,
} from "@/components/deuna";
import { useEffectiveLocation } from "@/hooks/use-effective-location";
import { createCampaign, upsertBusiness } from "@/lib/api";
import type { CampaignType } from "@/lib/api-types";
import { LA_VICENTINA, SEED_BUSINESS } from "@/lib/seed-location";

/** Catalogue mirrored from `deuna-api/src/types.ts::CAMPAIGN_CATALOGUE`.
 *  Used to render the pre-launch summary — the server returns the same
 *  numbers in the campaign payload, we just don't need a round-trip to
 *  show them on this screen. */
const ESTIMATES: Record<
  CampaignType,
  { reachPeople: number; investUSD: number; campaignLabel: string }
> = {
  "vuelve-veci": {
    reachPeople: 50,
    investUSD: 10,
    campaignLabel: "Vuelva Veci",
  },
  "refiera-una-vez": {
    reachPeople: 80,
    investUSD: 15,
    campaignLabel: "Refiera Una Vez",
  },
  "compre-3-veces": {
    reachPeople: 35,
    investUSD: 8,
    campaignLabel: "Compre 3 Veces",
  },
  "apure-veci": {
    reachPeople: 60,
    investUSD: 12,
    campaignLabel: "Apure, Veci",
  },
};

const DEFAULT_ESTIMATE = {
  reachPeople: 50,
  investUSD: 10,
  campaignLabel: "Tu campaña",
};

const VALID_TYPES: CampaignType[] = [
  "vuelve-veci",
  "refiera-una-vez",
  "compre-3-veces",
  "apure-veci",
];

function isCampaignType(value: string | null): value is CampaignType {
  return value != null && (VALID_TYPES as string[]).includes(value);
}

function AlcanceContent() {
  const router = useRouter();
  const params = useSearchParams();
  const campaignId = params.get("campaign");

  const effective = useEffectiveLocation(LA_VICENTINA, { enabled: true });

  const [launching, setLaunching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const estimate = useMemo(() => {
    if (!isCampaignType(campaignId)) return DEFAULT_ESTIMATE;
    return ESTIMATES[campaignId];
  }, [campaignId]);

  const handleContinue = async () => {
    if (!isCampaignType(campaignId)) {
      setError("Elegí un tipo de campaña antes de continuar.");
      return;
    }
    setLaunching(true);
    setError(null);
    try {
      const business = await upsertBusiness({
        id: SEED_BUSINESS.id,
        name: SEED_BUSINESS.name,
        ownerName: SEED_BUSINESS.ownerName,
        barrio: SEED_BUSINESS.barrio,
        location: effective.location,
      });
      await createCampaign({
        businessId: business.id,
        type: campaignId,
        radiusM: 800,
      });
      router.push("/?campaign=launched");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No pudimos lanzar la campaña.";
      setError(message);
    } finally {
      setLaunching(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 px-4 pt-2 pb-32">
        <div className="flex items-center gap-2">
          <h1 className="text-title-md text-primary">Alcance De Tu Campaña</h1>
          <span className="text-2xl" aria-hidden>
            📣
          </span>
        </div>

        <Card
          variant="elevated"
          padding="xl"
          className="flex flex-col items-center gap-4"
        >
          <span className="text-title-sm text-primary">Estadísticas</span>
          <StatsChart size={220} />
        </Card>

        <Card
          variant="soft"
          padding="xl"
          className="flex flex-col items-center gap-3 text-center"
        >
          <PeopleStack size={170} />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
              Alcance Estimado
            </span>
            <span className="text-title-lg text-primary">
              {estimate.reachPeople} Personas
            </span>
          </div>
        </Card>

        <Card
          variant="soft"
          padding="xl"
          className="flex flex-col items-center gap-2 text-center"
        >
          <span className="text-[54px] leading-none" aria-hidden>
            🍞
          </span>
          <div className="flex flex-col">
            <span className="text-title-md text-primary">
              Con <span className="text-accent-green">${estimate.investUSD}</span>{" "}
              Invertidos
            </span>
            <span className="text-[12px] font-medium text-text-secondary">
              en la campaña &quot;{estimate.campaignLabel}&quot;
            </span>
          </div>
        </Card>

        <div className="flex flex-col items-center gap-1 text-center text-xs text-text-secondary">
          <span>
            Ubicación del local:{" "}
            <span className="font-semibold text-primary">
              {effective.location.lat.toFixed(4)},{" "}
              {effective.location.lng.toFixed(4)}
            </span>
          </span>
          <span className="uppercase tracking-[0.12em]">
            {effective.source === "mock"
              ? "Mock (?mock=lat,lng)"
              : effective.source === "gps"
                ? "GPS del dispositivo"
                : "Fallback · La Vicentina"}
          </span>
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-[var(--radius-md)] bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600"
          >
            {error}
          </div>
        ) : null}
      </div>

      <div className="pointer-events-none fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 px-4 pb-[max(env(safe-area-inset-bottom),1.5rem)]">
        <div className="pointer-events-auto mb-20">
          <Button
            label={launching ? "Lanzando…" : "Continuar"}
            size="lg"
            loading={launching}
            onClick={handleContinue}
          />
        </div>
      </div>
    </>
  );
}

function AlcanceFallback() {
  return (
    <div className="flex flex-col gap-5 px-4 pt-6 pb-32">
      <div className="h-6 w-2/3 animate-pulse rounded bg-surface-alt" />
      <div className="h-[300px] animate-pulse rounded-[var(--radius-lg)] bg-surface-alt" />
      <div className="h-[220px] animate-pulse rounded-[var(--radius-lg)] bg-surface-alt" />
    </div>
  );
}

export default function AlcancePromocionScreen() {
  return (
    <div className="flex flex-col pt-[max(env(safe-area-inset-top),0.5rem)]">
      <BusinessHeader
        ownerName="Martha"
        ownerRole="Administrador"
        businessName="Fruteria Martha Kiting"
      />
      <Suspense fallback={<AlcanceFallback />}>
        <AlcanceContent />
      </Suspense>
    </div>
  );
}
