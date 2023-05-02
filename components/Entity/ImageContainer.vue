<template>
  <v-card
    :style="{
      'min-width': bounds?.minWidth ?? '400px',
      'max-width': bounds?.maxWidth ?? '1000px',
      'max-height': bounds?.maxHeight ?? '500px'}"
  >
    <nuxt-img
      v-if="props.depictions && depictions.length > 0"
      :src="depictions[0].url"
      :alt="depictions[0].title"
      :placeholder="[300, , 10]"
      style="width:100%"
    />
    <v-card-actions>
      <p>
        License: {{ depictions[0].license }}
      </p>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>import { LinkedPlacesDepiction } from '~~/composables/api';
import { SizeBounds } from '~~/types/layouts';

export interface EntityImageContainerProps {
  depictions: LinkedPlacesDepiction[]
  bounds?: SizeBounds;
}

const props = defineProps<EntityImageContainerProps>();

</script>
