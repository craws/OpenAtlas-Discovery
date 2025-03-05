<script lang="ts" setup>
import "maplibre-gl/dist/maplibre-gl.css";

import { assert } from "@acdh-oeaw/lib";
import type * as deck from "@deck.gl/core";
import { ArcLayer } from "@deck.gl/layers";
import * as mapbox from "@deck.gl/mapbox";
import * as turf from "@turf/turf";
import type { Point } from "geojson";
import {
	FullscreenControl,
	type GeoJSONSource,
	LngLatBounds,
	type LngLatLike,
	Map as GeoMap,
	type MapGeoJSONFeature,
	NavigationControl,
	ScaleControl,
} from "maplibre-gl";
import { animate } from "popmotion";

import { type GeoMapContext, geoMapContextKey } from "@/components/geo-map.context";
import { initialViewState } from "@/config/geo-map.config";
import { project } from "@/config/project.config";
import type { components } from "@/lib/api-client/api";
import type { GeoJsonFeature } from "@/utils/create-geojson-feature";

const vsDeclaration = `
	in float instanceCoefficient;
	in float instanceOpacity;
`;
const vsMainEnd = `
        vec4 tempColor = instanceTargetColors;
        vec4 colorA = vec4(tempColor.rgb, instanceOpacity);
    		vec4 colorB = vec4(tempColor.rgb, 0.2);
    		float pct = step(instanceCoefficient, segmentRatio);
    		vColor = mix(colorA, colorB, pct);
                    `;

class CustomArcLayer extends ArcLayer {
	override initializeState(): void {
		super.initializeState();

		this.getAttributeManager()?.addInstanced({
			instanceCoefficient: { size: 1, accessor: "getCoefficient" },
			instanceOpacity: { size: 1, accessor: "getOpacity" },
		});
	}
	override getShaders() {
		const shaders = super.getShaders();
		shaders.inject = {
			"vs:#decl": vsDeclaration,
			"vs:#main-end": vsMainEnd,
		};
		return shaders;
	}
}
CustomArcLayer.layerName = "CustomArcLayer";
CustomArcLayer.defaultProps = {
	// @ts-expect-error - "getCoefficient" does not exist in superclass ArcLayer
	getCoefficient: {
		type: "accessor",
		value: 0.5,
	},
	getOpacity: {
		type: "accessor",
		value: 0.5,
	},
};
interface CurvedMovementLine {
	id: Array<string> | string;
	coordinates: [deck.Position, deck.Position];
	color: deck.Color;
}

interface MultipleMovementType {
	id: string;
	systemClass: string;
}

const overlay = ref<mapbox.MapboxOverlay | null>(null);
const supportOverlay = ref<mapbox.MapboxOverlay | null>(null);
const props = defineProps<{
	features: Array<GeoJsonFeature>;
	movements: Array<GeoJsonFeature>;
	events: Array<GeoJsonFeature>;
	height: number;
	width: number;
	hasPolygons?: boolean;
	showMovements: boolean;
	multipleMovements: Array<MultipleMovementType> | null;
	currentSelectionCoordinates?: [number, number];
	selectionBounds?: Array<[number, number]>;
	currentSelectionId?: string;
}>();

const emit = defineEmits<{
	(
		event: "layer-click",
		args: {
			features: Array<MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">>;
			targetCoordinates?: Array<[number, number]> | [number, number];
		},
	): void;
}>();

const env = useRuntimeConfig();
const theme = useColorMode();

const hoveredMovementId = ref<Array<string> | null>(null);
const curvedMovements = ref<Array<CurvedMovementLine> | null>(null);

const updatedCurvedMovements = computed(() => {
	return applyTiltToMatchingArcs(curvedMovements.value ?? []);
});
const multipleMovementArcs = computed(() => {
	return updatedCurvedMovements.value.filter((arc) => {
		return (arc.id as Array<string>).some((id) => {
			return props.multipleMovements?.find((move) => {
				return move.id === id;
			});
		});
	});
});

const coefficient = ref(0);
const stepWithinMultipleMovements = ref(0);
const colors = {
	points: project.colors.geojsonPoints,
	areaCenterPoints: project.colors.geojsonAreaCenterPoints,
	movement: project.colors.geojsonMovement,
};

