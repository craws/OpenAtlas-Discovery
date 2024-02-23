import { createUrl } from "@acdh-oeaw/lib";

import { locales } from "@/config/i18n.config";
import { expect, test } from "@/e2e/lib/test";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const baseUrl = process.env.NUXT_PUBLIC_APP_BASE_URL!;

test.describe("app", () => {
	if (process.env.NUXT_PUBLIC_BOTS !== "enabled") {
		test("serves a robots.txt which disallows search engine bots", async ({ request }) => {
			const response = await request.get("/robots.txt");
			const body = await response.body();

			expect(body.toString()).toEqual(
				["User-Agent: *", "Disallow: /", `Host: ${baseUrl}`].join("\n"),
			);
		});
	} else {
		test("serves a robots.txt", async ({ request }) => {
			const response = await request.get("/robots.txt");
			const body = await response.body();

			expect(body.toString()).toEqual(
				[
					"User-Agent: *",
					"Allow: /",
					`Host: ${baseUrl}`,
					`Sitemap: ${String(createUrl({ baseUrl, pathname: "sitemap.xml" }))}`,
				].join("\n"),
			);
		});
	}

	test("serves a sitemap.xml", async ({ request }) => {
		const response = await request.get("/sitemap.xml");
		const body = await response.body();

		// TODO: use toMatchSnapshot
		expect(body.toString()).toContain(
			[
				'<?xml version="1.0" encoding="UTF-8"?>',
				'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
			].join("\n"),
		);

		for (const locale of locales) {
			for (const url of ["", "/imprint"]) {
				const loc = String(
					createUrl({
						baseUrl,
						pathname: ["/", locale, url].join(""),
					}),
				);

				expect(body.toString()).toContain(`<loc>${loc}</loc>`);
			}
		}
	});

	test("serves a webmanifest", async ({ request }) => {
		const response = await request.get("/manifest.webmanifest");
		const body = await response.body();

		// TODO: use toMatchSnapshot
		expect(body.toString()).toEqual(
			JSON.stringify({
				name: "OpenAtlas Discovery",
				short_name: "OpenAtlas Discovery",
				description:
					"OpenAtlas is an open source database software developed especially to acquire, edit and manage research data from various fields of humanities.",
				start_url: "/",
				display: "standalone",
				background_color: "#fff",
				theme_color: "#fff",
				icons: [
					{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
					{ src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
					{ src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
					{ src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
				],
			}),
		);
	});

	test("serves a favicon.ico", async ({ request }) => {
		const response = await request.get("/favicon.ico");
		const status = response.status();

		expect(status).toEqual(200);
	});

	test("serves an svg favicon", async ({ request }) => {
		const response = await request.get("/icon.svg");
		const status = response.status();

		expect(status).toEqual(200);
	});

	test("serves an apple favicon", async ({ request }) => {
		const response = await request.get("/apple-icon.png");
		const status = response.status();

		expect(status).toEqual(200);
	});

	test.describe("sets color mode according to system preference", () => {
		test.use({ colorScheme: "no-preference" });

		test("with no preference", async ({ page }) => {
			await page.goto("/en");
			await expect(page.locator("html")).toHaveAttribute("data-ui-color-scheme", "light");
		});
	});

	test.describe("sets color mode according to system preference", () => {
		test.use({ colorScheme: "light" });

		test("in light mode", async ({ page }) => {
			await page.goto("/en");
			await expect(page.locator("html")).toHaveAttribute("data-ui-color-scheme", "light");
		});
	});

	test.describe("sets color mode according to system preference", () => {
		test.use({ colorScheme: "dark" });

		test("in dark mode", async ({ page }) => {
			await page.goto("/en");
			await expect(page.locator("html")).toHaveAttribute("data-ui-color-scheme", "dark");
		});
	});
});
