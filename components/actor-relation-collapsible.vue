<script lang="ts" setup>
import { groupByToMap } from "@acdh-oeaw/lib";
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const { getUnprefixedId } = useIdPrefix();

const props = defineProps<{title: string, relations: EntityFeature["relations"]}>();

const actorRelations = computed(() => {
	const personalRelations = props.relations?.reduce((acc: Array<NonNullable<EntityFeature["relations"]>[0]>, relation) => {
		if(relation.relationType !== "crm:OA7 has relationship to") return acc;
		if(!relation.relationTo) return acc;
		return [
			...acc,
			{
				...relation,
				id: useToNumber(getUnprefixedId(relation.relationTo)).value
			}
		]
	}, []);

	return [...groupByToMap(personalRelations ?? [], (rel) => {return rel.type})];

})


const isOpen = ref(false)
</script>

<template v-if="actorRelations?.length">
	<div class="rounded-md border px-4 py-3 text-sm">
		<Collapsible
			v-model:open="isOpen"
			class="space-y-2"
		>
			<div class="flex items-center justify-between space-x-4">
				<h4 class="text-sm font-semibold">
					{{ title }}
				</h4>
				<CollapsibleTrigger as-child>
					<Button variant="ghost" size="sm" class="w-9 p-0">
						<ChevronDown v-if="isOpen" class="size-4" />
						<ChevronUp v-else class="size-4" />
						<span class="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent>
				<RelationCollapsible
					v-for="[type, rels] in actorRelations"
					:key="type"
					class="mb-8"
					:title="type ?? 'Type'"
					:relations="rels"
				/>
			</CollapsibleContent>
		</Collapsible>
	</div>
</template>
