<script lang="ts" setup>
import { miradorConfig } from "@/config/mirador.config";


const props = defineProps<{
	images: Array<{
		IIIFManifest: string | undefined;
		license: string | undefined;
		mimetype?: string | undefined;
		title?: string | undefined;
		url?: string | undefined;
	}>;
}>();

const imageUrls: Array<string> = [];

props.images.forEach((url) => {
	if (url.IIIFManifest != null) imageUrls.push(url.IIIFManifest);
});

console.log(imageUrls);
</script>

<template>
	<Card class="h-96 overflow-hidden">
		<VisualisationContainer v-slot="{ height, width }">
			<MiradorViewer v-if="height && width" :config="miradorConfig" :images="imageUrls" />
		</VisualisationContainer>
	</Card>
</template>
