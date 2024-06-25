<script lang="ts" setup>
import { useFilterRelations } from "@/composables/use-filter-relations";
import { groupByToMap } from "@acdh-oeaw/lib";
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const { getUnprefixedId } = useIdPrefix();

/** @param relations should be an  */
const props = defineProps<{title: string, relations: EntityFeature["relations"], relationType: RelationType, systemClass?: string}>();

const filteredRelations = useFilterRelations(props.relations, { relationType: props.relationType, systemClass: props.systemClass });

computed(() => {
	return props.relations?.reduce((acc: Array<NonNullable<EntityFeature["relations"]>[0]>, relation) => {
		const {crmCode, inverse} = extractRelationTypeFromRelationString(relation.relationType) ?? {};

		if(crmCode !== props.relationType.crmCode || inverse !== Boolean(props.relationType.inverse)) {
			return acc;
		}
		if(!relation.relationTo) {
			return acc;
		}

		return [
			...acc,
			{
				...relation,
				id: useToNumber(getUnprefixedId(relation.relationTo)).value
			}
		]
	}, []);
});

const groupedByType = computed(() => {
	return groupByToMap(filteredRelations ?? [], (rel): string | null | undefined => {return rel.type});
});

const relationsWithoutType = computed(() => {
	if(groupedByType.value.has(null)) return groupedByType.value.get(null);
	return [];

});

const isOpen = ref(false)

if(filteredRelations?.length && filteredRelations.length === 1) isOpen.value = true;

</script>

<template>
	<div v-if="filteredRelations?.length" class="rounded-md border px-4 py-3 text-sm">
		<Collapsible
			v-model:open="isOpen"
			class="space-y-2"
		>
			<div class="flex items-center justify-between space-x-4">
				<h4 class="text-sm font-semibold">
					{{ title }} {{  filteredRelations?.length && filteredRelations.length > 1 ? `(${filteredRelations.length})` : '' }}
				</h4>
				<CollapsibleTrigger v-if="filteredRelations?.length && filteredRelations.length > 1" as-child>
					<Button variant="ghost" size="sm" class="w-9 p-0">
						<ChevronUp v-if="isOpen" class="size-4" />
						<ChevronDown v-else class="size-4" />
						<span class="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent>
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
			</CollapsibleContent>
		</Collapsible>
	</div>
</template>
