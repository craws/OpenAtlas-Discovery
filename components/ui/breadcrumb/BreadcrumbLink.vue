<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";

import { cn } from "@/utils/styles";

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), {
	as: "a",
});
</script>

<template>
	<Primitive
		:as="as"
		:as-child="asChild"
		:class="cn('transition-colors hover:text-foreground', props.class)"
	>
		<slot />
	</Primitive>
</template>
