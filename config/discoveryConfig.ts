/**
 * Configuration options for the Discovery website.
 */
import { z } from 'zod';
import userConfig from './discoveryConfig.json'
const locales = ['en', 'de'] as const;

const schema = z.object({
	/**
	 * The title of the website.
	 * Specifies the title that will be used for the Discovery website.
	 * @default OpenAtlas Discovery
	 */
	title: z.string().default('OpenAtlas Discovery'),

	/**
	 * The description of the website.
	 * Specifies the description that will be used for the Discovery website.
	 */
	description: z.string().optional(),

	/**
	 * The default locale for the website. The locales have to be provided and present to be applied.
	 */
	defaultLocale: z.enum(locales).default('en'),

	/**
	 * A list of filters represented as numbers.
	 * Acts as a whitelist to allow only entities belonging to a certain type given by ID.
	 * These filters are applied in the Overview and Search sections of the website but not in the detailed view.
	 */
	defaultFilters: z.array(z.number()).optional(), // should be required

	/**
	 * Hex color code for the primary color of the website.
	 */
	primaryColor: z.string().optional(),

	/**
	 * Logo
	 * Specifies the logo that will be used for the Discovery website.
	 * @default logo.svg
	 */
	logo: z.string().default('logo.svg'),

	/**
	 * Header Logo
	 * Specifies the logo that will be used for the header of the Discovery website. Will default to logo if not provided.
	 * @default logo
	 * @see logo
	 */
	headerLogo: z.string().optional(), // should be required

	/**
	 * The favicon of the website.
	 * Specifies the favicon that will be used for the Discovery website.
	 * @supportedTypes image/svg+xml, image/x-icon
	 */
	favicon: z.string().optional(), // should be required
});

const result = schema.safeParse(userConfig);
if(!result.success) {
	console.error('invalid config!', result.error.flatten().fieldErrors);
	throw new Error('invalid config!');
}
export const discoveryConfig = result.data;
