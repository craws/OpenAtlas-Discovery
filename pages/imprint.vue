<template>
  <div class="ma-16 ">
    <h1>{{ $t('global.imprint') }}</h1>
    <div v-html="data" />
  </div>
</template>
<script setup lang="ts">
const imprintServiceURL = 'https://imprint.acdh.oeaw.ac.at/';
const serviceID = '21614';
const { locale } = useI18n();

const { data } = await useFetch(imprintServiceURL + serviceID + `/?locale=${locale.value}`);


</script>
