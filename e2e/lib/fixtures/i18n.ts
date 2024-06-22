import type { Page } from "@playwright/test";
import { createI18n as _createI18n, type I18n as _I18n } from "vue-i18n";

import { defaultLocale, type Locale, type Messages } from "@/config/i18n.config";

// eslint-disable-next-line @typescript-eslint/ban-types
export type I18n = _I18n<{ [K in Locale]: Messages }, {}, {}, Locale, false>["global"];

export async function createI18n(_page: Page, locale = defaultLocale): Promise<I18n> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const _messages = await import(`@/messages/${locale}/common.json`, { with: { type: "json" } });
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const _project = await import(`@/messages/${locale}/project.json`, { with: { type: "json" } });
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const messages = { ..._project.default, ..._messages.default } as Messages;

	// @ts-expect-error Only messages for single locale provided.
	return _createI18n({
		legacy: false,
		locale,
		messages: {
			[locale]: messages,
		},
	}).global;
}

export type WithI18n<T> = T & { i18n: I18n };
