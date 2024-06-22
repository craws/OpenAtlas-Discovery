import { createUrl } from "@acdh-oeaw/lib";

import { locales } from "@/config/i18n.config";
import { expect, test } from "@/e2e/lib/test";
import { escape } from "@/utils/safe-json-ld-replacer";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const baseUrl = process.env.NUXT_PUBLIC_APP_BASE_URL!;

test("should set a canonical url", async ({ createIndexPage }) => {
	for (const locale of locales) {
		const { indexPage } = await createIndexPage(locale);
		await indexPage.goto();

		const canonicalUrl = indexPage.page.locator('link[rel="canonical"]');
		await expect(canonicalUrl).toHaveAttribute(
			"href",
			String(createUrl({ baseUrl, pathname: `/${locale}` })),
		);
	}
});

test("should set document title on not-found page", async ({ createI18n, page }) => {
	const i18nEn = await createI18n("en");
	await page.goto("/unknown");
	await expect(page).toHaveTitle(
		[i18nEn.t("NotFoundPage.meta.title"), i18nEn.t("Metadata.name")].join(" | "),
	);

	const i18nDe = await createI18n("de");
	await page.goto("/de/unknown");
	await expect(page).toHaveTitle(
		[i18nDe.t("NotFoundPage.meta.title"), i18nDe.t("Metadata.name")].join(" | "),
	);
});

test("should disallow indexing of not-found page", async ({ page }) => {
	for (const pathname of ["/unknown", "/de/unknown"]) {
		await page.goto(pathname);

		const ogTitle = page.locator('meta[name="robots"]');
		await expect(ogTitle).toHaveAttribute("content", "noindex");
	}
});

test("should set page metadata", async ({ createIndexPage }) => {
	for (const locale of locales) {
		const { indexPage, i18n } = await createIndexPage(locale);
		await indexPage.goto();
		const { page } = indexPage;

		expect(i18n.t("Metadata.name")).toBeTruthy();
		expect(i18n.t("Metadata.description")).toBeTruthy();

		const ogType = page.locator('meta[property="og:type"]');
		await expect(ogType).toHaveAttribute("content", "website");

		const twCard = page.locator('meta[name="twitter:card"]');
		await expect(twCard).toHaveAttribute("content", "summary_large_image");

		// const twCreator = page.locator('meta[name="twitter:creator"]');
		// await expect(twCreator).toHaveAttribute("content", project.twitter);

		// const twSite = page.locator('meta[name="twitter:site"]');
		// await expect(twSite).toHaveAttribute("content", project.twitter);

		// const googleSiteVerification = page.locator('meta[name="google-site-verification"]');
		// await expect(googleSiteVerification).toHaveAttribute("content", "");

		await expect(page).toHaveTitle(
			[i18n.t("IndexPage.meta.title"), i18n.t("Metadata.name")].join(" | "),
		);

		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute("content", i18n.t("Metadata.description"));

		const ogTitle = page.locator('meta[property="og:title"]');
		await expect(ogTitle).toHaveAttribute("content", i18n.t("IndexPage.meta.title"));

		const ogDescription = page.locator('meta[property="og:description"]');
		await expect(ogDescription).toHaveAttribute("content", i18n.t("Metadata.description"));

		const ogUrl = page.locator('meta[property="og:url"]');
		await expect(ogUrl).toHaveAttribute(
			"content",
			String(createUrl({ baseUrl, pathname: `/${locale}` })),
		);

		const ogLocale = page.locator('meta[property="og:locale"]');
		await expect(ogLocale).toHaveAttribute("content", locale);
	}
});

test("should add json+ld metadata", async ({ createIndexPage }) => {
	for (const locale of locales) {
		const { indexPage, i18n } = await createIndexPage(locale);
		await indexPage.goto();

		const metadata = await indexPage.page
			.locator('script[type="application/ld+json"]')
			.textContent();

		// eslint-disable-next-line playwright/prefer-web-first-assertions
		expect(metadata).toBe(
			JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: escape(i18n.t("Metadata.name")),
				description: escape(i18n.t("Metadata.description")),
			}),
		);
	}
});

test("should serve an open-graph image", async ({ createIndexPage, request }) => {
	for (const locale of locales) {
		// FIXME: serve og image per locale
		// const imagePath = `/${locale}/opengraph-image.png`;
		const imagePath = "/opengraph-image.png";

		const { indexPage } = await createIndexPage(locale);
		await indexPage.goto();

		await expect(indexPage.page.locator('meta[property="og:image"]')).toHaveAttribute(
			"content",
			expect.stringContaining(String(createUrl({ baseUrl, pathname: imagePath }))),
		);

		const response = await request.get(imagePath);
		const status = response.status();
		const contentType = response.headers()["content-type"];

		expect(status).toBe(200);
		expect(contentType).toBe("image/png");
	}
});
