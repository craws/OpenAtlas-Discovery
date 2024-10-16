<script lang="ts" setup>
import { groupByToMap } from "@acdh-oeaw/lib";

import { useFilterRelations } from "@/composables/use-filter-relations";

const { getUnprefixedId } = useIdPrefix();

/** @param relations should be an  */
const props = defineProps<{
	title: string;
	relations: EntityFeature["relations"];
	relationType: RelationType;
	systemClass?: string;
}>();

type Relations = Array<NonNullable<EntityFeature["relations"]>[0]>;

const filteredRelations = ref<Relations>([]);

watch(
	() => {
		return props.relations;
	},
	(relations) => {
		filteredRelations.value = useFilterRelations(relations, {
			relationType: props.relationType,
			systemClass: props.systemClass,
		});
	},
	{ immediate: true },
);

computed(() => {
	return props.relations?.reduce(
		(acc: Array<NonNullable<EntityFeature["relations"]>[0]>, relation) => {
			const { crmCode, inverse } =
				extractRelationTypeFromRelationString(relation.relationType) ?? {};

			if (
				crmCode !== props.relationType.crmCode ||
				inverse !== Boolean(props.relationType.inverse)
			) {
				return acc;
			}
			if (!relation.relationTo) {
				return acc;
			}

			return [
				...acc,
				{
					...relation,
					id: useToNumber(getUnprefixedId(relation.relationTo)).value,
				},
			];
		},
		[],
	);
});

const groupedByType = computed(() => {
	return groupByToMap(filteredRelations.value, (rel): string | null | undefined => {
		return rel.type;
	});
});

const relationsWithoutType = computed(() => {
	if (groupedByType.value.has(null)) return groupedByType.value.get(null);
	return [];
});

const isOpen = ref(false);

if (filteredRelations.value.length && filteredRelations.value.length === 1) isOpen.value = true;
</script>

<template>
	<div v-if="filteredRelations?.length" class="rounded-md border px-4 py-3 text-sm">
		<div class="flex items-center justify-between space-x-4">
			<h4 class="text-sm font-semibold">
				{{ title }}
				{{
					filteredRelations?.length && filteredRelations.length > 1
						? `(${filteredRelations.length})`
						: ""
				}}
			</h4>
		</div>
		<template v-if="relationsWithoutType && relationsWithoutType.length">
			<RelationListEntry v-for="rel in relationsWithoutType" :key="rel.label" :relation="rel" />
		</template>
		<template v-for="[type, rels] in groupedByType" :key="type">
			<RelationCollapsible
				v-if="type !== null"
				class="mb-8"
				:title="type ?? ''"
				:relations="rels"
			/>
		</template>
	</div>
</template>
