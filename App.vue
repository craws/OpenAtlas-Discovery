<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
<script setup lang="ts">
import { discoveryConfig } from "~/config/discoveryConfig";

useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - ${discoveryConfig.title}` : discoveryConfig.title;
	},
	link: [getFavicon()],
});
</script>
