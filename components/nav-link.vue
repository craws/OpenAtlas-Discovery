<script lang="ts" setup>
import type { NuxtLinkProps } from "#app";

export interface NavLinkProps
	extends Omit<NuxtLinkProps, "href" | "to">,
		Required<Pick<NuxtLinkProps, "href">> {}

const props = defineProps<NavLinkProps>();

const localePath = useLocalePath();

const route = useRoute();

const isCurrentPage = computed<boolean>(() => {
	const href = typeof props.href === "string" ? createURLObject(props.href) : props.href;
	const path = localePath(href.path ?? "");
	const query = href.query ?? {};

	const isEqualPathname = path === route.path;
	const isEqualQuery = query.mode === route.query.mode;

	return isEqualPathname && isEqualQuery;
});

function createURLObject(href: string): { path: string; query: { mode: string | null } } {
	const url = new URL(href, "http://temp");
	return {
		path: url.pathname,
		query: {
			mode: url.searchParams.get("mode"),
		},
	};
}
</script>

<template>
	<NuxtLink
		:href="props.external ? props.href : localePath(props.href)"
		:external="props.external"
		:aria-current="isCurrentPage ? 'page' : undefined"
	>
		<slot />
	</NuxtLink>
</template>
