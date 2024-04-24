<script lang="ts" setup>
import { ChevronsUpDown } from 'lucide-vue-next';

const { getUnprefixedId } = useIdPrefix();

type Relation = NonNullable<EntityFeature["relations"]>[0]
& {
	id: number,
}

const props = defineProps<{title: string, relations: EntityFeature["relations"]}>();

const actorRelations = computed(() => {
	return props.relations?.reduce((acc: Array<Relation>, relation) => {
		if(relation.relationType !== "crm:OA7 has relationship to") return acc;
		if(!relation.relationTo) return acc;
		return [
			...acc,
			{
				...relation,
				id: useToNumber(getUnprefixedId(relation.relationTo)).value
			}
		]
	}, [])
})

const collapsibleRelations = computed(() => {
	if(!actorRelations.value?.length) return [];

	return actorRelations.value.splice(1)
})

const isOpen = ref(false)
</script>

<template v-if="actorRelations?.length">
	<Collapsible
    v-model:open="isOpen"
		class="space-y-2"
	>
    <div class="flex items-center justify-between space-x-4 px-4">
      <h4 class="text-sm font-semibold">
				{{ title }}
      </h4>
      <CollapsibleTrigger as-child>
        <Button variant="ghost" size="sm" class="w-9 p-0">
          <ChevronsUpDown class="size-4" />
          <span class="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>
		<div class="rounded-md border px-4 py-3 text-sm">
			<!-- TODO: Make to preview Link and Create enity list entry component -->
			{{ actorRelations?.[0]?.label }}
		</div>
		<template v-if="collapsibleRelations.length > 1">
			<CollapsibleContent class="space-y-2">
				<template
					v-for="rel in collapsibleRelations"
					:key="`actor-rel-${rel.label}`"
				>
				<div class="rounded-md border px-4 py-3 text-sm">
					<EntityPreviewLink :id="rel.id" as-child>
						{{ rel.label }}
					</EntityPreviewLink>
				</div>
				</template>
			</CollapsibleContent>
		</template>
	</Collapsible>
</template>
