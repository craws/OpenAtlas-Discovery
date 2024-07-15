import { defaultLocale } from "@/config/i18n.config";

export default defineI18nConfig(() => {
	return {
		fallbackLocale: defaultLocale,
		legacy: false,
	};
});
