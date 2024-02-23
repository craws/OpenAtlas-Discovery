<script lang="ts" setup>
import { useFormField } from "@/components/ui/form/useFormField";
import { cn } from "@/utils/styles";

const { formDescriptionId } = useFormField();
</script>

<template>
	<p :id="formDescriptionId" :class="cn('text-[0.8rem] text-muted-foreground', $attrs.class ?? '')">
		<slot />
	</p>
</template>
