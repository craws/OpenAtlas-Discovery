import { expect, test } from "@playwright/test";

import { locales } from "@/config/i18n.config";

test("has main elements", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator('[data-test="main-content-renderer"]')).toBeVisible();
	if (process.env.NUXT_PUBLIC_API_BASE_URL === undefined) {
		console.log("APIBase is undefined!");
		return;
	}
	await expect(page.locator('[data-test="main-map-btn"]')).toBeVisible();
	await expect(page.locator('[data-test="main-data-btn"]')).toBeVisible();
});

test("has locale selector", async ({ page }) => {
	await page.goto("/");
	if (locales.length > 1) {
		await expect(page.locator('[data-test="header-locale-menu"]')).toBeVisible();
		return;
	}
	console.log("only one language detected, no locale selector");
	expect(await page.locator('[data-test="header-locale-menu"]').count()).toEqual(0);
});
