<script lang="ts" setup>
import { assert } from "@acdh-oeaw/lib";
import { Popup } from "maplibre-gl";

const props = defineProps<{
	coordinates: [number, number];
}>();

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

onMounted(async () => {
	await nextTick();
	const { map } = geoMapContext;
	assert(elementRef.value != null);
	assert(map != null);

	const popup = new Popup({ closeButton: false, maxWidth: "272px" })
		.setLngLat(props.coordinates)
		.setDOMContent(elementRef.value)
		.addTo(map);

	void popup.once("close", () => {
		emit("close");
	});

	context.popup = popup;
});

watch(
	() => {
		return props.coordinates;
	},
	(coordinates) => {
		context.popup?.setLngLat(coordinates);
	},
);

onScopeDispose(() => {
	context.popup?.remove();
});
</script>

<template>
	<div ref="elementRef" class="grid max-h-80 gap-3 overflow-y-auto" data-geo-map-popup="true">
		<slot />
	</div>
</template>
