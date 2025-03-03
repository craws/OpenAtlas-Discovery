<script lang="ts" setup>
import { keyByToMap } from "@acdh-oeaw/lib";
import * as turf from "@turf/turf";
import type { Feature } from "geojson";
import type { MapGeoJSONFeature } from "maplibre-gl";
import * as v from "valibot";

import type { SearchFormData } from "@/components/search-form.vue";
import type { EntityFeature } from "@/composables/use-create-entity";
import { categories, operatorMap } from "@/composables/use-get-search-results";
import type { GeoJsonFeature } from "@/utils/create-geojson-feature";

import { project } from "../config/project.config";

const router = useRouter();
const route = useRoute();
const t = useTranslations();

const { getUnprefixedId } = useIdPrefix();

const searchFiltersSchema = v.object({
	category: v.fallback(v.picklist(categories), "entityName"),
	search: v.fallback(v.string(), ""),
});

const entitySelectionSchema = v.object({
	selection: v.fallback(v.array(v.string()), []),
});

const searchFilters = computed(() => {
	return v.parse(searchFiltersSchema, route.query);
});

type EntitySelection = v.InferOutput<typeof entitySelectionSchema>;

type SearchFilters = v.InferOutput<typeof searchFiltersSchema>;

function setEntitySelection(query: Partial<EntitySelection>) {
	void router.push({ query: { mode: route.query.mode, ...query } });
}

function onChangeEntitySelection(values: EntityFeature) {
	const temp: EntitySelection = {
		selection: [getUnprefixedId(values["@id"])],
	};
	setEntitySelection(temp);
}

function setSearchFilters(query: Partial<SearchFilters>) {
	void router.push({ query: { mode: route.query.mode, ...query } });
}

function onChangeSearchFilters(values: SearchFormData) {
	setSearchFilters(values);
}

const { data, isPending, isPlaceholderData } = useGetSearchResults(
	// @ts-expect-error Includes custom, per-instance system classes.
	computed(() => {
		const { search, category, ...params } = searchFilters.value;

		const operator = operatorMap[category];

		return {
			...params,
			search:
				search.length > 0
					? [{ [category]: [{ operator: operator, values: [search], logicalOperator: "and" }] }]
					: [],
			show: ["geometry", "when"],
			centroid: true,
			system_classes: project.map.mapDisplayedSystemClasses,
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

let show = ref(false);

function togglePolygons() {
	show.value = !show.value;
}

const selection = computed(() => {
	return route.query.selection;
});

const mode = computed(() => {
	return route.query.mode;
});
/**
 * Reduce size of geojson payload, which has an impact on performance,
 * because `maplibre-gl` will serialize geojson features when sending them to the webworker.
 */
const features = computed(() => {
	return entities.value
		.filter((entity) => {
			return entity.geometry;
		})
		.map((entity) => {
			return createGeoJsonFeature(entity);
		});
});

const centerpoints = computed(() => {
	return features.value.filter((centerpoint) => {
		return centerpoint.geometry.type === "GeometryCollection";
	});
});

const points = computed(() => {
	return features.value.filter((point) => {
		return point.geometry.type === "Point";
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

	const entities = Array.from(entitiesMap.values()).filter((e) => {
		return e.geometry != null;
	});

	let coordinates = null;

	for (const entity of entities) {
		if (entity.geometry?.type === "GeometryCollection") {
			coordinates = entity.geometry.geometries.find((g) => {
				return g.type === "Point";
			})?.coordinates as [number, number] | undefined;

			if (coordinates != null) break;
		}
	}

	popover.value = {
		coordinates:
			coordinates ??
			(turf.center(createFeatureCollection(entities as Array<Feature>)).geometry.coordinates as [
				number,
				number,
			]),
		entities,
	};
}

watch(data, () => {
	/**
	 * Close popover when search results change, to avoid displaying popup for features which are
	 * no longer in the search results set.
	 */
	popover.value = null;
});

watchEffect(() => {
	if (mode.value && selection.value) {
		const entity = entities.value.find((feature) => {
			const id = getUnprefixedId(feature["@id"]);
			return id === selection.value;
		});

		if (entity) {
			let coordinates = null;

			if (entity.geometry?.type === "GeometryCollection") {
				coordinates = entity.geometry.geometries.find((g) => {
					return g.type === "Point";
				})?.coordinates as [number, number] | undefined;
			}

			if (entity.geometry?.type === "Point") {
				coordinates = entity.geometry.coordinates as unknown as [number, number];
			}

			popover.value = {
				coordinates:
					coordinates ??
					(turf.center(createFeatureCollection([entity as Feature])).geometry.coordinates as [
						number,
						number,
					]),
				entities: [entity],
			};
		}
	}
});
</script>

<template>
	<div :class="project.fullscreen ? 'relative grid' : 'relative grid grid-rows-[auto_1fr] gap-4'">
		<div
			:class="
				project.fullscreen ? 'absolute z-10 flex w-full justify-center pointer-events-none' : ''
			"
		>
			<SearchForm
				:class="
					project.fullscreen
						? 'bg-white/90 dark:bg-neutral-900 max-w-[800px] w-full mt-2 rounded-md p-6 shadow-md pointer-events-auto'
						: ''
				"
				:category="searchFilters.category"
				:search="searchFilters.search"
				@submit="onChangeSearchFilters"
			/>
		</div>

		<VisualisationContainer
			v-slot="{ height, width }"
			class="border"
			:class="{ 'opacity-50 grayscale': isLoading }"
		>
			<div class="absolute bottom-0 z-10 mb-2 flex w-full justify-center">
				<div
					class="max-h-72 gap-2 overflow-y-auto overflow-x-hidden rounded-md border-2 border-transparent bg-white/90 p-2 text-sm font-medium shadow-md dark:bg-neutral-900"
				>
					<div class="grid grid-cols-[auto_auto_1fr] items-center gap-3 align-middle">
						<div class="grid grid-cols-[auto_1fr] gap-1">
							<span
								class="m-1.5 size-2 rounded-full"
								:style="`background-color: ${project.colors.geojsonPoints}`"
							></span>
							{{ $t("DataMapView.point") }} ({{ points.length }})
						</div>
						<div class="grid grid-cols-[auto_1fr] gap-1">
							<span
								class="m-1.5 size-2 rounded-full"
								:style="`background-color: ${project.colors.geojsonAreaCenterPoints}`"
							></span>
							{{ $t("DataMapView.centerpoint") }} ({{ centerpoints.length }})
						</div>
						<div>
							<Toggle variant="iiif" @click="togglePolygons">
								{{ $t("DataMapView.polygon") }}
							</Toggle>
						</div>
					</div>
				</div>
			</div>

			<GeoMap
				v-if="height && width"
				:features="features"
				:height="height"
				:width="width"
				:has-polygons="show"
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
								href="#"
								class="flex cursor-pointer items-center gap-1 underline decoration-dotted hover:no-underline"
								@click="onChangeEntitySelection(entity)"
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
