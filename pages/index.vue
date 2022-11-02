<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const t = useI18n();
const { data, refresh } = await useAsyncData('page-data', () => queryContent(`/${t.locale.value}`).findOne());

onMounted(() => refresh())
watch(() => t.locale.value, () => refresh())
</script>
<template>
  <v-sheet height="calc(100vh - 64px)" class=" landing-page d-flex justify-center align-center">
    <v-container class="text-center">
      <ContentRenderer>
        <ContentRendererMarkdown :value="data" />
      </ContentRenderer>
      <br />
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn to="/map" min-width="150px" variant="outlined" color="primary" width="100px">
            <v-icon>mdi-map-marker</v-icon>
            {{ $t('map') }}
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn to="/data" min-width="150px" variant="outlined" color="primary" width="100px">
            <v-icon>mdi-database</v-icon>

            {{ $t('data') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>


<style >
.landing-page p {
  max-width: 568px;
  margin-inline: auto;
}
</style>
