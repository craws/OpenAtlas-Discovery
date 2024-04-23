<script setup lang="ts">

const {getUnprefixedId} = useIdPrefix();

const t = useTranslations();

const props = defineProps<{entity: EntityFeature}>();

interface Place {
	label: string,
	id: string,
	relationType: string
}


const places = computed(() => {
	return props.entity.relations?.reduce((acc: Array<Place>, relation) => {
		if(relation.relationSystemClass !== "object_location") return acc;
		if(!relation.label || !relation.relationTo || !relation.relationType) return acc;
		const id = getUnprefixedId(relation.relationTo);
		if(!id) return acc;
		return [
			...acc,
			{
				label: relation.label?.replace("Location of", "").trim(),
				id,
				relationType: relation.relationType.replace(/crm:\w{3}/, "").trim()
			}]
	}, []);
});



</script>

<template>
	<div class="flex w-full gap-2" >
		<Card v-for="(place, index) in places" :key="place.label || `place-${index}`">
			<CardHeader>
				<CardTitle>
					<EntityPreviewLink :id="useToNumber(place.id).value" :label="place.label" />
				</CardTitle>
				<CardDescription>
					{{ place.relationType }}
				</CardDescription>
			</CardHeader>
		</Card>
	</div>
</template>
