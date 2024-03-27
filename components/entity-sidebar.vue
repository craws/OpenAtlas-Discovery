<script setup lang="ts">
import {ChevronLeftIcon,ChevronRightIcon } from "lucide-vue-next"


const t = useTranslations();

defineProps<{entity: EntityFeature}>();



</script>

<template>
	<details class="group absolute mb-2 mr-2 h-full w-0 open:w-1/3">
		<summary class=" absolute left-full top-1/2 block ">
			<ChevronLeftIcon class="ml-auto hidden size-8 group-open:block"/>
			<ChevronRightIcon class="ml-auto size-8 group-open:hidden" />
			<span class="sr-only">{{ t("EntityPage.sidebar.toggle") }}</span>
		</summary>

		<Card class="h-full">
			<CardHeader>
				<EntitySystemClass :system-class="entity.systemClass" />
				<PageTitle>{{ entity.properties.title }}</PageTitle>
			</CardHeader>
			<CardContent>
				<div class="grid gap-4">
					<EntityTimespans :timespans="entity.when?.timespans" />
					<EntityDescriptions :descriptions="entity?.descriptions ?? []" />
				</div>
			</CardContent>
			<!-- <entity-primary-details/> -->
			<!-- <component v-if="hasCustomDetails" v-bind:is="entityDetailsDict" bind:entity-data /> -->
			<!-- <entity-details v-bind="details: {title: title, data: someData}" /> -->
		</Card>
	</details>
</template>
