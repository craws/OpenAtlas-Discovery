<script lang="ts" setup>
import {
	type CellContext,
	type Column,
	type ColumnSort,
	createColumnHelper,
	FlexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useVueTable,
} from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { EntityFeature } from "@/composables/use-create-entity";
import { isColumn } from "@/composables/use-get-search-results";
import NavLink from "@/components/nav-link.vue";

const emit = defineEmits({
	"update:sorting"(sorting: SortingState) {
		if (!sorting.length) return false;
		/** Returns `true` if any column is invalid. */
		const containsInvalidColumn = sorting.some((sort: ColumnSort) => {
			if (!isColumn(sort.id)) return true;
			return false;
		});

		if (containsInvalidColumn) return false;

		return true;
	},
});

const props = defineProps<{
	entities: Array<EntityFeature>;
	sorting: SortingState;
}>();

const t = useTranslations();
const { d } = useI18n();

const columnHelper = createColumnHelper<EntityFeature>();

/**
 * Converts a date cell value to a formatted date string.
 * @param {CellContext<EntityFeature, string>} info - The cell context containing the date value.
 * @returns {string} - The formatted date string.
 */
function dateCellToDateString(info: CellContext<EntityFeature, string>): string {
	const date: string | null | undefined = info.getValue();

	if (!date || date.includes("null")) return "";

	return d(date);
}

/**
 * Creates a sortable header button for the search results table.
 *
 * @param {Column<EntityFeature, string>} column - The column object representing the feature of an entity.
 * @param {string} title - The title of the sortable header button.
 * @returns {VNode} - The Vue render function for the sortable header button.
 */
function sortableHeader(column: Column<EntityFeature, string>, title: string) {
	return h(
		Button,
		{
			variant: "ghost",
			onClick: () => {
				const currentSorting = column.getIsSorted();
				emit("update:sorting", [{ id: column.id, desc: currentSorting === "asc" ? true : false }]);
			},
		},
		() => {
			return [title, h(ArrowUpDown, { class: "size-4" })];
		},
	);
}

/**
 * column.id: The ID of the column, should be the key used for sorting in the API.
 * 						Needs to be explicitly given if the column needs to be sortable.
 * @see columns
 */
const cols = [
	columnHelper.accessor("systemClass", {
		id: "system_class",
		header: ({ column }) => {
			return sortableHeader(column, t("SearchResultsTable.header.class"));
		},
		cell: (info) => {
			const icon = getEntityIcon(info.getValue());

			const tooltipWrapper = h(TooltipProvider, {}, [
				h(Tooltip, {}, [
					h(
						TooltipTrigger,
						{ class: "cursor-default" },
						icon ? h(icon, { class: "size-4 shrink-0" }) : h("span", {}, info.getValue()),
					),
					h(TooltipContent, {}, t(`SystemClassNames.${info.getValue()}`)),
				]),
			]);

			const root = h("span", {}, [
				tooltipWrapper,
				h("span", { class: "sr-only" }, t(`SystemClassNames.${info.getValue()}`)),
			]);

			return root;
		},
	}),
	columnHelper.accessor("properties.title", {
		id: "name",
		header: ({ column }) => {
			return sortableHeader(column, t("SearchResultsTable.header.name"));
		},
		cell: (info) => {
			const title = info.getValue();
			return h(
				NavLink,
				{
					class:
						"underline decoration-dotted transition hover:no-underline focus-visible:no-underline",
					href: { path: `/entities/${encodeURIComponent(info.row.original.properties._id)}` },
				},
				title,
			);
		},
	}),
	columnHelper.accessor("descriptions", {
		header: t("SearchResultsTable.header.description"),
		cell: (info) => {
			const descriptions = info.getValue();
			if (!Array.isArray(descriptions)) return "";

			return descriptions
				.filter((desc) => {
					return desc.value;
				})
				.map((description, index) => {
					if (description.value != null) {
						return h(
							"span",
							{ class: "max-w-[30vw] truncate inline-block", key: index },
							description.value,
						);
					}
					return undefined;
				});
		},
	}),
	columnHelper.accessor(
		(row) => {
			return `${String(row.when?.timespans?.[0]?.start?.earliest)} `;
		},
		{
			id: "begin_from",
			header: ({ column }) => {
				return sortableHeader(column, t("SearchResultsTable.header.begin"));
			},
			cell: (info) => {
				return dateCellToDateString(info);
			},
		},
	),
	columnHelper.accessor(
		(row) => {
			return `${String(row.when?.timespans?.[0]?.end?.earliest)} `;
		},
		{
			id: "end_from",
			header: ({ column }) => {
				return sortableHeader(column, t("SearchResultsTable.header.end"));
			},
			cell: (info) => {
				return dateCellToDateString(info);
			},
		},
	),
];

const table = useVueTable({
	get data() {
		return props.entities;
	},
	get columns() {
		return cols;
	},
	getCoreRowModel: getCoreRowModel(),
	getSortedRowModel: getSortedRowModel(),
	state: {
		get sorting() {
			return props.sorting;
		},
	},
});
</script>

<template>
	<div>
		<Table>
			<TableCaption class="sr-only">{{ t("SearchResultsTable.search-results") }}</TableCaption>
			<TableHeader>
				<TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
					<TableHead v-for="header in headerGroup.headers" :key="header.id">
						<FlexRender
							v-if="!header.isPlaceholder"
							:render="header.column.columnDef.header"
							:props="header.getContext()"
						/>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<template v-if="table.getRowModel().rows?.length">
					<TableRow
						v-for="row in table.getRowModel().rows"
						:key="row.id"
						:data-state="row.getIsSelected() ? 'selected' : undefined"
					>
						<TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
							<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
						</TableCell>
					</TableRow>
				</template>
			</TableBody>
		</Table>
		<div
			v-if="!table.getRowModel().rows?.length"
			class="flex h-full items-center justify-center align-middle"
		>
			<p>{{ t("SearchResultsTable.no-entries") }}</p>
		</div>
	</div>
</template>
