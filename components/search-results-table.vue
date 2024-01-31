<script lang="ts" setup>
import { createUrl } from "@acdh-oeaw/lib";

import type { LinkedPlaceFeature } from "@/types/api";

const t = useTranslations();
const { d } = useI18n();

const props = defineProps<{
	results: Array<LinkedPlaceFeature>;
}>();

const getEntityId = useGetEntityId();
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
		<!-- FIXME: are features de-duplicated? -->
		<!-- FIXME: why pick descriptions[0], and timespans[0] -->
		<TableBody>
			<TableRow v-for="result of props.results" :key="result['@id']">
				<TableCell class="font-medium">
					<Component :is="getEntityIcon(result.systemClass)" class="size-4 shrink-0" />
					<span class="sr-only">{{ result.systemClass }}</span>
				</TableCell>
				<TableCell>
					<NavLink
						class="underline decoration-dotted transition hover:no-underline focus-visible:no-underline"
						:href="{ path: `/entities/${encodeURIComponent(getEntityId(result['@id']))}` }"
					>
						{{ result.properties.title }}
					</NavLink>
				</TableCell>
				<TableCell>
					{{ result.descriptions[0]?.value }}
				</TableCell>
				<TableCell class="text-right">
					{{
						result.when?.timespans?.[0]?.start?.earliest != null
							? d(result.when?.timespans[0].start.earliest)
							: null
					}}
				</TableCell>
				<TableCell class="text-right">
					{{
						result.when?.timespans?.[0]?.end?.earliest != null
							? d(result.when?.timespans[0].end.earliest)
							: null
					}}
				</TableCell>
			</TableRow>
		</TableBody>
	</Table>
</template>
