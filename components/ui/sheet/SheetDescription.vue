<script lang="ts" setup>
import { DialogDescription, type DialogDescriptionProps } from "radix-vue";

import { cn } from "@/utils/styles";

const props = defineProps<DialogDescriptionProps & { class?: string }>();
</script>

<template>
	<DialogDescription :class="cn('text-sm text-muted-foreground', props.class)" v-bind="props">
		<slot />
	</DialogDescription>
</template>