const mapStyle = computed(() => {
	return theme.value === "dark" ? env.public.mapBaselayerUrlDark : env.public.mapBaselayerUrlLight;
});

const elementRef = ref<HTMLElement | null>(null);

const context: GeoMapContext = {
	map: null,
};

onMounted(create);
onScopeDispose(dispose);

async function create() {
	await nextTick();
	assert(elementRef.value != null);

	const map = new GeoMap({
		center: [initialViewState.longitude, initialViewState.latitude],
		container: elementRef.value,
		maxZoom: 24,
		minZoom: 1,
		pitch: initialViewState.pitch,
		style: mapStyle.value,
		zoom: initialViewState.zoom,
		maxPitch: 85,
		antialias: true,
	});

	context.map = map;

	map.on("load", init);
	console.log("created", props);
}

function init() {
	assert(context.map != null);
	const map = context.map;

	//

	const nav = new NavigationControl({});
	map.addControl(nav, "top-left");

	//

	const fullscreen = new FullscreenControl({});
	map.addControl(fullscreen, "top-right");

	//

	const scale = new ScaleControl({});
	map.addControl(scale, "bottom-left");

	//

	const sourcePointsId = "points-data";
	const sourcePolygonsId = "polygon-data";
	const sourceCenterPointsId = "centerpoints-data";
	const sourceEventPointsId = "event-points-data";
	map.addSource(sourcePointsId, { type: "geojson", data: createFeatureCollection([]) });
	map.addSource(sourcePolygonsId, { type: "geojson", data: createFeatureCollection([]) });
	map.addSource(sourceCenterPointsId, { type: "geojson", data: createFeatureCollection([]) });
	map.addSource(sourceEventPointsId, { type: "geojson", data: createFeatureCollection([]) });

	//

	map.addLayer({
		id: "points",
		type: "circle",
		source: sourcePointsId,
		filter: ["==", "$type", "Point"],
		paint: {
			"circle-color": colors.points,
			"circle-radius": 6,
		},
	});

	//

	map.addLayer({
		id: "centerpoints",
		type: "circle",
		source: sourceCenterPointsId,
		filter: ["==", "$type", "Point"],
		paint: {
			"circle-color": colors.areaCenterPoints,
			"circle-radius": 6,
		},
	});

	//

	map.addLayer({
		id: "events",
		type: "circle",
		source: sourceEventPointsId,
		filter: ["==", "$type", "Point"],
		paint: {
			"circle-color": hoveredMovementId.value
				? ["match", ["get", "id"], hoveredMovementId.value, colors.movement, "#808080"]
				: colors.movement,
			"circle-radius": 6,
		},
	});

	//

	map.on("click", "points", (event) => {
		emit("layer-click", {
			features: (event.features ?? []) as Array<
				MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">
			>,
		});
	});

	map.on("click", "centerpoints", (event) => {
		emit("layer-click", {
			features: (event.features ?? []) as Array<
				MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">
			>,
		});
	});

	//

	map.on("mouseenter", "points", () => {
		map.getCanvas().classList.add("!cursor-pointer");
	});

	map.on("mouseenter", "centerpoints", () => {
		map.getCanvas().classList.add("!cursor-pointer");
	});

	//

	map.on("mouseleave", "points", () => {
		map.getCanvas().classList.remove("!cursor-pointer");
	});

	map.on("mouseleave", "centerpoints", () => {
		map.getCanvas().classList.remove("!cursor-pointer");
	});

	map.on("mouseleave", "polygons", () => {
		map.getCanvas().classList.remove("!cursor-pointer");
	});

	//

	updateScope();
	updatePolygons();
}

function dispose() {
	context.map?.remove();
}

watch(
	() => {
		return props.currentSelectionCoordinates;
	},
	() => {
		console.log("selection changed: ", props.currentSelectionCoordinates, props.selectionBounds);
		if (!props.selectionBounds && props.currentSelectionCoordinates)
			flyToSelection(props.currentSelectionCoordinates);
	},

	{ immediate: true },
);
watch(
	() => {
		return props.selectionBounds;
	},
	() => {
		zoomToSelection(props.selectionBounds);
	},

	{ immediate: true },
);

