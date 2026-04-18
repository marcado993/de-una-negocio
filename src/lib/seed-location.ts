import type { Location } from "./api-types";

/**
 * Fallback coordinates used when the browser denies geolocation or the
 * user is testing from another city. Corresponds to the commercial
 * corridor of La Vicentina (Quito, Ecuador) — same coords the backend
 * seeds Martha's shop with.
 */
export const LA_VICENTINA: Location = { lat: -0.2082, lng: -78.4882 };

export const SEED_BUSINESS = {
  id: "biz-martha-la-vicentina",
  name: "Fruteria Martha Kiting",
  ownerName: "Martha",
  barrio: "La Vicentina",
};
