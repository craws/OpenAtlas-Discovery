/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface EntitiesOutputModel {
	pagination?: PaginationModel;
	results?: LinkedPlacesModel[]; //results?: (LinkedPlacesModel | GeoJSONModel)[];
}

export interface PaginationModel {
	entities?: number;
	entitiesPerPage?: number;
	index?: PaginationIndexModel[];
	totalPages?: number;
}

export interface PaginationIndexModel {
	page?: number;
	startId?: number;
}

export interface LinkedPlacesModel {
	"@context"?: string;
	type?: string;
	features?: LinkedPlacesModelFeatures[];
}

export interface GeoJSONModel {
	type?: "FeatureCollection";
	features?: GeoJSONModelFeatures[];
}

export interface Point {
	type: "Point";
	coordinates: Position;
	title?: string;
	description?: string;
	shapeType?: "centerpoint";
}

export type Position = number[];

export interface LineString {
	type: "LineString";
	coordinates: LineStringCoordinates;
	title?: string;
	description?: string;
	shapeType?: "polyline";
}

export type LineStringCoordinates = Position[];

export type LinearRing = Position[];

export interface Polygon {
	type: "Polygon";
	"coordinates'"?: LinearRing[];
	title?: string;
	description?: string;
	shapeType?: "area" | "shape";
}

export interface GeometryCollection {
	type: "GeometryCollection";
	geometries?: (Polygon | Point | LineString | (Polygon & Point & LineString))[];
}

export interface TypeOverviewEntryModel {
	/** @format int32 */
	id?: number;
	name?: string;
	viewClass?: string[];
	children?: TypeOverviewEntryModel[];
}

export interface TypeOverviewModel {
	standard?: TypeOverviewEntryModel[];
	place?: TypeOverviewEntryModel[];
	custom?: TypeOverviewEntryModel[];
	value?: TypeOverviewEntryModel[];
	system?: TypeOverviewEntryModel[];
}

export interface TypeTreeModel {
	type_tree?: TypeTreeModelTypeTree;
}

export interface TypeViewClassChildren {
	id?: string;
	label?: string;
	url?: string;
	children?: TypeViewClassChildren[];
}

export interface TypesByViewClassEntry {
	children?: TypeViewClassChildren[];
	id?: number;
	name?: string;
	category?: string;
}

export interface TypesByViewClassModel {
	acquisition?: TypesByViewClassEntry[];
	activity?: TypesByViewClassEntry[];
	actor_actor_relation?: TypesByViewClassEntry[];
	actor_function?: TypesByViewClassEntry[];
	artifact?: TypesByViewClassEntry[];
	bibliography?: TypesByViewClassEntry[];
	edition?: TypesByViewClassEntry[];
	event?: TypesByViewClassEntry[];
	external_reference?: TypesByViewClassEntry[];
	feature?: TypesByViewClassEntry[];
	file?: TypesByViewClassEntry[];
	group?: TypesByViewClassEntry[];
	human_remains?: TypesByViewClassEntry[];
	involvement?: TypesByViewClassEntry[];
	move?: TypesByViewClassEntry[];
	person?: TypesByViewClassEntry[];
	place?: TypesByViewClassEntry[];
	production?: TypesByViewClassEntry[];
	source?: TypesByViewClassEntry[];
	source_translation?: TypesByViewClassEntry[];
	stratigraphic_unit?: TypesByViewClassEntry[];
}

export type ClassesModel = ClassesModelInner[];

export interface ContentModel {
	intro?: string;
	contact?: string;
	legalNotice?: string;
	siteName?: string;
	imageSizes?: ContentModelImageSizes;
}

export interface SystemClassCountModel {
	/** @format int32 */
	move?: number;
	/** @format int32 */
	bibliography?: number;
	/** @format int32 */
	person?: number;
	/** @format int32 */
	acquisition?: number;
	/** @format int32 */
	reference_system?: number;
	/** @format int32 */
	feature?: number;
	/** @format int32 */
	file?: number;
	/** @format int32 */
	activity?: number;
	/** @format int32 */
	type?: number;
	/** @format int32 */
	administrative_unit?: number;
	/** @format int32 */
	artifact?: number;
	/** @format int32 */
	source_translation?: number;
	/** @format int32 */
	place?: number;
	/** @format int32 */
	stratigraphic_unit?: number;
	/** @format int32 */
	edition?: number;
	/** @format int32 */
	group?: number;
	/** @format int32 */
	source?: number;
}

