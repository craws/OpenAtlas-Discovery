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

const collapsibleRelations = [
	{
		relationType: "crm:OA7 has relationship to",
		title: t('Actor.Relations')
	},
	{
		relationType: "crm:P107i is current or former member of",
		title: t('Actor.MemberOf')
	},
	{
		relationType: "crm:P107 has current or former member",
		title: t('Actor.hasMember')
	}

]

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
	<GroupedRelationCollapsible
		v-for="rel in collapsibleRelations"
		:key="rel.relationType"
		:title="rel.title"
		:relations="entity.relations"
		:relation-type="rel.relationType"
	/>
</template>
