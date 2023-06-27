import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import de from '../locales/de.json';

export default defineNuxtPlugin(({ vueApp }) => {
  const { $discoveryConfig } = useNuxtApp();

  const defaultLocale:string = $discoveryConfig.defaultLocale;

  const i18n = createI18n({
    legacy: false,
    allowComposition: true,
    globalInjection: true,
    locale: defaultLocale,
    messages: {
      en,
      de
    }
  });

  vueApp.use(i18n);
});
