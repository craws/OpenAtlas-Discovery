import { assert } from "@acdh-oeaw/lib";
import type { Feature, Geometry } from "geojson";

import type { EntityFeature } from "@/composables/use-create-entity";
import type { LinkedPlaceFeature } from "@/types/api";

export type GeoJsonFeature = Feature<Geometry, { _id: string }>;

interface CustomGeoJsonFeature extends GeoJsonFeature {
	geometry: GeoJsonFeature["geometry"] | NonNullable<LinkedPlaceFeature["geometry"]>;
}

export function createGeoJsonFeature(entity: EntityFeature): CustomGeoJsonFeature {
	assert(entity.geometry !== undefined, "Entity geometry is required");
	return {
		type: "Feature",
		geometry: entity.geometry,
		properties: {
			_id: entity.properties._id,
		},
	};
}
