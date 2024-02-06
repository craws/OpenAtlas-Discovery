<script setup lang="ts">
const t = useTranslations();

defineProps<{
	systemClass: string;
}>()
</script>

<template>
	<div>
			<Component :is="getEntityIcon(systemClass)" class="inline size-4" />
			{{ t(`SystemClassNames.${systemClass}`) ?? 'System Class' }}
	</div>
</template>