// watch(
// 	() => {
// 		return props.currentSelectionId;
// 	},
// 	() => {
// 		if (props.currentSelectionId == null || multipleMovementArcs.value.length === 0) return;
// 		const indexWithinArcs = multipleMovementArcs.value.findIndex((arc) => {
// 			return arc.id.includes(props.currentSelectionId ?? "");
// 		});
// 		if (indexWithinArcs > -1) stepWithinMultipleMovements.value = indexWithinArcs;
// 	},
// );

watch(() => {
	return props.features;
}, updateScope);

watch(() => {
	return props.hasPolygons;
}, updatePolygons);

watch(() => {
	return props.showMovements;
}, updateMovements);

watch(
	() => {
		return props.multipleMovements;
	},
	(newVal, oldVal) => {
		if (newVal !== oldVal) {
			renderArcs();
			if (context.map?.getLayer("events") != null) {
				colorEvents(
					(hoveredMovementId.value ?? []).concat(
						props.multipleMovements?.map((move) => {
							return move.id;
						}) ?? [],
					),
				);
			}

			if (context.map?.getLayer("highlightedEvents") != null) {
				context.map.removeLayer("highlightedEvents");
				context.map.removeSource("highlightedEvents");
			}

			if (props.multipleMovements != null) {
				const source = props.events.filter((ev) => {
					return props.multipleMovements?.find((move) => {
						return move.id === ev.properties._id;
					});
				});

				context.map?.addLayer({
					id: "highlightedEvents",
					type: "circle",
					source: { type: "geojson", data: createFeatureCollection(source) },
					paint: {
						"circle-color": colors.movement,
						"circle-radius": 6,
					},
				});
			}
		}
	},
	{ immediate: true },
);

watch(
	() => {
		return hoveredMovementId.value;
	},
	(newId) => {
		renderArcs();
		if (context.map != null) {
			context.map.getCanvas().classList.toggle("!cursor-pointer", newId != null);
			colorEvents(
				(hoveredMovementId.value ?? []).concat(
					props.multipleMovements?.map((move) => {
						return move.id;
					}) ?? [],
				),
			);
		}
	},
	{ immediate: true },
);

function updateScope() {
	assert(context.map != null);

	const map = context.map;

	const sourcePointsId = "points-data";
	const sourcePolygonsId = "polygon-data";
	const sourceCenterPointsId = "centerpoints-data";
	const sourceEventPointsId = "event-points-data";
	const sourcePoints = map.getSource(sourcePointsId) as GeoJSONSource | undefined;
	const sourcePolygons = map.getSource(sourcePolygonsId) as GeoJSONSource | undefined;
	const sourceCenterpoints = map.getSource(sourceCenterPointsId) as GeoJSONSource | undefined;
	const sourceEventPoints = map.getSource(sourceEventPointsId) as GeoJSONSource | undefined;

	const points = props.features.filter((point) => {
		return point.geometry.type === "Point";
	});

	const polygons = props.features.filter((polygon) => {
		return polygon.geometry.type === "GeometryCollection" || polygon.geometry.type === "Polygon";
	});

	const centerpoints = props.features.filter((centerpoint) => {
		return centerpoint.geometry.type === "GeometryCollection";
	});

	const events = props.events;

	const geojsonPoints = createFeatureCollection(points);
	const geojsonPolygons = createFeatureCollection(polygons);
	const geojsonCenterPoints = createFeatureCollection(centerpoints);
	const geojsonEventPoints = createFeatureCollection(events);

	sourcePoints?.setData(geojsonPoints);
	sourcePolygons?.setData(geojsonPolygons);
	sourceCenterpoints?.setData(geojsonCenterPoints);
	sourceEventPoints?.setData(geojsonEventPoints);

	if (geojsonPoints.features.length > 0) {
		const bounds = turf.bbox(geojsonPoints) as [number, number, number, number];
		map.fitBounds(bounds, { padding: 50, maxZoom: 16 });
	} else if (geojsonCenterPoints.features.length > 0) {
		const bounds = turf.bbox(geojsonCenterPoints) as [number, number, number, number];
		map.fitBounds(bounds, { padding: 50 });
	}
}

