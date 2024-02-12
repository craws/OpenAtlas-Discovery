<script lang="ts" setup>
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

				const elements = [h('span', { class: icon ? 'sr-only' : '' }, info.getValue())];

				if (icon) elements.push(h(icon, { class: "size-4 shrink-0" }))

				const tooltipWrapper = h(TooltipProvider, {}, [
					h(Tooltip, {}, [
						h(TooltipTrigger, { class: "cursor-default" }, elements),
						h(TooltipContent, {}, t(`SystemClassNames.${info.getValue()}`))
					])
				])

				return tooltipWrapper;
			}
		}
	),
	columnHelper.accessor(
		'properties.title',
		{
			header: t("SearchResultsTable.header.name")
		}
	),
	columnHelper.accessor(
		'descriptions',
		{
			header: t("SearchResultsTable.header.description"),
			cell: info => {
				const descriptions = info.getValue()
				if (!descriptions || !Array.isArray(descriptions)) return ''
				return descriptions[0]?.value;
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
			<!-- <TableRow v-for="entity of props.entities" :key="entity.properties._id">
				<TableCell class="font-medium">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger class="cursor-default">
								<Component :is="getEntityIcon(entity.systemClass)" class="size-4 shrink-0" />
							</TooltipTrigger>
							<TooltipContent>
								{{ t(`SystemClassNames.${entity.systemClass}`) }}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<span class="sr-only">{{ t(`SystemClassNames.${entity.systemClass}`) }}</span>
				</TableCell>
				<TableCell>
					<NavLink
						class="underline decoration-dotted transition hover:no-underline focus-visible:no-underline"
						:href="{ path: `/entities/${encodeURIComponent(entity.properties._id)}` }"
					>
						{{ entity.properties.title }}
					</NavLink>
				</TableCell>
				<TableCell>
					<template v-for="(description, index) of entity.descriptions" :key="index">
						<span v-if="description.value != null">{{ description.value }}</span>
					</template>
				</TableCell>
				<TableCell class="text-right">
					<template v-for="(timespan, index) of entity.when?.timespans" :key="index"> -->
						<!-- FIXME: why earliest -->
						<!-- <span v-if="timespan.start?.earliest != null">
							{{ d(timespan.start.earliest) }}
						</span>
					</template>
				</TableCell>
				<TableCell class="text-right">
					<template v-for="(timespan, index) of entity.when?.timespans" :key="index"> -->
						<!-- FIXME: why earliest -->
						<!-- <span v-if="timespan.end?.earliest != null">
							{{ d(timespan.end.earliest) }}
						</span>
					</template>
				</TableCell>
			 </TableRow> -->
		</TableBody>
	</Table>
</template>
