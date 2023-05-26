<template>
  <v-tabs v-if="tabs.length > 1" v-model="activeTab" align-tabs="center">
    <v-tab v-for="(tab, index) in tabs" :key="index" :value="index">
      {{ $t(tab.title) }}
    </v-tab>
  </v-tabs>
  <v-window v-model="activeTab">
    <v-window-item v-for="(tab, index) in tabs" :key="index" :value="index">
      <component :is="tab.component" v-bind="tab.props" class="mx-auto my-6" />
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
import {
  type GeometryCollection,
  type LineString,
  type LinkedPlacesDepiction,
  type Point,
  type Polygon,
} from "~~/composables/api";
import { type DetailTab } from "~~/types/entityDetailTypes";

import { type EntityImageContainerProps } from "./ImageContainer.vue";
import { type EntityMapContainerProps } from "./MapContainer.vue";

const props = defineProps<{
  depictions?: Array<LinkedPlacesDepiction>;
  geometry?: GeometryCollection | LineString | Point | Polygon;
}>();

const activeTab = ref(0);

const depictionTab = computed((): DetailTab | undefined => {
  if (!props.depictions) {
    return undefined;
  }

  const imageProps: EntityImageContainerProps = {
    depictions: props.depictions,
  };

  return {
    title: "global.basics.depictions",
    component: resolveComponent("EntityImageContainer"),
    props: imageProps,
  };
});

const mapTab = computed((): DetailTab | undefined => {
  if (!props.geometry) {
    return undefined;
  }

  const mapProps: EntityMapContainerProps = {
    geoData: props.geometry,
  };

  return {
    title: "global.basics.map",
    component: resolveComponent("EntityMapContainer"),
    props: mapProps,
  };
});

const tabs = computed(() => {
  const activeTabs: Array<DetailTab> = [];
  if (depictionTab.value) {
    activeTabs.push(depictionTab.value);
  }
  if (mapTab.value) {
    activeTabs.push(mapTab.value);
  }
  return activeTabs;
});
</script>
