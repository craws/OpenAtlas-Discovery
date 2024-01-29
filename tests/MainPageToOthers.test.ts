import { expect, test } from "@playwright/test";

import { locales } from "@/config/i18n.config";

test.describe("locale is en", () => {
	test.skip(!locales.includes("en"));
	const path = "./en";

	test.describe("APIBase is defined", () => {
		test.skip(process.env.NUXT_PUBLIC_API_BASE_URL === undefined);

		test("Main to Data and Map", async ({ page }) => {
			await page.goto(path);

			await page.locator("#content-renderer-container").getByRole("link", { name: "map" }).click();
			await expect(page.locator("#mapid")).toBeVisible();
			await page.goto(path);
			await page.locator("#content-renderer-container").getByRole("link", { name: "data" }).click();
			await expect(page.locator("#data-table-container")).toBeVisible();
		});
	});
});

test.describe("locale is de", () => {
	test.skip(!locales.includes("de"));
	const path = "./de";
	test.describe("APIBase is defined", () => {
		test.skip(process.env.NUXT_PUBLIC_API_BASE_URL === undefined);

		test("Main to Data and Map", async ({ page }) => {
			await page.goto(path);

			await page
				.locator("#content-renderer-container")
				.getByRole("link", { name: "Karte" })
				.click();
			await expect(page.locator("#mapid")).toBeVisible();
			await page.goto(path);
			await page
				.locator("#content-renderer-container")
				.getByRole("link", { name: "Daten" })
				.click();
			await expect(page.locator("#data-table-container")).toBeVisible();
		});
	});
});
