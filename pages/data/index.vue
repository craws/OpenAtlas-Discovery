<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ComputedRef } from 'vue';
import headers from '~/assets/tableheaders.json';
import classes from '~/assets/classes.json';
import { Query } from '~~/types/query';
const { t } = useI18n();
const { $discoveryConfig, $api } = useNuxtApp();

definePageMeta({
  middleware: ['api']
});
useHead({
  title: t('global.basics.data') ?? 'Data'
});

const itemsLength: ComputedRef<number | undefined> = computed(() => data?.value?.pagination?.entities);
const options = reactive({ page: 1, itemsPerPage: 20, itemsLength });
const search = ref<string[] | undefined>([]);
const query = computed(() => ({
  view_classes: ['actor', 'event', 'place', 'reference', 'source'],
  page: options.page,
  limit: options.itemsPerPage,
  search: search.value,
  type_id: $discoveryConfig.defaultFilters
}));

const apiEnabled = computed(() => $discoveryConfig.APIbase !== undefined);

const { data, pending, refresh } = await useAsyncData(() => $api.query.getQuery(query.value));
watch(() => options.page, () => refresh());
onMounted(() => {
  if (!apiEnabled) { refresh(); }
});

function updateQuery (newQuery: Query) {
  search.value = newQuery.search?.map(x => JSON.stringify(x));
  refresh();
}

</script>

<template>
  <ClientOnly>
    <v-container data-test="data-page-container">
      <search-field :loading="pending" @search="updateQuery" />
      <data-table
        class="mt-10"
        height="calc(100vh - 150px)"
        density="compact"
        :headers="headers"
        :items="data?.results ?? []"
        :options="options"
      >
        <template #features[0].systemClass="{ value }">
          <v-tooltip content-class="text-capitalize" :text="$t(`global.entity.system_classes.${value}`)">
            <template #activator="{ props }">
              <v-icon v-bind="props">
                {{ classes.find(x => x.systemClass === value)?.icon }}
              </v-icon>
            </template>
          </v-tooltip>
        </template>
        <template #features[0].properties.title="{ item, value }">
          <nuxt-link :to="`/entity/${item.features[0]['@id'].split('/').at(-1)}`">
            {{ value }}
          </nuxt-link>
        </template>
        <template #features[0].when.timespans[0].start.earliest="{ value }">
          {{ useFormatDateTime(value) }}
        </template>
        <template #features[0].when.timespans[0].end.earliest="{ value }">
          {{ useFormatDateTime(value) }}
        </template>
      </data-table>
    </v-container>
  </ClientOnly>
</template>
