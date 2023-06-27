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
}
