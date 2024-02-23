<script lang="ts" setup>
import "maplibre-gl/dist/maplibre-gl.css";

import { assert } from "@acdh-oeaw/lib";
import * as turf from "@turf/turf";
import {
	FullscreenControl,
	type GeoJSONSource,
	Map as GeoMap,
	type MapGeoJSONFeature,
	NavigationControl,
	ScaleControl,
} from "maplibre-gl";

import { type GeoMapContext, geoMapContextKey } from "@/components/geo-map.context";
import { initialViewState } from "@/config/geo-map.config";
import { project } from "@/config/project.config";
import type { GeoJsonFeature } from "@/utils/create-geojson-feature";

const props = defineProps<{
	features: Array<GeoJsonFeature>;
	height: number;
	width: number;
}>();

const emit = defineEmits<{
	(
		event: "layer-click",
		features: Array<MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">>,
	): void;
}>();

const env = useRuntimeConfig();
const theme = useColorMode();

const colors = {
	default: project.colors.geojson,
};

const mapStyle = computed(() => {
	return theme.value === "dark"
		? env.public.NUXT_PUBLIC_MAP_BASELAYER_URL_DARK
		: env.public.NUXT_PUBLIC_MAP_BASELAYER_URL_LIGHT;
});

const elementRef = ref<HTMLElement | null>(null);

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
		maxZoom: 16,
		minZoom: 1,
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
	map.addSource(sourceId, { type: "geojson", data: createFeatureCollection([]) });

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
		emit(
			"layer-click",
			(event.features ?? []) as Array<MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">>,
		);
	});

	map.on("click", "polygons", (event) => {
		emit(
			"layer-click",
			(event.features ?? []) as Array<MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">>,
		);
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

watch(() => {
	return props.features;
}, update);

function update() {
	assert(context.map != null);
	const map = context.map;

	const sourceId = "data";
	const source = map.getSource(sourceId) as GeoJSONSource | undefined;
	const geojson = createFeatureCollection(props.features);
	source?.setData(geojson);

	if (geojson.features.length > 0) {
		const bounds = turf.bbox(geojson);
		map.fitBounds(bounds, { padding: 50 });
	}
}

defineExpose(context);
provide(geoMapContextKey, context);
</script>

<template>
	<div class="relative grid size-full text-black">
		<div ref="elementRef" data-geo-map="true" />
		<slot />
	</div>
</template>
