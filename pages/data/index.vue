<script lang="ts" setup>
definePageMeta({
	title: "DataPage.meta.title",
});

const t = useTranslations();

const env = useRuntimeConfig();
</script>

<template>
	<MainContent class="container grid grid-rows-[auto_1fr] py-8">
		<div>
			<PageTitle class="sr-only">{{ t("DataPage.title") }}</PageTitle>
		</div>

		<template v-if="env.public.NUXT_PUBLIC_DATABASE !== 'disabled'">
			<ErrorBoundary>
				<DataView />
			</ErrorBoundary>
		</template>
		<template v-else>
			<div>{{ t("DataPage.work-in-progress") }}</div>
		</template>
	</MainContent>
</template>
