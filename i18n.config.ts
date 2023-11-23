import en from "./locales/en.json";
import de from "./locales/de.json";
import discoveryConfig from "./config/discoveryConfig.json";

export default defineI18nConfig(() => {
	return {
		legacy: false,
		allowComposition: true,
		globalInjection: true,
		locale: discoveryConfig.defaultLocale,
		fallbackLocale: discoveryConfig.defaultLocale,
		messages: {
			en,
			de,
		},
	};
});