function updatePolygons() {
	assert(context.map != null);
	const sourcePolygonsId = "polygon-data";

	if (props.hasPolygons) {
		context.map.addLayer({
			id: "polygons",
			type: "fill",
			source: sourcePolygonsId,
			paint: {
				"fill-color": colors.areaCenterPoints,
				"fill-opacity": 0.35,
			},
		});
	}
	if (!props.hasPolygons && context.map.getLayer("polygons")) {
		context.map.removeLayer("polygons");
	}
}

function zoomToSelection(bounds: Array<[number, number]> | undefined) {
	if (bounds) {
		const lngLatBounds = bounds.reduce(
			(reducedBounds, coord) => {
				return reducedBounds.extend(coord);
			},
			new LngLatBounds(bounds[0], bounds[1]),
		);
		const mapWidth = elementRef.value?.clientWidth;
		context.map?.fitBounds(lngLatBounds, {
			padding: 200,
			offset: [(mapWidth ?? 0) / 16, 0],
		});
	}
}
function flyToSelection(selection: [number, number] | undefined) {
	if (selection) {
		context.map?.flyTo({ center: selection, zoom: 10 });
	}
}

function pointsToMapKey(startPoint: Point, endPoint: Point) {
	return `${String(startPoint.coordinates[0])}-${String(startPoint.coordinates[1])}-${String(endPoint.coordinates[0])}-${String(endPoint.coordinates[1])}`;
}

function checkHighlight(d: CurvedMovementLine) {
	if (hoveredMovementId.value === null && props.multipleMovements === null) {
		return d.color as [number, number, number];
	}
	const isMultipleMovement: boolean =
		props.multipleMovements?.some((movement) => {
			return d.id.includes(movement.id);
		}) ?? false;
	const isHovered: boolean = d.id === hoveredMovementId.value;
	if (isHovered || isMultipleMovement) {
		return d.color as [number, number, number];
	} else {
		return [128, 128, 128] as [number, number, number];
	}
}

function colorEvents(movements: Array<string> | null | undefined) {
	assert(context.map);

	context.map.setPaintProperty(
		"events",
		"circle-color", // The paint property
		movements != null && movements.length > 0
			? ["case", ["in", ["get", "_id"], ["literal", movements]], colors.movement, "#808080"]
			: colors.movement, // If no movement is hovered, use the default color for all
	);
}

function getCoef(d: CurvedMovementLine) {
	if (!props.multipleMovements || props.multipleMovements.length === 0) return coefficient.value;
	const currentIdx = multipleMovementArcs.value.findIndex((arc) => {
		return d.id === arc.id;
	});
	if (currentIdx === -1 || currentIdx === stepWithinMultipleMovements.value) {
		if (currentIdx === stepWithinMultipleMovements.value && coefficient.value === 1) return 0;
		return coefficient.value;
	} else {
		return currentIdx < stepWithinMultipleMovements.value ? 1 : 0;
	}
}

