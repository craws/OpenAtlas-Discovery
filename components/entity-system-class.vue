<script setup lang="ts">
defineProps<{
	systemClass: string;
}>();

const t = useTranslations();
</script>

<template>
	<div class="flex items-center gap-1">
		<Component :is="getEntityIcon(systemClass)" class="inline size-4" />
		{{ t(`SystemClassNames.${systemClass}`) ?? "System Class" }}
	</div>
</template>
