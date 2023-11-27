<template>
	<v-app-bar flat class="px-5">
		<nuxt-link :to="localePath('/')">
			<v-nuxt-image class="pt-2" :src="logo" alt="header logo" height="60px" />
		</nuxt-link>
		<v-spacer />

		<ContentNavigationCNCustom />

		<client-only v-if="APIBase">
			<v-tooltip content-class="text-capitalize" :text="$t('global.basics.map')" location="bottom">
				<template #activator="{ props }">
					<nuxt-link
						v-bind="props"
						class="text-body-1 nav-item h-100 d-flex align-center justify-center px-2 text-grey"
						:to="localePath('/map')"
					>
						<span class="d-sr-only">{{ $t("global.basics.map") }}</span>
						<v-icon>mdi-map-marker</v-icon>
					</nuxt-link>
				</template>
			</v-tooltip>
			<v-tooltip content-class="text-capitalize" :text="$t('global.basics.data')" location="bottom">
				<template #activator="{ props }">
					<nuxt-link
						v-bind="props"
						class="text-body-1 nav-item h-100 d-flex align-center justify-center px-2 text-grey"
						:to="localePath('/data')"
					>
						<span class="d-sr-only">{{ $t("global.basics.data") }}</span>
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
import { useI18n } from "vue-i18n";
const Locale = useI18n().locale;
const localePath = useLocalePath();

const logo = getHeaderLogo();
const APIBase = useRuntimeConfig().public.APIBase;
onBeforeMount(() => {
	Locale.value = localStorage.getItem(selectedLocaleLocalStorageKey) ?? Locale.value;
});
</script>