function updateMovements() {
	console.log("multipleMovements: ", props.multipleMovements);
	const groupedMovements = new Map<string, Array<CurvedMovementLine>>();
	// Process the GeoJSON movements array to create curved lines

	//curvedMovements.value =
	props.movements.forEach((movement) => {
		if (movement.geometry.type === "GeometryCollection") {
			const geometries = movement.geometry.geometries;
			const points = geometries
				.filter((geometry): geometry is components["schemas"]["Point"] => {
					return geometry.type === "Point";
				})
				.filter((geometry) => {
					return (
						geometry.shapeType === "centerpoint" && !geometry.title?.includes("(autogenerated)")
					);
				});
			if (points.length < 2) {
				return;
			}
			points.slice(1).forEach((point, index) => {
				const startPoint = points[index];
				const endPoint = point;
				if (!startPoint?.coordinates.length || !endPoint.coordinates.length) return;

				if (Array.isArray(startPoint.coordinates) && Array.isArray(endPoint.coordinates)) {
					if (!groupedMovements.has(pointsToMapKey(startPoint, endPoint))) {
						groupedMovements.set(pointsToMapKey(startPoint, endPoint), []);
					}
					groupedMovements.get(pointsToMapKey(startPoint, endPoint))?.push({
						id: movement.properties._id,
						// @ts-expect-error - coordinates are not typed correctly due to a bug in openapi-typescript (https://github.com/openapi-ts/openapi-typescript/issues/2048)
						coordinates: [startPoint.coordinates, endPoint.coordinates],
						color: hexToRgb(colors.movement) ?? [0, 0, 0],
					});
				}
			});
		}
	});
	curvedMovements.value = [...groupedMovements.values()].map((group: Array<CurvedMovementLine>) => {
		assert(group[0], "Every group should have at least one element.");
		return {
			id: group
				.map((g) => {
					return g.id;
				})
				.flat(),

			coordinates: group[0].coordinates,
			color: group[0].color,
		};
	});

	const _currentTimeAnimation = animate({
		from: 0,
		to: 1000,
		duration: 5000,
		repeat: Infinity,
		onUpdate: updateLayers,
		onRepeat: () => {
			stepWithinMultipleMovements.value += 1;
			if (stepWithinMultipleMovements.value >= multipleMovementArcs.value.length) {
				stepWithinMultipleMovements.value = 0;
			}
		},
	});

	assert(context.map != null);

	if (props.showMovements) {
		overlay.value = new mapbox.MapboxOverlay({
			interleaved: true,
		});
		context.map.addControl(overlay.value);

		supportOverlay.value = new mapbox.MapboxOverlay({});
		context.map.addControl(supportOverlay.value);
		renderArcs();
		colorEvents(
			(hoveredMovementId.value ?? []).concat(
				props.multipleMovements?.map((move) => {
					return move.id;
				}) ?? [],
			),
		);
	} else {
		if (overlay.value && supportOverlay.value) {
			overlay.value.finalize();
			supportOverlay.value.finalize();
			context.map.removeControl(overlay.value);
			context.map.removeControl(supportOverlay.value);
		}
	}
}

function isSimilarCoordinates(arc1: CurvedMovementLine, arc2: CurvedMovementLine): boolean {
	const distanceOptions = { units: "kilometers" as turf.Units };

	// Compupute arc length to reduce maxDistance for small arcs and prevent many tilted
	// small arcs in the same area
	const arc1Length = turf.distance(
		arc1.coordinates[0] as turf.Coord,
		arc1.coordinates[1] as turf.Coord,
		distanceOptions,
	);
	const arc2Length = turf.distance(
		arc2.coordinates[0] as turf.Coord,
		arc2.coordinates[1] as turf.Coord,
		distanceOptions,
	);
	const minimumArcLength = Math.min(arc1Length, arc2Length);
	const maxDistance = Math.min(50, minimumArcLength / 10);

	return (
		(turf.distance(
			arc1.coordinates[0] as turf.Coord,
			arc2.coordinates[0] as turf.Coord,
			distanceOptions,
		) < maxDistance &&
			turf.distance(
				arc1.coordinates[1] as turf.Coord,
				arc2.coordinates[1] as turf.Coord,
				distanceOptions,
			) < maxDistance) ||
		(turf.distance(
			arc1.coordinates[0] as turf.Coord,
			arc2.coordinates[1] as turf.Coord,
			distanceOptions,
		) < maxDistance &&
			turf.distance(
				arc1.coordinates[1] as turf.Coord,
				arc2.coordinates[0] as turf.Coord,
				distanceOptions,
			) < maxDistance)
	);
}

function applyTiltToMatchingArcs(
	curvedMovements: Array<CurvedMovementLine>,
): Array<CurvedMovementLine> {
	return curvedMovements.map((arc, index, array) => {
		let tiltValue = 0;

		const matchingArcs = array.filter((otherArc) => {
			return isSimilarCoordinates(arc, otherArc);
		});
		if (matchingArcs.length > 1) {
			const idx = matchingArcs.findIndex((matchingArc) => {
				return arc.id === matchingArc.id;
			});
			tiltValue = (-8 * (matchingArcs.length - 1)) / 2 + 5 * idx;
		}

		return {
			...arc,
			tilt: tiltValue, // Store the tilt value on the arc
		};
	});
}

