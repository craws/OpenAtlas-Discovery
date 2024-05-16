<script lang="ts" setup>
import { noop } from "@acdh-oeaw/lib";
import { useQuery } from "@tanstack/vue-query";

import type { NavLinkProps } from "@/components/nav-link.vue";
import { project } from "@/config/project.config";
import type { ContentPage } from "@/types/content";

const locale = useLocale();
const t = useTranslations();

const defaultLinks = computed(() => {
	return {
		home: { href: { path: "/" }, label: t("AppHeader.links.home") },
		data: { href: { path: "/data" }, label: t("AppHeader.links.data") },
		map: { href: { path: "/map" }, label: t("AppHeader.links.map") },
		network: { href: { path: "/network" }, label: t("AppHeader.links.network") },
		team: { href: { path: "/team" }, label: t("AppHeader.links.team") },
	} satisfies Record<string, { href: NavLinkProps["href"]; label: string }>;
});

const { data: navigation, suspense } = useQuery({
	queryKey: ["content-navigation", locale] as const,
	queryFn({ queryKey: [, locale] }) {
		const prefix = ["pages", locale] as const;
		return fetchContentNavigation(
			queryContent<ContentPage>(...prefix).where({
				$not: {
					_path: {
						$in: ["/", "/imprint"].map((pathname) => {
							return "/" + prefix.join("/") + pathname;
						}),
					},
				},
			}),
		);
	},
});
onServerPrefetch(async () => {
	/**
	 * Delegate errors to the client, to avoid displaying error page with status code 500.
	 *
	 * @see https://github.com/TanStack/query/issues/6606
	 * @see https://github.com/TanStack/query/issues/5976
	 */
	await suspense().catch(noop);
});

const contentLinks = computed(() => {
	const pages = navigation.value?.at(0)?.children?.at(0)?.children;
	if (pages == null) return {};

	const prefix = ["", "pages", locale.value].join("/");

	return Object.fromEntries(
		pages.map((link) => {
			return [
				link._path,
				{ href: { path: "/content" + link._path.slice(prefix.length) }, label: link.title },
			];
		}),
	) satisfies Record<string, { href: NavLinkProps["href"]; label: string }>;
});

const links = computed(() => {
	return {
		...defaultLinks.value,
		...contentLinks.value,
	};
});
</script>

<template>
	<header class="border-b">
		<div class="container flex items-center gap-4 py-4">
			<NavLink class="flex shrink-0" :href="links.home.href">
				<span class="sr-only">{{ links.home.label }}</span>
				<NuxtImg
					alt=""
					class="block size-10 object-contain lg:size-12 dark:hidden"
					height="64"
					width="64"
					preload
					:src="project.logos.light"
				/>
				<NuxtImg
					alt=""
					class="hidden size-10 object-contain lg:size-12 dark:block"
					height="64"
					width="64"
					preload
					:src="project.logos.dark"
				/>
			</NavLink>

			<div class="flex flex-1 items-center justify-between gap-4">
				<div class="hidden lg:flex">
					<AppNavigationMenu :label="t('AppHeader.navigation-main')" :links="links" />
				</div>

				<div class="ml-auto flex items-center gap-4">
					<ColorSchemeSwitcher />
					<LocaleSwitcher v-if="locales.length > 0" />
					<nav :aria-label="t('AppHeader.navigation-main')" class="flex shrink-0 lg:hidden">
						<AppNavigationMobileMenu :title="t('AppHeader.navigation-menu')" :links="links" />
					</nav>
				</div>
			</div>
		</div>
	</header>
</template>
