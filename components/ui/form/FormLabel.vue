<script lang="ts" setup>
import { Label, type LabelProps } from "radix-vue";

import { useFormField } from "@/components/ui/form/useFormField";
import { cn } from "@/utils/styles";

const _props = defineProps<LabelProps>();

const { error, formItemId } = useFormField();
</script>

<template>
	<Label
		:class="
			cn(
				'block text-sm tracking-tight font-medium text-foreground text-left',
				error && 'text-destructive',
				$attrs.class ?? '',
			)
		"
		:for="formItemId"
	>
		<slot />
	</Label>
</template>
