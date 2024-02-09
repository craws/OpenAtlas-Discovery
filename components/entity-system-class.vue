<script setup lang="ts">
defineProps<{
	systemClass: string;
}>();

const t = useTranslations();
</script>

<template>
	<div>
		<Component :is="getEntityIcon(systemClass)" class="inline size-4" />
		{{ t(`SystemClassNames.${systemClass}`) ?? "System Class" }}
	</div>
</template>
