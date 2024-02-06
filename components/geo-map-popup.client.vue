<script lang="ts" setup>
import { assert } from "@acdh-oeaw/lib";
import { Popup } from "maplibre-gl";

const props = defineProps<{
	coordinates: [number, number]
}>();

const emit = defineEmits<{
	(event: 'close'): void
}>()

const { map } = useGeoMap();

const elementRef = ref<HTMLElement | null>(null);

interface Context {
	popup: Popup | null
}

const context: Context = {
	popup: null
};

onMounted(async () => {
	await nextTick()
	assert(elementRef.value != null);
	assert(map != null);

	const popup = new Popup({ closeButton: false })
		.setLngLat(props.coordinates)
		.setDOMContent(elementRef.value)
		.addTo(map);

	popup.once("close", () => emit("close"))

	context.popup = popup;
});

watch(() => props.coordinates, (coordinates) => {
	context.popup?.setLngLat(coordinates)
})

onScopeDispose(() => {
	context.popup?.remove();
});
</script>

<template>
	<div ref="elementRef" class="grid gap-4" data-geo-map-popup="true">
		<slot />
	</div>
</template>
