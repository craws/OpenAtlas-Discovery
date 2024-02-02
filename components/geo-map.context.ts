import type { Map as GeoMap } from "maplibre-gl";

export interface GeoMapContext {
	map: GeoMap | null;
}

export const geoMapContextKey = Symbol("geo-map-context");
