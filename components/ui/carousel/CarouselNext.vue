<script setup lang="ts">
import { ArrowRightIcon } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/styles";

import type { WithClassAsProps } from "./interface";
import { useCarousel } from "./useCarousel";

const props = defineProps<WithClassAsProps>();

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
	<Button
		:disabled="!canScrollNext"
		:class="
			cn(
				'touch-manipulation absolute h-8 w-8 rounded-full p-0',
				orientation === 'horizontal'
					? '-right-12 top-1/2 -translate-y-1/2'
					: '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
				props.class,
			)
		"
		variant="outline"
		@click="scrollNext"
	>
		<slot>
			<ArrowRightIcon aria-hidden="true" class="size-4 shrink-0 text-current" />
		</slot>
	</Button>
</template>
