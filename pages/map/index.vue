<script lang="ts" setup>
definePageMeta({
	validate() {
		const env = useRuntimeConfig();
		return env.public.database !== "disabled";
	},
});

const t = useTranslations();

usePageMetadata({
	title: t("MapPage.meta.title"),
});

const env = useRuntimeConfig();
</script>

<template>
	<MainContent class="grid grid-rows-[auto_1fr]">
		<div>
			<PageTitle class="sr-only">{{ t("MapPage.title") }}</PageTitle>
		</div>
		<template v-if="env.public.database !== 'disabled'">
			<ErrorBoundary>
				<DataMapView />
			</ErrorBoundary>
		</template>
		<template v-else>
			<div>{{ t("DataPage.work-in-progress") }}</div>
		</template>
	</MainContent>
</template>
