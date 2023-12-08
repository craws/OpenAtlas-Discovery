<script setup lang="ts">
import "../styles/global.css";
</script>

<template>
	<VApp>
		<VMain class="d-flex flex-column">
			<HeaderBar />
			<VDivider />
			<NuxtPage />
			<VSpacer />
			<OADFooter />
		</VMain>
	</VApp>
</template>

<style>
.nav-item {
	text-decoration: none;
	transition: all 200ms ease-in-out;
	min-width: 50px;
}

.nav-item:hover {
	background-color: rgba(0, 0, 0, 0.05);
}

.language-menu .v-overlay__content {
	border-top-right-radius: 0 !important;
	border-top-left-radius: 0 !important;
}
</style>
