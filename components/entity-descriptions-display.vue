<script lang="ts" setup>
import { isNonEmptyString } from "@acdh-oeaw/lib";

const props = defineProps<{
	descriptions: Array<{ value?: string }>;
}>();

const t = useTranslations();

const descriptions = computed(() => {
	const descriptions: Array<string> = [];
	props.descriptions.forEach((description) => {
		if (isNonEmptyString(description.value)) {
			descriptions.push(description.value);
		}
	});
	return descriptions;
});
</script>

<template>
	<template v-if="descriptions.length > 0">
		<div v-for="(description, index) in descriptions" :key="index">
			<div v-if="index > 0" class="h-px w-full bg-border" role="separator" />
			<p class="text-md">{{ description }}</p>
		</div>
	</template>
	<template v-else>
		<p class="text-md">
			{{ t("EntityDescriptionsDisplay.no-descriptions") }}
		</p>
	</template>
</template>
