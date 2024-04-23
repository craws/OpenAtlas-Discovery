<script setup lang="ts">
import {ChevronLeftIcon,ChevronRightIcon } from "lucide-vue-next"

const t = useTranslations();

defineProps<{entity: EntityFeature}>();

</script>

<template>
	<details class="group absolute z-10 mb-2 mr-2 h-full w-0 open:w-1/3">
		<summary class=" absolute left-full top-1/2 block ">
			<ChevronLeftIcon class="ml-auto hidden size-8 group-open:block"/>
			<ChevronRightIcon class="ml-auto size-8 group-open:hidden" />
			<span class="sr-only">{{ t("EntityPage.sidebar.toggle", {title: entity.properties.title}) }}</span>
		</summary>
		<Card class="h-full">
			<EntityPrimaryDetails :entity="entity" />


			<slot name="custom-details" />
			<!-- <component v-if="hasCustomDetails" v-bind:is="entityDetailsDict" bind:entity-data /> -->


			<!-- <entity-details v-bind="details: {title: title, data: someData}" /> -->
		</Card>

	</details>
</template>
