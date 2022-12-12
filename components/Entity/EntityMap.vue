<template>
  <v-card
    class="mx-auto my-6"
    style="min-width: 400px; min-height: 400px; max-width: 1000px; max-height:750;"
  >
    <data-map :items="(props.geoData as GeoJsonObject)" style="min-width: 400px; min-height: 400px; max-width: 1000px; max-height:500;" />
    <v-card-actions justify="center">
      <v-spacer />
      <v-btn to="/map" prepend-icon="mdi-map-marker">
        {{ $t('global.basics.map') }}
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
import { GeoJsonObject, GeometryCollection, LineString, Point, Polygon } from 'geojson'
const props = defineProps<{
    geoData: Polygon | Point | LineString | GeometryCollection;
}>()
</script>
