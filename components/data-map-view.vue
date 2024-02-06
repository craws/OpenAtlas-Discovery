<script lang="ts" setup>
import { keyByToMap } from "@acdh-oeaw/lib";
import * as turf from "@turf/turf";
import type { MapGeoJSONFeature } from "maplibre-gl";
import { z } from "zod";

import type { SearchFormData } from "@/components/search-form.vue";
import type { EntityFeature } from "@/composables/use-create-entity";
import { categories } from "@/composables/use-get-search-results";
import { project } from "@/config/project.config";

const router = useRouter();
const route = useRoute();
const t = useTranslations();
const { d } = useI18n();

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

const entitiesById = computed(() => {
	return keyByToMap(entities.value, (entity) => {
		return entity.properties._id;
	});
});

const popover = ref<{ coordinates: [number, number]; entities: Array<EntityFeature> } | null>(null);

function onLayerClick(features: Array<MapGeoJSONFeature & Pick<EntityFeature, "properties">>) {
	const entities: Array<EntityFeature> = [];

	features.forEach((feature) => {
		const entity = entitiesById.value.get(feature.properties._id);
		if (entity != null) {
			entities.push(entity);
		}
	});

	const point = turf.center(createFeatureCollection(entities));
	const coordinates = point.geometry.coordinates;

	popover.value = { coordinates, entities };
}

function createDateSpan(date: { earliest?: string; latest?: string }) {
	const segments: Array<string> = [];
	if (date.earliest != null) {
		segments.push(d(date.earliest));
	}
	if (date.latest != null) {
		segments.push(d(date.latest));
	}
	return segments.join(" - ");
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
			>
				<GeoMapPopup
					v-if="popover != null"
					:coordinates="popover.coordinates"
					@close="popover = null"
				>
					<article
						v-for="entity of popover.entities"
						:key="entity.properties._id"
						class="grid gap-0.5 font-body text-xs"
					>
						<strong class="block font-medium">{{ entity.properties.title }}</strong>
						<NavLink
							class="underline hover:no-underline"
							:href="{ path: `/entities/${entity.properties._id}` }"
						>
							{{ t("DataMapView.go-to-details-page") }}
						</NavLink>
					</article>
				</GeoMapPopup>
			</GeoMap>

			<Centered v-if="isLoading" class="mix-blend-difference">
				<LoadingIndicator size="lg" />
			</Centered>
		</VisualisationContainer>
	</div>
</template>
