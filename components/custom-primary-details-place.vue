<script setup lang="ts">

const t = useTranslations();

const props = defineProps<{entity: EntityFeature}>();

const collapsibleRelations: Array<{
	relationType: RelationType,
	systemClass?: string,
	title: string
}> = [
	{
		relationType: {
			crmCode:"P46"
		},
		systemClass: "artifact",
		title: t("Relations.Artifacts")
	},
	{
		relationType: {
			crmCode:"P46"
		},
		systemClass: "human_remains",
		title: t("Relations.HumanRemains")
	},
]

const emit = defineEmits({
	handledRelations(payload: Array<RelationType>) {
		return payload;
	}}
);

const handledRelations: Array<RelationType> = [
	{
		crmCode: "P46"
	},
]

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
		:system-class="rel.systemClass"
		:relation-type="rel.relationType"
	/>
</template>
