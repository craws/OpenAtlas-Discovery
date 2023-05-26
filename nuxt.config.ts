import { dirname, resolve } from "node:path";

import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";
import { fileURLToPath } from "url";
import vuetify from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "OpenAtlas Discovery",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
          sizes: "any",
        },
      ],
    },
  },
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE || "https://demo-dev.openatlas.eu",
    },
  },
  modules: [
    "@nuxt/image-edge",
    "@nuxt/content",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins?.push(vuetify())
      );
    },
  ],
  css: [
    "vuetify/styles",
    "@mdi/font/css/materialdesignicons.min.css",
    "leaflet/dist/leaflet.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    // @ts-ignore
    // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
    define: {
      "process.env.DEBUG": false,
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
  image: {
    domains: [
      process.env.NUXT_PUBLIC_API_BASE,
      // TODO: Maybe this needs it's own env variable like process.env.NUXT_IMAGE_DOMAINS
    ],
  },
});
