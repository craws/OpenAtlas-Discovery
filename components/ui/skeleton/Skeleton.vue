<script lang="ts" setup>
import { cn } from "@/utils/styles";

interface SkeletonProps {
	class?: string;
}

const props = defineProps<SkeletonProps>();
</script>

<template>
	<div :class="cn('animate-pulse rounded-md bg-secondary', props.class)" />
</template>
