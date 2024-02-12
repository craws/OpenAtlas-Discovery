<script lang="ts" setup>
import NavLink from "@/components/nav-link.vue";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { EntityFeature } from "@/composables/use-create-entity";

import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
} from '@tanstack/vue-table'
import {
	FlexRender,
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,

	useVueTable,
} from '@tanstack/vue-table'

const props = defineProps<{
	entities: Array<EntityFeature>;
}>();

const t = useTranslations();
const { d } = useI18n();

const columnHelper = createColumnHelper<EntityFeature>();

function getCellForTime(info?: any): string {
	const date = info.getValue();

	if (!date || date === 'null') return ''
	return d(date)
}

const cols = [
	columnHelper.accessor(
		'systemClass',
		{
			header: t("SearchResultsTable.header.class"), // This will be where I have to put the sorting
			cell: info => {
				const icon = getEntityIcon(info.getValue())

				const tooltipWrapper = h(TooltipProvider, {}, [
					h(Tooltip, {}, [
						h(TooltipTrigger,
							{ class: "cursor-default" },
							icon ? h(icon, { class: "size-4 shrink-0" }) : h('span', {}, info.getValue())),
						h(TooltipContent,
							{},
							t(`SystemClassNames.${info.getValue()}`))
					])
				])

				const root = h('span', {}, [
					tooltipWrapper,
					h('span', { class: "sr-only" }, t(`SystemClassNames.${info.getValue()}`))
				])

				return root;
			}
		}
	),
	columnHelper.accessor(
		'properties.title',
		{
			header: t("SearchResultsTable.header.name"),
			cell: info => {
				const title = info.getValue()

				return h(NavLink,
					{
						class: "underline decoration-dotted transition hover:no-underline focus-visible:no-underline",
						href: { path: `/entities/${encodeURIComponent(info.row.original.properties._id)}` }
					},
					title
				)
			}
		}
	),
	columnHelper.accessor(
		'descriptions',
		{
			header: t("SearchResultsTable.header.description"),
			cell: info => {
				const descriptions = info.getValue()
				if (!descriptions || !Array.isArray(descriptions)) return ''

				return descriptions
					.filter(desc => desc.value)
					.map((description, index) => {
						if (description.value != null) {
							return h('span', { key: index }, description.value)
						}
						return
					});
			}
		}
	),
	columnHelper.group(
		{
			header: t("SearchResultsTable.header.dates"),
			columns: [
				columnHelper.accessor(
					row => `${row.when?.timespans?.[0]?.start?.earliest}`,
					{
						header: t("SearchResultsTable.header.begin"),
						cell: info => getCellForTime(info)
					}
				),
				columnHelper.accessor(
					row => `${row.when?.timespans?.[0]?.end?.earliest}`,
					{
						header: t("SearchResultsTable.header.end"),
						cell: info => getCellForTime(info)
					}
				)
			]
		}
	)
]

const table = useVueTable({
	get data() { return props.entities },
	get columns() { return cols },
	getCoreRowModel: getCoreRowModel(),
})


</script>

<template>
	<Table>
		<TableCaption class="sr-only">{{ t("SearchResultsTable.search-results") }}</TableCaption>
		<TableHeader>
			<TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
				<TableHead v-for="header in headerGroup.headers" :key="header.id">
					<FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<template v-if="table.getRowModel().rows?.length">
				<TableRow v-for="row in table.getRowModel().rows" :key="row.id"
						:data-state="row.getIsSelected() ? 'selected' : undefined">
						<TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
								<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
						</TableCell>
				</TableRow>
			</template>
		</TableBody>
	</Table>
</template>
