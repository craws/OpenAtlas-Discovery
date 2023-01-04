<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
const { smAndUp } = useDisplay();
const t = useI18n();
const data = reactive<{ [name: string]: ParsedContent }>({});
t.availableLocales.forEach(async (locale) => {
  data[locale] = await queryContent(`/${locale}`).findOne();
});
const logoHeight = computed(() => smAndUp.value ? '350px' : '250px');
useHead({
  title: 'OpenAtlas Discovery'
});
</script>
<template>
  <v-sheet height="calc(100vh - 65px)" class=" landing-page d-flex justify-center pt-5">
    <v-container class="text-center">
      <ContentRenderer v-if="data[$i18n.locale]">
        <ContentRendererMarkdown :value="data[$i18n.locale]" />
      </ContentRenderer>
      <br>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
            size="large"
            to="/map"
            min-width="150px"
            color="primary"
            width="100px"
            prepend-icon="mdi-map-marker"
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
          >
            {{ $t('global.basics.data') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style>
.landing-page p {
  max-width: 568px;
  margin-inline: auto;
}

.landing-page img{
  width:80%;
  max-height: v-bind(logoHeight);
  object-fit: contain;

}
</style>
