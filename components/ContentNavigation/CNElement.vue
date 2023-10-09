<template>
	<template v-if="isDirectory">
		<v-btn variant="plain" :ripple="false">
			{{ navItem.title }}
			<v-menu activator="parent">
				<v-list>
					<v-list-item v-for="(item, index) in navItem.children" :key="index" :value="index">
						<ContentNavigationCNElement :nav-item="item" />
					</v-list-item>
				</v-list>
			</v-menu>
		</v-btn>
	</template>
	<template v-else>
		<v-btn variant="plain" :ripple="false" :to="navItem._path">
			{{ navItem.title || navItem.navTitle }}
		</v-btn>
	</template>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { NavItem } from "@nuxt/content/dist/runtime/types";

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
