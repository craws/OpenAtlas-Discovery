<script lang="ts" setup>
const id = "main-content";
</script>

<template>
	<main :id="id" :tabindex="-1">
		<slot />
	</main>
</template>
