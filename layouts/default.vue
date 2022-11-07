
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
      <v-app-bar flat class="px-5">
        <nuxt-link to="/">
          <v-img src="/OpenAtlasDiscovery_logo.png" width="200px"></v-img>
        </nuxt-link>
        <v-spacer />
        <client-only>
          <v-tooltip content-class="text-capitalize" :text="$t('global.basics.map')" location="bottom">
            <template v-slot:activator="{ props }">
              <nuxt-link v-bind="props"
                class="text-body-1 nav-item h-100 d-flex align-center justify-center px-2 text-grey" to="/map">
                <v-icon>mdi-map-marker</v-icon>
              </nuxt-link>
            </template>
          </v-tooltip>
        <v-tooltip content-class="text-capitalize" :text="$t('global.basics.data')" location="bottom">
          <template v-slot:activator="{ props }">
            <nuxt-link v-bind="props"
              class="text-body-1 nav-item h-100 d-flex align-center justify-center px-2 text-grey" to="/data">
              <v-icon>mdi-database</v-icon>
            </nuxt-link>
          </template>
        </v-tooltip>
      </client-only>

        <v-divider vertical></v-divider>

        <v-menu open-on-hover open-on-click>
          <template v-slot:activator="{ props }">
            <v-btn role="button" v-bind="props"
              class="h-100 d-flex align-center justify-center px-2 text-grey">
              <v-icon>mdi-translate</v-icon>
              <v-icon size="small">mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list >
            <v-list-subheader>
              <p class="text-caption px-2">{{ $t('global.basics.language') }}</p>
            </v-list-subheader>
            <v-list-item densitiy="compact" @click="$i18n.locale = 'de'">
              <v-list-item-title class="text-body-2 text-capitalize px-2">{{ $t('global.basics.de') }}</v-list-item-title>
            </v-list-item>
            <v-list-item densitiy="compact" @click="$i18n.locale = 'en'">
              <v-list-item-title class="text-body-2 text-capitalize px-2">{{ $t('global.basics.en') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-divider></v-divider>
      <nuxt-page />
    </v-main>
  </v-app>
</template>

<style>
.nav-item {
  text-decoration: none;
  transition: all 200ms ease-in-out;
  min-width: 50px;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.language-menu .v-overlay__content {
  border-top-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
}
</style>


