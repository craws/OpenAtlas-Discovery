<script lang="ts" setup>
const t = useTranslations();

const props = defineProps<{
	descriptions: Array<{ value?: string }>;
}>();

const filteredDescriptions = computed(() => {
	return props.descriptions.filter((description: { value?: string }) => {
		return description.value;
	});
});
</script>

<template>
	<template v-if="filteredDescriptions.length > 0">
		<div
			v-for="(description, index) in filteredDescriptions"
			:key="description.value ?? 'descr' + index"
		>
			<template v-if="description.value">
				<VDivider v-if="index > 0" />
				<p class="text-md">
					{{ description.value }}
				</p>
			</template>
		</div>
	</template>
	<template v-else>
		<p class="text-md">
			{{ t("EntityDescriptionsDisplay.no-descriptions") }}
		</p>
	</template>
</template>
