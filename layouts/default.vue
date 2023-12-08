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
	min-width: 50px;
	text-decoration: none;
	transition: all 200ms ease-in-out;
}

.nav-item:hover {
	background-color: rgb(0 0 0 / 5%);
}

.language-menu .v-overlay__content {
	border-top-left-radius: 0 !important;
	border-top-right-radius: 0 !important;
}
</style>
