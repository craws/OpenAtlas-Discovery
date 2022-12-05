<template>
  <div class="mx-0 pt-4">
    <h3 class="pl-4">
      {{ $t('components.entity.details_header') }}
    </h3>
    <div class="details py-2 px-4">
      <EntityDetail
        v-for="detail in detailsLists"
        :key="detail.title"
        :title="detail.title"
        :details="detail.detailItems"
        class="mb-3"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { DetailItem } from './EntityDetail.vue'
import { LinkedPlacesModelRelations, LinkedPlacesModelTypes } from '~~/composables/api'

export interface relationGroup {
  relationType: string,
  relations: LinkedPlacesModelRelations[]
}

interface DetailList {
  title: string,
  detailItems: DetailItem[],
}

const props = defineProps<{
  relations?: relationGroup[],
  types?: LinkedPlacesModelTypes[],
}>()

const detailsLists = computed(() => {
  const detailLists: DetailList[] = []

  if (props.types) {
    const detailItems: DetailItem[] = []

    props.types.forEach((type) => {
      detailItems.push({
        id: type.identifier?.substring(type.identifier?.lastIndexOf('/') + 1, type.identifier.length) ?? 'id',
        label: type.label ?? 'label',
        subheader: type.hierarchy?.split(' > ', 2)[0]
      })
    })

    detailLists.push({
      title: 'Types',
      detailItems
    })
  }
  if (props.relations) {
    props.relations.forEach((relationType) => {
      const detailItems: DetailItem[] = []

      // We skip the Types Relation as we use the Type Property to get that info if present
      if (!relationType.relationType.includes('crm:P2') && props.types) {
        relationType.relations.forEach((relation) => {
          detailItems.push({
            id: relation.relationTo?.split('/').at(-1) ?? 'id',
            label: relation.label ?? 'label'
          })
        })

        detailLists.push({
          title: relationType.relationType.substring(relationType.relationType.indexOf(' '), relationType.relationType.length),
          detailItems
        })
      }
    })
  }
  return detailLists
})

const { name } = useDisplay()

const columnCount = computed(() => {
  // name is reactive and
  // must use .value
  switch (name.value) {
    case 'xs': return 1
    case 'sm': return 2
  }

  return 3
})
</script>

<style scoped>
.details{
  column-count: v-bind(columnCount);
}
</style>
