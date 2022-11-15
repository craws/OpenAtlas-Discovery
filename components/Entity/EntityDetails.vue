<template>
  <div class="mx-0 pt-4">
    <h3 class="pl-4"> {{ $t('components.entity.details_header') }}</h3>
    <div class="details px-4 mt-3">
      <EntityDetail
      v-for="relation in props.relations"
      :title="relation.relationType"
      :details="relation.relations">
      </EntityDetail>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RelationModel } from '~~/composables/api';

export interface relationGroup {
  relationType: string,
  relations: RelationModel[]
}

const props = defineProps<{
  relations?: relationGroup[]
}>()


</script>

<style scoped>
.details{
  column-count: 3;
}
</style>
