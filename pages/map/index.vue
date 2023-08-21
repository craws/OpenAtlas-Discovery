<script setup lang="ts">import { GeoJsonObject } from 'geojson';
import { useI18n } from 'vue-i18n';
import { LinkedPlacesModelDescriptions, LinkedPlacesModelWhen } from '~~/composables/api';
import { Format, Query, ViewClasses } from '~~/types/query';
const { t } = useI18n();

definePageMeta({
  middleware: ['api']
});
useHead({
  title: t('global.basics.map') ?? 'Map'
});

const { $discoveryConfig, $api } = useNuxtApp();

const query = ref({
  view_classes: ['actor', 'event', 'place', 'reference', 'source'] as ViewClasses,
  limit: 0,
  format: 'geojson' as Format,
  search: undefined as string[] | undefined,
  type_id: $discoveryConfig.defaultFilters
});
const { data, pending, refresh } = await useAsyncData(() => $api.query.getQuery(query.value));
onMounted(() => {
  refresh();
});

interface FeatureContent {
    locationTitle: string
    objectTitle: string
    locationDescription: string
    objectDescription: string
    systemClass?: string
    when?: LinkedPlacesModelWhen
    descriptions?: LinkedPlacesModelDescriptions[]
    id?: number
}
const featureContent = reactive<FeatureContent>({
  locationTitle: '',
  objectTitle: '',
  locationDescription: '',
  objectDescription: ''
});

const items = computed(() => data?.value?.results?.[0].features || []);
function handlePopup (e: L.LeafletMouseEvent) {
  featureContent.objectTitle = e?.target?.feature?.properties?.name ?? '';
  featureContent.objectDescription = e?.target?.feature?.properties?.description ?? '';
  featureContent.locationTitle = e?.target?.feature?.geometry?.title ?? '';
  featureContent.locationDescription = e?.target?.feature?.geometry?.description ?? '';
  featureContent.id = e?.target?.feature?.properties?.['@id'];

  featureContent.descriptions = e?.target?.feature?.descriptions;
  featureContent.systemClass = e?.target?.feature?.properties.systemClass;

  const when: LinkedPlacesModelWhen = {
    timespans: [
      {
        start: {
          earliest: e?.target?.feature?.properties.begin_earliest,
          latest: e?.target?.feature?.properties.begin_latest
        },
        end: {
          earliest: e?.target?.feature?.properties.end_earliest,
          latest: e?.target?.feature?.properties.end_latest
        }
      }
    ]
  };

  featureContent.when = when;
}

function updateQuery (newQuery: Query) {
  query.value.search = newQuery.search?.map(x => JSON.stringify(x));
  refresh();
}

</script>
<template>
  <div data-test="map-page-container">
    <div style="position:relative; overflow: hidden;">
      <search-field class="search" :loading="pending" @search="updateQuery" />
      <v-card
        min-width="300px"
        max-width="350px"
        class="popup"
        :class="{ move: !featureContent.id }"
        position="absolute"
      >
        <v-btn
          class="close-btn"
          icon="mdi-close"
          variant="text"
          size="small"
          color="grey"
          @click="featureContent.id = undefined"
        />
        <entity-basics-view
          class="mx-4 mb-4 pt-3 overflow-y-auto overflow-x-hidden"
          :title="featureContent.objectTitle"
          :descriptions="[featureContent.objectDescription]"
          :system-class="featureContent.systemClass"
          :when="featureContent.when"
          style="max-height: 400px;"
        />
        <v-card-actions>
          <v-btn :to="`/entity/${featureContent.id}`" variant="text">
            {{ $t('global.basics.more details') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <data-map :items="items as GeoJsonObject[]" :zoom-level="7" style="height:calc(100vh - 64px);" @item-clicked="handlePopup" />
    </div>
  </div>
</template>

<style scoped>
.popup {
    transition: all 100ms ease-in-out;
    right: 20px;
    top: 100px;
    z-index: 500
}

.popup.move {
    translate: 500px 0px;
}

.scroll {
    overflow-y: auto
}

.search {
    position: absolute;
    z-index: 500;
    width: 60%;
    left: 0;
    right: 0;
    margin: auto;
    top: 20px
}

.close-btn {
  position: relative;
  right: -88%;
  top: 1%;
  z-index: 5;
}
</style>
