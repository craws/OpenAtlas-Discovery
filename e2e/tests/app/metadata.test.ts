import { createUrl } from "@acdh-oeaw/lib";

import { locales } from "@/config/i18n.config";
import { expect, test } from "@/e2e/lib/test";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const baseUrl = process.env.NUXT_PUBLIC_APP_BASE_URL!;

test("sets a canonical url", async ({ page }) => {
	for (const locale of locales) {
		await page.goto(`/${locale}`);

		const canonicalUrl = page.locator('link[rel="canonical"]');
		await expect(canonicalUrl).toHaveAttribute(
			"href",
			String(createUrl({ baseUrl, pathname: `/${locale}` })),
		);
	}
});

test("sets document title on not-found page", async ({ page }) => {
	await page.goto("/unknown");
	await expect(page).toHaveTitle("Page not found | OpenAtlas Discovery");

	await page.goto("/de/unknown");
	await expect(page).toHaveTitle("Seite nicht gefunden | OpenAtlas Discovery");
});

test("disallows indexing of not-found page", async ({ page }) => {
	for (const pathname of ["/unknown", "/de/unknown"]) {
		await page.goto(pathname);

		const ogTitle = page.locator('meta[name="robots"]');
		await expect(ogTitle).toHaveAttribute("content", "noindex");
	}
});

test.describe("sets page metadata", () => {
	test("static", async ({ page }) => {
		await page.goto("/en");

		const ogType = page.locator('meta[property="og:type"]');
		await expect(ogType).toHaveAttribute("content", "website");

		const twCard = page.locator('meta[name="twitter:card"]');
		await expect(twCard).toHaveAttribute("content", "summary_large_image");

		const twCreator = page.locator('meta[name="twitter:creator"]');
		await expect(twCreator).toHaveAttribute("content", "@openatlas_eu");

		const twSite = page.locator('meta[name="twitter:site"]');
		await expect(twSite).toHaveAttribute("content", "@openatlas_eu");

		// const googleSiteVerification = page.locator('meta[name="google-site-verification"]');
		// await expect(googleSiteVerification).toHaveAttribute("content", "");
	});

	test("with en locale", async ({ page }) => {
		await page.goto("/en");

		await expect(page).toHaveTitle("Home | OpenAtlas Discovery");

		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			"content",
			"OpenAtlas is an open source database software developed especially to acquire, edit and manage research data from various fields of humanities.",
		);

		const ogTitle = page.locator('meta[property="og:title"]');
		await expect(ogTitle).toHaveAttribute("content", "Home");

		const ogDescription = page.locator('meta[property="og:description"]');
		await expect(ogDescription).toHaveAttribute(
			"content",
			"OpenAtlas is an open source database software developed especially to acquire, edit and manage research data from various fields of humanities.",
		);

		const ogUrl = page.locator('meta[property="og:url"]');
		await expect(ogUrl).toHaveAttribute("content", String(createUrl({ baseUrl, pathname: "/en" })));

		const ogLocale = page.locator('meta[property="og:locale"]');
		await expect(ogLocale).toHaveAttribute("content", "en");
	});

	test("with de locale", async ({ page }) => {
		await page.goto("/de");

		await expect(page).toHaveTitle("Startseite | OpenAtlas Discovery");

		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			"content",
			"OpenAtlas ist eine Open-Source-Datenbanksoftware, die speziell für die Erfassung, Bearbeitung und Verwaltung von Forschungsdaten aus verschiedenen Bereichen der Geisteswissenschaften entwickelt wurde.",
		);

		const ogTitle = page.locator('meta[property="og:title"]');
		await expect(ogTitle).toHaveAttribute("content", "Startseite");

		const ogDescription = page.locator('meta[property="og:description"]');
		await expect(ogDescription).toHaveAttribute(
			"content",
			"OpenAtlas ist eine Open-Source-Datenbanksoftware, die speziell für die Erfassung, Bearbeitung und Verwaltung von Forschungsdaten aus verschiedenen Bereichen der Geisteswissenschaften entwickelt wurde.",
		);

		const ogUrl = page.locator('meta[property="og:url"]');
		await expect(ogUrl).toHaveAttribute("content", String(createUrl({ baseUrl, pathname: "/de" })));

		const ogLocale = page.locator('meta[property="og:locale"]');
		await expect(ogLocale).toHaveAttribute("content", "de");
	});
});

test.describe("adds json+ld metadata", () => {
	test("with en locale", async ({ page }) => {
		await page.goto("/en");

		const metadata = await page.locator('script[type="application/ld+json"]').textContent();
		expect(metadata).toBe(
			JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "OpenAtlas Discovery",
				description:
					"OpenAtlas is an open source database software developed especially to acquire, edit and manage research data from various fields of humanities.",
			}),
		);
	});

	test("with de locale", async ({ page }) => {
		await page.goto("/de");

		const metadata = await page.locator('script[type="application/ld+json"]').textContent();
		expect(metadata).toBe(
			JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "OpenAtlas Discovery",
				description:
					"OpenAtlas ist eine Open-Source-Datenbanksoftware, die speziell für die Erfassung, Bearbeitung und Verwaltung von Forschungsdaten aus verschiedenen Bereichen der Geisteswissenschaften entwickelt wurde.",
			}),
		);
	});
});

test("serves an open-graph image", async ({ request }) => {
	for (const _locale of locales) {
		// FIXME: serve og image per locale
		// const response = await request.get(`/${locale}/opengraph-image.png`);
		const response = await request.get("opengraph-image.png");
		const status = response.status();

		expect(status).toEqual(200);
	}
});
