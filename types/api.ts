import type { components } from "@/lib/api-client/api";

export type LinkedPlace = components["schemas"]["LinkedPlacesModel"];
export type LinkedPlaceFeature = LinkedPlace["features"][number];
