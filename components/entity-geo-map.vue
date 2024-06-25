<script lang="ts" setup>
const props = defineProps<{
	entities: Array<EntityFeature>;
}>();

const features = computed(() => {
	return props.entities.map((entity) => {
		console.log(entity);
		return createGeoJsonFeature(entity);
	});
});
</script>

<template>
	<Card class="h-full overflow-hidden">
		<VisualisationContainer v-slot="{ height, width }">
			<GeoMap v-if="height && width" :features="features" :height="height" :width="width" :has-polygons="true"/>
		</VisualisationContainer>
	</Card>
</template>
