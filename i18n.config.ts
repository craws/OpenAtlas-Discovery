import discoveryConfig from "./config/discoveryConfig.json";

export default defineI18nConfig(() => {
	return {
		legacy: false,
		fallbackLocale: discoveryConfig.defaultLocale,
	};
});
