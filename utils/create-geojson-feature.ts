import type { Feature, Geometry } from "geojson";

import type { EntityFeature } from "@/composables/use-create-entity";

export type GeoJsonFeature = Feature<Geometry, { _id: string }>;

export function createGeoJsonFeature(entity: EntityFeature): GeoJsonFeature {
	return {
		type: "Feature",
		geometry: entity.geometry,
		properties: {
			_id: entity.properties._id,
		},
	};
}