export type SubunitsModel = SubunitsModelInner[];

export interface GeometricEntitiesModel {
	type?: string;
	features?: GeometricEntitiesModelFeatures[];
}

export type InlineResponse200 = LinkedPlacesModel; //export type InlineResponse200 = LinkedPlacesModel | GeoJSONModel;

export interface LinkedPlacesModelProperties {
	title?: string;
}

export interface LinkedPlacesModelDescriptions {
	value?: string;
}

export interface LinkedPlacesModelWhenStart {
	/** @format nullable */
	earliest?: string;
	/** @format nullable */
	latest?: string;
	/** @format nullable */
	comment?: string;
}

export interface LinkedPlacesModelWhenTimespans {
	start?: LinkedPlacesModelWhenStart;
	end?: LinkedPlacesModelWhenStart;
}

export interface LinkedPlacesModelWhen {
	timespans?: LinkedPlacesModelWhenTimespans[];
}

export interface LinkedPlacesModelTypes {
	identifier?: string;
	label?: string;
	/** @format nullable */
	descriptions?: string;
	hierarchy?: string;
	/** @format float */
	value?: number;
	/** @format nullable */
	unit?: string;
}

export interface LinkedPlacesModelRelations {
	label?: string;
	relationTo?: string;
	relationType?: string;
	relationSystemClass?: string;
	/** @format nullable */
	relationDescription?: string;
	/** @format nullable */
	type?: string;
	when?: LinkedPlacesModelWhen;
}

export interface LinkedPlacesModelFeatures {
	"@id"?: string;
	type?: string;
	crmClass?: string;
	systemClass?: string;
	properties?: LinkedPlacesModelProperties;
	descriptions?: LinkedPlacesModelDescriptions[];
	when?: LinkedPlacesModelWhen;
	types?: LinkedPlacesModelTypes[];
	relations?: LinkedPlacesModelRelations[];
	/** @format nullable */
	names?: string;
	/** @format nullable */
	links?: string;
	/** @format nullable */
	depictions?: LinkedPlacesDepiction[];
	geometry?: Polygon | Point | LineString | GeometryCollection;
}

export interface LinkedPlacesDepiction {
	"@id": string;
	title: string;
	license: string;
	url: string;
}

export interface GeoJSONModelPropertiesTypes {
	typeName?: string;
	typeId?: number;
}

export interface GeoJSONModelProperties {
	"@id"?: number;
	systemClass?: string;
	name?: string;
	description?: string;
	begin_earliest?: string;
	/** @format nullable */
	begin_latest?: string;
	/** @format nullable */
	begin_comment?: string;
	end_earliest?: string;
	/** @format nullable */
	end_latest?: string;
	/** @format nullable */
	end_comment?: string;
	types?: GeoJSONModelPropertiesTypes[];
}

export interface GeoJSONModelFeatures {
	type?: string;
	geometry?: Polygon | Point | LineString | GeometryCollection;
	properties?: GeoJSONModelProperties;
}

export interface TypeTreeModelTypeTreeTypeIds {
	id?: number;
	name?: string;
	description?: string;
	origin_id?: number;
	first?: number;
	last?: number;
	root?: number[];
	subs?: number[];
	count?: number;
	count_subs?: number;
	category?: string;
}

export interface TypeTreeModelTypeTree {
	type_ids?: TypeTreeModelTypeTreeTypeIds;
}

export interface ClassesModelInner {
	systemClass?: string;
	crmClass?: string;
	view?: string;
	icon?: string;
	en?: string;
}

export interface ContentModelImageSizes {
	thumbnail?: string;
	table?: string;
}

