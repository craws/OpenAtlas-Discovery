import { createUrl } from "@acdh-oeaw/lib";

import { locales } from "@/config/i18n.config";
import { expect, test } from "@/e2e/lib/test";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const baseUrl = process.env.NUXT_PUBLIC_APP_BASE_URL!;

test.describe("i18n", () => {
	test.describe("redirects root route to preferred locale", () => {
		test.use({ locale: "en" });

		test("with default locale", async ({ page }) => {
			await page.goto("/");
			await expect(page).toHaveURL("/en");
		});
	});

	test.describe("redirects root route to preferred locale", () => {
		test.use({ locale: "de" });

		/**
		 * FIXME: Currently, this breaks when pre-rendering the page via `routeRules`.
		 * This is an upstream issue in `@nuxtjs/i18n`.
		 */
		test.fixme("with supported locale", async ({ page }) => {
			await page.goto("/");
			await expect(page).toHaveURL("/de");
		});
	});

	test.describe("redirects root route to preferred locale", () => {
		test.use({ locale: "fr" });

		test("with unsupported locale", async ({ page }) => {
			await page.goto("/");
			await expect(page).toHaveURL("/en");
		});
	});

	test("displays not-found page for unknown locale", async ({ page }) => {
		const response = await page.goto("/unknown");
		expect(response?.status()).toBe(404);
		await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
	});

	test("displays localised not-found page for unknown pathname", async ({ page }) => {
		const response = await page.goto("/de/unknown");
		expect(response?.status()).toBe(404);
		await expect(page.getByRole("heading", { name: "Seite nicht gefunden" })).toBeVisible();
	});

	test("supports switching locale", async ({ page }) => {
		await page.goto("/de/imprint");
		await expect(page).toHaveURL("/de/imprint");
		await expect(page.getByRole("heading", { name: "Impressum" })).toBeVisible();
		await expect(page).toHaveTitle("Impressum | OpenAtlas Discovery");

		await page.getByRole("link", { name: "Zu Englisch wechseln" }).click();

		await expect(page).toHaveURL("/en/imprint");
		await expect(page.getByRole("heading", { name: "Imprint" })).toBeVisible();
		await expect(page).toHaveTitle("Imprint | OpenAtlas Discovery");
	});

	test("sets `lang` attribute on `html` element", async ({ page }) => {
		for (const locale of locales) {
			await page.goto(`/${locale}`);
			await expect(page.locator("html")).toHaveAttribute("lang", locale);
		}
	});

	test("sets alternate links in link tags", async ({ page }) => {
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

				// TODO: use toMatchSnapshot
				expect(links).toEqual([
					`<link id="i18n-alt-de" rel="alternate" href="${createAbsoluteUrl(
						`/de${pathname}`,
					)}" hreflang="de">`,
					`<link id="i18n-alt-en" rel="alternate" href="${createAbsoluteUrl(
						`/en${pathname}`,
					)}" hreflang="en">`,
					`<link id="i18n-xd" rel="alternate" href="${createAbsoluteUrl(
						`/en${pathname}`,
					)}" hreflang="x-default">`,
				]);
			}
		}
	});
});
