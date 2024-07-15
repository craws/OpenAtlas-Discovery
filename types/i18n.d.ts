import type { Messages } from "@/config/i18n.config";

declare module "vue-i18n" {
	export interface DefineLocaleMessage extends Messages {}
}
