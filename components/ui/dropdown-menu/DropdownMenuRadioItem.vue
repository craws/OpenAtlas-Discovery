<script lang="ts" setup>
import { DotIcon } from "lucide-vue-next";
import {
	DropdownMenuItemIndicator,
	DropdownMenuRadioItem,
	type DropdownMenuRadioItemEmits,
	type DropdownMenuRadioItemProps,
	useEmitAsProps,
} from "radix-vue";

import { cn } from "@/utils/styles";

const props = defineProps<DropdownMenuRadioItemProps & { class?: string }>();

const emits = defineEmits<DropdownMenuRadioItemEmits>();
</script>

<template>
	<DropdownMenuRadioItem
		v-bind="{ ...props, ...useEmitAsProps(emits) }"
		:class="
			cn(
				'flex relative items-center rounded-md transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-outline-hover pl-7 py-1.5 text-sm outline-none select-none cursor-default',
				props.class,
			)
		"
	>
		<span class="absolute left-2 flex size-3.5 items-center justify-center">
			<DropdownMenuItemIndicator>
				<DotIcon class="size-4 fill-current" />
			</DropdownMenuItemIndicator>
		</span>
		<slot />
	</DropdownMenuRadioItem>
</template>
