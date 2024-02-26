<script lang="ts" setup>
import type { SortingState } from "@tanstack/vue-table";
import { z } from "zod";

import type { SearchFormData } from "@/components/search-form.vue";
import {
	Pagination,
	PaginationEllipsis,
	PaginationFirst,
	PaginationLast,
	PaginationList,
	PaginationListItem,
	PaginationNext,
} from "@/components/ui/pagination";
import { categories, columns, isColumn } from "@/composables/use-get-search-results";

const router = useRouter();
const route = useRoute();
const t = useTranslations();

const searchFiltersSchema = z.object({
	category: z.enum(categories).catch("entityName"),
	search: z.string().catch(""),
	column: z.enum(columns).catch("name"),
	sort: z.enum(["asc", "desc"]).catch("asc"),
	page: z.coerce.number().int().positive().catch(1),
	limit: z.coerce.number().int().positive().max(100).catch(20),
});

const searchFilters = computed(() => {
	return searchFiltersSchema.parse(route.query);
});

const sortingState = computed(() => {
	return [
		{ id: searchFilters.value.column, desc: searchFilters.value.sort === "desc" },
	] as SortingState;
});

type SearchFilters = z.infer<typeof searchFiltersSchema>;

function setSearchFilters(query: Partial<SearchFilters>) {
	void router.push({ query });
	document.body.scrollTo(0, 0);
}

function onChangeSearchFilters(values: SearchFormData) {
	setSearchFilters(values);
}

function onUpdatePage(page: number) {
	setSearchFilters({ ...searchFilters.value, page });
}

function onUpdateSorting(sorting: SortingState) {
	let column = searchFilters.value.column;
	if (isColumn(sorting[0]?.id)) column = sorting[0].id;

	setSearchFilters({
		...searchFilters.value,
		column,
		sort: sorting[0]?.desc ? "desc" : "asc",
	});

}

const { data, error, isPending, isPlaceholderData, suspense } = useGetSearchResults(
	computed(() => {
		const { search, category, ...params } = searchFilters.value;

		return {
			...params,
			search:
				search.length > 0
					? [{ [category]: [{ operator: "like", values: [search], logicalOperator: "and" }] }]
					: [],
			show: ["description", "when"],
			view_classes: ["actor", "event", "place", "reference", "source"],
		};
	}),
);

const isLoading = computed(() => {
	return isPending.value || isPlaceholderData.value;
});

const entities = computed(() => {
	return (
		data.value?.results.flatMap((result) => {
			return result.features;
		}) ?? []
	);
});
</script>

<template>
	<div class="relative grid grid-rows-[auto_1fr] gap-4">
		<SearchForm
			:filter="searchFilters.category"
			:search="searchFilters.search"
			@submit="onChangeSearchFilters"
		/>

		<div
			class="relative isolate grid size-full overflow-y-auto"
			:class="{ 'opacity-50 grayscale': isLoading }"
		>
			<div v-if="useGetSearchResults.length > 0" class="grid gap-8">
				<SearchResultsTable
					:entities="entities"
					:sorting="sortingState"
					@update:sorting="onUpdateSorting" />

				<Pagination
					v-if="data?.pagination != null"
					v-slot="{ page }"
					class="justify-self-center"
					:page="searchFilters.page"
					:sibling-count="1"
					:show-edges="true"
					:total="data.pagination.entities"
					:items-per-page="data.pagination.entitiesPerPage"
					@update:page="onUpdatePage"
				>
					<PaginationList v-slot="{ items }" class="flex items-center gap-1">
						<PaginationFirst />
						<PaginationPrev />

						<template v-for="(item, index) of items">
							<PaginationListItem
								v-if="item.type === 'page'"
								:key="index"
								as-child
								:value="item.value"
							>
								<Button class="size-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
									{{ item.value }}
								</Button>
							</PaginationListItem>
							<PaginationEllipsis v-else :key="item.type" :index="index" />
						</template>

						<PaginationNext />
						<PaginationLast />
					</PaginationList>
				</Pagination>
			</div>

			<div v-else>
				<Centered>{{ t("DataView.nothing-found") }}</Centered>
			</div>

			<Centered v-if="isLoading" class="pointer-events-none">
				<LoadingIndicator size="lg" />
			</Centered>
		</div>
	</div>
</template>
