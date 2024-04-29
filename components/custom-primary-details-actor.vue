<script setup lang="ts">
import { MapPinIcon } from 'lucide-vue-next';


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
				label: relation.label,
				id,
				relationType: relation.relationType
			}]
	}, []);
});

// TODO: Move this to a shared location and add localization
const relationTypeLibrary: Ref<Record<string, string>> = computed(() => {
	if(props.entity.systemClass === 'person') return {
		'crm:P74 has current or former residence': 'Residence',
		'crm:OA9 ends in': 'Died in',
		'crm:OA8 begins in': 'Born in',
	}


	return {
		'crm:P74 has current or former residence': 'Residence',
		'crm:OA9 ends in': 'Ended in',
		'crm:OA8 begins in': 'Began in',
	}

});

</script>

<template>
	<div class="flex w-full flex-row flex-wrap gap-4">
		<EntityPreviewLink
			v-for="(place, index) in places"
			:id="useToNumber(place.id).value"
			:key="place.label || `place-${index}`"
		>
			<Card class="max-w-48 p-4">
				<p class="pb-2 font-bold" >{{ relationTypeLibrary[place.relationType] ?? '' }}</p>
				<p class="text-wrap text-muted-foreground">
					<MapPinIcon class="mr-1 inline-block size-4" />{{ place.label }}
				</p>
			</Card>
		</EntityPreviewLink>
	</div>
	<GroupedRelationCollapsible :title="t('Actor.Relations')" :relations="entity.relations" relation-type="crm:OA7 has relationship to" />
	<GroupedRelationCollapsible :title="t('Actor.MemberOf')" :relations="entity.relations" relation-type="crm:P107i is current or former member of" />
</template>
