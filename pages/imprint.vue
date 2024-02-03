<script lang="ts" setup>
import { project } from "@/config/project.config";

defineRouteRules({
	prerender: true,
});

definePageMeta({
	title: "ImprintPage.meta.title",
	validate() {
		return project.imprint !== "none";
	},
});

const t = useTranslations();

if (project.imprint === "none") {
	throw createError({ fatal: true, statusCode: 404, statusMessage: "Imprint page is disabled" });
}
</script>

<template>
	<MainContent class="container py-8">
		<div>
			<PageTitle>{{ t("ImprintPage.title") }}</PageTitle>
		</div>

		<Imprint v-if="project.imprint === 'custom'" />
		<ImprintAcdhCh v-else-if="project.imprint === 'acdh-ch'" />
	</MainContent>
</template>
