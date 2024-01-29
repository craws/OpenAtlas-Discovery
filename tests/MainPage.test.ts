import { expect, test } from "@playwright/test";

import { locales } from "@/config/i18n.config";

test.describe("locale is de", () => {
	test.skip(!locales.includes("de"));

	const path = "./de";
	test.describe("APIBase is defined", () => {
		test.skip(process.env.NUXT_PUBLIC_API_BASE_URL === undefined);

		test("has main elements", async ({ page }) => {
			await page.goto(path);
			await expect(page.locator("#content-renderer-container")).toBeVisible();
			await expect(page.locator('#content-renderer-container').getByRole('link', { name: 'Karte' })).toBeVisible();
			await expect(page.locator('#content-renderer-container').getByRole('link', { name: 'Daten' })).toBeVisible();
		});
	});

	test.describe("has locale selector", () => {
		test.skip(locales.length === 1);
		test("has locale selector", async ({ page }) => {
			await page.goto(path);
			await expect(page.getByRole("button", { name: "Sprach Auswahl" })).toBeVisible();
		});
	});
});

test.describe("locale is en", () => {
	test.skip(!locales.includes("en"));
	const path = "./en";

	test.describe("APIBase is defined", () => {
		test.skip(process.env.NUXT_PUBLIC_API_BASE_URL === undefined);

		test("has main elements", async ({ page }) => {
			await page.goto(path);
			await expect(page.locator("#content-renderer-container")).toBeVisible();
			await expect(page.locator('#content-renderer-container').getByRole('link', { name: 'map' })).toBeVisible();
			await expect(page.locator('#content-renderer-container').getByRole('link', { name: 'data' })).toBeVisible();
		});
	});

	test.describe("has locale selector", () => {
		test.skip(locales.length === 1);
		test("has locale selector", async ({ page }) => {
			await page.goto(path);
			await expect(page.getByRole("button", { name: "Locale Selection" })).toBeVisible();
		});
	});
});
