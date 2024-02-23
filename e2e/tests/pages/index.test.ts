import { locales } from "@/config/i18n.config";
import { expect, test } from "@/e2e/lib/test";

test.describe("index page", () => {
	test("should have document title", async ({ createI18n, createIndexPage }) => {
		for (const locale of locales) {
			const { t } = await createI18n(locale);
			const indexPage = createIndexPage(locale);
			await indexPage.goto();

			await expect(indexPage.page).toHaveTitle(
				[t("IndexPage.meta.title"), t("Metadata.name")].join(" | "),
			);
		}
	});

	test("should not have any automatically detectable accessibility issues", async ({
		createAccessibilityScanner,
		createIndexPage,
	}) => {
		for (const locale of locales) {
			const indexPage = createIndexPage(locale);
			await indexPage.goto();

			const { getViolations } = await createAccessibilityScanner();
			expect(await getViolations()).toEqual([]);
		}
	});

	test("should not have visible changes", async ({ createIndexPage }) => {
		for (const locale of locales) {
			const indexPage = createIndexPage(locale);
			await indexPage.goto();

			await expect(indexPage.page).toHaveScreenshot();
		}
	});
});
