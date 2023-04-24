<template>
  <v-tabs v-if="tabs.length > 1" v-model="activeTab">
    <v-tab
      v-for="(tab, index) in tabs"
      :key="index"
      :value="index"
    >
      {{ tab.title }}
    </v-tab>
  </v-tabs>
  <v-window v-model="activeTab">
    <v-window-item v-for="(tab, index) in tabs" :key="index" :value="index">
      <component :is="tab.component" v-bind="tab.props" />
    </v-window-item>
  </v-window>
</template>
<script setup lang="ts">
import { GeometryCollection, LineString, LinkedPlacesDepiction, Point, Polygon } from '~~/composables/api';
import { DetailTab } from '~~/types/entityDetailTypes';

const props = defineProps<{
    depictions: LinkedPlacesDepiction[] | undefined,
    geometry: Polygon | Point | LineString | GeometryCollection | undefined
}>();

const activeTab = ref(0);

const depictionTab: DetailTab = {
  title: 'Depictions',
  component: resolveComponent('EntityImageContainer'),
  props: {
    depictions: props.depictions
  }
};

const mapTab: DetailTab = {
  title: 'Map',
  component: resolveComponent('EntityMapContainer'),
  props: {
    'geo-data': props.geometry
  }
};

const tabs = computed(() => {
  const activeTabs: DetailTab[] = [];
  if (props.depictions) {
    activeTabs.push(depictionTab);
  }
  if (props.geometry) {
    activeTabs.push(mapTab);
  }
  return activeTabs;
});

</script>
