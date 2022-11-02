<template>
  <div class="mx-0 pt-4">
    <h3 class="pl-4"> {{ $t('components.entity.details_header') }}</h3>
    <v-row>
      <v-col>
        <template v-for="detail in firstColumnRelations">
          <EntityDetail :title="detail.relationType" :details="detail.relations"></EntityDetail>
        </template>

      </v-col>
      <v-col>
        <template v-for="detail in secondColumnRelations">
          <EntityDetail :title="detail.relationType" :details="detail.relations"></EntityDetail>
        </template>
      </v-col>
      <v-col>
        <template v-for="detail in thirdColumnRelations">
          <EntityDetail :title="detail.relationType" :details="detail.relations"></EntityDetail>
        </template>
      </v-col>
    </v-row>
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

const firstColumnRelations = computed(
  () => {
    if(!props.relations) {
      console.log('no relations in details', props.relations)
      return null;
    }
    let arr = [];
    for (let i = 0; i < props.relations.length; i+= 3) {
      arr.push(props.relations[i]);
    }
    return arr;
  }
)

const secondColumnRelations = computed(
  () => {
    if(!props.relations) {
      console.log('no relations in details', props.relations)
      return null;
    }
    let arr = [];
    for (let i = 1; i < props.relations.length; i+= 3) {
      arr.push(props.relations[i]);
    }
    return arr;
  }
)

const thirdColumnRelations = computed(
  () => {
    if(!props.relations) {
      console.log('no relations in details', props.relations)
      return null;
    }
    let arr = [];
    for (let i = 2; i < props.relations.length; i+= 3) {
      arr.push(props.relations[i]);
    }
    return arr;
  }
)

</script>

