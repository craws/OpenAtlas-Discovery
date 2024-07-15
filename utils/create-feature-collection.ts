import type { Feature } from "geojson";

export function createFeatureCollection<T extends Feature>(features: Array<T>) {
	return { type: "FeatureCollection" as const, features };
}
