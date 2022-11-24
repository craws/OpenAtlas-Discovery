import vuetify from 'vite-plugin-vuetify'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import eslintPlugin from "vite-plugin-eslint";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'OpenAtlas Discovery',
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
        sizes: 'any'
      }
    ]
  },
  modules: ['@nuxt/content',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig',
        config => config?.plugins?.push(vuetify()))
    },],
  css: ['vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
    'leaflet/dist/leaflet.css'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    // @ts-ignore
    // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
    ssr: {

      noExternal: ['vuetify'], // add the vuetify vite plugin
    },
    define: {
      'process.env.DEBUG': false,
    },
    plugins: [
      eslintPlugin(),
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })
    ]
  },
})
