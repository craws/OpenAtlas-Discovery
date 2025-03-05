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
