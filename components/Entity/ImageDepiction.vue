<script lang="ts" setup>
import type { LinkedPlacesDepiction } from "~~/composables/api";

export interface DepictionProps {
	depiction: LinkedPlacesDepiction;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<DepictionProps>();
</script>

<template>
	<VTooltip location="bottom" :text="$t('global.basics.license') + ': ' + depiction.license">
		<template #activator="{ props: tooltip }">
			<VNuxtImage
				v-if="depiction"
				v-bind="tooltip"
				:src="depiction.url"
				:alt="depiction.title"
				:height="'100%'"
			/>
		</template>
	</VTooltip>
</template>
