import { createUrl } from "@acdh-oeaw/lib";
import * as v from "valibot";

const baseUrl = v.parse(v.pipe(v.string(), v.url()), process.env.NUXT_PUBLIC_APP_BASE_URL);
const bots = v.parse(v.optional(v.picklist(["disabled", "enabled"])), process.env.NUXT_PUBLIC_BOTS);
const isIndexable = bots === "enabled";

const config = isIndexable
	? {
			"User-Agent": "*",
			Allow: "/",
			Host: baseUrl,
			Sitemap: String(createUrl({ baseUrl, pathname: "sitemap.xml" })),
		}
	: {
			"User-Agent": "*",
			Disallow: "/",
			Host: baseUrl,
		};

const robots = Object.entries(config)
	.map(([key, value]) => {
		return `${key}: ${String(value)}`;
	})
	.join("\n");

export default defineEventHandler((event) => {
	defaultContentType(event, "text/plain");
	return robots;
});
