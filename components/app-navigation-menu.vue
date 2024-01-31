<script lang="ts" setup>
import type { NavLinkProps } from "@/components/nav-link.vue";

const props = defineProps<{
	label: string;
	links: Record<string, { href: NavLinkProps["href"]; label: string }>;
}>();
</script>

<template>
	<nav :aria-label="props.label">
		<ul class="flex flex-wrap items-center gap-x-6 gap-y-4" role="list">
			<li v-for="(link, key) of props.links" :key="key">
				<NavLink
					class="font-medium opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100 aria-[current]:font-semibold aria-[current]:opacity-100"
					:href="link.href"
				>
					{{ link.label }}
				</NavLink>
			</li>
		</ul>
	</nav>
</template>
