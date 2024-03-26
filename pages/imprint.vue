<script lang="ts" setup>
import { project } from "@/config/project.config";

defineRouteRules({
	prerender: true,
});

definePageMeta({
	validate() {
		return project.imprint !== "none";
	},
});

const t = useTranslations();

usePageMetadata({
	title: t("ImprintPage.meta.title"),
});

if (project.imprint === "none") {
	throw createError({ fatal: true, statusCode: 404, statusMessage: "Imprint page is disabled" });
}
</script>

<template>
	<MainContent class="container max-w-3xl py-8">
		<div>
			<PageTitle>{{ t("ImprintPage.title") }}</PageTitle>
		</div>

		<Imprint v-if="project.imprint === 'custom'" />
		<ImprintAcdhCh v-else-if="project.imprint === 'acdh-ch'" />
	</MainContent>
</template>
