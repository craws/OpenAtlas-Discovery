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

export interface ClassMappingModel {
  crmClass?: string;
  en?: string;
  icon?: string;
  systemClass?: string;
  view?: string;
}

export interface ContentModel {
  contact?: string;
  imageSized?: ContentModelImageSized;
  intro?: string;
  legalNotice?: string;
  siteName?: string;
}

export interface DepictionModel {
  "@id"?: string;
  license?: string;
  title?: string;
  url?: string;
}

export interface DescriptionModel {
  value?: string;
}

export interface FeatureGeoJSON {
  "@id": string;
  crmClass?: string;
  depictions?: DepictionModel[];
  descriptions?: DescriptionModel[];
  geometry: GeometryModel;
  links?: LinkModel[];
  names?: NamesModel[];
  properties?: FeatureGeoJSONProperties;
  relations?: RelationModel[];
  systemClass?: string;
  type: string;
  types?: TypeModel[];
  when?: WhenModel;
}

export interface GeometricEntries {
  features?: GeometricEntry[];
  type?: string;
}

export interface GeometricEntry {
  geometry?: GeometricEntryGeometry;
  properties?: GeometricEntryProperties;
  type?: string;
}

export interface Geometries {
  geometry?: GeometricEntryGeometry;
  properties?: GeometriesProperties;
  type?: string;
}

export interface GeometryModel {
  coordinates?: (number | number[])[];
  description?: string;
  title?: string;
  type?: string;
}

export interface GeometryOutModel {
  features?: Geometries[];
  type?: string;
}

export interface LinkModel {
  identifier?: string;
  referenceSystem?: string;
  type?: string;
}

export interface LinkedPlaceModel {
  "@context"?: string;
  features: FeatureGeoJSON[];
  type: string;
}

export interface NamesModel {
  alias?: string;
}

export interface NodeAllModel {
  nodes?: NodeModel[];
}

export interface NodeCategoryModel {
  custom?: string[];
  places?: string[];
  standard?: string[];
  system?: string[];
  value?: string[];
}

export interface NodeModel {
  id?: number;
  label?: string;
  url?: string;
}

export interface NodeOverviewModel {
  types?: NodeCategoryModel;
}

export interface OutputModelGeojson {
  pagination?: PaginationModel;
  results?: GeometryOutModel[];
}

export interface OutputModelLPF {
  pagination?: PaginationModel;
  results?: LinkedPlaceModel[];
}

export interface OverviewCountModel {
  count?: number;
  systemClass?: string;
}

export interface PaginationIndexModel {
  page?: number;
  startId?: number;
}

export interface PaginationModel {
  entities?: number;
  entitiesPerPage?: number;
  index?: PaginationIndexModel[];
  totalPages?: number;
}

export interface RelationModel {
  label?: string;
  relationDescription?: string;
  relationSystemClass?: string;
  relationTo?: string;
  relationType?: string;
  type?: string;
  when?: WhenModel;
}

export interface SubunitsModel {
  children?: number[];
  created?: string;
  crmClass?: string;
  geometry?: SubunitsModelGeometry;
  id?: number;
  latestModRec?: string;
  modified?: string;
  openatlasClassName?: string;
  parentId?: number;
  properties?: SubunitsModelProperties;
  rootId?: number;
}

export interface SystemClassCountModel {
  acquisition?: number;
  activity?: number;
  administrative_unit?: number;
  artifact?: number;
  bibliography?: number;
  edition?: number;
  feature?: number;
  file?: number;
  group?: number;
  move?: number;
  person?: number;
  place?: number;
  reference_system?: number;
  source?: number;
  source_translation?: number;
  stratigraphic_unit?: number;
  type?: number;
}

export interface TimeDetailModel {
  earliest?: string;
  latest?: string;
}

export interface TimeStartEndModel {
  end?: TimeDetailModel;
  start?: TimeDetailModel;
}

export type TimespansModel = TimeStartEndModel[];

export interface TypeModel {
  description?: string;
  hierarchy?: string;
  identifier?: string;
  label?: string;
  unit?: number;
  value?: number;
}

export interface TypeOverviewChildren {
  id?: string;
  label?: string;
  url?: string;
}

