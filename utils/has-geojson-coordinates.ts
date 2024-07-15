import type { Geometry } from "geojson";

export function hasCoordinates(geometry: Geometry): boolean {
	if (geometry.type === "GeometryCollection") {
		return geometry.geometries.some((geometry: Geometry) => {
			return hasCoordinates(geometry);
		});
	}
	return true;
}
