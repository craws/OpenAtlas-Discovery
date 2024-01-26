<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
import { useDisplay } from "vuetify";

const localePath = useLocalePath();

const APIBase = useRuntimeConfig().public.APIBase;
const { smAndUp } = useDisplay();
const t = useI18n();
const data = reactive<Record<string, ParsedContent>>({});
t.availableLocales.forEach(async (locale) => {
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
	if (data[t.locale.value]) {
		return data[t.locale.value];
	}
	if (typeof t.fallbackLocale.value === "string" && data[t.fallbackLocale.value]) {
		return data[t.fallbackLocale.value];
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
						role="button"
						:to="localePath('/map')"
						min-width="150px"
						color="primary"
						width="100px"
						prepend-icon="mdi-map-marker"
					>
						{{ $t("global.basics.map") }}
					</VBtn>
				</VCol>
				<VCol cols="auto">
					<VBtn
						size="large"
						role="button"
						:to="localePath('/data')"
						min-width="150px"
						variant="outlined"
						color="primary"
						width="100px"
						prepend-icon="mdi-database"
					>
						{{ $t("global.basics.data") }}
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
