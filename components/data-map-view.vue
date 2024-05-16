<script lang="ts" setup>
import { keyByToMap } from "@acdh-oeaw/lib";
import * as turf from "@turf/turf";
import type { MapGeoJSONFeature } from "maplibre-gl";
import { z } from "zod";

import type { SearchFormData } from "@/components/search-form.vue";
import type { EntityFeature } from "@/composables/use-create-entity";
import { categories } from "@/composables/use-get-search-results";
import type { GeoJsonFeature } from "@/utils/create-geojson-feature";

const router = useRouter();
const route = useRoute();
const t = useTranslations();

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
			show: ["geometry", "when"],
			system_classes: ["place"],
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

/**
 * Reduce size of geojson payload, which has an impact on performance,
 * because `maplibre-gl` will serialize geojson features when sending them to the webworker.
 */
const features = computed(() => {
	return entities.value.map((entity) => {
		return createGeoJsonFeature(entity);
	});
});

const popover = ref<{ coordinates: [number, number]; entities: Array<EntityFeature> } | null>(null);

function onLayerClick(features: Array<MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">>) {
	const entitiesMap = new Map<string, EntityFeature>();

	features.forEach((feature) => {
		const entity = entitiesById.value.get(feature.properties._id);
		if (entity != null) {
			entitiesMap.set(feature.properties._id, entity);
		}
	});

	const entities = Array.from(entitiesMap.values());

	const point = turf.center(createFeatureCollection(entities));
	const coordinates = point.geometry.coordinates;

	popover.value = { coordinates, entities };
}

watch(data, () => {
	/**
	 * Close popover when search results change, to avoid displaying popup for features which are
	 * no longer in the search results set.
	 */
	popover.value = null;
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
			class="border"
			:class="{ 'opacity-50 grayscale': isLoading }"
		>
			<GeoMap
				v-if="height && width"
				:features="features"
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
						class="grid gap-1 font-body text-xs"
					>
						<strong class="font-medium">
							<NavLink
								class="flex items-center gap-1 underline decoration-dotted hover:no-underline"
								:href="{ path: `/entities/${entity.properties._id}` }"
							>
								<Component :is="getEntityIcon(entity.systemClass)" class="size-3.5 shrink-0" />
								{{ entity.properties.title }}
							</NavLink>
						</strong>
						<dl
							v-if="entity.when?.timespans != null && entity.when.timespans.length > 0"
							class="grid grid-cols-[auto_auto] justify-start gap-x-6 gap-y-1 pl-[18px] text-2xs text-neutral-600"
						>
							<template v-for="(timespan, index) of entity.when.timespans" :key="index">
								<template v-if="timespan.start?.earliest != null || timespan.start?.latest != null">
									<div class="grid gap-0.5">
										<dt class="font-medium uppercase">{{ t("DataMapView.start-date") }}</dt>
										<dd>{{ createDateSpan(timespan.start) }}</dd>
									</div>
								</template>
								<template v-if="timespan.end?.earliest != null || timespan.end?.latest != null">
									<div class="grid gap-0.5">
										<dt class="font-medium uppercase">{{ t("DataMapView.end-date") }}</dt>
										<dd>{{ createDateSpan(timespan.end) }}</dd>
									</div>
								</template>
							</template>
						</dl>
					</article>
				</GeoMapPopup>
			</GeoMap>

			<Centered v-if="isLoading" class="pointer-events-none">
				<LoadingIndicator class="text-neutral-950" size="lg" />
			</Centered>
		</VisualisationContainer>
	</div>
</template>
