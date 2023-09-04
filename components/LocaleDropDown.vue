<template>
  <v-btn
    id="locale-selector-button-activator"
    data-test="header-locale-menu"
    role="button"
    class="h-100 d-flex align-center justify-center px-2 text-grey"
  >
    <v-icon>mdi-translate</v-icon>
    <v-icon size="small">
      mdi-chevron-down
    </v-icon>
    <span class="d-sr-only">{{ $t('global.basics.language-selection') }}</span>
  </v-btn>
  <v-menu activator="#locale-selector-button-activator">
    <v-list data-test="locale-selector-list">
      <v-list-subheader>
        <p class="text-caption px-2">
          {{ $t('global.basics.language') }}
        </p>
      </v-list-subheader>
      <!--
        To make sure there is a correct name for each locale, the locale
        must have a list of locales with their corresponding natvieNames.
       -->
      <v-list-item
        v-for="locale in $i18n.availableLocales"
        :key="locale"
        @click="setLanguage(locale)"
      >
        <v-list-item-title
          :data-test="'locale-selector-' + locale"
          class="text-body-2 text-capitalize px-2"
        >
          <b v-if="locale === Locale">
            {{ $t('locales.' + locale + '.nativeName' ) }}
          </b>
          {{ locale !== Locale ? $t('locales.' + locale + '.nativeName' ) : '' }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const Locale = useI18n().locale;

function setLanguage (locale: string) {
  Locale.value = locale;
  window.localStorage.setItem(selectedLocaleLocalStorageKey, locale);
}
</script>
