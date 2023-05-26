<template>
  <v-card
    style="
      min-width: 400px;
      min-height: 400px;
      max-width: 1000px;
      max-height: 750;
    "
  >
    <data-map
      :items="(props.geoData as GeoJsonObject)"
      :style="{
        'min-width': bounds?.minWidth ?? '400px,',
        'min-height': bounds?.maxHeight ?? '400px',
        'max-width': bounds?.maxWidth ?? '1000px',
        'max-height': bounds?.maxHeight ?? '500px',
      }"
    />
    <v-card-actions justify="center">
      <v-spacer />
      <v-btn to="/map" prepend-icon="mdi-map-marker">
        {{ $t("global.basics.map") }}
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { type GeoJsonObject } from "geojson";

import {
  type GeometryCollection,
  type LineString,
  type Point,
  type Polygon,
} from "~~/composables/api";
import { type SizeBounds } from "~~/types/layouts";

export interface EntityMapContainerProps {
  geoData: GeometryCollection | LineString | Point | Polygon;
  bounds?: SizeBounds;
}

const props = defineProps<EntityMapContainerProps>();
</script>
