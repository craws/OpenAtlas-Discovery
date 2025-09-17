import type { components } from "@/lib/api-client/api";

type LinkedPlacesModel = components["schemas"]["LinkedPlacesModel"];

type LinkedPlacesModelFeature = LinkedPlacesModel["features"][number];

export interface LinkedPlaceFeature extends LinkedPlacesModelFeature {
	type: "Feature";
	geometry?:
		| components["schemas"]["GeometryCollection"]
		| components["schemas"]["LineString"]
		| components["schemas"]["Point"]
		| components["schemas"]["Polygon"];
}

export interface LinkedPlace extends LinkedPlacesModel {
	type: "FeatureCollection";
	features: Array<LinkedPlaceFeature>;
}

export type NetworkEntity = components["schemas"]["NetworkVisualisationModel"]["results"];

export type GetLinkedEntitiesResponse = components["schemas"]["EntitiesOutputModel"]["results"];

export type GetEgoNetworkVisualisationResponse =
	components["schemas"]["NetworkVisualisationModel"]["results"];

export type RelationLinkedEntity = LinkedPlacesModel["features"][0];
export interface ExtendedEntities extends RelationLinkedEntity {
	label?: string;
	relationType?: string;
	relationTo?: string;
	relationSystemClass: string;
	when?: {
		timespans?: [
			{
				end?: {
					comment?: string;
					earliest?: string;
					latest?: string;
				};
				start?: {
					comment?: string;
					earliest?: string;
					latest?: string;
				};
			},
		];
	};
}

export type PresentationViewModel = components["schemas"]["PresentationViewModel"];
export type RelatedEntityModel = components["schemas"]["RelatedEntityModel"];

export type File = NonNullable<components["schemas"]["PresentationViewModel"]["files"]>[0];

export interface CustomIconEntry {
	type: NonNullable<EntityFeature["types"]>[0] | undefined;
	icon?: string;
	color?: string;
	entities: Array<GeoJsonFeature>;
}
