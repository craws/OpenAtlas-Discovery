<script lang="ts" setup>
definePageMeta({
	layout: "visualization",
	validate() {
		const env = useRuntimeConfig();
		return env.public.database !== "disabled";
	},
});

const t = useTranslations();

usePageMetadata({
	title: t("MapPage.meta.title"),
});

const route = useRoute();

const env = useRuntimeConfig();

const currentMode = computed(() => {
	return route.query.mode;
});
</script>

<template>
	<MainContent class="grid grid-rows-[auto_1fr]">
		<div>
			<PageTitle class="sr-only">{{ t("MapPage.title") }}</PageTitle>
		</div>
		<template v-if="env.public.database !== 'disabled'">
			<ErrorBoundary>
				<DataMapView v-if="currentMode === 'map'" />
				<DataNetworkView v-if="currentMode === 'network'" />
			</ErrorBoundary>
		</template>
		<template v-else>
			<div>{{ t("DataPage.work-in-progress") }}</div>
		</template>
	</MainContent>
</template>
