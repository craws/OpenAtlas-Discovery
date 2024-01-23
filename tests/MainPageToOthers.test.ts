import { expect, test } from "@playwright/test";

test("Main to Data and Map", async ({ page }) => {
	await page.goto("/");
	if (process.env.NUXT_PUBLIC_API_BASE_URL === undefined) {
		console.log("APIBase is undefined!");
		return;
	}
	await page.locator('[data-test="main-map-btn"]').click();
	await expect(page.locator('[data-test="map-page-container"]')).toBeVisible();
	await page.goto("/");
	await page.locator('[data-test="main-data-btn"]').click();
	await expect(page.locator('[data-test="data-page-container"]')).toBeVisible();
});

test("Successive Nav Clicks", async ({ page }) => {
	await page.goto("/");
	if (process.env.NUXT_PUBLIC_API_BASE_URL === undefined) {
		console.log("APIBase is undefined!");
		return;
	}
	await page.locator('[data-test="main-map-btn"]').dblclick();
	await expect(page.locator('[data-test="map-page-container"]')).toBeVisible();
	await page.goto("/");
	await page.locator('[data-test="main-data-btn"]').dblclick();
	await expect(page.locator('[data-test="data-page-container"]')).toBeVisible();
});
