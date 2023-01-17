import { createVuetify, ThemeDefinition } from 'vuetify';

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#b8cf5b'
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'lightTheme',
      themes: {
        lightTheme
      },
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 1,
        darken: 2
      }
    },
    ssr: true
  });

  nuxtApp.vueApp.use(vuetify);
});
