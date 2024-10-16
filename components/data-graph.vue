<script setup lang="ts">
import Graph from "graphology";

import { networkConfig } from "@/config/network-visualisation.config";
import type { NetworkEntity } from "@/types/api";

const props = defineProps<{
	networkData: NetworkEntity;
	searchNode: string;
	detailNode?: string;
}>();

const graph = new Graph();

const { entityColors } = networkConfig.colors;
const defaultColor = networkConfig.colors.entityDefaultColor;

watch(
	() => {
		return props.networkData;
	},
	(networkData) => {
		/** Clear previous graph data. */
		graph.clear();

		if (networkData.length === 0) return;

		/** Add all nodes. */
		networkData.forEach((entity) => {
			if (!graph.hasNode(entity.id) && entity.systemClass) {
				graph.addNode(entity.id, {
					label: entity.label,
					color: getNodeColor(entity.systemClass),
					size: networkConfig.sourceNodeSize,
				});
			}
		});

		//** Add edges. */
		networkData.forEach((entity) => {
			entity.relations.forEach((element) => {
				if (!graph.hasEdge(entity.id, element) && graph.hasNode(element)) {
					graph.addEdge(entity.id, element);
				} else if (!graph.hasNode(element)) {
					console.error(
						"graph does not have the node",
						element,
						"for the wanted relation in it's set.",
					);
				}
			});
		});
	},
	{ immediate: true },
);

function getNodeColor(nodeClass: string) {
	//@ts-expect-error: no error occurs
	return entityColors[nodeClass] ?? defaultColor;
}
</script>

<template>
	<div class="absolute z-10 m-3 flex w-full"></div>
	<Network
		v-if="graph.size > 0"
		:graph="graph"
		:search-node="props.searchNode"
		:detail-node="props.detailNode"
	/>
</template>
