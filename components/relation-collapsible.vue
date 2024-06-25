<script lang="ts" setup>
import { ChevronDown, ChevronsUpDown,ChevronUp } from 'lucide-vue-next';

defineProps<{title: string, relations: Array<NonNullable<EntityFeature["relations"]>[0]>}>();

const isOpen = ref(false)
</script>

<template v-if="relations?.length">
	<Collapsible
    v-model:open="isOpen"
		class="space-y-2"
	>
	<div class="space-x-4 px-4">

	</div>
    <div class="flex items-center justify-between ">
      <h4 class="text-sm font-semibold">
				{{ title }} {{  relations.length > 1 ? `(${relations.length})` : '' }}
      </h4>
      <CollapsibleTrigger v-if="relations.length > 1" as-child>
        <Button variant="ghost" size="sm" class="w-9 p-0">
					<ChevronUp v-if="isOpen" class="size-4" />
					<ChevronDown v-else class="size-4" />
          <span class="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>

		<RelationListEntry v-if="relations[0]" :relation="relations[0]" />
		<CollapsibleContent  v-if="relations.length > 1" class="space-y-3">
			<template v-for="relation in relations.slice(1)" :key="getUnprefixedId(relation.relationTo)">
				<RelationListEntry :relation="relation" />
			</template>
		</CollapsibleContent>

	</Collapsible>
</template>
