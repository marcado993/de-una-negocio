"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import type { Location } from "@/lib/api-types";
import { useGeolocation } from "./use-geolocation";

type EffectiveLocationResult = {
  /** Final coordinates — never null; falls back to `fallback` if all else fails. */
  location: Location;
  /** How we got the location: useful for showing status in the UI. */
  source: "mock" | "gps" | "fallback";
  /** GPS state raw (only meaningful when `source === "gps"`). */
  gpsStatus: ReturnType<typeof useGeolocation>["status"];
  /** Imperative re-request for GPS. No-op in mock/fallback. */
  refresh: () => void;
};

/**
 * Resolves the "current user" location combining three inputs in order:
 *
 *   1. `?mock=lat,lng` query param — wins over everything. Lets a
 *      demoer spin two browser windows on the same PC without fighting
 *      the browser geolocation prompt.
 *   2. `navigator.geolocation` — the real deal.
 *   3. `fallback` (defaults to La Vicentina) — so the UI is never
 *      stuck waiting on permissions.
 */
export function useEffectiveLocation(
  fallback: Location,
  options: { enabled?: boolean; watch?: boolean } = {},
): EffectiveLocationResult {
  const { enabled = true, watch = false } = options;
  const params = useSearchParams();

  const mockParam = params.get("mock");
  const mockLocation = useMemo<Location | null>(() => {
    if (!mockParam) return null;
    const [latStr, lngStr] = mockParam.split(",");
    const lat = Number(latStr);
    const lng = Number(lngStr);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
  }, [mockParam]);

  // We still run the hook (with `enabled = false` when mocked) so
  // React's rules-of-hooks are honored regardless of branch.
  const geo = useGeolocation({
    enabled: enabled && !mockLocation,
    watch,
  });

  if (mockLocation) {
    return {
      location: mockLocation,
      source: "mock",
      gpsStatus: "idle",
      refresh: () => {},
    };
  }

  if (geo.position) {
    return {
      location: geo.position,
      source: "gps",
      gpsStatus: geo.status,
      refresh: geo.refresh,
    };
  }

  return {
    location: fallback,
    source: "fallback",
    gpsStatus: geo.status,
    refresh: geo.refresh,
  };
}
