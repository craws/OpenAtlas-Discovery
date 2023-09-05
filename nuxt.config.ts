import vuetify from 'vite-plugin-vuetify';
import { DiscoveryConfig } from './config/discoveryConfig';
import discoveryConfig from './config/discoveryConfig.json';

const config : DiscoveryConfig = (discoveryConfig as DiscoveryConfig);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  app: {
    head: {
      meta: [{
        name: config.title ?? 'OpenAtlas Discovery'
      }]
    }
  },
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: { }
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/devtools',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig',
        config => config?.plugins?.push(vuetify()));
    }
  ],
  devtools: {
    // Enable devtools (default: true)
    enabled: true
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
    'leaflet/dist/leaflet.css'],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    // @ts-ignore
    // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
    ssr: {

      noExternal: ['vuetify'] // add the vuetify vite plugin
    },
    define: {
      'process.env.DEBUG': false
    }
  },
  image: {
    domains: config.imageDomains ?? ['openatlas.eu'],
    inject: true
  }
});
