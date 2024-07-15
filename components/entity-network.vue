<script setup lang="ts">
import EntityDataGraph from "@/components/entity-data-graph.vue";

const props = defineProps<{
	networkData: EntityFeature | undefined;
	id: number;
}>();
</script>

<template>
	<Card class="h-96 overflow-hidden">
		<VisualisationContainer>
			<EntityDataGraph
				v-if="props.networkData != null"
				:id="props.id"
				:network-data="props.networkData"
			/>
		</VisualisationContainer>
	</Card>
</template>
