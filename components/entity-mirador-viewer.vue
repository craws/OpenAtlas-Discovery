<script lang="ts" setup>
import { miradorConfig } from "@/config/mirador.config";

const props = defineProps<{
	images: Array<{
		IIIFManifest?: string;
		license?: string;
		mimetype?: string;
		title?: string;
		url?: string;
	}>;
}>();

const imageUrls = computed(() => {
	const imageUrls: Array<string> = [];

	props.images.forEach((url) => {
		if (url.IIIFManifest != null) {
			imageUrls.push(url.IIIFManifest);
		}
	});

	return imageUrls;
});
</script>

<template>
	<Card class="h-96 overflow-hidden">
		<VisualisationContainer v-slot="{ height, width }">
			<LazyMiradorViewer v-if="height && width" :config="miradorConfig" :images="imageUrls" />
		</VisualisationContainer>
	</Card>
</template>
