
<script setup lang="ts">
import CountryFlag from 'vue-country-flag-next'
const flags = {
  en: "gb",
  de: "de"
}
</script>
<template>
  <v-app>
    <v-main>
      <v-app-bar class="px-5">
        <nuxt-link to="/">
          <v-img src="/OpenAtlasDiscovery_logo.png" width="200px"></v-img>
        </nuxt-link>
        <v-spacer />
        <nuxt-link to="/data">Data</nuxt-link>
        <div>
          <country-flag class="ml-1" role="button" @click="$i18n.locale = $i18n.locale ==='en' ? 'de' : 'en'"
            :country='flags[$i18n.locale]' style="scale: 0.7" />
        </div>
      </v-app-bar>
      <nuxt-page />
    </v-main>
  </v-app>
</template>


