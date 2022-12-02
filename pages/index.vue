<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
const { smAndUp } = useDisplay()
const t = useI18n()

const data = await t.availableLocales.reduce(async (previousState, currentVal) => {
  const { data: page } = await useAsyncData(`page-${currentVal}`, () => queryContent(`/${currentVal}`).findOne())
  return {
    ...previousState,
    [currentVal]: page
  }
}, {})
const logoHeight = computed(() => smAndUp.value ? '350px' : '250px')
</script>
<template>
  <v-sheet height="calc(100vh - 65px)" class=" landing-page d-flex justify-center pt-5">
    <v-container class="text-center">
      {{ $i18n.availableLocales }}
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

.landing-page img {
  width: 80%;
  max-height: v-bind(logoHeight);
  object-fit: contain;

}
</style>
