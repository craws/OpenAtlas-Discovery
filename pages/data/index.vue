<script setup lang="ts">
import type { ComputedRef } from "vue";
import { useI18n } from "vue-i18n";

import classes from "~/assets/classes.json";
import headers from "~/assets/tableheaders.json";
import { discoveryConfig } from "~/config/discoveryConfig";
import type { Query } from "~~/types/query";

const { t } = useI18n();
const { $api } = useNuxtApp();
const localePath = useLocalePath();

definePageMeta({
	middleware: ["api"],
});
useHead({
	title: t("global.basics.data") ?? "Data",
});

const itemsLength: ComputedRef<number | undefined> = computed(
	() => data.value?.pagination?.entities,
);
const options = reactive({ page: 1, itemsPerPage: 20, itemsLength });
const search = ref<Array<string> | undefined>([]);
const query = computed(() => ({
	view_classes: ["actor", "event", "place", "reference", "source"],
	page: options.page,
	limit: options.itemsPerPage,
	search: search.value,
	type_id: discoveryConfig.defaultFilters,
}));

const apiEnabled = computed(() => $api !== undefined);

const { data, pending, refresh } = await useAsyncData(() => $api.query.getQuery(query.value));
watch(
	() => options.page,
	() => refresh(),
);
onMounted(() => {
	if (!apiEnabled) {
		refresh();
	}
});

function updateQuery(newQuery: Query) {
	search.value = newQuery.search?.map((x) => JSON.stringify(x));
	refresh();
}
</script>

<template id="data-table">
	<ClientOnly>
		<VContainer id="data-table-container">
			<SearchField :loading="pending" @search="updateQuery" />
			<DataTable
				class="mt-10"
				height="calc(100vh - 150px)"
				density="compact"
				:headers="headers"
				:items="data?.results ?? []"
				:options="options"
			>
				<template #features[0].systemClass="{ value }">
					<VTooltip
						content-class="text-capitalize"
						:text="$t(`global.entity.system_classes.${value}`)"
					>
						<template #activator="{ props }">
							<VIcon v-bind="props">
								{{ classes.find((x) => x.systemClass === value)?.icon }}
							</VIcon>
						</template>
					</VTooltip>
				</template>
				<template #features[0].properties.title="{ item, value }">
					<NuxtLink :to="localePath(`/entity/${item.features[0]['@id'].split('/').at(-1)}`)">
						{{ value }}
					</NuxtLink>
				</template>
				<template #features[0].when.timespans[0].start.earliest="{ value }">
					{{ useFormatDateTime(value) }}
				</template>
				<template #features[0].when.timespans[0].end.earliest="{ value }">
					{{ useFormatDateTime(value) }}
				</template>
			</DataTable>
		</VContainer>
	</ClientOnly>
</template>
