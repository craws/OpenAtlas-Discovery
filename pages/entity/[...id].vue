<template>
  <v-card class="mx-2 mt-4 mb-2 pb-2 px-2" :loading="pending || !wasMounted">
    <v-row class="primary-background-light pt-2">
      <v-col cols="6">
        <EntityBasicsView
          class="pa-4"
          :loading="pending"
          :descriptions="descriptions"
          :title="title"
          :system-class="features?.[0]?.systemClass"
          :when="features?.[0]?.when"
        />
      </v-col>

      <v-col>
        <EntityFeatureTabs :geometry="geometry" :depictions="depictions" />
      </v-col>
    </v-row>

    <v-divider class="mt-3" />

    <EntityDetailsGallery
      class="px-4"
      :relations="relationsGroupedByType"
      :types="types"
    />
  </v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { type relationGroup } from "~~/types/entityDetailTypes";

const { $api } = useNuxtApp();
const route = useRoute();
const { t } = useI18n();

const entityID = Number(route.params.id);
const wasMounted = ref(false);

const { data, pending, refresh } = await useAsyncData(() =>
  $api.entity.getEntity(entityID)
);

// Entity Variables

const features = computed(() => data.value?.features ?? undefined);

const title = computed(
  () => features?.value?.[0]?.properties?.title ?? t("global.basics.title")
);

const descriptions = computed((): Array<string> => {
  if (features?.value?.[0]?.descriptions) {
    return features?.value?.[0]?.descriptions
      .map((description) => description.value ?? "")
      .filter((val) => val !== "");
  }

  return [];
});

const depictions = computed(() => features?.value?.[0]?.depictions);

const geometry = computed(() => features?.value?.[0]?.geometry);

const types = computed(() => {
  return features?.value?.[0]?.types;
});

const relationsGroupedByType = computed(() => {
  if (!features?.value?.[0]?.relations) {
    return undefined;
  }
  const relations: Array<relationGroup> = [];

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
        relationType: element.relationType ?? "relationType",
        relations: [element],
      });
    }
  }

  return relations;
});

// Basic Functions

onMounted(async () => {
  wasMounted.value = true;
  useHead({
    title: t("global.basics.loading"),
  });
  await refresh();
  useHead({
    title: title.value,
  });
});
</script>

<style scoped>
.primary-background-light {
  background-color: rgba(var(--v-theme-primary-lighten-1), 0.2);
}
</style>
