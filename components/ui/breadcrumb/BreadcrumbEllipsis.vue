<script lang="ts" setup>
import { EllipsisIcon } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";

import { cn } from "@/utils/styles";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<span
		role="presentation"
		aria-hidden="true"
		:class="cn('flex h-9 w-9 items-center justify-center', props.class)"
	>
		<slot>
			<EllipsisIcon class="size-4" />
		</slot>
		<span class="sr-only">More</span>
	</span>
</template>
