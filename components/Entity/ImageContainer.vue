<template>
  <v-card
    class="mx-auto my-6"
    :style="{
      'min-width': bounds?.minWidth ?? '300px,',
      'min-height': bounds?.minHeight ?? '300px',
      'max-width': bounds?.maxWidth ?? '1000px',
      'max-height': bounds?.maxHeight ?? '500px'}"
  >
    <nuxt-img
      v-if="depictions && depictions.length > 0"
      :src="depictions[0].url"
      :alt="depictions[0].title"
      :width="width"
      :height="height"
    />
    <v-card-actions>
      <p>
        License: {{ depictions[0].licence }}
      </p>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>import { LinkedPlacesDepiction } from '~~/composables/api';
import { SizeBounds } from '~~/types/layouts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    depictions: LinkedPlacesDepiction[]
    width?: string;
    height?: string;
    bounds?: SizeBounds;
}>();

</script>
