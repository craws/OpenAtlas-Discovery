<template>
  <div class="mx-0 pt-4">
    <h3 class="pl-4"> {{ $t('components.entity.details_header') }}</h3>
    <div class="details px-4 mt-3">
      <EntityDetail
      v-for="relation in props.relations"
      :title="relation.relationType"
      :details="relation.relations"
      class="mb-3">
      </EntityDetail>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { RelationModel } from '~~/composables/api';

export interface relationGroup {
  relationType: string,
  relations: RelationModel[]
}

const props = defineProps<{
  relations?: relationGroup[]
}>()

const {name} = useDisplay();

const columnCount = computed(() => {
  // name is reactive and
  // must use .value
  switch (name.value) {
    case 'xs': return 1
    case 'sm': return 2
  }
  return 3;
});

</script>

<style scoped>
.details{
  column-count: v-bind(columnCount);
}
</style>
