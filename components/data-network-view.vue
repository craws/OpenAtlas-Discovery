<script lang="ts" setup>
import { z } from "zod";

import type { SearchFormData as CategoryFormData } from "@/components/network-legend-panel.vue";
import type { SearchFormData } from "@/components/network-search-form.vue";

import { project } from "../config/project.config";

const router = useRouter();
const route = useRoute();

const detailEntityId = computed(() => {
	return route.query.selection as string;
});

const searchFiltersSchema = z.object({
	search: z.string().catch(""),
});

const searchFilters = computed(() => {
	return searchFiltersSchema.parse(route.query);
});

function onChangeSearchFilters(values: SearchFormData) {
	const query = { mode: route.query.mode, ...searchFilters.value, ...values };

	if (values.search === "") {
		// @ts-expect-error Fix me later please
		delete query.search;
	}

	void router.push({ query });
}

function onChangeCategory(values: CategoryFormData) {
	void router.push({ query: { mode: route.query.mode, ...searchFilters.value, ...values } });
}

const { data, isPending, isPlaceholderData } = useGetNetworkData(
	// @ts-expect-error Includes custom, per-instance system classes.
	computed(() => {
		return {
			// TO-DO: Currently there is an issue: filtering by case study and system_class type will return no results
			exclude_system_classes: project.network.excludeSystemClasses,
		};
	}),
);

const isLoading = computed(() => {
	return isPending.value || isPlaceholderData.value;
});

const entities = computed(() => {
	return (
		data.value?.results.flatMap((result) => {
			return result;
		}) ?? []
	);
});

const systemClasses = computed(() => {
	const systemClasses: Array<string> = [];

	entities.value.forEach((entity) => {
		if (!systemClasses.includes(entity.systemClass)) {
			systemClasses.push(entity.systemClass);
		}
	});

	return systemClasses;
});
</script>

<template>
	<div :class="project.fullscreen ? 'relative grid' : 'relative grid grid-rows-[auto_1fr] gap-4'">
		<div :class="project.fullscreen ? 'absolute z-10 flex w-full justify-center' : ''">
			<NetworkSearchForm
				:class="
					project.fullscreen
						? 'absolute z-10 bg-white/90 dark:bg-neutral-900 max-w-[800px] w-full m-3 rounded-md p-6 shadow-md'
						: ''
				"
				:search="searchFilters.search"
				@submit="onChangeSearchFilters"
			/>
		</div>

		<VisualisationContainer
			v-slot="{ height, width }"
			class="border"
			:class="{ 'opacity-50 grayscale': isLoading }"
		>
			<NetworkLegendPanel
				v-if="height && width"
				class="absolute bottom-0 right-0 z-10 m-3 bg-white/90"
				:system-classes="systemClasses"
				@submit="onChangeCategory"
			/>
			<DataGraph
				:network-data="entities"
				:search-node="searchFilters.search"
				:detail-node="detailEntityId"
			/>
			<Centered v-if="isLoading" class="pointer-events-none">
				<LoadingIndicator class="text-neutral-950" size="lg" />
			</Centered>
		</VisualisationContainer>
	</div>
</template>
