<script lang="ts" setup>
import type { CarouselApi } from "@/components/ui/carousel";
import { Toggle } from "@/components/ui/toggle";

const props = defineProps<{
	images: Array<{
		IIIFManifest?: string;
		license?: string;
		mimetype?: string;
		title?: string;
		url?: string;
	}>;
}>();

const api = ref<CarouselApi>();
const current = ref(0);

const t = useTranslations();
let show = ref(false);

function toggleIIIF() {
	show.value = !show.value;
}

function setApi(val: CarouselApi) {
	api.value = val;
	api.value.scrollTo(current.value, true);
}

watch(api, (api) => {
	if (!api) return;

	current.value = api.selectedScrollSnap();

	api.on("select", () => {
		current.value = api.selectedScrollSnap();
	});
});

const currentImage = computed(() => {
	return props.images[current.value];
});
</script>

<template>
	<div class="relative">
		<Carousel v-if="!show" @init-api="setApi">
			<CarouselPrevious v-if="props.images.length > 2" />
			<CarouselContent>
				<CarouselItem v-for="(image, index) of props.images" :key="index" class="h-full">
					<Card class="pb-3">
						<figure class="grid h-96 grid-rows-[1fr_auto] gap-y-1.5 overflow-hidden">
							<div class="relative">
								<img alt="" class="absolute size-full object-contain" :src="image.url" />
							</div>
							<figcaption class="justify-self-center">{{ image.license }}</figcaption>
						</figure>
					</Card>
				</CarouselItem>
			</CarouselContent>
			<CarouselNext v-if="props.images.length > 2" />
		</Carousel>
		<EntityMiradorViewer v-if="show && currentImage" :images="[currentImage]" />
		<Toggle variant="iiif" class="absolute bottom-0 right-0 z-10 m-4" @click="toggleIIIF">
			{{ t("EntityPage.iiif") }}
		</Toggle>
	</div>
</template>