export interface SubunitsModelInner {
	/** @format int32 */
	id?: number;
	/** @format int32 */
	parentId?: number;
	/** @format int32 */
	rootId?: number;
	openatlasClassName?: string;
	crmClass?: string;
	created?: string;
	modified?: string;
	latestModRec?: string;
	geometry?: {
		type?: string;
		coordinates?: number[];
		title?: string;
		description?: string;
		shapeType?: string;
	};
	children?: number[];
	properties?: {
		name?: string;
		/** @format nullable */
		aliases?: string;
		description?: string;
		standardType?: {
			name?: string;
			/** @format int32 */
			id?: number;
			/** @format int32 */
			rootId?: number;
			path?: string;
			externalReferences?: {
				type?: string;
				identifier?: string;
				referenceSystem?: string;
				resolverURL?: string;
				referenceURL?: string;
				id?: string;
			}[];
		};
		timespan?: {
			earliestBegin?: string;
			latestBegin?: string;
			earliestEnd?: string;
			latestEnd?: string;
		};
		externalReferences?: {
			type?: string;
			identifier?: string;
			referenceSystem?: string;
			resolverURL?: string;
			referenceURL?: string;
			id?: string;
		}[];
		references?: {
			/** @format int32 */
			id?: number;
			abbreviation?: string;
			title?: string;
			/** @format nullable */
			pages?: string;
		}[];
		/** @format nullable */
		files?: string;
		types?: {
			/** @format int32 */
			id?: number;
			/** @format int32 */
			rootId?: number;
			name?: string;
			path?: string;
			/** @format nullable */
			value?: string;
			/** @format nullable */
			unit?: string;
			externalReferences?: {
				type?: string;
				identifier?: string;
				referenceSystem?: string;
				resolverURL?: string;
				referenceURL?: string;
				id?: string;
			}[];
		}[];
	};
}

export interface GeometricEntitiesModelGeometry {
	coordinates?: number[];
	type?: string;
}

export interface GeometricEntitiesModelProperties {
	/** @format int32 */
	id?: number;
	name?: string;
	description?: string;
	/** @format int32 */
	locationId?: number;
	/** @format int32 */
	objectId?: number;
	objectDescription?: string;
	objectName?: string;
	objectType?: string;
	shapeType?: string;
}

