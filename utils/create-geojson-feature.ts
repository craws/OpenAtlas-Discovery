import { assert } from "@acdh-oeaw/lib";
import type { Feature, Geometry } from "geojson";

import type { EntityFeature } from "@/composables/use-create-entity";
import type { LinkedPlaceFeature, PresentationViewModel } from "@/types/api";

export type GeoJsonFeature = Feature<Geometry, { _id: string }>;

export interface CustomGeoJsonFeature extends GeoJsonFeature {
	geometry: GeoJsonFeature["geometry"] | NonNullable<LinkedPlaceFeature["geometry"]>;

	properties: {
		_id: string;
		color?: string;
		size?: number;
		isIcon?: boolean;
		isDisplayed?: boolean;
		otherFeatures?: Array<string>;
		shapeType?: string;
	};
}

export function createGeoJsonFeature(
	entity: EntityFeature | PresentationViewModel,
): CustomGeoJsonFeature {
	const geometry =
		(entity as EntityFeature).geometry ?? (entity as PresentationViewModel).geometries;
	assert(geometry != null, "Entity geometry is required");
	return {
		type: "Feature",
		geometry: geometry as GeoJsonFeature["geometry"],
		properties: {
			_id: "properties" in entity ? entity.properties._id : String(entity.id),
		},
	};
}
