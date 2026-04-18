"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

export type GeolocationStatus =
  | "idle"
  | "loading"
  | "granted"
  | "denied"
  | "unavailable"
  | "error";

export type GeolocationState = {
  status: GeolocationStatus;
  position: { lat: number; lng: number } | null;
  accuracy: number | null;
  error: string | null;
};

export type UseGeolocationOptions = {
  enabled?: boolean;
  maximumAge?: number;
  timeout?: number;
  highAccuracy?: boolean;
  watch?: boolean;
};

const INITIAL_STATE: GeolocationState = {
  status: "idle",
  position: null,
  accuracy: null,
  error: null,
};

type Action =
  | { type: "start" }
  | {
      type: "success";
      position: { lat: number; lng: number };
      accuracy: number | null;
    }
  | { type: "fail"; status: "denied" | "unavailable" | "error"; error: string };

function reducer(state: GeolocationState, action: Action): GeolocationState {
  switch (action.type) {
    case "start":
      return { ...state, status: "loading", error: null };
    case "success":
      return {
        status: "granted",
        position: action.position,
        accuracy: action.accuracy,
        error: null,
      };
    case "fail":
      return {
        status: action.status,
        position: null,
        accuracy: null,
        error: action.error,
      };
    default:
      return state;
  }
}

/**
 * React hook wrapping `navigator.geolocation`.
 *
 * Ported verbatim from `yapass-next/src/hooks/use-geolocation.ts` to
 * keep the two apps behaving identically — any fix applied here should
 * be mirrored there.
 */
export function useGeolocation({
  enabled = true,
  maximumAge = 60_000,
  timeout = 10_000,
  highAccuracy = true,
  watch = false,
}: UseGeolocationOptions = {}): GeolocationState & { refresh: () => void } {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const watchIdRef = useRef<number | null>(null);

  const request = useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      dispatch({
        type: "fail",
        status: "unavailable",
        error: "La API de Geolocalización no está disponible.",
      });
      return;
    }

    dispatch({ type: "start" });

    const opts: PositionOptions = {
      enableHighAccuracy: highAccuracy,
      maximumAge,
      timeout,
    };

    const onSuccess = (pos: GeolocationPosition) => {
      dispatch({
        type: "success",
        position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        accuracy: pos.coords.accuracy,
      });
    };

    const onError = (err: GeolocationPositionError) => {
      const denied = err.code === err.PERMISSION_DENIED;
      dispatch({
        type: "fail",
        status: denied ? "denied" : "error",
        error: err.message || "No pudimos obtener tu ubicación.",
      });
    };

    if (watch) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        opts,
      );
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, opts);
    }
  }, [highAccuracy, maximumAge, timeout, watch]);

  useEffect(() => {
    const clearWatchSafely = () => {
      if (watchIdRef.current != null && typeof navigator !== "undefined") {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };

    if (!enabled) {
      clearWatchSafely();
      return;
    }

    request();
    return clearWatchSafely;
  }, [enabled, request]);

  const view = enabled ? state : INITIAL_STATE;
  return { ...view, refresh: request };
}
