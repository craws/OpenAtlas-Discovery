<script lang="ts" setup>
import { createUrl, isNonEmptyString } from "@acdh-oeaw/lib";
import type { WebSite, WithContext } from "schema-dts";

import { project } from "@/config/project.config";

const env = useRuntimeConfig();

const locale = useLocale();
const t = useTranslations();
const route = useRoute();

const i18nHead = useLocaleHead({
	addDirAttribute: true,
	identifierAttribute: "id",
	addSeoAttributes: true,
});

useHead({
	htmlAttrs: {
		lang: computed(() => {
			return locale.value;
		}),
		// TODO: move to tailwind config
		style: `--color-brand: ${project.colors.brand}; --color-brand-foreground: ${project.colors.brandContrast};`,
	},
	titleTemplate: computed(() => {
		return ["%s", t("Metadata.name")].join(" | ");
	}),
	title: computed(() => {
		return t(route.meta.title);
	}),
	link: computed(() => {
		return [
			{ href: "/favicon.ico", rel: "icon", sizes: "any" },
			{ href: "/icon.svg", rel: "icon", type: "image/svg+xml", sizes: "any" },
			{ href: "/apple-icon.png", rel: "apple-touch-icon" },
			{ href: "/manifest.webmanifest", rel: "manifest" },
			...(i18nHead.value.link ?? []),
		];
	}),
	meta: computed(() => {
		return [
			{ name: "description", content: t("Metadata.description") },
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: t(route.meta.title) },
			{ property: "og:site_name", content: t("Metadata.name") },
			{ property: "og:description", content: t("Metadata.description") },
			{
				property: "og:image",
				content: String(
					createUrl({
						baseUrl: env.public.NUXT_PUBLIC_APP_BASE_URL,
						pathname: "/opengraph-image.png",
					}),
				),
			},
			{ name: "twitter:card", content: "summary_large_image" },
			...(isNonEmptyString(project.twitter)
				? [
						{ name: "twitter:creator", content: project.twitter },
						{ name: "twitter:site", content: project.twitter },
					]
				: []),
			...(i18nHead.value.meta ?? []),
		];
	}),
	script: computed(() => {
		const jsonLd: WithContext<WebSite> = {
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: t("Metadata.name"),
			description: t("Metadata.description"),
		};

		const scripts = [
			{ type: "application/ld+json", innerHTML: JSON.stringify(jsonLd, safeJsonLdReplacer) },
		];

		if (
			isNonEmptyString(env.public.NUXT_PUBLIC_MATOMO_BASE_URL) &&
			isNonEmptyString(env.public.NUXT_PUBLIC_MATOMO_ID)
		) {
			scripts.push({
				type: "",
				innerHTML: createAnalyticsScript(
					env.public.NUXT_PUBLIC_MATOMO_BASE_URL,
					env.public.NUXT_PUBLIC_MATOMO_ID,
				),
			});
		}

		return scripts;
	}),
});
</script>

<template>
	<div class="grid min-h-full grid-rows-[auto_1fr_auto]">
		<SkipLink target-id="main-content">{{ t("DefaultLayout.skip-to-main-content") }}</SkipLink>

		<AppHeader />
		<ErrorBoundary>
			<slot />
		</ErrorBoundary>
		<AppFooter />

		<Toaster position="bottom-right" />
		<RouteAnnouncer />
	</div>
</template>
