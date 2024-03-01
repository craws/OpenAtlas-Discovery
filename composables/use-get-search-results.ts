import { useQuery } from "@tanstack/vue-query";
import { z } from "zod";

import { type Entity, useCreateEntity } from "@/composables/use-create-entity";
import type { components, operations } from "@/lib/api-client/api";
import type { LinkedPlace } from "@/types/api";

export const categories = [
	"beginFrom",
	"beginTo",
	"endFrom",
	"endTo",
	"entityAliases",
	"entityCidocClass",
	"entityDescription",
	"entityID",
	"entityName",
	"entitySystemClass",
	"relationToID",
	"typeID",
	"typeIDWithSubs",
	"typeName",
	"valueTypeID",
] as const;

/**
 * The columns that can be sorted on.
 * @id apiColumns
 */
export const columns = [
	"id",
	"name",
	"cidoc_class",
	"system_class",
	"begin_from",
	"begin_to",
	"end_from",
	"end_to",
] as const;

export type Column = (typeof columns)[number];

// Write a check to see if an object is of typed column
export function isColumn(value: unknown): value is Column {
	return columns.includes(value as Column);
}

export type Category = (typeof categories)[number];

export const operators = [
	"equal",
	"greaterThan",
	"greaterThanEqual",
	"lesserThan",
	"lesserThanEqual",
	"like",
	"notEqual",
] as const;

export type Operator = (typeof operators)[number];

export const logicalOperators = ["and", "or"] as const;

export type LogicalOperator = (typeof logicalOperators)[number];

export const searchFilter = z
	.record(
		z.enum(categories),
		z.object({
			operator: z.enum(operators),
			values: z.array(z.union([z.string(), z.number()])),
			logicalOperator: z.enum(logicalOperators).default("and"),
		}),
	)
	.refine(
		(value) => {
			return Object.keys(value).length > 0;
		},
		{ message: "At least one search filter category required" },
	);

export const searchFilterString = z
	.string()
	.transform((value, context) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return JSON.parse(value);
		} catch {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Invalid JSON passed as search filter",
			});
			return z.NEVER;
		}
	})
	.pipe(searchFilter);

export type SearchFilter = z.infer<typeof searchFilter>;

export interface GetSearchResultsParams
	extends Omit<NonNullable<operations["GetQuery"]["parameters"]["query"]>, "format" | "search"> {
	/**
	 * We only support the default "Linked Places" format. The various geojson formats supported by
	 * the backend only exist for legacy usecases. Also, consistently using one format should
	 * provide some caching benefits.
	 *
	 * Note that the "Linked Places" format is valid GeoJSON.
	 *
	 * @see https://github.com/LinkedPasts/linked-places-format
	 */
	format?: "lp";
	search?: Array<SearchFilter>;
}

export interface GetSearchResultsResponse {
	pagination: components["schemas"]["PaginationModel"];
	results: Array<LinkedPlace>;
}

export function useGetSearchResults(params: MaybeRef<GetSearchResultsParams>) {
	const api = useApiClient();
	const createEntity = useCreateEntity();

	return useQuery({
		queryKey: ["search-results", params] as const,
		async queryFn({ queryKey, signal }) {
			const [, params] = queryKey;
			const search = params.search?.map((value) => {
				return JSON.stringify(value);
			});

			const response = (await api.GET("/query/", {
				params: {
					query: {
						...params,
						// @ts-expect-error `Array<string>` is actually correct.
						search,
					},
				},
				signal,
			})) as GetSearchResultsResponse;

			const results: Array<Entity> = [];

			response.results.forEach((result) => {
				const entity = createEntity(result);
				results.push(entity);
			});

			return { ...response, results };
		},
	});
}
