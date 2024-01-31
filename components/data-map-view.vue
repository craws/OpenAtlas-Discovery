<script lang="ts" setup>
import type { FeatureCollection } from "geojson";
import { z } from "zod";

import type { SearchFormData } from "@/components/search-form.vue";
import { categories } from "@/composables/use-get-search-results";
import { project } from "@/config/project.config";

const router = useRouter();
const route = useRoute();

const searchFiltersSchema = z.object({
	category: z.enum(categories).catch("entityName"),
	search: z.string().catch(""),
});

const searchFilters = computed(() => {
	return searchFiltersSchema.parse(route.query);
});

type SearchFilters = z.infer<typeof searchFiltersSchema>;

function setSearchFilters(query: Partial<SearchFilters>) {
	void router.push({ query });
}

function onChangeSearchFilters(values: SearchFormData) {
	setSearchFilters(values);
}

const { data, isPending, isPlaceholderData } = useGetSearchResults(
	computed(() => {
		const { search, category, ...params } = searchFilters.value;

		return {
			...params,
			search:
				search.length > 0
					? [{ [category]: [{ operator: "like", values: [search], logicalOperator: "and" }] }]
					: [],
			type_id: project.defaultFilters,
			view_classes: ["actor", "event", "place", "reference", "source"],
			limit: 0,
		};
	}),
);

const isLoading = computed(() => {
	return isPending.value || isPlaceholderData.value;
});

const geojson = computed(() => {
	const features =
		data.value?.results.flatMap((result) => {
			return result.features;
		}) ?? [];

	const collection: FeatureCollection = {
		type: "FeatureCollection",
		// @ts-expect-error FIXME: Incorrect type in openapi document.
		features,
	};

	return collection;
});
</script>

<template>
	<div class="relative grid grid-rows-[auto_1fr] gap-4">
		<SearchForm
			:filter="searchFilters.category"
			:search="searchFilters.search"
			@submit="onChangeSearchFilters"
		/>

		<VisualisationContainer
			v-slot="{ height, width }"
			:class="{ 'opacity-50 grayscale': isLoading }"
		>
			<GeoMap v-if="height && width" :geojson="geojson" :height="height" :width="width" />

			<Centered v-if="isLoading">
				<LoadingIndicator size="lg" />
			</Centered>
		</VisualisationContainer>
	</div>
</template>
