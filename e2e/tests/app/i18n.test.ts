import { createUrl } from "@acdh-oeaw/lib";

import { locales } from "@/config/i18n.config";
import { expect, test } from "@/e2e/lib/test";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const baseUrl = process.env.NUXT_PUBLIC_APP_BASE_URL!;

test.describe("i18n", () => {
	test.describe("should redirect root route to preferred locale", () => {
		test.use({ locale: "en" });

		test("with default locale", async ({ page }) => {
			await page.goto("/");
			await expect(page).toHaveURL("/en");
		});
	});

	test.describe("should redirect root route to preferred locale", () => {
		test.use({ locale: "de" });

		test("with supported locale", async ({ page }) => {
			await page.goto("/");
			await expect(page).toHaveURL("/de");
		});
	});

	test.describe("should redirect root route to preferred locale", () => {
		test.use({ locale: "fr" });

		test("with unsupported locale", async ({ page }) => {
			await page.goto("/");
			await expect(page).toHaveURL("/en");
		});
	});

	test("should display not-found page for unknown locale", async ({ createI18n, page }) => {
		const i18n = await createI18n("en");
		const response = await page.goto("/unknown");
		expect(response?.status()).toBe(404);
		await expect(page.getByRole("heading", { name: i18n.t("NotFoundPage.title") })).toBeVisible();
	});

	test("should display localised not-found page for unknown pathname", async ({
		createI18n,
		page,
	}) => {
		const i18n = await createI18n("de");
		const response = await page.goto("/de/unknown");
		expect(response?.status()).toBe(404);
		await expect(page.getByRole("heading", { name: i18n.t("NotFoundPage.title") })).toBeVisible();
	});

	test("should support switching locale", async ({ createImprintPage, createI18n, page }) => {
		const { imprintPage, i18n: i18nDe } = await createImprintPage("de");
		await imprintPage.goto();

		await expect(page).toHaveURL("/de/imprint");
		await expect(page.getByRole("heading", { name: i18nDe.t("ImprintPage.title") })).toBeVisible();
		await expect(page).toHaveTitle(
			[i18nDe.t("ImprintPage.meta.title"), i18nDe.t("Metadata.name")].join(" | "),
		);

		await page
			.getByRole("link", { name: i18nDe.t("LocaleSwitcher.switch-locale", { locale: "Englisch" }) })
			.click();

		const i18nEn = await createI18n("en");

		await expect(page).toHaveURL("/en/imprint");
		await expect(page.getByRole("heading", { name: i18nEn.t("ImprintPage.title") })).toBeVisible();
		await expect(page).toHaveTitle(
			[i18nEn.t("ImprintPage.meta.title"), i18nEn.t("Metadata.name")].join(" | "),
		);
	});

	test("should set alternate links in link tags", async ({ page }) => {
		function createAbsoluteUrl(pathname: string) {
			return String(createUrl({ baseUrl, pathname }));
		}

		const pathnames = ["", "/imprint"];

		for (const pathname of pathnames) {
			for (const locale of locales) {
				await page.goto(`/${locale}${pathname}`);

				const links = await page.locator('link[rel="alternate"]').evaluateAll((elements) => {
					return elements.map((element) => {
						return element.outerHTML;
					});
				});

				expect(links).toEqual(
					expect.arrayContaining([
						`<link id="i18n-alt-de" rel="alternate" href="${createAbsoluteUrl(`/de${pathname}`)}" hreflang="de">`,
						`<link id="i18n-alt-en" rel="alternate" href="${createAbsoluteUrl(`/en${pathname}`)}" hreflang="en">`,
						`<link id="i18n-xd" rel="alternate" href="${createAbsoluteUrl(`/en${pathname}`)}" hreflang="x-default">`,
					]),
				);
			}
		}
	});
});
