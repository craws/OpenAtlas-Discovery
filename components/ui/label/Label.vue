<script lang="ts" setup>
import type { ClassValue } from "class-variance-authority/types";
import { Label, type LabelProps } from "radix-vue";

import { cn } from "@/utils/styles";

const props = defineProps<LabelProps & { class?: ClassValue }>();
</script>

<template>
	<!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
	<Label
		v-bind="props"
		:class="cn('block text-sm tracking-tight font-medium text-foreground text-left', props.class)"
	>
		<slot />
	</Label>
</template>