export interface TypeOverviewEntry {
  children?: TypeOverviewChildren[];
  id?: number;
  name?: string;
  viewClass?: string[];
}

export interface TypeOverviewModel {
  custom?: TypeOverviewEntry[];
  places?: TypeOverviewEntry[];
  standard?: TypeOverviewEntry[];
  system?: TypeOverviewEntry[];
  value?: TypeOverviewEntry[];
}

export interface TypeTreeModel {
  type_tree?: TypeTreeSubModel[];
}

export interface TypeTreeSubModel {
  Type_IDs?: TypeTreeSubModelTypeIDs;
}

export interface TypesByViewClassEntry {
  children?: TypeOverviewChildren[];
  id?: number;
  name?: string;
  viewClass?: string[];
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

export interface WhenModel {
  timespans?: TimespansModel;
}

export type InlineResponse200 = OutputModelLPF;

export type InlineResponse2001 = LinkedPlaceModel;

export interface ContentModelImageSized {
  table?: string;
  thumbnail?: string;
}

export interface FeatureGeoJSONProperties {
  title?: string;
}

export interface GeometricEntryGeometry {
  coordinates?: number[][];
  type?: string;
}

export interface GeometricEntryProperties {
  description?: string;
  id?: number;
  name?: string;
  objectDescription?: string;
  objectId?: number;
  objectName?: string;
  objectType?: string;
  shapeType?: string;
}

export interface GeometriesPropertiesPlaceTypes {
  id?: number;
  name?: string;
}

export interface GeometriesPropertiesPlace {
  id?: number;
  name?: string;
  types?: GeometriesPropertiesPlaceTypes[];
}

export interface GeometriesProperties {
  begin_from?: string;
  begin_to?: string;
  description?: string;
  end_from?: string;
  end_to?: string;
  id?: number;
  name?: string;
  place?: GeometriesPropertiesPlace;
  type?: string;
}

export interface SubunitsModelGeometry {
  geometries?: GeometryModel;
  type?: string;
}

export interface SubunitsModelPropertiesExternalReferences {
  identifier?: string;
  referenceSystem?: string;
  type?: string;
}

export interface SubunitsModelPropertiesFiles {
  fileName?: string;
  id?: number;
  license?: string;
  name?: string;
  source?: string;
}

export interface SubunitsModelPropertiesReferences {
  abbreviation?: string;
  id?: number;
  pages?: string;
  title?: string;
}

export interface SubunitsModelPropertiesStandardType {
  id?: number;
  name?: string;
  path?: string;
  rootId?: number;
}

export interface SubunitsModelPropertiesTimespan {
  earliestBegin?: string;
  earliestEnd?: string;
  latestBegin?: string;
  latestEnd?: string;
}

export interface SubunitsModelPropertiesTypes {
  id?: number;
  name?: string;
  path?: string;
  rootId?: number;
  unit?: string;
  value?: number;
}

export interface SubunitsModelProperties {
  aliases?: string[];
  description?: string;
  externalReferences?: SubunitsModelPropertiesExternalReferences[];
  files?: SubunitsModelPropertiesFiles[];
  name?: string;
  references?: SubunitsModelPropertiesReferences[];
  standardType?: SubunitsModelPropertiesStandardType;
  timespan?: SubunitsModelPropertiesTimespan;
  types?: SubunitsModelPropertiesTypes[];
}

export interface TypeTreeSubModelTypeIDs {
  count?: number;
  count_subs?: number;
  description?: string;
  first?: number;
  id?: number;
  last?: number;
  locked?: boolean;
  name?: string;
  note?: string;
  origin_id?: number;
  root?: number[];
  standard?: boolean;
  subs?: number[];
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
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
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
  public baseUrl: string = "https://demo-dev.openatlas.eu/api/0.3/";
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
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
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
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

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
    });
  };
}

