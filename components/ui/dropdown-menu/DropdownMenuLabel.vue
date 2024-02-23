<script lang="ts" setup>
import { DropdownMenuLabel, type DropdownMenuLabelProps } from "radix-vue";

import { cn } from "@/utils/styles";

const props = defineProps<
	DropdownMenuLabelProps & {
		inset?: boolean;
		class?: string;
	}
>();
</script>

<template>
	<DropdownMenuLabel
		v-bind="props"
		:class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', props.class)"
	>
		<slot />
	</DropdownMenuLabel>
</template>
