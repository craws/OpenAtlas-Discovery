<template>
  <v-tabs
    v-if="tabs.length > 1"
    v-model="activeTab"
    align-tabs="center"
  >
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
      <component :is="tab.component" v-bind="tab.props" class="mx-auto my-6" />
    </v-window-item>
  </v-window>
</template>
<script setup lang="ts">
import { EntityImageContainerProps } from './ImageContainer.vue';
import { EntityMapContainerProps } from './MapContainer.vue';
import { GeometryCollection, LineString, LinkedPlacesDepiction, Point, Polygon } from '~~/composables/api';
import { DetailTab } from '~~/types/entityDetailTypes';

const props = defineProps<{
    depictions?: LinkedPlacesDepiction[],
    geometry?: Polygon | Point | LineString | GeometryCollection
}>();

const activeTab = ref(0);

const depictionTab = computed(() : DetailTab | undefined => {
  if (!props.depictions) { return undefined; }

  const imageProps: EntityImageContainerProps = {
    depictions: props.depictions
  };

  return {
    title: 'Depictions',
    component: resolveComponent('EntityImageContainer'),
    props: imageProps
  };
});

const mapTab = computed(() : DetailTab | undefined => {
  if (!props.geometry) { return undefined; }

  const mapProps: EntityMapContainerProps = {
    geoData: props.geometry
  };

  return {
    title: 'Map',
    component: resolveComponent('EntityMapContainer'),
    props: mapProps
  };
});

const tabs = computed(() => {
  const activeTabs: DetailTab[] = [];
  if (depictionTab.value) {
    activeTabs.push(depictionTab.value);
  }
  if (mapTab.value) {
    activeTabs.push(mapTab.value);
  }
  return activeTabs;
});

</script>
