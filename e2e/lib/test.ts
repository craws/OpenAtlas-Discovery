import { test as base } from "@playwright/test";
import type { ElementContext, Result, RunOptions } from "axe-core";
import { checkA11y, getViolations, injectAxe } from "axe-playwright";
import { createI18n as _createI18n, type I18n } from "vue-i18n";

import { defaultLocale, type Locale, type Messages } from "@/config/i18n.config";
import { ImprintPage } from "@/e2e/lib/fixtures/imprint-page";
import { IndexPage } from "@/e2e/lib/fixtures/index-page";

interface Fixtures {
	createAccessibilityScanner: () => Promise<{
		check: (params?: { selector?: ElementContext; skipFailures?: boolean }) => Promise<void>;
		getViolations: (params?: {
			options?: RunOptions;
			selector?: ElementContext;
		}) => Promise<Array<Result>>;
	}>;
	createI18n: (
		locale?: Locale,
		// eslint-disable-next-line @typescript-eslint/ban-types
	) => Promise<I18n<{ [K in Locale]: Messages }, {}, {}, Locale, false>["global"]>;
	createImprintPage: (locale: Locale) => ImprintPage;
	createIndexPage: (locale: Locale) => IndexPage;
}

export const test = base.extend<Fixtures>({
	async createAccessibilityScanner({ page }, use) {
		async function createAccessibilityScanner() {
			await injectAxe(page);

			return {
				check(params?: { selector?: ElementContext; skipFailures?: boolean }) {
					return checkA11y(page, params?.selector, { detailedReport: true }, params?.skipFailures);
				},
				getViolations(params?: { options?: RunOptions; selector?: ElementContext }) {
					return getViolations(page, params?.selector, params?.options);
				},
			};
		}

		await use(createAccessibilityScanner);
	},

	async createI18n({ page: _ }, use) {
		async function createI18n(locale = defaultLocale) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const _messages = await import(`@/messages/${locale}/common.json`, {
				with: { type: "json" },
			});
			const _project = await import(`@/messages/${locale}/project.json`, {
				with: { type: "json" },
			});
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const messages = { ..._messages.default, ..._project.default } as Messages;

			return _createI18n({
				legacy: false,
				locale,
				messages: {
					[locale]: messages,
				},
			}).global;
		}

		// @ts-expect-error Only messages for single locale provided.
		await use(createI18n);
	},

	async createImprintPage({ page }, use) {
		function createImprintPage(locale = defaultLocale) {
			return new ImprintPage(page, locale);
		}

		await use(createImprintPage);
	},

	async createIndexPage({ page }, use) {
		function createIndexPage(locale = defaultLocale) {
			return new IndexPage(page, locale);
		}

		await use(createIndexPage);
	},
});

export { expect } from "@playwright/test";
