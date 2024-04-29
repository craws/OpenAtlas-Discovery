<script lang="ts" setup>
const { getUnprefixedId } = useIdPrefix();

defineProps<{relation: NonNullable<EntityFeature["relations"]>[0]}>();

</script>

<template>
	<div class="flex justify-between">
		<div>
			<Component :is="getEntityIcon(relation.relationSystemClass)" v-if="relation.relationSystemClass" class="mr-1 inline size-5 pb-1" />
			<EntityPreviewLink :id="useToNumber(getUnprefixedId(relation.relationTo ?? '')).value" as-child>
				{{ relation.label }}
			</EntityPreviewLink>
		</div>
		<SimpleTimespan :timespans="relation.when?.timespans" />
	</div>
</template>
