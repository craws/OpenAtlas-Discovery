<script lang="ts" setup>
defineProps<{ title: string; relations: Array<NonNullable<EntityFeature["relations"]>[0]> }>();
</script>

<template v-if="relations?.length">
	<div class="space-x-4 px-4"></div>
	<div class="flex items-center justify-between">
		<h4 class="text-sm font-semibold">
			{{ title }} {{ relations.length > 1 ? `(${relations.length})` : "" }}
		</h4>
	</div>

	<RelationListEntry v-if="relations[0]" :relation="relations[0]" />

	<template v-for="relation in relations.slice(1)" :key="getUnprefixedId(relation.relationTo)">
		<RelationListEntry :relation="relation" />
	</template>
</template>
