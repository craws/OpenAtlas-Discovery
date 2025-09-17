import type { LinkedPlace } from "@/types/api";

// export type GetEntityResponse = LinkedPlace;

export function useCreateLinkedEntities() {
	const { getUnprefixedId } = useIdPrefix();

	return function createLinkedEntities(entities: Array<LinkedPlace>): Array<EntityFeature> {
		/**
		 * `maplibre-gl` will only provide geojson properties in event callbacks,
		 * so we add the (unprefixed) entity id to each feature to be able to
		 * uniquely identify each entity, and to create links to entity details pages.
		 */

		const extendedEntities: Array<EntityFeature> = [];

		entities.forEach((entity) => {
			entity.features.forEach((feature) => {
				const id = getUnprefixedId(feature["@id"]);
				const _feature = feature as EntityFeature;
				_feature.properties._id = id;
				extendedEntities.push(_feature);
			});
		});

		return extendedEntities;
	};
}
