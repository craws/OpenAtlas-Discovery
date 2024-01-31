import type { Locator, Page } from "@playwright/test";

import { defaultLocale, type Locale } from "@/config/i18n.config";

export class ImprintPage {
	readonly page: Page;
	readonly locale: Locale;
	readonly title: Locator;

	constructor(page: Page, locale = defaultLocale) {
		this.page = page;
		this.locale = locale;
		this.title = page.getByRole("heading", { level: 1 });
	}

	async goto() {
		await this.page.goto(`/${this.locale}/imprint`);
	}
}
