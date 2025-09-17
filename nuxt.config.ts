import { fileURLToPath } from "node:url";

import { defaultLocale, localesMap } from "./config/i18n.config";
import { getGitInfo } from "./utils/get-git-info";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const baseUrl = process.env.NUXT_PUBLIC_APP_BASE_URL!;

const { branchName, commitHash, tag } = getGitInfo();

export default defineNuxtConfig({
	alias: {
		"@": fileURLToPath(new URL("./", import.meta.url)),
	},
	app: {
		layoutTransition: false,
		pageTransition: false,
	},
	colorMode: {
		classSuffix: "",
		dataValue: "ui-color-scheme",
	},
	components: [{ path: "@/components", extensions: [".vue"], pathPrefix: false }],
	content: {
		defaultLocale,
		locales: Object.keys(localesMap),
	},
	css: [
		"@fontsource-variable/inter/standard.css",
		"tailwindcss/tailwind.css",
		"@/styles/index.css",
	],
	devtools: {
		enabled: true,
	},
	experimental: {
		componentIslands: {
			selectiveClient: true,
		},
		defaults: {
			useAsyncData: {
				deep: false,
			},
			useFetch: {
				timeout: 250,
			},
		},
		inlineRouteRules: true,
	},
	features: {
		/** @see https://github.com/nuxt/nuxt/issues/21821 */
		inlineStyles: false,
	},
	future: {
		compatibilityVersion: 4,
	},
	/**
	 * FIXME: some dependency does not properly clean up,
	 * so the build hangs without this workaround.
	 *
	 * @see https://github.com/nuxt/cli/issues/169
	 */
	hooks: {
		close(nuxt) {
			if (!nuxt.options._prepare) {
				process.exit();
			}
		},
	},
	i18n: {
		baseUrl,
		defaultLocale,
		detectBrowserLanguage: {
			redirectOn: "root",
		},
		langDir: "./messages",
		lazy: true,
		locales: Object.values(localesMap),
		strategy: "prefix",
		vueI18n: "./i18n.config.ts",
	},
	imports: {
		dirs: ["./config/"],
	},
	modules: [
		"@nuxt/content",
		"@nuxt/image",
		"@nuxtjs/color-mode",
		"@nuxtjs/i18n",
		"@vueuse/nuxt",
		"nuxt-svgo",
	],
	svgo: {
		defaultImport: "component",
		autoImportPath: "./assets/icons/",
	},
	nitro: {
		compressPublicAssets: true,
		prerender: {
			routes: ["/manifest.webmanifest", "/robots.txt", "/sitemap.xml"],
		},
	},
	postcss: {
		plugins: {
			tailwindcss: {},
		},
	},
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
			appBaseUrl: process.env.NUXT_PUBLIC_APP_BASE_URL,
			bots: process.env.NUXT_PUBLIC_BOTS,
			database: process.env.NUXT_PUBLIC_DATABASE,
			gitBranchName: branchName,
			gitCommitHash: commitHash,
			gitTag: tag,
			googleSiteVerification: process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
			mapBaselayerUrlDark: process.env.NUXT_PUBLIC_MAP_BASELAYER_URL_DARK,
			mapBaselayerUrlLight: process.env.NUXT_PUBLIC_MAP_BASELAYER_URL_LIGHT,
			matomoBaseUrl: process.env.NUXT_PUBLIC_MATOMO_BASE_URL,
			matomoId: process.env.NUXT_PUBLIC_MATOMO_ID,
			openapiBaseUrl: process.env.NUXT_PUBLIC_OPENAPI_BASE_URL,
			redmineId: process.env.NUXT_PUBLIC_REDMINE_ID,
			specialImprint: process.env.NUXT_PUBLIC_SPECIAL_IMPRINT,
		},
	},
	typescript: {
		shim: false,
		strict: true,
		// https://github.com/nuxt/nuxt/issues/14816#issuecomment-1484918081
		tsConfig: {
			compilerOptions: {
				paths: {
					"@/*": ["./*"],
				},
			},
		},
	},
});
