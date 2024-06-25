<script setup lang="ts">
import {ChevronLeftIcon,ChevronRightIcon } from "lucide-vue-next"

const t = useTranslations();

defineProps<{entity: EntityFeature}>();

const openState = ref(false);

onMounted(() => {
	openState.value = true;
});

const handledRelations = ref<Array<RelationType>>([]);

const updateHandledRelations = (relations: Array<RelationType>) => {
	handledRelations.value = [...relations];
}


</script>

<template>
	<details
		class="
			group
			absolute z-10 mb-2 mr-2 h-full w-1/4
			translate-x-[-25vw]
			transition-transform
			duration-300 open:translate-x-0 "
			:open="openState"
		>
		<summary class=" absolute left-full top-1/2 block -translate-x-2 rounded-md bg-[hsl(var(--card))] py-2">
			<ChevronLeftIcon class="ml-auto hidden size-8 group-open:block"/>
			<ChevronRightIcon class="ml-auto size-8 group-open:hidden" />
			<span class="sr-only">{{ t("EntityPage.sidebar.toggle", {title: entity.properties.title}) }}</span>
		</summary>
		<Card class="h-full overflow-y-scroll">
			<EntityPrimaryDetails :entity="entity" @handled-relations="updateHandledRelations" />


			<slot name="custom-details" />
			<!-- <component v-if="hasCustomDetails" v-bind:is="entityDetailsDict" bind:entity-data /> -->

			<EntityDetails :handled-relations="handledRelations" :relations="entity.relations" class="mx-4 mt-16" />
		</Card>

	</details>
</template>
