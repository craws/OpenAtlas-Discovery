<script lang="ts" setup>
import { useId } from "radix-vue";

import { FORM_ITEM_INJECTION_KEY } from "@/components/ui/form/form.context";
import { cn } from "@/utils/styles";

const id = useId();

provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
	<div :class="cn('space-y-2', $attrs.class ?? '')">
		<slot />
	</div>
</template>
