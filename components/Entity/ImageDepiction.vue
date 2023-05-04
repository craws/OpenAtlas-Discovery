<template>
  <v-tooltip
    location="bottom"
    :text="$t('global.basics.license') + ': ' + depiction.license"
  >
    <template #activator="{ props: tooltip }">
      <v-nuxt-image
        v-if="depiction"
        v-bind="tooltip"
        :src="depiction.url"
        :alt="depiction.title"
        :height="'100%'"
      />
    </template>
  </v-tooltip>
</template>
<script lang="ts" setup>import { LinkedPlacesDepiction } from '~~/composables/api';
export interface DepictionProps {
  depiction: LinkedPlacesDepiction
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<DepictionProps>();

</script>
