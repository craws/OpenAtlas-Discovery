<script lang="ts" setup>
import type { MapGeoJSONFeature } from "maplibre-gl";
import { z } from "zod";

import type { SearchFormData } from "@/components/search-form.vue";
import type { EntityFeature } from "@/composables/use-create-entity";
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

const { data, error, isPending, isPlaceholderData, suspense } = useGetSearchResults(
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

const entities = computed(() => {
	return (
		data.value?.results.flatMap((result) => {
			return result.features;
		}) ?? []
	);
});

function onLayerClick(_features: Array<MapGeoJSONFeature & Pick<EntityFeature, "properties">>) {
	// TODO:
}
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
			<GeoMap
				v-if="height && width"
				:entities="entities"
				:height="height"
				:width="width"
				@layer-click="onLayerClick"
			/>

			<Centered v-if="isLoading">
				<LoadingIndicator size="lg" />
			</Centered>
		</VisualisationContainer>
	</div>
</template>
