<script setup lang="ts">
import { Feature, GeoJsonObject, Geometry } from "geojson";
import * as L from "leaflet";

const emit = defineEmits<{ (e: "itemClicked", event: L.LeafletMouseEvent): void }>();

const mapContainer = ref();
let map: L.Map;
let geoJsonLayer: L.GeoJSON<any>;
onMounted(() => initMap());

const props = defineProps<{
	items: GeoJsonObject | GeoJsonObject[];
	zoomLevel?: number;
}>();

watch(
	() => props.items,
	() => placeGeoJson(props.items),
	{ immediate: true },
);

watch(
	() => props.zoomLevel,
	() => adaptZoom(),
);

async function initMap() {
	await nextTick();
	map = L.map(mapContainer.value);
	L.tileLayer(
		"https://tile.jawg.io/jawg-light/{z}/{x}/{y}.png?access-token=TUhizWedCN04NDjuRQtXfgE0HSuYwHzro3NRUDa3LMUlLbymREaTyUW2lpuoNnMz",
		{
			maxZoom: 19,
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		},
	).addTo(map);
	map.invalidateSize();
	placeGeoJson(props.items);
	scrollToCenter();
}

function placeGeoJson(items: GeoJsonObject | GeoJsonObject[]) {
	if (!map) {
		return;
	}
	if (geoJsonLayer) {
		map.removeLayer(geoJsonLayer);
	}
	const myCircleStyle = {
		color: "#000000",
		weight: 1,
		fillOpacity: 0.8,
		fillColor: "#007bd9",
		radius: 10,
	};

	geoJsonLayer = L.geoJSON(items, {
		onEachFeature,
		pointToLayer: function (_feature, latlng) {
			return L.circleMarker(latlng, myCircleStyle);
		},
	});
	geoJsonLayer.addTo(map);
}

function scrollToCenter() {
	if (!map || !geoJsonLayer) {
		return;
	}

	if (geoJsonLayer.getLayers() && geoJsonLayer.getLayers().length > 1) {
		map.fitBounds(geoJsonLayer.getBounds());
	} else {
		map.setView(geoJsonLayer.getBounds().getCenter(), 10);
	}
	adaptZoom();
}

function adaptZoom() {
	if (props.zoomLevel) {
		map.setZoom(props.zoomLevel);
	}
}

function onEachFeature(_feature: Feature<Geometry, any>, layer: L.Layer) {
	// bind click
	layer.on({
		click: handleClick,
	});
}

function handleClick(e: L.LeafletMouseEvent) {
	emit("itemClicked", e);
}
</script>
<template>
	<div id="mapid" ref="mapContainer" />
</template>
