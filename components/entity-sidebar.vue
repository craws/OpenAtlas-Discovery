<script setup lang="ts">


import {ChevronLeftIcon,ChevronRightIcon } from "lucide-vue-next"

const t = useTranslations();

const props = defineProps<{entity: EntityFeature}>();

const images = computed(() => {
	return props.entity.depictions
		?.reduce((acc: Array<{url: string, license:string}>, depiction) => {
			if (depiction.url && depiction.license) {
				acc.push({
					url: depiction.url,
					license: depiction.license
				});
			}
			return acc;
		}, []);

});

</script>

<template>
	<details class="group absolute z-10 mb-2 mr-2 h-full w-0 open:w-1/3">
		<summary class=" absolute left-full top-1/2 block ">
			<ChevronLeftIcon class="ml-auto hidden size-8 group-open:block"/>
			<ChevronRightIcon class="ml-auto size-8 group-open:hidden" />
			<span class="sr-only">{{ t("EntityPage.sidebar.toggle", {title: entity.properties.title}) }}</span>
		</summary>

		<!-- START: <entity-primary-details/> -->
		<Card class="h-full">
			<CardHeader>
				<EntitySystemClass :system-class="entity.systemClass" />
				<PageTitle>{{ entity.properties.title }}</PageTitle>
				<EntityAliases v-if="entity.names" :aliases="entity.names" />
				<EntityTimespans :timespans="entity.when?.timespans" />
			</CardHeader>
			<CardContent>
				<div class="grid gap-4">
					<EntityDescriptions :descriptions="entity?.descriptions ?? []" />
					<slot name="custom-primary-details" />
					<!-- Types -->
					<div class=" flex flex-row flex-wrap gap-1">
						<TypesPopover
							v-for="type in entity.types"
							:key="(type.identifier ?? type.label) ?? 'missing'"
							:type="type" />
					</div>
					<EntityImages v-if="images" :images="images" class="overflow-hidden"/>
				</div>
			</CardContent>
		</Card>
		<!-- END: <entity-primary-details/> -->


		<!-- <slot name="custom-details" /> -->
		<!-- <component v-if="hasCustomDetails" v-bind:is="entityDetailsDict" bind:entity-data /> -->


		<!-- <entity-details v-bind="details: {title: title, data: someData}" /> -->
	</details>
</template>
