<script setup lang="ts">
import { Feature, GeoJsonObject, Geometry } from "geojson";
import L from "leaflet";
import { GeometricEntry } from "~~/composables/api";

const emit = defineEmits<{
  (e: 'itemClicked', event: L.LeafletMouseEvent): void
}>()

const mapContainer = ref()
let map:L.Map;
let geoJsonLayer: L.GeoJSON<any>;
onMounted( () => initMap())


const props = defineProps<{
    items: GeoJsonObject | GeoJsonObject[];
}>();

watch(() => props.items, () =>placeGeoJson(props.items), {immediate:true})


async function initMap() {
    await nextTick()
    map = L.map(mapContainer.value);
    L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}.png?access-token=TUhizWedCN04NDjuRQtXfgE0HSuYwHzro3NRUDa3LMUlLbymREaTyUW2lpuoNnMz', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.invalidateSize();
    setTimeout(function(){ map.setView([40,30],6);},50);
    placeGeoJson(props.items)
}

function placeGeoJson(items: GeoJsonObject | GeoJsonObject[]){
    if(!map) return;
    if(!!geoJsonLayer) map.removeLayer(geoJsonLayer);
    geoJsonLayer = L.geoJSON(items,{
        onEachFeature: onEachFeature
    });
    geoJsonLayer.addTo(map);

}

function onEachFeature(feature: Feature<Geometry, any>, layer: L.Layer) {
    //bind click
    layer.on({
        click: handleClick
    });
}

function handleClick(e:L.LeafletMouseEvent){
    emit('itemClicked', e);
}

</script>
<template>
    <div id="mapid" ref="mapContainer"></div>
</template>