/**
 * @title OpenAtlas Api
 * @version 0.3
 * @termsOfService https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 * @baseUrl https://demo-dev.openatlas.eu/api/0.3/
 *
 * This is the stable version of the OpenAtlas API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  cidocClass = {
    /**
     * @description Retrieves a json with a list of entities based on their CIDOC CRM class code. The json contains a **result** and **pagination** key. All in OpenAtlas available codes can be found under `https://redmine.craws.net/projects/uni/wiki/OpenAtlas_and_CIDOC_CRM_class_mapping`. The result can also be filtered, ordered and manipulated through different parameters. By default results are orderd alphabetically and 20 entities are shown.
     *
     * @tags Entities
     * @name CidocClassDetail
     * @summary Cidoc_Class endpoint
     * @request GET:/cidoc_class/{cidoc_class}
     */
    cidocClassDetail: (
      cidocClass: string,
      query?: {
        /** Integer of entities returned per page. 0 means no limit is set. Default is 20. */
        limit?: number;
        /** The result will be sorted by the given column */
        column?:
          | "id"
          | "classCode"
          | "name"
          | "description"
          | "created"
          | "modified"
          | "systemClass"
          | "beginFrom"
          | "beginTo"
          | "endFrom"
          | "endTo";
        /** Result will be sorted asc/desc (default column is name) */
        sort?: "asc" | "desc";
        /** Search request with AND/OR logic. Confer https://redmine.craws.net/projects/uni/wiki/API_03#Search */
        search?: string;
        /** List of results start with given ID */
        first?: number;
        /** List of results start with entity after given ID */
        last?: number;
        /** Select which key should be shown. If 'not' is used, no other keys will be shown */
        show?: "when" | "types" | "relations" | "names" | "links" | "geometry" | "depictions" | "not";
        /**
         * Select which relations are shown
         * @example P2
         */
        relation_type?: string;
        /** The output will be filtered by the type_id. Only entities with this type ids will be display. The relation is in logical OR. */
        type_id?: number;
        /** Returns a integer which represents the total count of the result */
        count?: boolean;
        /** Triggers the file download of the given request */
        download?: boolean;
        /** Select to which output format is prefered */
        format?: "linked_places" | "geojson";
        /** Result will be downloaded in the given format. */
        export?: "csv" | "csvNetwork";
        /** Jump to given page */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InlineResponse200, void>({
        path: `/cidoc_class/${cidocClass}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  classes = {
    /**
     * @description Provides a list of all available system classes, their CIDOC CRM mapping, which view they belong, which icon is used and the englisch name
     *
     * @tags Content
     * @name ClassesList
     * @summary Class Mapping endpoint
     * @request GET:/classes/
     */
    classesList: (params: RequestParams = {}) =>
      this.request<ClassMappingModel[], void>({
        path: `/classes/`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  content = {
    /**
     * @description Retrieves a json of the content (Intro, Legal Notice, Contact and the size for processed images) from the OpenAtlas instance. The language can be choosen with the **lang** parameter (en or de).
     *
     * @tags Content
     * @name ContentList
     * @summary Content endpoint
     * @request GET:/content/
     */
    contentList: (
      query?: {
        /** Select output language */
        lang?: "en" | "de";
        /** Triggers the file download of the given request */
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
  entitiesLinkedToEntity = {
    /**
     * @description Retrieves a json with a list of entities, which are linked to the entered entity. The result can also be filtered, ordered and manipulated through different parameters. By default results are orderd alphabetically and 20 entities are shown.
     *
     * @tags Entities
     * @name EntitiesLinkedToEntityDetail
     * @summary Linked Entities endpoint
     * @request GET:/entities_linked_to_entity/{id_}
     */
    entitiesLinkedToEntityDetail: (
      id: number,
      query?: {
        /** Integer of entities returned per page. 0 means no limit is set. Default is 20. */
        limit?: number;
        /** The result will be sorted by the given column */
        column?:
          | "id"
          | "classCode"
          | "name"
          | "description"
          | "created"
          | "modified"
          | "systemClass"
          | "beginFrom"
          | "beginTo"
          | "endFrom"
          | "endTo";
        /** Result will be sorted asc/desc (default column is name) */
        sort?: "asc" | "desc";
        /** Search request with AND/OR logic. Confer https://redmine.craws.net/projects/uni/wiki/API_03#Search */
        search?: string;
        /** List of results start with given ID */
        first?: number;
        /** List of results start with entity after given ID */
        last?: number;
        /** Select which key should be shown. If 'not' is used, no other keys will be shown */
        show?: "when" | "types" | "relations" | "names" | "links" | "geometry" | "depictions" | "not";
        /**
         * Select which relations are shown
         * @example P2
         */
        relation_type?: string;
        /** The output will be filtered by the type_id. Only entities with this type ids will be display. The relation is in logical OR. */
        type_id?: number;
        /** Returns a integer which represents the total count of the result */
        count?: boolean;
        /** Triggers the file download of the given request */
        download?: boolean;
        /** Select to which output format is prefered */
        format?: "linked_places" | "geojson";
        /** Result will be downloaded in the given format. */
        export?: "csv" | "csvNetwork";
        /** Jump to given page */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InlineResponse200, void>({
        path: `/entities_linked_to_entity/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  entity = {
    /**
     * @description Retrieves a geojson representations of an entity through the **id**.
     *
     * @tags Entities
     * @name EntityDetail
     * @summary Entity endpoint
     * @request GET:/entity/{id_}
     */
    entityDetail: (
      id: number,
      query?: {
        /** Select which key should be shown. If 'not' is used, no other keys will be shown */
        show?: "when" | "types" | "relations" | "names" | "links" | "geometry" | "depictions" | "not";
        /** Triggers the file download of the given request */
        download?: boolean;
        /** Result will be downloaded in the given format. */
        export?: "csv" | "csvNetwork";
        /** Select to which output format is prefered */
        format?: "linked_places" | "geojson";
      },
      params: RequestParams = {},
    ) =>
      this.request<InlineResponse2001, void>({
        path: `/entity/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  geometricEntities = {
    /**
     * @description Retrieves a list of all selected geometries in the database in a standard Geojson format. This is implimentended for map usage.
     *
     * @tags Content
     * @name GeometricEntitiesList
     * @summary Geometries Endpoint
     * @request GET:/geometric_entities/
     */
    geometricEntitiesList: (
      query?: {
        /** Returns a integer which represents the total count of the result */
        count?: boolean;
        /** Triggers the file download of the given request */
        download?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<GeometricEntries, void>({
        path: `/geometric_entities/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  latest = {
    /**
     * @description Retrieves a json of latest entries made in the OpenAtlas database. The number **latest** represents the amount of entities retrieved. **latest** can be any number between and including 1 and 100. The pagination information is alway `null`
     *
     * @tags Entities
     * @name LatestDetail
     * @summary Latest endpoint
     * @request GET:/latest/{latest}
     */
    latestDetail: (
      latest: number,
      query?: {
        /** Select which key should be shown. If 'not' is used, no other keys will be shown */
        show?: "when" | "types" | "relations" | "names" | "links" | "geometry" | "depictions" | "not";
        /**
         * Select which relations are shown
         * @example P2
         */
        relation_type?: string;
        /** Triggers the file download of the given request */
        download?: boolean;
        /** Select to which output format is prefered */
        format?: "linked_places" | "geojson";
        /** Result will be downloaded in the given format. */
        export?: "csv" | "csvNetwork";
      },
      params: RequestParams = {},
    ) =>
      this.request<InlineResponse200, void>({
        path: `/latest/${latest}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  query = {
    /**
     * @description Retrieves a list of Geojson representations by entity id, CIDOC CRM code or menu item
     *
     * @tags Entities
     * @name QueryList
     * @summary Query endpoint
     * @request GET:/query/
     */
    queryList: (
      query?: {
        /** Specific entity ID */
        entities?: number;
        /** Need to be a entity class code of the CIDOC CRM (e.g. E21, E18, E33). For further information visit https://redmine.craws.net/projects/uni/wiki/OpenAtlas_and_CIDOC_CRM_class_mapping */
        cidoc_classes?: string;
        /** Need to be an OpenAtlas menu items */
        view_classes?: ["actor" | "event" | "place" | "reference" | "source" | "object"];
        /** Need to be an OpenAtlas system class */
        system_classes?:
          | "acquisition"
          | "activity"
          | "administrative_unit"
          | "appellation"
          | "artifact"
          | "bibliography"
          | "edition"
          | "external_reference"
          | "feature"
          | "file"
          | "group"
          | "human_remains"
          | "move"
          | "object_location"
          | "person"
          | "place"
          | "source"
          | "reference_system"
          | "stratigraphic_unit"
          | "source_translation"
          | "type";
        /** Integer of entities returned per page. 0 means no limit is set. Default is 20. */
        limit?: number;
        /** The result will be sorted by the given column */
        column?:
          | "id"
          | "classCode"
          | "name"
          | "description"
          | "created"
          | "modified"
          | "systemClass"
          | "beginFrom"
          | "beginTo"
          | "endFrom"
          | "endTo";
        /** Result will be sorted asc/desc (default column is name) */
        sort?: "asc" | "desc";
        /** Search request with AND/OR logic. Confer https://redmine.craws.net/projects/uni/wiki/API_03#Search */
        search?: string;
        /** List of results start with given ID */
        first?: number;
        /** List of results start with entity after given ID */
        last?: number;
        /** Select which key should be shown. If 'not' is used, no other keys will be shown */
        show?: "when" | "types" | "relations" | "names" | "links" | "geometry" | "depictions" | "not";
        /**
         * Select which relations are shown
         * @example P2
         */
        relation_type?: string;
        /** The output will be filtered by the type_id. Only entities with this type ids will be display. The relation is in logical OR. */
        type_id?: number;
        /** Returns a integer which represents the total count of the result */
        count?: boolean;
        /** Triggers the file download of the given request */
        download?: boolean;
        /** Select to which output format is prefered */
        format?: "linked_places" | "geojson";
        /** Result will be downloaded in the given format. */
        export?: "csv" | "csvNetwork";
        /** Jump to given page */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InlineResponse200, void>({
        path: `/query/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  subunits = {
    /**
     * @description Displays all subunits of a place in a special Thanados format
     *
     * @tags Nodes
     * @name SubunitsDetail
     * @summary Node endpoint
     * @request GET:/subunits/{id_}
     */
    subunitsDetail: (
      id: number,
      query?: {
        /** Returns a integer which represents the total count of the result */
        count?: boolean;
        /** Triggers the file download of the given request */
        download?: boolean;
        /** Select to which output format is prefered */
        format?: "linked_places" | "geojson";
      },
      params: RequestParams = {},
    ) =>
      this.request<SubunitsModel, void>({
        path: `/subunits/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  systemClass = {
    /**
     * @description Retrieves a json with a list of entities based on their OpenAtlas system class. Available categories are **acquisition**, **activity**, **actor_appellation**, **administrative_unit**, **appellation**, **artifact**, **bibliography**, **edition**, **external_reference**, **feature**, **file**, , **group**, **human_remains**, **move**, **object_location**, **person**, **place**, **source**, **reference_system**, **stratigraphic_unit**, **source_translation**, **type**,  The result can also be filtered, ordered and manipulated through different parameters.  By default results are orderd alphabetically and 20 entities are shown.
     *
     * @tags Entities
     * @name SystemClassDetail
     * @summary System Class endpoint
     * @request GET:/system_class/{system_class}
     */
    systemClassDetail: (
      systemClass:
        | "all"
        | "administrative_unit"
        | "type"
        | "acquisition"
        | "activity"
        | "actor_actor_relation"
        | "actor_function"
        | "appellation"
        | "artifact"
        | "bibliography"
        | "edition"
        | "external_reference"
        | "feature file"
        | "group"
        | "human_remains"
        | "involvement"
        | "move"
        | "object_location"
        | "person"
        | "place"
        | "production"
        | "reference_system"
        | "source"
        | "source_translation"
        | "stratigraphic_unit",
      query?: {
        /** Integer of entities returned per page. 0 means no limit is set. Default is 20. */
        limit?: number;
        /** The result will be sorted by the given column */
        column?:
          | "id"
          | "classCode"
          | "name"
          | "description"
          | "created"
          | "modified"
          | "systemClass"
          | "beginFrom"
          | "beginTo"
          | "endFrom"
          | "endTo";
        /** Result will be sorted asc/desc (default column is name) */
        sort?: "asc" | "desc";
        /** Search request with AND/OR logic. Confer https://redmine.craws.net/projects/uni/wiki/API_03#Search */
        search?: string;
        /** List of results start with given ID */
        first?: number;
        /** List of results start with entity after given ID */
        last?: number;
        /** Select which key should be shown. If 'not' is used, no other keys will be shown */
        show?: "when" | "types" | "relations" | "names" | "links" | "geometry" | "depictions" | "not";
        /**
         * Select which relations are shown
         * @example P2
         */
        relation_type?: string;
        /** Returns a integer which represents the total count of the result */
        count?: boolean;
        /** Triggers the file download of the given request */
        download?: boolean;
        /** Select to which output format is prefered */
        format?: "linked_places" | "geojson";
        /** Result will be downloaded in the given format. */
        export?: "csv" | "csvNetwork";
        /** Jump to given page */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InlineResponse200, void>({
        path: `/system_class/${systemClass}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  systemClassCount = {
    /**
     * No description
     *
     * @tags Content
     * @name SystemClassCountList
     * @summary System Class Count endpoint
     * @request GET:/system_class_count/
     */
    systemClassCountList: (params: RequestParams = {}) =>
      this.request<SystemClassCountModel, void>({
        path: `/system_class_count/`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  typeByViewClass = {
    /**
     * @description Retrieves a json list of all types sorted by view class
     *
     * @tags Nodes
     * @name TypeByViewClassList
     * @summary Node endpoint
     * @request GET:/type_by_view_class/
     */
    typeByViewClassList: (
      query?: {
        /** Triggers the file download of the given request */
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
  typeEntities = {
    /**
     * @description Retrieves a json with a list of entities based on their OpenAtlas type. A possible *id* can be obtained by the *type_tree* or *node_overview* endpoint. The result can also be filtered, ordered and manipulated through different parameters. By default results are orderd alphabetically and 20 entities are shown.
     *
     * @tags Entities
     * @name TypeEntitiesDetail
     * @summary Type Entities Endpoint
     * @request GET:/type_entities/{id_}
     */
    typeEntitiesDetail: (
      id: number,
      query?: {
        /** Integer of entities returned per page. 0 means no limit is set. Default is 20. */
        limit?: number;
        /** The result will be sorted by the given column */
        column?:
          | "id"
          | "classCode"
          | "name"
          | "description"
          | "created"
          | "modified"
          | "systemClass"
          | "beginFrom"
          | "beginTo"
          | "endFrom"
          | "endTo";
        /** Result will be sorted asc/desc (default column is name) */
        sort?: "asc" | "desc";
        /** Search request with AND/OR logic. Confer https://redmine.craws.net/projects/uni/wiki/API_03#Search */
        search?: string;
        /** List of results start with given ID */
        first?: number;
        /** List of results start with entity after given ID */
        last?: number;
        /** Select which key should be shown. If 'not' is used, no other keys will be shown */
        show?: "when" | "types" | "relations" | "names" | "links" | "geometry" | "depictions" | "not";
        /**
         * Select which relations are shown
         * @example P2
         */
        relation_type?: string;
        /** The output will be filtered by the type_id. Only entities with this type ids will be display. The relation is in logical OR. */
        type_id?: number;
        /** Returns a integer which represents the total count of the result */
        count?: boolean;
        /** Triggers the file download of the given request */
        download?: boolean;
        /** Select to which output format is prefered */
        format?: "linked_places" | "geojson";
        /** Result will be downloaded in the given format. */
        export?: "csv" | "csvNetwork";
        /** Jump to given page */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InlineResponse200, void>({
        path: `/type_entities/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  typeEntitiesAll = {
    /**
     * @description Retrieves a json with a list of entities based on their OpenAtlas type. This endpoint also includes all entities, which are connected to an subtype. A possible *id* can be obtained by the *type_tree* or *node_overview* endpoint. The result can also be filtered, ordered and manipulated through different parameters. By default results are orderd alphabetically and 20 entities are shown.
     *
     * @tags Entities
     * @name TypeEntitiesAllDetail
     * @summary Type Entities All Endpoint
     * @request GET:/type_entities_all/{id_}
     */
    typeEntitiesAllDetail: (
      id: number,
      query?: {
        /** Integer of entities returned per page. 0 means no limit is set. Default is 20. */
        limit?: number;
        /** The result will be sorted by the given column */
        column?:
          | "id"
          | "classCode"
          | "name"
          | "description"
          | "created"
          | "modified"
          | "systemClass"
          | "beginFrom"
          | "beginTo"
          | "endFrom"
          | "endTo";
        /** Result will be sorted asc/desc (default column is name) */
        sort?: "asc" | "desc";
        /** Search request with AND/OR logic. Confer https://redmine.craws.net/projects/uni/wiki/API_03#Search */
        search?: string;
        /** List of results start with given ID */
        first?: number;
        /** List of results start with entity after given ID */
        last?: number;
        /** Select which key should be shown. If 'not' is used, no other keys will be shown */
        show?: "when" | "types" | "relations" | "names" | "links" | "geometry" | "depictions" | "not";
        /**
         * Select which relations are shown
         * @example P2
         */
        relation_type?: string;
        /** The output will be filtered by the type_id. Only entities with this type ids will be display. The relation is in logical OR. */
        type_id?: number;
        /** Returns a integer which represents the total count of the result */
        count?: boolean;
        /** Triggers the file download of the given request */
        download?: boolean;
        /** Select to which output format is prefered */
        format?: "linked_places" | "geojson";
        /** Result will be downloaded in the given format. */
        export?: "csv" | "csvNetwork";
        /** Jump to given page */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InlineResponse200, void>({
        path: `/type_entities_all/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  typeOverview = {
    /**
     * @description Retrieves a json list of all types
     *
     * @tags Nodes
     * @name TypeOverviewList
     * @summary Node endpoint
     * @request GET:/type_overview/
     */
    typeOverviewList: (
      query?: {
        /** Triggers the file download of the given request */
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
     * @description Shows every *Type* in the OA instance, with its root and subs, so a tree can be build
     *
     * @tags Nodes
     * @name TypeTreeList
     * @summary Type Tree endpoint
     * @request GET:/type_tree/
     */
    typeTreeList: (
      query?: {
        /** Triggers the file download of the given request */
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
  viewClass = {
    /**
     * @description Retrieves a json with a list of entities based on their OpenAtlas view class. Available categories are **actor**, **event**, **place**, **source**, **reference**, **object**. The result can also be filtered, ordered and manipulated through different parameters. By default results are orderd alphabetically and 20 entities are shown.
     *
     * @tags Entities
     * @name ViewClassDetail
     * @summary View Class Endpoint
     * @request GET:/view_class/{view_class}
     */
    viewClassDetail: (
      viewClass:
        | "all"
        | "actor"
        | "artifact"
        | "file"
        | "event"
        | "place"
        | "reference"
        | "reference_system"
        | "source"
        | "type"
        | "source_translation",
      query?: {
        /** Integer of entities returned per page. 0 means no limit is set. Default is 20. */
        limit?: number;
        /** The result will be sorted by the given column */
        column?:
          | "id"
          | "classCode"
          | "name"
          | "description"
          | "created"
          | "modified"
          | "systemClass"
          | "beginFrom"
          | "beginTo"
          | "endFrom"
          | "endTo";
        /** Result will be sorted asc/desc (default column is name) */
        sort?: "asc" | "desc";
        /** Search request with AND/OR logic. Confer https://redmine.craws.net/projects/uni/wiki/API_03#Search */
        search?: string;
        /** List of results start with given ID */
        first?: number;
        /** List of results start with entity after given ID */
        last?: number;
        /** Select which key should be shown. If 'not' is used, no other keys will be shown */
        show?: "when" | "types" | "relations" | "names" | "links" | "geometry" | "depictions" | "not";
        /**
         * Select which relations are shown
         * @example P2
         */
        relation_type?: string;
        /** The output will be filtered by the type_id. Only entities with this type ids will be display. The relation is in logical OR. */
        type_id?: number;
        /** Returns a integer which represents the total count of the result */
        count?: boolean;
        /** Triggers the file download of the given request */
        download?: boolean;
        /** Select to which output format is prefered */
        format?: "linked_places" | "geojson";
        /** Result will be downloaded in the given format. */
        export?: "csv" | "csvNetwork";
        /** Jump to given page */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InlineResponse200, void>({
        path: `/view_class/${viewClass}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
