<script lang="ts" setup>
import { assert, keyByToMap } from "@acdh-oeaw/lib";
import * as turf from "@turf/turf";
import type { Feature } from "geojson";
import * as LucideIcons from "lucide-static";
import { FilterIcon } from "lucide-vue-next";
import type { MapGeoJSONFeature } from "maplibre-gl";
import * as v from "valibot";

import type { SearchFormData } from "@/components/search-form.vue";
import type { EntityFeature } from "@/composables/use-create-entity";
import { categories, operatorMap } from "@/composables/use-get-search-results";
import type { CustomIconEntry } from "@/types/api";
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
	selection: v.fallback(v.string(), ""),
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
		selection: getUnprefixedId(values["@id"]),
	};
	setEntitySelection(temp);
}

function setSearchFilters(query: Partial<SearchFilters>) {
	void router.push({ query: { mode: route.query.mode, ...query } });
}

function onChangeSearchFilters(values: SearchFormData) {
	setSearchFilters(values);
}

onMounted(() => {
	setMovementId({ id: selection.value as unknown as string });
	visibleIcons.value = Object.keys(customIconEntries.value);
});

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
			show: ["geometry", "when", "relations", "types"],
			centroid: true,
			relation_type: ["P26", "P27"],
			system_classes: project.map.mapDisplayedSystemClasses,
			view_classes: ["event"],
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
let showMovements = ref(false);

const movementId = ref<number | null>(null);

function togglePolygons() {
	show.value = !show.value;
}

function toggleMovements() {
	showMovements.value = !showMovements.value;
}

const selection = computed(() => {
	return route.query.selection;
});

const detailOnMap = computed(() => {
	return route.query.showOnMap;
});

const mode = computed(() => {
	return route.query.mode;
});
/**
 * Reduce size of geojson payload, which has an impact on performance,
 * because `maplibre-gl` will serialize geojson features when sending them to the webworker.
 */
const features = computed(() => {
	const mappedFeatures = entities.value
		.filter((entity) => {
			if (!entity.geometry) return false;

			return entity.geometry;
		})
		.map((entity) => {
			const feature = createGeoJsonFeature(entity);

			const customConfig = Object.entries(project.map.customIconConfig).findLast((entry) => {
				return entity.types?.find((type) => {
					return getUnprefixedId(type.identifier ?? "") === String(entry[1].entityType);
				});
			});
			if (customConfig != null) {
				feature.properties.color = customConfig[1].color;
				feature.properties.size = 10;
				feature.properties.isIcon = true;
				feature.properties.isDisplayed = true;
			}
			return feature;
		});

	mappedFeatures.forEach((feature, index, self) => {
		let foundIcon;

		// For GeometryCollections such as areas
		if (feature.geometry.type === "GeometryCollection") {
			feature.geometry.geometries.forEach((geo) => {
				if (geo.type === "Polygon" && "shapeType" in geo)
					feature.properties.shapeType = geo.shapeType;
				if (geo.type !== "Point") return;
				const coords = geo.coordinates.join(",");
				const matchingCoordinatesFeatures = self.filter((f) => {
					if (f.geometry.type !== "Point") return false;
					return f.geometry.coordinates.join(",") === coords;
				});
				if (
					matchingCoordinatesFeatures.some((f) => {
						return f.properties.isIcon;
					})
				)
					foundIcon = true;
			});
		}

		// For single points
		if (feature.geometry.type === "Point") {
			const coords = feature.geometry.coordinates.join(",");
			const matchingCoordinatesFeatures = self.filter((f) => {
				if (f.geometry.type !== "Point") return false;
				return f.geometry.coordinates.join(",") === coords;
			});
			foundIcon = matchingCoordinatesFeatures.some((f) => {
				return f.properties.isIcon;
			});
		}

		if (foundIcon) {
			feature.properties.isDisplayed = false;
		} else {
			feature.properties.isDisplayed = true;
		}
	});

	//find other features with the same polygons to prevent overlapping
	mappedFeatures.forEach((feature, featureIdx) => {
		if (feature.geometry.type === "GeometryCollection") {
			const foundIdx = mappedFeatures.findIndex((f) => {
				//if (f.properties._id == feature.properties._id) return false;
				if (f.geometry.type === "GeometryCollection") {
					return f.geometry.geometries.some((geo) => {
						assert(feature.geometry.type === "GeometryCollection");
						return (
							geo.type === "Polygon" &&
							feature.geometry.geometries.find((g) => {
								return (
									g.type === "Polygon" && g.coordinates.join(",") === geo.coordinates.join(",")
								);
							})
						);
					});
				}
				return false;
			});
			if (foundIdx !== featureIdx) {
				feature.properties.isDisplayed = false;
			} else feature.properties.isDisplayed = true;
		}
	});

	return mappedFeatures;
});

