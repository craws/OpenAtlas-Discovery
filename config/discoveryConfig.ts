/**
 * Configuration options for the Discovery website.
 */
export interface DiscoveryConfig {
	/**
	 * The default locale for the website. The locales have to be provided and present to be applied.
	 */
	defaultLocale: string;

	/**
	 * The custom format for displaying dates and times on the Discovery website.
	 */
	dateTimeFormat?: string;

	/**
	 * A list of filters represented as numbers.
	 * Acts as a whitelist to allow only entities belonging to a certain type given by ID.
	 * These filters are applied in the Overview and Search sections of the website but not in the detailed view.
	 */
	defaultFilters?: number[];

	/**
	 * The base URL for the Discovery website's API.
	 * If provided, it specifies the root URL that will be used for making API requests.
	 */
	APIbase?: string;

	/**
	 * The list of allowed image domains.
	 * Specifies the domains from which images can be optimized via nuxt-img for the Discovery website.
	 */
	imageDomains?: string[];

	/**
	 * Hex color code for the primary color of the website.
	 */
	primaryColor?: string;

	/**
	 * Logo
	 * Specifies the logo that will be used for the Discovery website.
	 * @default logo.svg
	 */
	logo: string;

	/**
	 * Header Logo
	 * Specifies the logo that will be used for the header of the Discovery website. Will default to logo if not provided.
	 * @default logo
	 * @see logo
	 */
	headerLogo?: string;

	// Favicon

	/**
	 * The favicon of the website.
	 * Specifies the favicon that will be used for the Discovery website.
	 * @supportedTypes image/svg+xml, image/x-icon
	 */
	favicon?: string;

	/**
	 * The title of the website.
	 * Specifies the title that will be used for the Discovery website.
	 * @default OpenAtlas Discovery
	 */
	title: string;
}

export const defaultDiscoveryConfig: DiscoveryConfig = {
	defaultLocale: "en",
	logo: "/logo.svg",
	title: "OpenAtlas Discovery",
};
