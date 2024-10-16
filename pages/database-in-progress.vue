<script setup lang="ts">
definePageMeta({
	layout: "default",
});
const t = useTranslations();
</script>

<template>
	<MainContent>
		<div class="flex size-full items-center justify-center">
			{{ t("DataPage.work-in-progress") }}
		</div>
	</MainContent>
</template>
