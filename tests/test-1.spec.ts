import { expect, test } from "@playwright/test";

test("has main elements", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator('[data-test="main-content-renderer"]')).toBeVisible();
	await expect(page.locator('[data-test="main-map-btn"]')).toBeVisible();
	await expect(page.locator('[data-test="main-data-btn"]')).toBeVisible();
});

test("has locale selector", async ({ page }) => {
	const locales: Array<string> = ["en, de"];
	await page.goto("/");
	if (locales.length > 1) {
		await expect(page.locator('[data-test="header-locale-menu"]')).toBeVisible();
	} else expect(await page.locator('[data-test="header-locale-menu"]').count()).toEqual(0);
});
