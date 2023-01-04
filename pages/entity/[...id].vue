<template>
  <div>
    <div
      v-if="pending || !wasMounted"
      style="
        width: 100%,
        min-height: 100vh,
        height: 100%,
        display: flex,
        justify-content: center "
    >
      <v-progress-circular indeterminate color="primary" />
    </div>
    <v-card
      v-else
      class="mx-2 mt-4 mb-2 pb-2"
      style="width: 100%"
    >
      <v-row class="primary-background-light">
        <v-col cols="6">
          <EntityBasics
            class="pa-6"
            :loading="pending"
            :descriptions="descriptions"
            :title="title"
            :system-class="features?.[0]?.crmClass"
            :when="features?.[0]?.when"
          />
        </v-col>
        <v-col>
          <entity-map v-if="features?.[0]?.geometry" class="mr-4" :geo-data="features[0]?.geometry" />
        </v-col>
      </v-row>

      <v-divider class="mt-3" />

      <EntityDetails class="px-2" :relations="relationsGroupedByType" :types="types" />
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { relationGroup } from '~~/components/Entity/EntityDetails.vue';

const { $api } = useNuxtApp();
const route = useRoute();
const { t } = useI18n();

const entityID = Number(route.params.id);
const wasMounted = ref(false);

const { data, pending, refresh } = await useAsyncData(() => $api.entity.getEntity(entityID));

// Entity Variables

const features = computed(() => data?.value?.features ?? undefined);

const title = computed(() => features?.value?.[0]?.properties?.title ?? t('global.basics.title'));

const descriptions = computed(() => features?.value?.[0]?.descriptions);

const types = computed(() => {
  return features?.value?.[0]?.types;
});

const relationsGroupedByType = computed(() => {
  if (!features?.value?.[0]?.relations) {
    return undefined;
  }
  const relations: relationGroup[] = [];

  for (let i = 0; i < features?.value?.[0]?.relations.length; i++) {
    const element = features?.value?.[0]?.relations[i];

    let typeExists = false;
    for (let i = 0; i < relations.length; i++) {
      const type = relations[i];

      if (type.relationType === element.relationType) {
        type.relations.push(element);
        typeExists = true;
        break;
      }
    }
    if (!typeExists) {
      relations.push({
        relationType: element.relationType ?? 'relationType',
        relations: [element]
      });
    }
  }

  return relations;
});

// Basic Functions

onMounted(async () => {
  wasMounted.value = true;
  useHead({
    title: t('global.basics.loading')
  });
  await refresh();
  useHead({
    title: title.value
  });
});

// const watcherOnLoaded = watch(pending, () => {
//     logBasicEntityInfo();
// });

function logBasicEntityInfo () {
  console.log('Logging Basic entity info...');
  console.log('ID: ', route.params.id);
  console.log('Data: ', data?.value);
  console.log('Done');
}

</script>
<style scoped>
.primary-background-light {
    background-color: rgba(var(--v-theme-primary-lighten-1), 0.2);
}
</style>
