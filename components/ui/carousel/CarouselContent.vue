<script setup lang="ts">
import type { WithClassAsProps } from "@/components/ui/carousel/interface";
import { useCarousel } from "@/components/ui/carousel/useCarousel";
import { cn } from "@/utils/styles";

defineOptions({
	inheritAttrs: false,
});

const props = defineProps<WithClassAsProps>();

const { carouselRef, orientation } = useCarousel();
</script>

<template>
	<div ref="carouselRef" class="overflow-hidden">
		<div
			:class="cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', props.class)"
			v-bind="$attrs"
		>
			<slot />
		</div>
	</div>
</template>
