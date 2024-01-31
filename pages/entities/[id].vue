<script lang="ts" setup>
import type { FeatureCollection } from "geojson";
import { z } from "zod";

// defineRouteRules({
// 	prerender: true,
// });

definePageMeta({
	title: "EntityPage.meta.title",
	validate(route) {
		const paramsSchema = z.object({
			id: z.coerce.number().int().positive(),
		});
		return paramsSchema.safeParse(route.params).success;
	},
});

const locale = useLocale();
const t = useTranslations();

const route = useRoute();
const id = computed(() => {
	return Number(route.params.id as string);
});

const { data, error, isPending, isPlaceholderData, suspense } = useGetEntity(
	computed(() => {
		return { entityId: id.value };
	}),
);
// TODO: error, loading states

const isLoading = computed(() => {
	return isPending.value || isPlaceholderData.value;
});

const entity = computed(() => {
	return data.value?.features[0] ?? null;
});

const geojson = computed(() => {
	const features = data.value?.features ?? [];

	const collection: FeatureCollection = {
		type: "FeatureCollection",
		// @ts-expect-error
		features,
	};

	return collection;
});

useHead({
	title: computed(() => {
		return entity.value?.properties.title ?? t("EntityPage.meta.title");
	}),
	// TODO: description, other metadata
});
</script>

<!-- TODO: loading indicator -->
<template>
	<MainContent class="container py-8 relative grid grid-rows-[auto_1fr] gap-4">
		<div v-if="entity != null">
			<PageTitle>{{ entity.properties.title }}</PageTitle>

			<!-- TODO: <dl> -->
			<div>{{ entity.types }}</div>
			<div>{{ entity.when }}</div>
			<div v-for="description of entity.descriptions">{{ description.value }}</div>
		</div>

		<VisualisationContainer v-slot="{ height, width }">
			<GeoMap v-if="height && width" :geojson="geojson" :height="height" :width="width" />
		</VisualisationContainer>

		<div>
			<dl>
				<dt></dt>
				<dd></dd>
			</dl>
		</div>
	</MainContent>
</template>
