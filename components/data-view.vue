<script lang="ts" setup>
import type { SortingState } from "@tanstack/vue-table";
import * as v from "valibot";

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

const searchFiltersSchema = v.object({
	category: v.fallback(v.picklist(categories), "entityName"),
	search: v.fallback(v.string(), ""),
	column: v.fallback(v.picklist(columns), "name"),
	sort: v.fallback(v.picklist(["asc", "desc"]), "asc"),
	page: v.fallback(
		v.pipe(v.unknown(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
		1,
	),
	limit: v.fallback(
		v.pipe(
			v.unknown(),
			v.transform(Number),
			v.number(),
			v.integer(),
			v.minValue(1),
			v.maxValue(100),
		),
		20,
	),
});

const idCategories = ["entityID", "typeID", "valueTypeID", "typeIDWithSubs"];

const searchFilters = computed(() => {
	return v.parse(searchFiltersSchema, route.query);
});

const sortingState = computed(() => {
	return [
		{ id: searchFilters.value.column, desc: searchFilters.value.sort === "desc" },
	] as SortingState;
});

type SearchFilters = v.InferOutput<typeof searchFiltersSchema>;

function setSearchFilters(query: Partial<SearchFilters>) {
	void router.push({
		query: { mode: route.query.mode, selection: route.query.selection, ...query },
	});
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

const { data, isPending, isPlaceholderData } = useGetSearchResults(
	computed(() => {
		const { search, category, ...params } = searchFilters.value;

		const operator = idCategories.includes(category) ? "equal" : "like";

		const searchQuery =
			search && search.length > 0
				? [{ [category]: [{ operator, values: [search], logicalOperator: "and" }] }]
				: [];

		return {
			...params,
			search: searchQuery,
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
	<div class="container relative grid grid-rows-[auto_1fr] gap-4 p-8">
		<SearchForm
			:category="searchFilters.category"
			:search="searchFilters.search"
			@submit="onChangeSearchFilters"
		/>

		<div
			class="relative isolate grid size-full overflow-y-auto"
			:class="{ 'opacity-50 grayscale': isLoading }"
		>
			<div v-if="entities.length > 0" class="grid content-start gap-8">
				<SearchResultsTable
					:entities="entities"
					:sorting="sortingState"
					@update:sorting="onUpdateSorting"
				/>

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

						<PaginationNext :disabled="data.pagination.totalPages < 2" />
						<PaginationLast :disabled="data.pagination.totalPages < 2" />
					</PaginationList>
				</Pagination>
			</div>

			<div v-else-if="!isLoading">
				<Centered>{{ t("DataView.nothing-found") }}</Centered>
			</div>

			<Centered v-if="isLoading" class="pointer-events-none">
				<LoadingIndicator size="lg" />
			</Centered>
		</div>
	</div>
</template>
