<script setup lang="ts">
import { MapPinIcon } from 'lucide-vue-next';

const {getUnprefixedId} = useIdPrefix();

const t = useTranslations();

const props = defineProps<{entity: EntityFeature}>();

interface Place {
	label: string,
	id: string,
	relationType: RelationType | null
}

const getRelationGroupTitle = (relation: RelationType) => {
	if(props.entity.systemClass === 'person') {
		return useRelationGroupTitle(relation, 'person')
	}
	return useRelationGroupTitle(relation)
}


const collapsibleRelations: Array<{
	relationType: RelationType,
	title: string
}> = [
	{
		relationType: {
			crmCode:"OA7"
		},
		title: t(getRelationGroupTitle({crmCode: "OA7"}))
	},
	{
		relationType: {
			crmCode: "P107",
			inverse: true
		},
		title: t(getRelationGroupTitle({crmCode:"P107", inverse: true}))
	},
	{
		relationType: {
			crmCode: "P107"
		},
		title: t(getRelationGroupTitle({crmCode:"P107"}))
	}
]

const handledRelations: Array<RelationType> = [
	{
		crmCode: "P107"
	},
	{
		crmCode: "P74"
	},
	{
		crmCode: "OA7"
	},
	{
		crmCode: "OA8"
	},
	{
		crmCode: "OA9"
	}
]

const emit = defineEmits({
	handledRelations(payload: Array<RelationType>) {
		return payload;
	}}
);

onMounted(() => {
	emit("handledRelations", handledRelations);
})


</script>

<template>
	<GroupedRelationCollapsible
		v-for="rel in collapsibleRelations"
		:key="rel.relationType.crmCode + rel.relationType.inverse"
		:title="rel.title"
		:relations="entity.relations"
		:relation-type="rel.relationType"
	/>
</template>
