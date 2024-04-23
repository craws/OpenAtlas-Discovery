<script setup lang="ts">
import CustomPrimaryDetailsActor } from '@/components/custom-primary-details-actor.vue';


const props = defineProps<{
	entity: EntityFeature,
}>();

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

const customPrimaryDetails = computed(() => {
	return entityPrimaryDetailsDict[props.entity.systemClass];
});

const entityPrimaryDetailsDict: Record<string, Component> = {
	"person": CustomPrimaryDetailsActor,
}

</script>

<template>
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

					<component :is="customPrimaryDetails" v-if="customPrimaryDetails" :entity="entity" />

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
</template>
