<script setup lang="ts">
import {ChevronLeftIcon,ChevronRightIcon } from "lucide-vue-next"

const t = useTranslations();

const { getUnprefixedId } = useIdPrefix();

const props = defineProps<{entity: EntityFeature}>();

const { data, error, isPending, isPlaceholderData, suspense } = useGetBySystemClass(
	computed(() => {
		return { system_class: "feature"};
	}),
	computed(() => {
		return { show: ["none"], limit: 0 };
	})
);

const isLoading = computed(() => {
	return isPending.value || isPlaceholderData.value;
});

const features = computed(() => {
	return data.value?.enities.map((feat) => {return feat.features[0]}) ?? [];
});

const currentFeatureIndex = computed(() => {
	return features.value.findIndex((feature) => feature?.['@id'] === props.entity['@id']);
})

const previousFeature = computed(() => {
	if(currentFeatureIndex.value === 0) {
		return null
	}
	return features.value[currentFeatureIndex.value - 1];
})

const nextFeature = computed(() => {
	if(currentFeatureIndex.value === features.value.length - 1) {
		return null
	}
	return features.value[currentFeatureIndex.value + 1];
})

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
	<div class="flex justify-between" >
		<NavLink
			v-if="previousFeature"
			:href="{ path: `/entities/${ getUnprefixedId(previousFeature['@id'])}`}"
			class="
				flex items-center
				underline decoration-dotted transition hover:no-underline focus-visible:no-underline
				"
		>
			<ChevronLeftIcon class="size-4" />
			<span>{{ previousFeature.properties.title }}</span>
			<span class="sr-only">{{ t("EntitySidebar.PreviousFeature") }}</span>
		</NavLink>
		<NavLink
			v-if="nextFeature"
			:href="{ path: `/entities/${ getUnprefixedId(nextFeature['@id'])}`}"
			class="
				flex items-center
				underline decoration-dotted transition hover:no-underline focus-visible:no-underline
			"
		>
			<span>{{ nextFeature.properties.title }}</span>
			<span class="sr-only">{{ t("EntitySidebar.NextFeature") }}</span>
			<ChevronRightIcon class="size-4" />
		</NavLink>
	</div>
	<GroupedRelationCollapsible
		v-for="rel in collapsibleRelations"
		:key="rel.relationType.crmCode + rel.relationType.inverse"
		:title="rel.title"
		:relations="entity.relations"
		:system-class="rel.systemClass"
		:relation-type="rel.relationType"
	/>
</template>
