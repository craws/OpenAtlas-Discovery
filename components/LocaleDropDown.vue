<template>
	<v-btn
		id="locale-selector-button-activator"
		data-test="header-locale-menu"
		role="button"
		class="h-100 d-flex align-center justify-center px-2 text-grey"
	>
		<v-icon>mdi-translate</v-icon>
		<v-icon size="small">mdi-chevron-down</v-icon>
		<span class="d-sr-only">{{ $t("global.basics.language-selection") }}</span>
	</v-btn>
	<v-menu activator="#locale-selector-button-activator">
		<v-list data-test="locale-selector-list">
			<v-list-subheader>
				<p class="text-caption px-2">
					{{ $t("global.basics.language") }}
				</p>
			</v-list-subheader>
			<v-list-item v-for="l in availableLocales" :key="l.code">
				<NuxtLink :to="switchLocalePath(l.code)" @click.prevent.stop="setLocale(locale.code)">
					{{ l.nativeName }}
				</NuxtLink>
			</v-list-item>
			<!--
        To make sure there is a correct name for each locale, the locale
        must have a list of locales with their corresponding natvieNames.
       -->
		</v-list>
	</v-menu>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
	return locales.value;
});
</script>

<style>
a {
	text-decoration: none;
	color: inherit;
}
</style>
