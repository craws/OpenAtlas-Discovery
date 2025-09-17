<script setup lang="ts">
import type { HTMLAttributes } from "vue";

import { badgeVariants } from "@/components/ui/badge/index";
import { cn, type VariantProps } from "@/utils/styles";

interface BadgeVariantProps extends VariantProps<typeof badgeVariants> {}

const props = defineProps<{
	variant?: BadgeVariantProps["variant"];
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<div :class="cn(badgeVariants({ variant }), props.class)">
		<slot />
	</div>
</template>
