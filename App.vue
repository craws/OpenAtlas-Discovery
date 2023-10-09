<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
<script setup lang="ts">
const { $discoveryConfig } = useNuxtApp();

useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - ${$discoveryConfig.title}` : $discoveryConfig.title;
	},
	link: [getFavicon()],
});
</script>
