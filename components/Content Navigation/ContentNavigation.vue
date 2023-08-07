<template>
  <template v-if="navigation !== null">
    <template
      v-for="el of navigation"
      :key="el._id"
    >
      <ContentNavElement :nav-item="el" />
    </template>
  </template>
</template>
<script setup lang="ts">
import { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';
import { useI18n } from 'vue-i18n';
const Locale = useI18n().locale;

const navLocaleQuery = computed(() : QueryBuilderParams => {
  return {
    where: [
      {
        // Create a regex pattern to match the locale in the path
        _path: { $contains: `/${Locale.value}/` }
      }
    ]
  };
});
const { data: navigation } = await useAsyncData(
  'navigation',
  () => fetchContentNavigation(navLocaleQuery.value),
  {
    watch: [navLocaleQuery]
  });

</script>
