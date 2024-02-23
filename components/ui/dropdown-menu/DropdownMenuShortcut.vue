<script lang="ts" setup>
import { cn } from "@/utils/styles";
</script>

<template>
	<span :class="cn('ml-auto text-xs tracking-widest opacity-60', $attrs.class ?? '')">
		<slot />
	</span>
</template>
