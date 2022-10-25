import vuetify from 'vite-plugin-vuetify'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig',
        config => config?.plugins?.push(vuetify()))
    },],
  css: ['vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css'],
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
},
})
