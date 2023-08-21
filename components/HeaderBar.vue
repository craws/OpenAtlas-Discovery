<template>
  <v-app-bar flat class="px-5">
    <nuxt-link to="/">
      <nuxt-img
        class="pt-2"
        :src="logo"
        width="150px"
      />
    </nuxt-link>
    <v-spacer />

    <ContentNavigationCNCustom />

    <client-only v-if="$discoveryConfig.APIbase">
      <v-tooltip content-class="text-capitalize" :text="$t('global.basics.map')" location="bottom">
        <template #activator="{ props }">
          <nuxt-link
            v-bind="props"
            class="text-body-1 nav-item h-100 d-flex align-center justify-center px-2 text-grey"
            to="/map"
          >
            <v-icon>mdi-map-marker</v-icon>
          </nuxt-link>
        </template>
      </v-tooltip>
      <v-tooltip content-class="text-capitalize" :text="$t('global.basics.data')" location="bottom">
        <template #activator="{ props }">
          <nuxt-link
            v-bind="props"
            class="text-body-1 nav-item h-100 d-flex align-center justify-center px-2 text-grey"
            to="/data"
          >
            <v-icon>mdi-database</v-icon>
          </nuxt-link>
        </template>
      </v-tooltip>
    </client-only>

    <v-divider vertical />

    <LocaleDropDown />
  </v-app-bar>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const Locale = useI18n().locale;

const logo = getLogo(true);

onBeforeMount(() => {
  Locale.value = localStorage.getItem(selectedLocaleLocalStorageKey) ?? Locale.value;
});

</script>
