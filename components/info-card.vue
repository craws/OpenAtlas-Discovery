<script setup lang="ts">
defineProps<{
	title?: string;
	icon?: Component;
}>();
</script>

<template>
	<Card class="max-w-48 p-4">
		<CardTitle>
			<template v-if="title">
				{{ title }}
			</template>
			<slot v-if="!title" name="title" />
		</CardTitle>
		<p class="mt-2 text-wrap text-muted-foreground">
			<component :is="icon" v-if="icon" class="mr-1 inline-block size-4" />
			<slot name="content" />
		</p>
	</Card>
</template>
