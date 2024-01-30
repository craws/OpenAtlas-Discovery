<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
import { useDisplay } from "vuetify";

const localePath = useLocalePath();

const APIBase = useRuntimeConfig().public.APIBase;
const { smAndUp } = useDisplay();
const { t, availableLocales, locale, fallbackLocale } = useI18n();
const data = reactive<Record<string, ParsedContent>>({});
availableLocales.forEach(async (locale) => {
	let content = null;
	try {
		content = await queryContent(`/${locale}`).findOne();
	} catch (error: any) {
		if (!error.message.includes("404 Document not found")) {
			throw error;
		}
	}
	if (content) {
		data[locale] = content;
	}
});
const logoHeight = computed(() => (smAndUp.value ? "350px" : "250px"));

const contentToUse = computed(() => {
	if (data[locale.value]) {
		return data[locale.value];
	}
	if (typeof fallbackLocale.value === "string" && data[fallbackLocale.value]) {
		return data[fallbackLocale.value];
	}
	return null;
});
</script>

<template>
	<VSheet class="landing-page d-flex justify-center pt-5">
		<VContainer id="content-renderer-container" class="text-center">
			<ContentRenderer v-if="contentToUse">
				<ContentRendererMarkdown :value="contentToUse" class="w-50 mx-auto" />
			</ContentRenderer>
			<br />
			<VRow v-if="APIBase" justify="center">
				<VCol cols="auto">
					<VBtn
						size="large"
						:to="localePath('/map')"
						min-width="150px"
						color="primary"
						width="100px"
						prepend-icon="mdi-map-marker"
					>
						{{ t("global.basics.map") }}
					</VBtn>
				</VCol>
				<VCol cols="auto">
					<VBtn
						size="large"
						:to="localePath('/data')"
						min-width="150px"
						variant="outlined"
						color="primary"
						width="100px"
						prepend-icon="mdi-database"
					>
						{{ t("global.basics.data") }}
					</VBtn>
				</VCol>
			</VRow>
		</VContainer>
	</VSheet>
</template>

<style scoped>
.landing-page :deep(p) {
	max-width: 568px;
	margin-inline: auto;
}

.landing-page :deep(img) {
	object-fit: contain;
	width: 80%;
	max-height: v-bind(logoHeight);
}
</style>
