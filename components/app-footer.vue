<script lang="ts" setup>
import { HeartIcon } from "lucide-vue-next";

import type { NavLinkProps } from "@/components/nav-link.vue";
import { project } from "@/config/project.config";

const t = useTranslations();

const links = computed(() => {
	if (project.imprint === "none") return null;

	return {
		imprint: { href: { path: "/imprint" }, label: t("AppFooter.links.imprint") },
	} satisfies Record<string, { href: NavLinkProps["href"]; label: string }>;
});
</script>

<template>
	<footer class="border-t opacity-80">
		<div class="container grid gap-4 py-6 text-sm sm:grid-cols-3 sm:items-center">
			<div class="sm:justify-self-start">
				<I18nT keypath="AppFooter.with-love">
					<HeartIcon class="inline-flex size-5" />
					<a
						class="decoration-dotted underline-offset-4 hover:underline focus-visible:underline"
						href="https://openatlas.eu"
					>
						OpenAtlas
					</a>
				</I18nT>
			</div>

			<nav :aria-label="t('AppFooter.navigation-secondary')" class="sm:justify-self-center">
				<ul class="flex items-center gap-6" role="list">
					<li v-for="(link, key) of links" :key="key">
						<NavLink
							class="decoration-dotted underline-offset-4 hover:underline focus-visible:underline"
							:href="link.href"
						>
							{{ link.label }}
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	</footer>
</template>
