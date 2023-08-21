<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
const { smAndUp } = useDisplay();
const t = useI18n();
const data = reactive<{ [name: string]: ParsedContent }>({});
t.availableLocales.forEach(async (locale) => {
  let content = null;
  try {
    content = await queryContent(`/${locale}`).findOne();
  } catch (error: any) {
    if (!error.message.includes('404 Document not found')) { throw error; }
  }
  if (content) { data[locale] = content; }
});
const logoHeight = computed(() => smAndUp.value ? '350px' : '250px');
const { $discoveryConfig } = useNuxtApp();

const contentToUse = computed(() => {
  if (data[t.locale.value]) { return data[t.locale.value]; }
  if (typeof t.fallbackLocale.value === 'string' && data[t.fallbackLocale.value]) { return data[t.fallbackLocale.value]; }
  return null;
});

useHead({
  title: $discoveryConfig.title ?? 'OpenAtlas Discovery'
});
</script>
<template>
  <v-sheet height="calc(100vh - 65px)" class=" landing-page d-flex justify-center pt-5">
    <v-container class="text-center" data-test="main-content-renderer">
      <ContentRenderer v-if="contentToUse">
        <ContentRendererMarkdown :value="contentToUse" class="w-50 mx-auto" />
      </ContentRenderer>
      <br>
      <v-row v-if="$discoveryConfig.APIbase" justify="center">
        <v-col cols="auto">
          <v-btn
            size="large"
            to="/map"
            min-width="150px"
            color="primary"
            width="100px"
            prepend-icon="mdi-map-marker"
            data-test="main-map-btn"
          >
            {{ $t('global.basics.map') }}
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            size="large"
            to="/data"
            min-width="150px"
            variant="outlined"
            color="primary"
            width="100px"
            prepend-icon="mdi-database"
            data-test="main-data-btn"
          >
            {{ $t('global.basics.data') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