export interface GeometricEntitiesModelFeatures {
	type?: string;
	geometry?: GeometricEntitiesModelGeometry;
	properties?: GeometricEntitiesModelProperties;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** request cancellation token */
	cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
	securityWorker?: (
		securityData: SecurityDataType | null,
	) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
	Json = "application/json",
	FormData = "multipart/form-data",
	UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = "https://demo.openatlas.eu/api/";
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		credentials: "same-origin",
		headers: {},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
		return keys
			.map((key) =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key),
			)
			.join("&");
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : "";
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === "object" || typeof input === "string")
				? JSON.stringify(input)
				: input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === "object" && property !== null
						? JSON.stringify(property)
						: `${property}`,
				);
				return formData;
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	};

	protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken);
			if (abortController) {
				return abortController.signal;
			}
			return void 0;
		}

		const abortController = new AbortController();
		this.abortControllers.set(cancelToken, abortController);
		return abortController.signal;
	};

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken);

		if (abortController) {
			abortController.abort();
			this.abortControllers.delete(cancelToken);
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<T> => {
		const secureParams =
			((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter = this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;
		return $fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`);
		/*
    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });*/
	};
}

/**
 * @title OpenAtlas API
 * @version 0.4.1
 * @license GPL-2.0 (https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
 * @baseUrl https://demo.openatlas.eu/api/{version}
 * @externalDocs https://manual.openatlas.eu/
 * @contact OpenAtlas <bernhard.koschicek-krombholz@oeaw.ac.at> (https://openatlas.eu)
 *
 * An API that allows user to access data from an OpenAtlas instance.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	entity = {
		/**
		 * @description Retrieves all information about a single entity
		 *
		 * @tags Entity Endpoint
		 * @name GetEntity
		 * @summary Get entity by ID
		 * @request GET:/entity/{entityId}
		 */
		getEntity: (
			entityId: number,
			query?: {
				/** Download results */
				download?: boolean;
				/** Select which keys should not be displayed. This can improve performance */
				show?: (
					| "when"
					| "types"
					| "relations"
					| "names"
					| "links"
					| "geometry"
					| "depictions"
					| "geonames"
					| "description"
					| "none"
				)[];
				/**
				 * Choose the format for the results.
				 * @example lp
				 */
				format?: "lp" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
				/** Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
				export?: "csv" | "csvNetwork";
			},
			params: RequestParams = {},
		) =>
			this.request<InlineResponse200, void>({
				path: `/entity/${entityId}`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	query = {
		/**
		 * @description Retrieves a list with entity ID, CIDOC CRM code, system class, or menu item. Combine up to four of the Entities Endpoints in a single query. Each request has to be a new parameter.
		 *
		 * @tags Entities Endpoint, Entity Query Endpoint
		 * @name GetQuery
		 * @summary Combine several or all entities endpoints in one query
		 * @request GET:/query/
		 */
		getQuery: (
			query?: {
				/** Entity ids which will be requested */
				entities?: number[];
				/**
				 * View classes to be requested
				 * @example actor
				 */
				view_classes?: (
					| "all"
					| "actor"
					| "artifact"
					| "event"
					| "place"
					| "reference"
					| "source"
					| "type"
					| "file"
					| "source_translation"
					| "reference_system"
				)[];
				/** System classes to be requested */
				system_classes?: (
					| "all"
					| "acquisition"
					| "activity"
					| "administrative_unit"
					| "appellation"
					| "artifact"
					| "bibliography"
					| "edition"
					| "event"
					| "external_reference"
					| "feature"
					| "file"
					| "group"
					| "human_remains"
					| "move"
					| "object_location"
					| "person"
					| "place"
					| "production"
					| "reference_system"
					| "source"
					| "source_translation"
					| "stratigraphic_unit"
					| "type"
					| "type_anthropology"
				)[];
				/**
				 * CIDOC classes to be requested
				 * @example E18
				 */
				cidoc_classes?: (
					| "E6"
					| "E7"
					| "E8"
					| "E9"
					| "E12"
					| "E18"
					| "E20"
					| "E21"
					| "E22"
					| "E31"
					| "E32"
					| "E33"
					| "E41"
					| "E53"
					| "E54"
					| "E55"
					| "E74"
				)[];
				/** Download results */
				download?: boolean;
				/** Just show count of how many entities would the result give back */
				count?: boolean;
				/** Select which keys should not be displayed. This can improve performance */
				show?: (
					| "when"
					| "types"
					| "relations"
					| "names"
					| "links"
					| "geometry"
					| "depictions"
					| "geonames"
					| "description"
					| "none"
				)[];
				/**
				 * Choose the format for the results.
				 * @example lp
				 */
				format?: "lp" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
				/** Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
				export?: "csv" | "csvNetwork";
				/**
				 * Choose one column to sort the results by. Default value is name.
				 * @example name
				 */
				column?:
					| "id"
					| "name"
					| "cidoc_class"
					| "system_class"
					| "begin_from"
					| "begin_to"
					| "end_from"
					| "end_to";
				/**
				 * Sorting result ascending or descending of the given column. Default value is asc.
				 * @example asc
				 */
				sort?: "asc" | "desc";
				/** Search query for specific results. */
				search?: string[];
				/** Begin results at the given entity id. */
				first?: number;
				/** Begin results after the given entity id. */
				last?: number;
				/** Jump to page number. */
				page?: number;
				/** Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
				limit?: number;
				/** Show only entities with the given type id. */
				type_id?: number[];
				/** Displays only connections connected by the selected CIDOC CRM code. */
				relation_type?: string[];
			},
			params: RequestParams = {},
		) =>
			this.request<EntitiesOutputModel, void>({
				path: `/query/`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	systemClass = {
		/**
		 * @description Retrieves a list of entities, based on their OpenAtlas class name.
		 *
		 * @tags Entities Endpoint
		 * @name GetBySystemClass
		 * @request GET:/system_class/{system_class}
		 */
		getBySystemClass: (
			systemClass:
				| "all"
				| "acquisition"
				| "activity"
				| "administrative_unit"
				| "appellation"
				| "artifact"
				| "bibliography"
				| "edition"
				| "event"
				| "external_reference"
				| "feature"
				| "file"
				| "group"
				| "human_remains"
				| "move"
				| "object_location"
				| "person"
				| "place"
				| "production"
				| "reference_system"
				| "source"
				| "source_translation"
				| "stratigraphic_unit"
				| "type"
				| "type_anthropology",
			query?: {
				/** Download results */
				download?: boolean;
				/** Just show count of how many entities would the result give back */
				count?: boolean;
				/** Select which keys should not be displayed. This can improve performance */
				show?: (
					| "when"
					| "types"
					| "relations"
					| "names"
					| "links"
					| "geometry"
					| "depictions"
					| "geonames"
					| "description"
					| "none"
				)[];
				/**
				 * Choose the format for the results.
				 * @example lp
				 */
				format?: "lp" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
				/** Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
				export?: "csv" | "csvNetwork";
				/**
				 * Choose one column to sort the results by. Default value is name.
				 * @example name
				 */
				column?:
					| "id"
					| "name"
					| "cidoc_class"
					| "system_class"
					| "begin_from"
					| "begin_to"
					| "end_from"
					| "end_to";
				/**
				 * Sorting result ascending or descending of the given column. Default value is asc.
				 * @example asc
				 */
				sort?: "asc" | "desc";
				/** Search query for specific results. */
				search?: string[];
				/** Begin results at the given entity id. */
				first?: number;
				/** Begin results after the given entity id. */
				last?: number;
				/** Jump to page number. */
				page?: number;
				/** Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
				limit?: number;
				/** Show only entities with the given type id. */
				type_id?: number[];
				/** Displays only connections connected by the selected CIDOC CRM code. */
				relation_type?: string[];
			},
			params: RequestParams = {},
		) =>
			this.request<EntitiesOutputModel, void>({
				path: `/system_class/${systemClass}`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	viewClass = {
		/**
		 * @description Retrieves a list of entities based on their OpenAtlas menu items.
		 *
		 * @tags Entities Endpoint
		 * @name GetByViewClass
		 * @request GET:/view_class/{view_class}
		 */
		getByViewClass: (
			viewClass:
				| "all"
				| "actor"
				| "artifact"
				| "event"
				| "place"
				| "reference"
				| "source"
				| "type"
				| "file"
				| "source_translation"
				| "reference_system",
			query?: {
				/** Download results */
				download?: boolean;
				/** Just show count of how many entities would the result give back */
				count?: boolean;
				/** Select which keys should not be displayed. This can improve performance */
				show?: (
					| "when"
					| "types"
					| "relations"
					| "names"
					| "links"
					| "geometry"
					| "depictions"
					| "geonames"
					| "description"
					| "none"
				)[];
				/**
				 * Choose the format for the results.
				 * @example lp
				 */
				format?: "lp" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
				/** Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
				export?: "csv" | "csvNetwork";
				/**
				 * Choose one column to sort the results by. Default value is name.
				 * @example name
				 */
				column?:
					| "id"
					| "name"
					| "cidoc_class"
					| "system_class"
					| "begin_from"
					| "begin_to"
					| "end_from"
					| "end_to";
				/**
				 * Sorting result ascending or descending of the given column. Default value is asc.
				 * @example asc
				 */
				sort?: "asc" | "desc";
				/** Search query for specific results. */
				search?: string[];
				/** Begin results at the given entity id. */
				first?: number;
				/** Begin results after the given entity id. */
				last?: number;
				/** Jump to page number. */
				page?: number;
				/** Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
				limit?: number;
				/** Show only entities with the given type id. */
				type_id?: number[];
				/** Displays only connections connected by the selected CIDOC CRM code. */
				relation_type?: string[];
			},
			params: RequestParams = {},
		) =>
			this.request<EntitiesOutputModel, void>({
				path: `/view_class/${viewClass}`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	cidocClass = {
		/**
		 * @description Retrieve a list of entities, based on their CIDOC CRM class code.
		 *
		 * @tags Entities Endpoint
		 * @name GetByCidocClass
		 * @request GET:/cidoc_class/{cidoc_class}
		 */
		getByCidocClass: (
			cidocClass:
				| "E6"
				| "E7"
				| "E8"
				| "E9"
				| "E12"
				| "E18"
				| "E20"
				| "E21"
				| "E22"
				| "E31"
				| "E32"
				| "E33"
				| "E41"
				| "E53"
				| "E54"
				| "E55"
				| "E74",
			query?: {
				/** Download results */
				download?: boolean;
				/** Just show count of how many entities would the result give back */
				count?: boolean;
				/** Select which keys should not be displayed. This can improve performance */
				show?: (
					| "when"
					| "types"
					| "relations"
					| "names"
					| "links"
					| "geometry"
					| "depictions"
					| "geonames"
					| "description"
					| "none"
				)[];
				/**
				 * Choose the format for the results.
				 * @example lp
				 */
				format?: "lp" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
				/** Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
				export?: "csv" | "csvNetwork";
				/**
				 * Choose one column to sort the results by. Default value is name.
				 * @example name
				 */
				column?:
					| "id"
					| "name"
					| "cidoc_class"
					| "system_class"
					| "begin_from"
					| "begin_to"
					| "end_from"
					| "end_to";
				/**
				 * Sorting result ascending or descending of the given column. Default value is asc.
				 * @example asc
				 */
				sort?: "asc" | "desc";
				/** Search query for specific results. */
				search?: string[];
				/** Begin results at the given entity id. */
				first?: number;
				/** Begin results after the given entity id. */
				last?: number;
				/** Jump to page number. */
				page?: number;
				/** Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
				limit?: number;
				/** Show only entities with the given type id. */
				type_id?: number[];
				/** Displays only connections connected by the selected CIDOC CRM code. */
				relation_type?: string[];
			},
			params: RequestParams = {},
		) =>
			this.request<EntitiesOutputModel, void>({
				path: `/cidoc_class/${cidocClass}`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	latest = {
		/**
		 * @description Retrieve the last entered entities. n represents the amount of entities retrieved (between 1 and 100). The pagination information is always null.
		 *
		 * @tags Entities Endpoint
		 * @name GetLatest
		 * @request GET:/latest/{limit}
		 */
		getLatest: (
			limit: number,
			query?: {
				/** Download results */
				download?: boolean;
				/** Select which keys should not be displayed. This can improve performance */
				show?: (
					| "when"
					| "types"
					| "relations"
					| "names"
					| "links"
					| "geometry"
					| "depictions"
					| "geonames"
					| "description"
					| "none"
				)[];
				/**
				 * Choose the format for the results.
				 * @example lp
				 */
				format?: "lp" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
				/** Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
				export?: "csv" | "csvNetwork";
				/**
				 * Choose one column to sort the results by. Default value is name.
				 * @example name
				 */
				column?:
					| "id"
					| "name"
					| "cidoc_class"
					| "system_class"
					| "begin_from"
					| "begin_to"
					| "end_from"
					| "end_to";
				/**
				 * Sorting result ascending or descending of the given column. Default value is asc.
				 * @example asc
				 */
				sort?: "asc" | "desc";
				/** Search query for specific results. */
				search?: string[];
				/** Show only entities with the given type id. */
				type_id?: number[];
				/** Displays only connections connected by the selected CIDOC CRM code. */
				relation_type?: string[];
			},
			params: RequestParams = {},
		) =>
			this.request<EntitiesOutputModel, void>({
				path: `/latest/${limit}`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	typeEntities = {
		/**
		 * @description Used to retrieve a list of entities, based on their OpenAtlas type ID. For an endpoint that lists all available types click confer Types Endpoints
		 *
		 * @tags Entities Endpoint
		 * @name GetTypeEntities
		 * @request GET:/type_entities/{entityId}
		 */
		getTypeEntities: (
			entityId: number,
			query?: {
				/** Download results */
				download?: boolean;
				/** Just show count of how many entities would the result give back */
				count?: boolean;
				/** Select which keys should not be displayed. This can improve performance */
				show?: (
					| "when"
					| "types"
					| "relations"
					| "names"
					| "links"
					| "geometry"
					| "depictions"
					| "geonames"
					| "description"
					| "none"
				)[];
				/**
				 * Choose the format for the results.
				 * @example lp
				 */
				format?: "lp" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
				/** Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
				export?: "csv" | "csvNetwork";
				/**
				 * Choose one column to sort the results by. Default value is name.
				 * @example name
				 */
				column?:
					| "id"
					| "name"
					| "cidoc_class"
					| "system_class"
					| "begin_from"
					| "begin_to"
					| "end_from"
					| "end_to";
				/**
				 * Sorting result ascending or descending of the given column. Default value is asc.
				 * @example asc
				 */
				sort?: "asc" | "desc";
				/** Search query for specific results. */
				search?: string[];
				/** Begin results at the given entity id. */
				first?: number;
				/** Begin results after the given entity id. */
				last?: number;
				/** Jump to page number. */
				page?: number;
				/** Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
				limit?: number;
				/** Show only entities with the given type id. */
				type_id?: number[];
				/** Displays only connections connected by the selected CIDOC CRM code. */
				relation_type?: string[];
			},
			params: RequestParams = {},
		) =>
			this.request<EntitiesOutputModel, void>({
				path: `/type_entities/${entityId}`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	typeEntitiesAll = {
		/**
		 * @description Used to retrieve a list of entities, based on their OpenAtlas type ID including all connected subtypes.. For an endpoint that lists all available types click confer Type Endpoints
		 *
		 * @tags Entities Endpoint
		 * @name GetTypeEntitiesAll
		 * @request GET:/type_entities_all/{entityId}
		 */
		getTypeEntitiesAll: (
			entityId: number,
			query?: {
				/** Download results */
				download?: boolean;
				/** Just show count of how many entities would the result give back */
				count?: boolean;
				/** Select which keys should not be displayed. This can improve performance */
				show?: (
					| "when"
					| "types"
					| "relations"
					| "names"
					| "links"
					| "geometry"
					| "depictions"
					| "geonames"
					| "description"
					| "none"
				)[];
				/**
				 * Choose the format for the results.
				 * @example lp
				 */
				format?: "lp" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
				/** Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
				export?: "csv" | "csvNetwork";
				/**
				 * Choose one column to sort the results by. Default value is name.
				 * @example name
				 */
				column?:
					| "id"
					| "name"
					| "cidoc_class"
					| "system_class"
					| "begin_from"
					| "begin_to"
					| "end_from"
					| "end_to";
				/**
				 * Sorting result ascending or descending of the given column. Default value is asc.
				 * @example asc
				 */
				sort?: "asc" | "desc";
				/** Search query for specific results. */
				search?: string[];
				/** Begin results at the given entity id. */
				first?: number;
				/** Begin results after the given entity id. */
				last?: number;
				/** Jump to page number. */
				page?: number;
				/** Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
				limit?: number;
				/** Show only entities with the given type id. */
				type_id?: number[];
				/** Displays only connections connected by the selected CIDOC CRM code. */
				relation_type?: string[];
			},
			params: RequestParams = {},
		) =>
			this.request<EntitiesOutputModel, void>({
				path: `/type_entities_all/${entityId}`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	entitiesLinkedToEntity = {
		/**
		 * @description Retrieves a list of entities linked to the entity with the stated ID.
		 *
		 * @tags Entities Endpoint
		 * @name GetEntitiesLinkedToEntity
		 * @request GET:/entities_linked_to_entity/{entityId}
		 */
		getEntitiesLinkedToEntity: (
			entityId: number,
			query?: {
				/** Download results */
				download?: boolean;
				/** Just show count of how many entities would the result give back */
				count?: boolean;
				/** Select which keys should not be displayed. This can improve performance */
				show?: (
					| "when"
					| "types"
					| "relations"
					| "names"
					| "links"
					| "geometry"
					| "depictions"
					| "geonames"
					| "description"
					| "none"
				)[];
				/**
				 * Choose the format for the results.
				 * @example lp
				 */
				format?: "lp" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
				/** Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
				export?: "csv" | "csvNetwork";
				/**
				 * Choose one column to sort the results by. Default value is name.
				 * @example name
				 */
				column?:
					| "id"
					| "name"
					| "cidoc_class"
					| "system_class"
					| "begin_from"
					| "begin_to"
					| "end_from"
					| "end_to";
				/**
				 * Sorting result ascending or descending of the given column. Default value is asc.
				 * @example asc
				 */
				sort?: "asc" | "desc";
				/** Search query for specific results. */
				search?: string[];
				/** Begin results at the given entity id. */
				first?: number;
				/** Begin results after the given entity id. */
				last?: number;
				/** Jump to page number. */
				page?: number;
				/** Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
				limit?: number;
				/** Show only entities with the given type id. */
				type_id?: number[];
				/** Displays only connections connected by the selected CIDOC CRM code. */
				relation_type?: string[];
			},
			params: RequestParams = {},
		) =>
			this.request<EntitiesOutputModel, void>({
				path: `/entities_linked_to_entity/${entityId}`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	typeOverview = {
		/**
		 * @description Retrieves a list of all OpenAtlas types sorted by custom, places, standard and value
		 *
		 * @tags Type Endpoints
		 * @name GetTypeOverview
		 * @request GET:/type_overview/
		 */
		getTypeOverview: (
			query?: {
				/** Download results */
				download?: boolean;
			},
			params: RequestParams = {},
		) =>
			this.request<TypeOverviewModel, void>({
				path: `/type_overview/`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	typeTree = {
		/**
		 * @description Retrieves a list of all OpenAtlas types, including their information sorted by their IDs
		 *
		 * @tags Type Endpoints
		 * @name GetTypeTree
		 * @request GET:/type_tree/
		 */
		getTypeTree: (
			query?: {
				/** Download results */
				download?: boolean;
			},
			params: RequestParams = {},
		) =>
			this.request<TypeTreeModel, void>({
				path: `/type_tree/`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	typeByViewClass = {
		/**
		 * @description Retrieves a list of all system types
		 *
		 * @tags Type Endpoints
		 * @name GetTypeByViewClass
		 * @request GET:/type_by_view_class/
		 */
		getTypeByViewClass: (
			query?: {
				/** Download results */
				download?: boolean;
			},
			params: RequestParams = {},
		) =>
			this.request<TypesByViewClassModel, void>({
				path: `/type_by_view_class/`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	classes = {
		/**
		 * @description Retrieves a list of all available classes, their CIDOC CRM mapping, their view, which icon can be used, if alias and references systems are allowed and which standard type it has.
		 *
		 * @tags Administrative Endpoints
		 * @name ClassMapping
		 * @request GET:/classes/
		 */
		classMapping: (params: RequestParams = {}) =>
			this.request<ClassesModel, void>({
				path: `/classes/`,
				method: "GET",
				format: "json",
				...params,
			}),
	};
	content = {
		/**
		 * @description Retrieves a detailed list of information on available frontend content in an OpenAtlas instance - intro, legal notice, contact, and size of processed image
		 *
		 * @tags Administrative Endpoints
		 * @name GetContent
		 * @request GET:/content/
		 */
		getContent: (
			query?: {
				/**
				 * Choose language
				 * @example de
				 */
				lang?: "en" | "de";
				/** Download results */
				download?: boolean;
			},
			params: RequestParams = {},
		) =>
			this.request<ContentModel, void>({
				path: `/content/`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	systemClassCount = {
		/**
		 * @description Retrieves a detailed list of the numbers of entries connected to a system class
		 *
		 * @tags Administrative Endpoints
		 * @name SystemClassCount
		 * @request GET:/system_class_count/
		 */
		systemClassCount: (params: RequestParams = {}) =>
			this.request<SystemClassCountModel, void>({
				path: `/system_class_count/`,
				method: "GET",
				format: "json",
				...params,
			}),
	};
	subunits = {
		/**
		 * @description Displays all subunits of a place in a special format as used by the THANADOS project. Can only be used for “places”. As format only XML can be chosen
		 *
		 * @tags Special Endpoints
		 * @name GetSubunits
		 * @request GET:/subunits/
		 */
		getSubunits: (
			query?: {
				/**
				 * Choose the format for the results.
				 * @example lp
				 */
				format?: "lp" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
				/** Download results */
				download?: boolean;
				/** Just show count of how many entities would the result give back */
				count?: boolean;
			},
			params: RequestParams = {},
		) =>
			this.request<SubunitsModel, void>({
				path: `/subunits/`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	geometricEntities = {
		/**
		 * @description Retrieve a GeoJSON of all chosen geometries in an OpenAtlas instance
		 *
		 * @tags Special Endpoints
		 * @name GetGeometricEntities
		 * @request GET:/geometric_entities/
		 */
		getGeometricEntities: (
			query?: {
				/** Filters which geometries will be received. Default is gisAll */
				geometry?: (
					| "gisAll"
					| "gisPointAll"
					| "gisPointSupers"
					| "gisPointSubs"
					| "gisPointSibling"
					| "gisLineAll"
					| "gisPolygonAll"
				)[];
				/** Download results */
				download?: boolean;
				/** Just show count of how many entities would the result give back */
				count?: boolean;
			},
			params: RequestParams = {},
		) =>
			this.request<GeometricEntitiesModel, void>({
				path: `/geometric_entities/`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),
	};
	exportDatabase = {
		/**
		 * @description Downloads all information in an OpenAtlas instance as CSV, XML, or JSON.
		 *
		 * @tags Special Endpoints
		 * @name ExportDatabase
		 * @request GET:/export_database/{format}
		 */
		exportDatabase: (format: "json" | "csv" | "xml", params: RequestParams = {}) =>
			this.request<File, void>({
				path: `/export_database/${format}`,
				method: "GET",
				format: "json",
				...params,
			}),
	};
	display = {
		/**
		 * @description Retrieves the respective image if it has a licence.
		 *
		 * @tags Image Endpoints
		 * @name DisplayImage
		 * @request GET:/display/{filename}
		 */
		displayImage: (filename: string, params: RequestParams = {}) =>
			this.request<File, void>({
				path: `/display/${filename}`,
				method: "GET",
				format: "blob",
				...params,
			}),
	};
}
