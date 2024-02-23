<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from "radix-vue";

import { buttonVariants } from "@/components/ui/button/index";
import { cn, type VariantProps } from "@/utils/styles";

interface ButtonVariantProps extends VariantProps<typeof buttonVariants> {}

interface Props extends PrimitiveProps {
	as?: string;
	size?: ButtonVariantProps["size"];
	variant?: ButtonVariantProps["variant"];
}

withDefaults(defineProps<Props>(), {
	as: "button",
	size: "default",
	variant: "default",
});
</script>

<template>
	<Primitive
		:as="as"
		:as-child="asChild"
		:class="cn(buttonVariants({ size, variant }), $attrs.class ?? '')"
	>
		<slot />
	</Primitive>
</template>
