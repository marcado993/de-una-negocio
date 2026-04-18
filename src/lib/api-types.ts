/**
 * Types mirrored from `deuna-api/src/types.ts`. Duplicated on purpose
 * (MVP) — see the note in the backend file for context.
 */

export type Location = {
  lat: number;
  lng: number;
};

export type CampaignType =
  | "vuelve-veci"
  | "refiera-una-vez"
  | "compre-3-veces"
  | "apure-veci";

export type Business = {
  id: string;
  name: string;
  ownerName: string;
  location: Location;
  barrio?: string;
};

export type Campaign = {
  id: string;
  businessId: string;
  business: Pick<Business, "id" | "name" | "location" | "barrio"> & {
    ownerName: string;
  };
  type: CampaignType;
  title: string;
  description: string;
  discountPct: number;
  investUSD: number;
  reachPeople: number;
  radiusM: number;
  createdAt: string;
  expiresAt: string;
};

export type UpsertBusinessInput = {
  id?: string;
  name: string;
  ownerName: string;
  location: Location;
  barrio?: string;
};

export type CreateCampaignInput = {
  businessId: string;
  type: CampaignType;
  radiusM?: number;
  durationMin?: number;
};
