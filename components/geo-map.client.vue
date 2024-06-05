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
	polygons: boolean;
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
	points: project.colors.geojsonPoints,
	areaCenterPoints: project.colors.geojsonAreaCenterPoints,
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

	const sourcePointsId = "points-data";
	const sourcePolygonsId = "polygon-data";
	const sourceCenterPointsId = "centerpoints-data";
	map.addSource(sourcePointsId, { type: "geojson", data: createFeatureCollection([]) });
	map.addSource(sourcePolygonsId, { type: "geojson", data: createFeatureCollection([]) });
	map.addSource(sourceCenterPointsId, { type: "geojson", data: createFeatureCollection([]) });

	//

	map.addLayer({
		id: "points",
		type: "circle",
		source: sourcePointsId,
		filter: ["==", "$type", "Point"],
		paint: {
			"circle-color": colors.points,
			"circle-radius": 6,
		},
	});

	//

	map.addLayer({
		id: "centerpoints",
		type: "circle",
		source: sourceCenterPointsId,
		filter: ["==", "$type", "Point"],
		paint: {
			"circle-color": colors.areaCenterPoints,
			"circle-radius": 6,
		},
	});

	//

	//

	map.on("click", "points", (event) => {
		emit(
			"layer-click",
			(event.features ?? []) as Array<MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">>,
		);
	});

	map.on("click", "centerpoints", (event) => {
		emit(
			"layer-click",
			(event.features ?? []) as Array<MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">>,
		);
	});

	//

	map.on("mouseenter", "points", () => {
		map.getCanvas().style.cursor = "pointer";
	});

	map.on("mouseenter", "centerpoints", () => {
		map.getCanvas().style.cursor = "pointer";
	});

	//

	map.on("mouseleave", "points", () => {
		map.getCanvas().style.cursor = "";
	});

	map.on("mouseleave", "centerpoints", () => {
		map.getCanvas().style.cursor = "";
	});

	map.on("mouseleave", "polygons", () => {
		map.getCanvas().style.cursor = "";
	});

	//

	updateScope();
}

function dispose() {
	context.map?.remove();
}

watch(() => {
	return props.features;
}, updateScope);

watch(() => {
	console.log(props.polygons);
	return props.polygons;
}, updatePolygons);

function updateScope() {
	assert(context.map != null);
	const map = context.map;

	const sourcePointsId = "points-data";
	const sourcePolygonsId = "polygon-data";
	const sourceCenterPointsId = "centerpoints-data";
	const sourcePoints = map.getSource(sourcePointsId) as GeoJSONSource | undefined;
	const sourcePolygons = map.getSource(sourcePolygonsId) as GeoJSONSource | undefined;
	const sourceCenterpoints = map.getSource(sourceCenterPointsId) as GeoJSONSource | undefined;

	const points = props.features.filter((point) => {
		if (point.geometry.type !== "Point") {
			return false;
		}
		return point;
	});

	const polygons = props.features.filter((polygon) => {
		if (polygon.geometry.type !== "GeometryCollection") {
			return false;
		}
		return polygon;
	});

	const centerpoints = props.features.filter((centerpoint) => {
		if (centerpoint.geometry.type !== "GeometryCollection") {
			return false;
		}
		return centerpoint;
	});

	const geojsonPoints = createFeatureCollection(points);
	const geojsonPolygons = createFeatureCollection(polygons);
	const geojsonCenterPoints = createFeatureCollection(centerpoints);

	sourcePoints?.setData(geojsonPoints);
	sourcePolygons?.setData(geojsonPolygons);
	sourceCenterpoints?.setData(geojsonCenterPoints);

	if (geojsonPoints.features.length > 0) {
		const bounds = turf.bbox(geojsonPoints);
		map.fitBounds(bounds, { padding: 50 });
	}
}

function updatePolygons() {
	assert(context.map != null);
	const sourcePolygonsId = "polygon-data";

	if (props.polygons) {
		context.map.addLayer({
			id: "polygons",
			type: "fill",
			source: sourcePolygonsId,
			paint: {
				"fill-color": colors.areaCenterPoints,
				"fill-opacity": 0.35,
			},
		});
	}
	if (!props.polygons && context.map.getLayer("polygons")) {
		context.map.removeLayer("polygons");
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
