<script lang="ts" setup>
const { getUnprefixedId } = useIdPrefix();
const route = useRoute();

defineProps<{ relation: NonNullable<EntityFeature["relations"]>[0] }>();

function getPath() {
	if (route.path.includes("visualization")) {
		return "visualization";
	}
	return "";
}

const currentMode = computed(() => {
	return route.query.mode;
});
</script>

<template>
	<div class="flex justify-between">
		<div>
			<Component
				:is="getEntityIcon(relation.relationSystemClass)"
				v-if="relation.relationSystemClass"
				class="mr-1 inline size-5 pb-1"
			/>
			<NavLink
				class="underline decoration-dotted hover:no-underline"
				:href="{
					path: `/${getPath()}`,
					query: { mode: currentMode, selection: getUnprefixedId(relation.relationTo ?? '') },
				}"
			>
				{{ relation.label }}
			</NavLink>
			<!-- <EntityPreviewLink :id="useToNumber(getUnprefixedId(relation.relationTo ?? '')).value" as-child>
				{{ relation.label }}
			</EntityPreviewLink> -->
		</div>
		<SimpleTimespan class="ml-4" :timespans="relation.when?.timespans" />
	</div>
</template>
