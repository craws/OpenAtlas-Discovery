<script lang="ts" setup>
import type { EntityFeature } from "@/composables/use-create-entity";

const props = defineProps<{
	entities: Array<EntityFeature>;
}>();

const t = useTranslations();
const { d } = useI18n();
</script>

<template>
	<Table>
		<TableCaption class="sr-only">{{ t("SearchResultsTable.search-results") }}</TableCaption>
		<TableHeader>
			<TableRow>
				<TableHead class="w-14">
					{{ t("SearchResultsTable.header.class") }}
				</TableHead>
				<TableHead>
					{{ t("SearchResultsTable.header.name") }}
				</TableHead>
				<TableHead>
					{{ t("SearchResultsTable.header.description") }}
				</TableHead>
				<TableHead class="text-right">
					{{ t("SearchResultsTable.header.begin") }}
				</TableHead>
				<TableHead class="text-right">
					{{ t("SearchResultsTable.header.end") }}
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<TableRow v-for="entity of props.entities" :key="entity.properties._id">
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
					<template v-for="(timespan, index) of entity.when?.timespans" :key="index">
						<!-- FIXME: why earliest -->
						<span v-if="timespan.start?.earliest != null">
							{{ d(timespan.start.earliest) }}
						</span>
					</template>
				</TableCell>
				<TableCell class="text-right">
					<template v-for="(timespan, index) of entity.when?.timespans" :key="index">
						<!-- FIXME: why earliest -->
						<span v-if="timespan.end?.earliest != null">
							{{ d(timespan.end.earliest) }}
						</span>
					</template>
				</TableCell>
			</TableRow>
		</TableBody>
	</Table>
</template>
