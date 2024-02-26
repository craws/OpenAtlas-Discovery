import { useIdPrefix } from "@/composables/use-id-prefix";
import type { LinkedPlace, LinkedPlaceFeature } from "@/types/api";

export interface EntityFeature extends LinkedPlaceFeature {
	properties: LinkedPlaceFeature["properties"] & { _id: string };
}

export interface Entity extends LinkedPlace {
	features: Array<EntityFeature>;
}

export function useCreateEntity() {
	const { getUnprefixedId } = useIdPrefix();

	return function createtEntity(lp: LinkedPlace): Entity {
		/**
		 * `maplibre-gl` will only provide geojson properties in event callbacks,
		 * so we add the (unprefixed) entity id to each feature to be able to
		 * uniquely identify each entity, and to create links to entity details pages.
		 */
		lp.features.forEach((feature) => {
			const id = getUnprefixedId(feature["@id"]);
			const _feature = feature as EntityFeature;
			_feature.properties._id = id;
		});

		return lp as Entity;
	};
}
