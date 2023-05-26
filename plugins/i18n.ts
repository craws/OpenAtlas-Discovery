import { createI18n } from "vue-i18n";

import de from "../locales/de.json";
import en from "../locales/en.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const { $discoveryConfig } = useNuxtApp();

  const defaultLocale = $discoveryConfig.global.defaultLocale;

  const i18n = createI18n({
    legacy: false,
    allowComposition: true,
    globalInjection: true,
    locale: defaultLocale,
    messages: {
      en,
      de,
    },
  });

  vueApp.use(i18n);
});