function hexToRgb(hex: string) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? ([
				parseInt(result[1] ?? "0", 16),
				parseInt(result[2] ?? "0", 16),
				parseInt(result[3] ?? "0", 16),
			] as deck.Color)
		: null;
}

function updateLayers(currentTime: number) {
	if (overlay.value) {
		coefficient.value = currentTime / 1000;
		renderArcs();
	}
}

function renderArcs() {
	const layer = new CustomArcLayer({
		id: "arc",
		data: updatedCurvedMovements.value,
		getSourcePosition: (d) => {
			return d.coordinates[0];
		},
		getTargetPosition: (d) => {
			return d.coordinates[1];
		},
		getSourceColor: (d: CurvedMovementLine) => {
			return checkHighlight(d);
		},
		getTargetColor: (d) => {
			return checkHighlight(d);
		},
		getTilt: (d) => {
			return d.tilt || 0;
		},
		// @ts-expect-error - getCoefficient does not exist on superclass ArcLayer
		getOpacity: (d: CurvedMovementLine) => {
			const isHovered: boolean = d.id === hoveredMovementId.value;
			const opacity =
				multipleMovementArcs.value.length === 0 ||
				isHovered ||
				multipleMovementArcs.value.find((arc) => {
					if (Array.isArray(arc.id) && Array.isArray(d.id))
						return arc.id.join("") === d.id.join("");
					return arc.id === d.id;
				})
					? 1
					: 0.3;
			return opacity;
		},
		getWidth: 3,
		updateTriggers: {
			getSourceColor: coefficient.value,
			getTargetColor: coefficient.value,
			getCoefficient: coefficient.value,
			getOpacity: coefficient.value,
		},
		// @ts-expect-error - getCoefficient does not exist on superclass ArcLayer
		getCoefficient: (d) => {
			return getCoef(d);
		},
	});

	const supportLayer = new ArcLayer({
		id: "arc-support",
		data: updatedCurvedMovements.value,
		getSourcePosition: (d) => {
			return d.coordinates[0];
		},
		getTargetPosition: (d) => {
			return d.coordinates[1];
		},
		getWidth: 20,
		pickable: true,
		opacity: 0,
		onHover: (info) => {
			if (info.object != null) {
				hoveredMovementId.value = info.object.id || null;
			} else {
				hoveredMovementId.value = null;
			}
		},
		onClick: (info) => {
			if (info.object != null) {
				console.log("Clicked Arc:", info.object);

				const clickedIds = info.object.id.flat();

				const clickedMovements = props.movements.filter((movement) => {
					return clickedIds.includes(movement.properties._id);
				});

				console.log(clickedMovements);

				if (clickedMovements.length > 0) {
					const targetCoordinates = info.object.coordinates.map(
						(point: { 0: number; 1: number }) => {
							return [point[0], point[1]];
						},
					);
					// Check if the popup will be displayed outside the visible area
					const pointInBounds = context.map
						?.getBounds()
						.contains(
							turf.center(turf.points(targetCoordinates as Array<[number, number]>)).geometry
								.coordinates as LngLatLike,
						);
					emit("layer-click", {
						features: clickedMovements as Array<
							MapGeoJSONFeature & Pick<GeoJsonFeature, "properties">
						>,
						targetCoordinates: pointInBounds ? targetCoordinates : info.coordinate,
					});
				} else {
					console.warn("Movement not found for clicked arc.");
				}
			} else {
				console.warn("No object clicked.");
			}
		},
		getTilt: (d) => {
			return d.tilt || 0;
		},
	});

	overlay.value?.setProps({
		layers: [layer],
	});

	supportOverlay.value?.setProps({
		layers: [supportLayer],
	});
}
defineExpose(context);
provide(geoMapContextKey, context);
</script>

<template>
	<div class="relative grid size-full text-black">
		<div ref="elementRef" data-geo-map="true" />
		<slot />
	</div>
</template>
