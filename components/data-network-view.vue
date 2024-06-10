<script lang="ts" setup>
import { z } from "zod";

import type { SearchFormData as CategoryFormData } from "@/components/network-legend-panel.vue";
import type { SearchFormData } from "@/components/network-search-form.vue";

import { project } from "../config/project.config";

const router = useRouter();
const route = useRoute();

const searchFiltersSchema = z.object({
	search: z.string().catch(""),
});

const searchFilters = computed(() => {
	return searchFiltersSchema.parse(route.query);
});

function onChangeSearchFilters(values: SearchFormData) {
	const query = { ...searchFilters.value, ...values };

	if (values.search === "") {
		// @ts-expect-error Fix me later please
		delete query.search;
	}

	void router.push({ query });
}

function onChangeCategory(values: CategoryFormData) {
	void router.push({ query: { ...searchFilters.value, ...values } });
}

const { data, isPending, isPlaceholderData } = useGetNetworkData(
	// @ts-expect-error Includes custom, per-instance system classes.
	computed(() => {
		return {
			exclude_system_classes: [
				"type",
				"object_location",
				"reference_system",
				"file",
				"source_translation",
				"source",
				"bibliography",
				"external_reference",
				"administrative_unit",
				"edition",
				"type_tools",
			],
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
		<NetworkSearchForm
			:class="
				project.fullscreen
					? 'absolute z-10 bg-white/90 dark:bg-neutral-900 max-w-[800px] w-full m-3 rounded-md p-6 shadow-md'
					: ''
			"
			:search="searchFilters.search"
			@submit="onChangeSearchFilters"
		/>

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
			<DataGraph :network-data="entities" :search-node="searchFilters.search" />
			<Centered v-if="isLoading" class="pointer-events-none">
				<LoadingIndicator class="text-neutral-950" size="lg" />
			</Centered>
		</VisualisationContainer>
	</div>
</template>
