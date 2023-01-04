<template>
  <v-app-bar flat class="px-5">
    <nuxt-link to="/">
      <v-img class="pa-5" src="/OpenAtlas_Discovery_landscape.svg" width="150px" />
    </nuxt-link>
    <v-spacer />
    <client-only>
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

    <v-menu open-on-hover open-on-click>
      <template #activator="{ props }">
        <v-btn
          role="button"
          v-bind="props"
          class="h-100 d-flex align-center justify-center px-2 text-grey"
        >
          <v-icon>mdi-translate</v-icon>
          <v-icon size="small">
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-subheader>
          <p class="text-caption px-2">
            {{ $t('global.basics.language') }}
          </p>
        </v-list-subheader>
        <!--
          To make sure there is a correct name for each locale, the default locale
          must have a list of locales with their corresponding natvieNames.
         -->
        <v-list-item v-for="locale in $i18n.availableLocales" :key="locale" @click="setLanguage(locale)">
          <v-list-item-title class="text-body-2 text-capitalize px-2 ">
            <b v-if="locale === Locale">
              {{ $t('locales.' + locale + '.nativeName' ) }}
            </b>
            {{ locale !== Locale ? $t('locales.' + locale + '.nativeName' ) : '' }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const Locale = useI18n().locale;

const selectedLocaleLocalStorageKey = 'oad-selected-locale';

onBeforeMount(() => {
  Locale.value = window.localStorage.getItem(selectedLocaleLocalStorageKey) ?? Locale.value;
});

function setLanguage (locale: string) {
  Locale.value = locale;
  window.localStorage.setItem(selectedLocaleLocalStorageKey, locale);
}
</script>
