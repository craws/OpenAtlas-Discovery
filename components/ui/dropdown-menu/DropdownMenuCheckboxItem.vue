<script lang="ts" setup>
import { CheckIcon } from "lucide-vue-next";
import {
	DropdownMenuCheckboxItem,
	type DropdownMenuCheckboxItemEmits,
	type DropdownMenuCheckboxItemProps,
	DropdownMenuItemIndicator,
	useEmitAsProps,
} from "radix-vue";

import { cn } from "@/utils/styles";

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: string }>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();
</script>

<template>
	<DropdownMenuCheckboxItem
		v-bind="{ ...props, ...useEmitAsProps(emits) }"
		:class="
			cn(
				'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				props.class,
			)
		"
	>
		<span class="absolute left-2 flex size-3.5 items-center justify-center">
			<DropdownMenuItemIndicator>
				<CheckIcon class="size-4" />
			</DropdownMenuItemIndicator>
		</span>
		<slot />
	</DropdownMenuCheckboxItem>
</template>
