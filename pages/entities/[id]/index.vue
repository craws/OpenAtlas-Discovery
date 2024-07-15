<script setup lang="ts">
definePageMeta({
	middleware: [
		function (to, _from) {
			return navigateTo(`${to.path}/map`); // TODO: Enable setting the default view through config
		},
	],
});
</script>
