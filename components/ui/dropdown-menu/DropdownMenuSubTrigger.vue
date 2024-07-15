<script lang="ts" setup>
import { ChevronRightIcon } from "lucide-vue-next";
import { DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps } from "radix-vue";

import { cn } from "@/utils/styles";

const props = defineProps<DropdownMenuSubTriggerProps & { class?: string }>();
</script>

<template>
	<DropdownMenuSubTrigger
		v-bind="props"
		:class="[
			cn(
				'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
				props.class,
			),
		]"
	>
		<slot />
		<ChevronRightIcon class="ml-auto size-4" />
	</DropdownMenuSubTrigger>
</template>
