<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
	return locales.value;
});
</script>

<template>
	<VBtn
		id="locale-selector-button-activator"
		data-test="header-locale-menu"
		role="button"
		class="h-100 d-flex align-center justify-center px-2 text-grey"
	>
		<VIcon>mdi-translate</VIcon>
		<VIcon size="small">mdi-chevron-down</VIcon>
		<span class="d-sr-only">{{ $t("global.basics.language-selection") }}</span>
	</VBtn>
	<VMenu activator="#locale-selector-button-activator">
		<VList data-test="locale-selector-list">
			<VListSubheader>
				<p class="text-caption px-2">
					{{ $t("global.basics.language") }}
				</p>
			</VListSubheader>
			<VListItem v-for="l in availableLocales" :key="l.code">
				<!--
				`@nuxtjs/i18n` does not update the locale cookie on route change, so we need to
				call `setLocale` explicitly.

				@see https://i18n.nuxtjs.org/guide/lang-switcher
			 	-->
				<NuxtLink
					:data-test="`locale-selector-${l.code}`"
					:to="switchLocalePath(l.code)"
					@click.prevent.stop="setLocale(locale.code)"
				>
					{{ l.nativeName }}
				</NuxtLink>
			</VListItem>
			<!--
        To make sure there is a correct name for each locale, the locale
        must have a list of locales with their corresponding natvieNames.
       -->
		</VList>
	</VMenu>
</template>

<style scoped>
a {
	text-decoration: none;
}
</style>