const movements = computed(() => {
	const move = entities.value
		.filter((move) => {
			return move.systemClass === "move";
		})
		.filter((feature) => {
			return feature.geometry && "geometries" in feature.geometry;
		})
		.map((feature) => {
			assert(feature.geometry, "Feature has no geometry");
			assert("geometries" in feature.geometry, "Feature has no geometries");
			const filteredGeometries = feature.geometry.geometries.filter((geo) => {
				return (
					geo.type === "Point" &&
					geo.shapeType === "centerpoint" &&
					!geo.title?.includes("(autogenerated)")
				);
			});

			const from = feature.relations.find((rel) => {
				return rel.relationType?.startsWith("crm:P27");
			});

			const to = feature.relations.find((rel) => {
				return rel.relationType?.startsWith("crm:P26");
			});

			const fromGeometry = filteredGeometries.find((geo) => {
				return geo.locationId && from?.relationTo?.endsWith(geo.locationId);
			});

			const toGeometry = filteredGeometries.find((geo) => {
				return geo.locationId && to?.relationTo?.endsWith(geo.locationId);
			});

			let featureClone = {
				...feature,
				geometry: {
					...feature.geometry,
					geometries: [fromGeometry, toGeometry].filter((move) => {
						return move != null;
					}),
				},
			};

			return featureClone;
		})
		.filter((move) => {
			return move.geometry.geometries.length === 2;
		});

	move.forEach((move) => {
		assert(move.geometry.geometries);
	});

	return move.map((entity) => {
		let feature = createGeoJsonFeature(entity);

		const customConfig = Object.entries(project.map.customMovementConfig.colorConfig).findLast(
			(entry) => {
				return entity.types?.find((type) => {
					return getUnprefixedId(type.identifier ?? "") === String(entry[1].entityType);
				});
			},
		);
		if (customConfig != null) {
			feature.properties.color = customConfig[1].color;
		}
		return feature;
	});
});

