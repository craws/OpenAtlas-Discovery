<script lang="ts" setup>
/* eslint-disable */
// @ts-nocheck
import { assert } from "@acdh-oeaw/lib";
import type { Map as GeoMap, Popup } from "maplibre-gl";
import { Threebox } from "threebox-plugin";

const props = defineProps<{
	coordinates: [number, number];
}>();

console.log("entered");

const emit = defineEmits<{
	(event: "close"): void;
}>();

const geoMapContext = useGeoMap();

const elementRef = ref<HTMLElement | null>(null);

interface Context {
	popup: Popup | null;
}

const context: Context = {
	popup: null,
};

watch(
	(newVal, oldVal) => {
		return props.coordinates;
	},
	() => {
		if (!window.tb) return;

		window.tb.clear();
		const obj = window.tb.label({ htmlElement: elementRef.value, alwaysVisible: true });

		obj.setCoords([props.coordinates[0], props.coordinates[1], 50]);

		window.tb.add(obj);
	},
	{ immediate: true },
);

onMounted(async () => {
	await nextTick();
	const { map } = geoMapContext;
	assert(elementRef.value != null);
	assert(map != null);

	console.log("entered & initialized");

	const customLayer = {
		id: "3d-popup",
		type: "custom" as const,
		renderingMode: "3d" as const,
		onAdd(map: GeoMap, gl: WebGLRenderingContext) {
			console.log("onAdd function entered");
			console.log("Creating Threebox instance", gl.getSupportedExtensions());
			try {
				Object.defineProperty(map, "version", {
					get: function () {
						return 1.0;
					},
				});
				window.tb = new Threebox(map, gl, {});
			} catch (error) {
				console.error(error);
			}
			console.log("threebox created", window.tb);

			const obj = window.tb.label({ htmlElement: elementRef.value, alwaysVisible: true });

			obj.setCoords([props.coordinates[0], props.coordinates[1], 50]);

			window.tb.add(obj);
		},
		render() {
			window.tb.update();
		},
	};

	if (!map.getLayer("3d-popup")) {
		map.addLayer(customLayer);
		map.moveLayer("3d-popup", "points");
	}
});

onScopeDispose(() => {
	context.popup?.remove();
});
</script>

<template>
	<div
		ref="elementRef"
		class="grid max-h-80 gap-3 overflow-y-auto bg-white"
		data-geo-map-popup="true"
	>
		<slot />
	</div>
</template>
