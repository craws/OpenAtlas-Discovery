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

const logos = project.footer.partner_logos;
</script>

<template>
	<footer class="border-t opacity-80">
		<div
			class="container grid gap-4 py-6 text-sm sm:items-center"
			:class="logos && logos.length > 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'"
		>
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

			<nav
				:aria-label="t('AppFooter.navigation-secondary')"
				:class="logos?.length > 0 ? 'sm:justify-self-center' : 'sm:justify-self-end'"
			>
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

			<div v-if="logos && logos.length > 0" class="-my-2 ml-auto flex gap-7">
				<NuxtLink
					v-for="logo in logos"
					:key="logo.name"
					:to="logo.url"
					external
					target="_blank"
					class="grayscale transition-all duration-500 hover:grayscale-0"
				>
					<span class="sr-only">{{ logo.name }}</span>
					<NuxtImg
						:src="logo.light"
						class="block h-8 w-auto object-contain dark:hidden"
						:alt="logo.name"
						preload
					></NuxtImg>
					<NuxtImg
						:src="logo.dark ?? logo.light"
						class="hidden h-8 w-auto object-contain dark:block"
						:alt="logo.name"
						preload
					></NuxtImg>
				</NuxtLink>
			</div>
		</div>
	</footer>
</template>
