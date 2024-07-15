<script lang="ts" setup>
import { ChevronDownIcon } from "lucide-vue-next";
import { SelectIcon, SelectTrigger, type SelectTriggerProps } from "radix-vue";

import { cn } from "@/utils/styles";

const props = withDefaults(
	defineProps<SelectTriggerProps & { class?: string; invalid?: boolean }>(),
	{
		class: "",
		invalid: false,
	},
);
</script>

<template>
	<SelectTrigger
		v-bind="props"
		:class="[
			cn(
				'flex h-9 gap-x-1.5 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap [&>span]:truncate [&>span]:min-w-0',
				props.class,
			),
			props.invalid ? 'ring-2 !ring-destructive data-[placeholder]:!text-destructive' : '',
		]"
	>
		<slot />
		<SelectIcon as-child>
			<ChevronDownIcon class="size-4 opacity-50" />
		</SelectIcon>
	</SelectTrigger>
</template>
