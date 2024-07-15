import { createUrl } from "@acdh-oeaw/lib";

import { expect, test } from "@/e2e/lib/test";

if (process.env.NUXT_PUBLIC_MATOMO_BASE_URL && process.env.NUXT_PUBLIC_MATOMO_ID) {
	const baseUrl = String(
		createUrl({ baseUrl: process.env.NUXT_PUBLIC_MATOMO_BASE_URL, pathname: "/**" }),
	);

	test.describe("analytics service", () => {
		test("should track page views", async ({ createIndexPage }) => {
			const { indexPage, i18n } = await createIndexPage(defaultLocale);
			const { page } = indexPage;
			const initialResponsePromise = page.waitForResponse(baseUrl);
			await indexPage.goto();
			const initialResponse = await initialResponsePromise;
			expect(initialResponse.status()).toBe(204);

			const responsePromise = page.waitForResponse(baseUrl);
			await page.getByRole("link", { name: i18n.t("AppFooter.links.imprint") }).click();
			const response = await responsePromise;
			expect(response.status()).toBe(204);
		});
	});
}
