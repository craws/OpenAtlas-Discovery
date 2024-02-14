import { locales } from "@/config/i18n.config";
import { expect, test } from "@/e2e/lib/test";

test.describe("imprint page", () => {
	test("should have document title", async ({ createI18n, createImprintPage }) => {
		for (const locale of locales) {
			const { t } = await createI18n(locale);
			const imprintPage = createImprintPage(locale);
			await imprintPage.goto();

			await expect(imprintPage.page).toHaveTitle(
				[t("ImprintPage.meta.title"), t("Metadata.name")].join(" | "),
			);
		}
	});

	test("should have imprint text", async ({ createImprintPage }) => {
		const imprints = {
			de: "Offenlegung",
			en: "Legal disclosure",
		};

		for (const locale of locales) {
			const imprintPage = createImprintPage(locale);
			await imprintPage.goto();

			await expect(imprintPage.page.getByRole("main")).toContainText(imprints[locale]);
		}
	});

	test("should not have any automatically detectable accessibility issues", async ({
		createAccessibilityScanner,
		createImprintPage,
	}) => {
		for (const locale of locales) {
			const imprintPage = createImprintPage(locale);
			await imprintPage.goto();

			const { getViolations } = await createAccessibilityScanner();
			expect(await getViolations()).toEqual([]);
		}
	});

	test("should not have visible changes", async ({ createImprintPage }) => {
		for (const locale of locales) {
			const imprintPage = createImprintPage(locale);
			await imprintPage.goto();

			await expect(imprintPage.page).toHaveScreenshot();
		}
	});
});
