<script lang="ts" setup>
const props = defineProps<{
	images: Array<{ license: string; url: string }>;
}>();
</script>

<template>
	<Carousel class="mx-14">
		<CarouselPrevious />
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
		<CarouselNext />
	</Carousel>
</template>
