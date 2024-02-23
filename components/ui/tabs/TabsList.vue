<script lang="ts" setup>
import { TabsList, type TabsListProps } from "radix-vue";

import { cn } from "@/utils/styles";

const props = defineProps<TabsListProps & { class?: string }>();
</script>

<template>
	<TabsList
		v-bind="props"
		:class="
			cn(
				'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
				props.class,
			)
		"
	>
		<slot />
	</TabsList>
</template>
