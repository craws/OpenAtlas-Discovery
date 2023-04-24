<template>
  <v-card
    class="mx-auto my-6"
    :style="{
      'min-width': bounds?.minWidth ?? '300px,',
      'min-height': bounds?.minHeight ?? '300px',
      'max-width': bounds?.maxWidth ?? '1000px',
      'max-height': bounds?.maxHeight ?? '500px'}"
  >
    <nuxt-img v-if="src" :src="props.src ?? ''" :alt="props.alt" :width="props.width" :height="props.height" />
  </v-card>
</template>
<script lang="ts" setup>import { SizeBounds } from '~~/types/layouts';

const props = defineProps<{
    src: string;
    alt: string;
    width?: string;
    height?: string;
    bounds?: SizeBounds;
}>();

</script>
