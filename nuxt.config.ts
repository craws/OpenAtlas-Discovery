import { execSync } from "node:child_process";
import { DiscoveryConfig } from "./config/discoveryConfig";
import discoveryConfig from "./config/discoveryConfig.json";

const config: DiscoveryConfig = discoveryConfig as DiscoveryConfig;
const branchName = execSync("git rev-parse --abbrev-ref HEAD").toString().trimEnd();
const commitHash = execSync("git rev-parse HEAD").toString().trimEnd();
const gitTag = execSync("git describe --always --tags").toString().trimEnd();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	typescript: {
		shim: false,
	},
	app: {
		head: {
			meta: [
				{
					name: config.title ?? "OpenAtlas Discovery",
				},
			],
		},
	},
	runtimeConfig: {
		// Keys within public, will be also exposed to the client-side
		public: {
			commitHash,
			branchName,
			gitTag,
		},
	},
	modules: ["@nuxtjs/i18n", "@nuxt/image", "@nuxt/content", "vuetify-nuxt-module"],
	vuetify: {
		moduleOptions: {
			/* module specific options */
		},
		vuetifyOptions: {
			/* vuetify options */
		},
	},
	css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.min.css", "leaflet/dist/leaflet.css"],
	build: {},
	vite: {
		define: {
			"process.env.DEBUG": false,
		},
	},
	image: {
		domains: config.imageDomains ?? ["openatlas.eu"],
		inject: true,
	},
});
