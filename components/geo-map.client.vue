<script lang="ts" setup>
import "maplibre-gl/dist/maplibre-gl.css";

import { initialViewState } from "@/config/geo-map.config";
import {
	Map as GeoMap,
	NavigationControl,
	ScaleControl,
	FullscreenControl,
	type GeoJSONSource,
	Popup,
} from "maplibre-gl";
import { assert } from "@acdh-oeaw/lib";
import type { FeatureCollection, Point, Polygon } from "geojson";
import type { LinkedPlace, LinkedPlaceFeature } from "@/types/api";
import { project } from "@/config/project.config";
import { geoMapContextKey } from "@/components/geo-map.context";

const props = defineProps<{
	geojson: FeatureCollection;
	height: number;
	width: number;
}>();

const emit = defineEmits();

const env = useRuntimeConfig();
const theme = useColorMode();
const getEntityId = useGetEntityId();

const colors = {
	default: project.colors.geojson,
};

const mapStyle = computed(() => {
	return theme.value === "dark"
		? env.public.NUXT_PUBLIC_MAP_BASELAYER_URL_DARK
		: env.public.NUXT_PUBLIC_MAP_BASELAYER_URL_LIGHT;
});

const elementRef = ref<HTMLElement | null>(null);

interface GeoMapContext {
	map: GeoMap | null;
}

const context: GeoMapContext = {
	map: null,
};

onMounted(create);
onScopeDispose(dispose);

async function create() {
	await nextTick();
	assert(elementRef.value != null);

	const map = new GeoMap({
		center: [initialViewState.longitude, initialViewState.latitude],
		container: elementRef.value,
		pitch: initialViewState.pitch,
		style: mapStyle.value,
		zoom: initialViewState.zoom,
	});

	context.map = map;

	map.on("load", init);
}

function init() {
	assert(context.map != null);
	const map = context.map;

	//

	const nav = new NavigationControl({});
	map.addControl(nav, "top-left");

	//

	const fullscreen = new FullscreenControl({});
	map.addControl(fullscreen, "top-right");

	//

	const scale = new ScaleControl({});
	map.addControl(scale, "bottom-left");

	//

	const sourceId = "data";
	map.addSource(sourceId, { type: "geojson", data: { type: "FeatureCollection", features: [] } });

	//

	map.addLayer({
		id: "points",
		type: "circle",
		source: sourceId,
		filter: ["==", "$type", "Point"],
		paint: {
			"circle-color": colors.default,
			"circle-radius": 6,
		},
	});

	//

	map.addLayer({
		id: "polygons",
		type: "fill",
		source: sourceId,
		filter: ["==", "$type", "Polygon"],
		paint: {
			"fill-color": colors.default,
			"fill-opacity": 0.35,
		},
	});

	//

	map.on("click", "points", (event) => {
		console.log(event.features);
		const features = event.features as unknown as Array<LinkedPlaceFeature>; // FIXME:
		const feature = features[0]!;

		const geometry = feature.geometry as Point;
		const coordinates = geometry.coordinates.slice() as [number, number];

		const content = features
			.map((feature) => {
				return `<div>${feature.properties.title}</div>`;
			})
			.join("\n");

		while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		const popup = new Popup({ closeButton: false, maxWidth: "320px" });
		popup.setLngLat(coordinates).setHTML(content).addTo(map);
	});

	map.on("click", "polygon", (event) => {
		const features = event.features as unknown as Array<LinkedPlaceFeature>;
		const feature = features[0]!;

		const geometry = feature.geometry as Polygon;
		const coordinates = geometry.coordinates.slice();

		const content = features
			.map((feature) => {
				return `<div>${feature.properties.title}</div>`;
			})
			.join("\n");

		while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		const popup = new Popup({ closeButton: false, maxWidth: "320px" });
		popup.setLngLat(coordinates).setHTML(content).addTo(map);
	});

	//

	map.on("mouseenter", "points", () => {
		map.getCanvas().style.cursor = "pointer";
	});

	map.on("mouseenter", "polygons", () => {
		map.getCanvas().style.cursor = "pointer";
	});

	//

	map.on("mouseleave", "points", () => {
		map.getCanvas().style.cursor = "";
	});

	map.on("mouseleave", "polygons", () => {
		map.getCanvas().style.cursor = "";
	});

	//

	update();
}

function dispose() {
	context.map?.remove();
}

watch(() => props.geojson, update);

function update() {
	assert(context.map != null);
	const map = context.map;

	const sourceId = "data";
	const source = map.getSource(sourceId) as GeoJSONSource | undefined;
	// TODO: ensure every feature has an id, because not the whole feature object is serialised in the popup event callback
	source?.setData({
		type: "FeatureCollection",
		features: props.geojson.features.map((feature) => {
			return {
				type: "Feature",
				geometry: feature.geometry,
				properties: {
					id: getEntityId(feature["@id"]),
					title: feature.properties.title,
				},
			};
		}),
	});
}

provide(geoMapContextKey, context);
</script>

<template>
	<div class="grid size-full relative text-black">
		<div ref="elementRef" data-geo-map="true" />
		<slot />
	</div>
</template>
