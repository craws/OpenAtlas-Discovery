<script setup lang="ts">
import type {
	CarouselEmits,
	CarouselProps,
	WithClassAsProps,
} from "@/components/ui/carousel/interface";
import { useProvideCarousel } from "@/components/ui/carousel/useCarousel";
import { cn } from "@/utils/styles";

const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {
	orientation: "horizontal",
});

const emits = defineEmits<CarouselEmits>();

const carouselArgs = useProvideCarousel(props, emits);

defineExpose(carouselArgs);

function onKeyDown(event: KeyboardEvent) {
	const prevKey = props.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
	const nextKey = props.orientation === "vertical" ? "ArrowDown" : "ArrowRight";

	if (event.key === prevKey) {
		event.preventDefault();
		carouselArgs.scrollPrev();

		return;
	}

	if (event.key === nextKey) {
		event.preventDefault();
		carouselArgs.scrollNext();
	}
}
</script>

<template>
	<!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
	<div
		:class="cn('relative', props.class)"
		role="region"
		aria-roledescription="carousel"
		tabindex="0"
		@keydown="onKeyDown"
	>
		<slot v-bind="carouselArgs" />
	</div>
</template>
