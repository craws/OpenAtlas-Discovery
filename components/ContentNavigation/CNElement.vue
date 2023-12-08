<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";
import { defineProps } from "vue";

// Add a prop that takes a NavigationItem

const props = defineProps<{
	navItem: NavItem;
}>();

const isDirectory = computed(() => {
	return props.navItem.children !== undefined;
});

const navItem = computed(() => {
	return props.navItem;
});
</script>

<template>
	<template v-if="isDirectory">
		<VBtn variant="plain" :ripple="false">
			{{ navItem.title }}
			<VMenu activator="parent">
				<VList>
					<VListItem v-for="(item, index) in navItem.children" :key="index" :value="index">
						<ContentNavigationCNElement :nav-item="item" />
					</VListItem>
				</VList>
			</VMenu>
		</VBtn>
	</template>
	<template v-else>
		<VBtn variant="plain" :ripple="false" :to="navItem._path">
			{{ navItem.title || navItem.navTitle }}
		</VBtn>
	</template>
</template>