const events = computed(() => {
	const event = entities.value
		.filter((event) => {
			return event.viewClass === "event";
		})
		.filter((feature) => {
			return feature.geometry && "geometries" in feature.geometry;
		})
		.filter((feature) => {
			return !feature.types?.find((type) => {
				return project.map.customIconConfig.find((config) => {
					return String(config.entityType) === getUnprefixedId(type.identifier ?? "");
				});
			});
		})
		.map((feature) => {
			assert(feature.geometry, "Feature has no geometry");
			assert("geometries" in feature.geometry, "Feature has no geometries");
			let featureClone = {
				...feature,
				geometry: {
					...feature.geometry,
					geometries: feature.geometry.geometries.filter((geo) => {
						return (
							geo.type === "Point" &&
							geo.shapeType === "centerpoint" &&
							!geo.title?.includes("(autogenerated)")
						);
					}),
				},
			};
			return featureClone;
		});

	const mappedEvents = event.map((entity) => {
		let feature = createGeoJsonFeature(entity);
		const customConfig = Object.entries(project.map.customMovementConfig.colorConfig).findLast(
			(entry) => {
				return entity.types?.find((type) => {
					return getUnprefixedId(type.identifier ?? "") === String(entry[1].entityType);
				});
			},
		);
		if (customConfig != null) {
			feature.properties.color = customConfig[1].color;
		}
		return feature;
	});
	mappedEvents.forEach((feature) => {
		if (feature.geometry.type !== "GeometryCollection") {
			return;
		}
		const eventPoint = feature.geometry.geometries[0];
		if (!eventPoint || eventPoint.type !== "Point") return;
		const coords = eventPoint.coordinates.join(",");

		const matchingCoordinatesFeatures = features.value.filter((f) => {
			if (f.geometry.type !== "Point") return false;
			return f.geometry.coordinates.join(",") === coords;
		});

		const foundIcon = matchingCoordinatesFeatures.some((f) => {
			return f.properties.isIcon;
		});

		if (foundIcon) {
			feature.properties.isDisplayed = false;
		} else {
			feature.properties.isDisplayed = true;
		}

		const matchingCoordinatesEvents = mappedEvents.filter((e) => {
			if (e.geometry.type !== "GeometryCollection" || e.properties._id === feature.properties._id)
				return false;
			return e.geometry.geometries.find((g) => {
				return (
					g.type === "Point" &&
					"geometries" in feature.geometry &&
					feature.geometry.geometries.find((geo) => {
						if ("coordinates" in geo) return g.coordinates.join(",") === geo.coordinates.join(",");
						return false;
					})
				);
			});
		});

		feature.properties.otherFeatures = matchingCoordinatesEvents.map((f) => {
			return f.properties._id;
		});
	});
	return mappedEvents.toSorted((a, b) => {
		return Number(Boolean(b.properties.color)) - Number(Boolean(a.properties.color));
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

interface onLayerClickParams {
	features: Array<MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">>;
	targetCoordinates?: Array<[number, number]> | [number, number];
}

function onLayerClick({ features, targetCoordinates }: onLayerClickParams) {
	console.log("Layer click", features);
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

	if (targetCoordinates != null) {
		if (typeof targetCoordinates[0] === "number" && typeof targetCoordinates[1] === "number") {
			coordinates = targetCoordinates as [number, number];
		} else {
			coordinates = turf.center(turf.points(targetCoordinates as Array<[number, number]>)).geometry
				.coordinates as [number, number];
		}
	} else {
		for (const entity of entities) {
			if (entity.geometry?.type === "GeometryCollection") {
				coordinates = entity.geometry.geometries.find((g) => {
					return g.type === "Point";
				})?.coordinates as [number, number] | undefined;

				if (coordinates != null) break;
			}
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

const selectionCoordinates = ref<[number, number] | undefined>(undefined);
const detailSelectionCoordinates = ref<[number, number] | undefined>(undefined);
const selectionBounds = ref<Array<[number, number]> | undefined>(undefined);

function setCoordinates(entity: EntityFeature, coordinates: Ref<[number, number] | undefined>) {
	if (entity.geometry?.type === "GeometryCollection") {
		if (entity.systemClass === "move") {
			const selectedMove = movements.value.find((move) => {
				return move.properties._id === entity.properties._id;
			});
			if (selectedMove?.geometry && "geometries" in selectedMove.geometry) {
				selectionBounds.value = selectedMove.geometry.geometries.map((geo) => {
					assert("coordinates" in geo);
					return geo.coordinates as [number, number];
				});
				assert(selectionBounds.value);

				const points = turf.points(selectionBounds.value);
				coordinates.value = turf.center(points).geometry.coordinates as [number, number];

				return;
			}
		}
		coordinates.value = entity.geometry.geometries.find((g) => {
			return g.type === "Point";
		})?.coordinates as [number, number] | undefined;
		selectionBounds.value = undefined;
	}

	if (entity.geometry?.type === "Point") {
		coordinates.value = entity.geometry.coordinates as unknown as [number, number];
		selectionBounds.value = undefined;
	}
}

watchEffect(() => {
	if (mode.value && selection.value) {
		// console.log("mode & selection set", selection.value);
		const entity = entities.value.find((feature) => {
			const id = getUnprefixedId(feature["@id"]);
			return id === selection.value;
		});
		// console.log("Entity: ", entity, entities.value);

		if (entity) {
			setCoordinates(entity, selectionCoordinates);

			if (entity.geometry != null) {
				popover.value = {
					coordinates:
						selectionCoordinates.value ??
						(turf.center(createFeatureCollection([entity as Feature])).geometry.coordinates as [
							number,
							number,
						]),
					entities: [entity],
				};
			}

			// console.log(detailOnMap.value);
			detailSelectionCoordinates.value = undefined;
			if (detailOnMap.value) {
				const detailEntity = entities.value.find((feature) => {
					const id = getUnprefixedId(feature["@id"]);
					return id === detailOnMap.value;
				});

				// should there be two popups? --> make popups array / more rendered components??
				if (detailEntity) {
					setCoordinates(detailEntity, detailSelectionCoordinates);
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					if (detailSelectionCoordinates.value === undefined) return;

					// console.log(
					// 	"Detail Coordinates: ",
					// 	detailSelectionCoordinates,
					// 	popover.value,
					// 	detailEntity,
					// );
					popover.value = {
						coordinates: detailSelectionCoordinates.value,
						entities: [detailEntity],
					};
				}
			}
		}
	}
});

watch(
	() => {
		return selection.value;
	},
	() => {
		setMovementId({ id: selection.value as unknown as string });
	},
);

const movementDetails = computed(() => {
	if (multipleMovements.data.value) {
		return multipleMovements.data.value;
	} else return null;
});

const linkedMovements = computed(() => {
	if (movementId.value == null || movementDetails.value?.id == null) {
		return null;
	}

	let currentMovement = movementDetails.value;
	let features = [currentMovement];

	while (currentMovement.children && currentMovement.children.length > 0) {
		assert(currentMovement.children[0]);
		features = features.concat(currentMovement.children);
		currentMovement = currentMovement.children[0];
	}

	// Now map through the features to get the IDs
	return features.map((movement) => {
		return {
			id: String(movement.id),
			systemClass: movement.system_class ?? "",
		};
	});
});

const multipleMovements = useGetChainedEvents(
	computed(() => {
		return { entityId: movementId.value };
	}),
);

function setMovementId({ id }: { id: string | null }) {
	return (movementId.value = id ? parseInt(id) : null);
}

const customIconEntries = computed(() => {
	const entries: Record<string, CustomIconEntry> = {};
	entities.value.forEach((entity) => {
		const foundType = entity.types?.findLast((type) => {
			return project.map.customIconConfig.find((config) => {
				return String(config.entityType) === getUnprefixedId(type.identifier ?? "");
			});
		});
		const unprefixedType = getUnprefixedId(foundType?.identifier ?? "");
		if (foundType) {
			if (!(unprefixedType in entries)) {
				const configEntry = project.map.customIconConfig.find((config) => {
					return String(config.entityType) === unprefixedType;
				});
				const customEntry: CustomIconEntry = {
					type: foundType,
					icon: configEntry?.iconName,
					color: configEntry?.color,
					entities: [],
				};
				entries[unprefixedType] = customEntry;
			}
			if (entity.geometry) {
				const feature = createGeoJsonFeature(entity);
				const customConfig = Object.entries(project.map.customIconConfig).findLast((entry) => {
					return entity.types?.find((type) => {
						return getUnprefixedId(type.identifier ?? "") === String(entry[1].entityType);
					});
				});
				if (customConfig != null) {
					feature.properties.color = customConfig[1].color;
					feature.properties.size = 10;
					feature.properties.isIcon = true;
				}

				entries[unprefixedType]?.entities.push(feature);
			}
		}
	});
	console.log("custom entries: ", entries);
	console.log("LucideIcons: ", LucideIcons);
	return entries;
});

const visibleIcons = ref<Array<string>>([]);
function toggleIcon(key: string) {
	if (visibleIcons.value.includes(key))
		visibleIcons.value = visibleIcons.value.filter((i) => {
			return i !== key;
		});
	else {
		visibleIcons.value.push(key);
	}
}

const filteredCustomIconEntries = computed(() => {
	return Object.fromEntries(
		Object.entries(customIconEntries.value).filter(([key, _]) => {
			return visibleIcons.value.length === 0 || visibleIcons.value.includes(key);
		}),
	);
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
						? 'bg-white/90 dark:bg-neutral-900 max-w-[min(800px,49%)] min-w-fit w-full mt-2 rounded-md p-6 shadow-md pointer-events-auto'
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
					<div
						class="grid grid-cols-[auto_auto_auto_auto_1fr_auto] items-center gap-3 align-middle"
					>
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
						<div class="grid grid-cols-[auto_1fr] gap-1">
							<span
								class="m-1.5 size-2 rounded-full"
								:style="`background-color: ${project.colors.geojsonMovement}`"
							></span>
							{{ $t("DataMapView.movement") }} ({{ movements.length }})
						</div>
						<div>
							<Toggle variant="iiif" @click="togglePolygons">
								{{ $t("DataMapView.polygon") }}
							</Toggle>
						</div>
						<div>
							<Toggle variant="iiif" @click="toggleMovements">
								{{ $t("DataMapView.showMovement") }}
							</Toggle>
						</div>
						<div v-if="project.map.customIconConfig && project.map.customIconConfig.length > 0">
							<Popover>
								<PopoverTrigger>
									<TooltipProvider>
										<Tooltip :disabled="Object.keys(customIconEntries).length > 0">
											<TooltipTrigger>
												<Button
													variant="iiif"
													class="group"
													:disabled="Object.keys(customIconEntries).length === 0"
													><FilterIcon :size="16"></FilterIcon> {{ $t("DataMapView.filter") }}
													<Badge v-if="visibleIcons.length" variant="groupOutline">{{
														visibleIcons.length
													}}</Badge></Button
												>
											</TooltipTrigger>
											<TooltipContent>{{ $t("DataMapView.no-icons") }}</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</PopoverTrigger>
								<PopoverContent side="top" class="w-auto">
									<div class="">
										<div class="text-xs text-muted-foreground">
											{{ $t("DataMapView.icons") }}
										</div>
										<Toggle
											v-for="[key, entry] in Object.entries(customIconEntries).sort(
												(a, b) => a[1].type?.label?.localeCompare(b[1].type?.label ?? '') ?? 0,
											)"
											:key="entry.type?.identifier"
											:pressed="visibleIcons.includes(key)"
											class="group my-2 flex min-w-0 items-center text-left"
											variant="iiif"
											@click="() => toggleIcon(key)"
										>
											<div
												v-if="entry.icon != null"
												class="mr-2 size-6 scale-[0.7]"
												v-html="LucideIcons[entry.icon as keyof typeof LucideIcons]"
											></div>
											<span
												>{{ entry.type?.label
												}}<Badge variant="groupOutline" class="ml-4">{{
													entry.entities.length
												}}</Badge></span
											>
										</Toggle>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>
			</div>

			<GeoMap
				v-if="height && width"
				:features="features"
				:movements="movements"
				:events="events"
				:custom-icons="filteredCustomIconEntries"
				:height="height"
				:width="width"
				:has-polygons="show"
				:show-movements="showMovements"
				:multiple-movements="linkedMovements"
				:current-selection-coordinates="detailSelectionCoordinates || selectionCoordinates"
				:selection-bounds="selectionBounds"
				:current-selection-id="String(selection)"
				@layer-click="onLayerClick"
				@movement-hovered="setMovementId"
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
