import { type GeoMapContext, geoMapContextKey } from "@/components/geo-map.context";

export function useGeoMap() {
	const context = inject(geoMapContextKey);

	return context as GeoMapContext;
}
