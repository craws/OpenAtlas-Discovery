<script lang="ts" setup>
const props = defineProps<{
	entities: Array<EntityFeature>;
}>();
</script>

<template>
	<Card class="h-96 overflow-hidden">
		<VisualisationContainer v-slot="{ height, width }">
			<GeoMap v-if="height && width" :entities="props.entities" :height="height" :width="width" />
		</VisualisationContainer>
	</Card>
</template>
