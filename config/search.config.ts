import type { GetSearchResultsParams } from "@/composables/use-get-search-results";

/** Default filters to be applied to all queries, e.g. when a DB is shared.
 * @example { type_id: [0] }
 */
export const defaultFilterParams: GetSearchResultsParams = { type_id: [362] };
