<script setup lang="ts">
import { Query, Search } from "~~/types/query";

const emit = defineEmits<{
	(e: "search", search: Query): void;
}>();
const search = ref("");
interface FilterOperator {
	value: keyof Search;
	title: string;
}

const filterOperators: FilterOperator[] = [
	{ value: "entityName", title: "name" },
	{ value: "entityDescription", title: "description" },
	{ value: "entityAliases", title: "alias" },
	{ value: "entityCidocClass", title: "cidoc class" },
	{ value: "entitySystemClass", title: "system class" },
	{ value: "entityID", title: "id" },
	{ value: "typeID", title: "type id" },
	{ value: "valueTypeID", title: "value type id" },
	{ value: "typeIDWithSubs", title: "type id with subs" },
	{ value: "typeName", title: "type name" },
	{ value: "beginFrom", title: "begin from" },
	{ value: "beginTo", title: "begin to" },
	{ value: "endFrom", title: "end from" },
	{ value: "endTo", title: "end to" },
	{ value: "relationToID", title: "realation to id" },
];
const filterOperator = ref<FilterOperator>({ value: "entityName", title: "name" });
const props = withDefaults(
	defineProps<{
		loading?: Boolean;
	}>(),
	{
		loading: () => false,
	},
);

function handleSearch() {
	const query: Query = {
		search: !search.value
			? []
			: [
					{
						[filterOperator.value.value]: [
							{ operator: "like", values: [search.value], logicalOperator: "and" },
						],
					},
			  ],
		view_classes: ["actor", "event", "place", "reference", "source"],
	};
	emit("search", query);
}
</script>
<template>
	<div class="">
		<v-row no-gutters class="search">
			<v-col cols="4">
				<v-select
					v-model="filterOperator"
					hide-details
					class="search-select"
					:items="filterOperators"
					variant="solo"
					:menu-props="{
						closeOnClick: true,
						closeOnContentClick: true,
						'max-height': '400px',
					}"
				>
					<template #item="{ item }">
						<v-list-item @click="filterOperator = item">
							<span class="text-capitalize">{{ $t(`global.entity.${item.title}`) }}</span>
						</v-list-item>
					</template>
					<template #selection="{ item }">
						<span class="text-capitalize">{{ $t(`global.entity.${item.title}`) }}</span>
					</template>
				</v-select>
			</v-col>
			<v-col cols="">
				<v-text-field
					id="search-field"
					v-model="search"
					hide-details
					class="search-field text-capitalize"
					clearable
					prepend-inner-icon="mdi-magnify"
					:label="$t(`global.basics.search`)"
					variant="solo"
					@change="handleSearch"
					@click:clear="handleSearch"
				/>
			</v-col>
			<v-progress-linear :active="props.loading" class="search-progress" indeterminate />
		</v-row>
	</div>
</template>

<style lang="scss">
.search-field {
	.v-field {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		box-shadow:
			-2px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
			0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
			0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
	}
}

.search-select {
	.v-field {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		box-shadow:
			2px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
			0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
			0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
	}
}
</style>

<style scoped>
.search {
	position: relative;
}

.search-progress {
	position: absolute;
	bottom: 0;
}
</style>
