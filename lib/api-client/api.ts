export interface paths {
    "/backend_details/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves a list of backend configuration settings. */
        get: operations["GetBackendDetails"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chained_events/{entityId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the chain of successive events also with forks but no super or sub events if they are not in the chain. */
        get: operations["GetChainedEvents"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cidoc_class/{cidoc_class}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves entities based on their CIDOC CRM class code. */
        get: operations["GetByCidocClass"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/class_mapping/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves all OpenAtlas classes with their label, CIDOC CRM mapping, view, icon and standard type ID. Label language is English by default but can be changed by `locale` parameter */
        get: operations["ClassMapping"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves all OpenAtlas classes with their English label, CIDOC CRM mapping, view, icon and standard type ID. */
        get: operations["Classes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/display/{fileId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves the image connected to the requested ID or entityID, if it has a licence. */
        get: operations["DisplayImage"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ego_network_visualisation/{entityId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves a list of object with id, system_class, label and related ids connected to one entity. */
        get: operations["GetEgoNetworkVisualisation"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entities_linked_to_entity/{entityId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves entities linked to the entity with the provided `{entityId}`. */
        get: operations["GetEntitiesLinkedToEntity"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entity/{entityId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves information about a single entity. */
        get: operations["GetEntity"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entity_presentation_view/{entityId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves an Entity with its linked data for presentation sites */
        get: {
            parameters: {
                query?: {
                    /** @description Will include the whole place hierarchy. This means that instead of only getting entities linked to the requested entity, all entities, which are connected with the property *P46* are included in the result set. This can significantly increase the load time. */
                    place_hierarchy?: components["parameters"]["place_hierarchy"];
                    /** @description This will remove any keys which are empty or have no values assigned, e.g. []. This can reduce the load time. */
                    remove_empty_values?: components["parameters"]["remove_empty_values"];
                    /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                    centroid?: components["parameters"]["centroid"];
                };
                header?: never;
                path: {
                    /**
                     * @description Specific entity ID
                     * @example 40
                     */
                    entityId: components["parameters"]["entityId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PresentationViewModel"];
                    };
                };
                /** @description Something went wrong. Please consult the error message. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/export_database/{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Downloads all information as CSV, XML, or JSON. */
        get: operations["ExportDatabase"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/geometric_entities/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves a detailed GeoJSON of all chosen geometries, e.g. used for Leaflet maps. */
        get: operations["GetGeometricEntities"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/iiif_manifest/{version}/{fileId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves the manifest of the IIIF image. */
        get: operations["IIIFManifest"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/latest/{limit}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves the last entered entities. `{limit}` represents the amount of entities (between 1 and 100). The pagination information is always null. */
        get: operations["GetLatest"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/licensed_file_overview/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves all existing files with a licence and their display URL, thumbnail URL, extension and license. With the parameter `{file_id}` specific files can be retrieved. */
        get: operations["LicensedFileOverview"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/linked_entities_by_properties_recursive/{entityId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves all entities linked with the provided property to the entity with the provided `{entityId}` in a recursive manner. */
        get: operations["GetLinkedEntitiesByPropertyRecursive"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/network_visualisation/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves a list of object with id, system_class, label and related ids */
        get: operations["GetNetworkVisualisation"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/openapi_schema/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves OpenApi3 schema for this instance. Formats are `json` or `yaml`. */
        get: operations["openapi_schema"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/properties/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves all OpenAtlas CIDOC properties with their label, name, name inverse, code and translations. */
        get: operations["GetProperties"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/query/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves a list with entity ID, CIDOC CRM code, system class, or view class. You can combine these endpoints in a single query. */
        get: operations["GetQuery"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/{system_class}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Searches the database for entries matching a provided search term.
         *       Results are ordered with exact prefix matches appearing first, followed by entries containing the search term within their name or appellation. */
        get: operations["GetSearchEntities"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/subunits/{entityId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves all subunits of a place in a special format, used by e.g. ARIADNEplus and THANADOS. */
        get: operations["GetSubunits"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/system_class/{system_class}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves entities based on their OpenAtlas class name. */
        get: operations["GetBySystemClass"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/system_class_count/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves system classes with a count of their instances. */
        get: operations["SystemClassCount"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/type_by_view_class/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves standard types in a hierarchical order. */
        get: operations["GetTypeByViewClass"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/type_entities/{entityId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves entities using provided `{entityId}` as their type. To get available types, Types Endpoints can be used. */
        get: operations["GetTypeEntities"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/type_entities_all/{entityId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves entities based on their OpenAtlas type ID including all connected subtypes. To get available types see Types Endpoints. */
        get: operations["GetTypeEntitiesAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/type_overview/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves all OpenAtlas types sorted by custom, places, standard, system and value types. */
        get: operations["GetTypeOverview"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/type_tree/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves a flat list of all types. */
        get: operations["GetTypeTree"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/view_class/{view_class}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieves entities based on their OpenAtlas view class. */
        get: operations["GetByViewClass"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        BackendDetailsModel: {
            IIIF: {
                enabled: string;
                url: string;
                version: string;
            };
            apiVersions: string;
            imageProcessing: {
                availableImageSizes: {
                    table: string;
                    thumbnail: string;
                };
                enabled: string;
            };
            siteName: string;
            version: string;
        };
        ChainEventModel: {
            children: components["schemas"]["ChainEventModel"][] | null;
            geometry: (components["schemas"]["Polygon"] | components["schemas"]["Point"] | components["schemas"]["LineString"] | components["schemas"]["GeometryCollection"]) | null;
            id: number;
            name: string;
            system_class: string;
        };
        ClassMappingModel: {
            locale?: string;
            results?: {
                crmClass: string;
                icon: string;
                label: string;
                systemClass: string;
                view: string;
            }[];
        };
        ClassesModel: {
            crmClass: string;
            en: string;
            icon: string;
            systemClass: string;
            view: string;
        }[];
        EntitiesOutputModel: {
            pagination: components["schemas"]["PaginationModel"];
            results: (components["schemas"]["LinkedPlacesModel"] | components["schemas"]["GeoJSONModel"] | components["schemas"]["SearchModel"])[];
        };
        EntityTypeModel: {
            descriptions?: string | null;
            id: number;
            isStandard: boolean;
            title: string;
            typeHierarchy?: components["schemas"]["TypeHierarchyEntryModel"][] | null;
            unit?: string;
            value?: string;
        } | null;
        ExternalReferenceModel: {
            id: string;
            identifier: string;
            referenceSystem: string;
            referenceURL: string;
            resolverURL: string;
            type: string;
        } | null;
        /** @description A GeoJSON Feature object, linking a geometry to properties. */
        Feature: {
            geometry: (components["schemas"]["GeoJSONPoint"] | components["schemas"]["GeoJSONPolygon"] | components["schemas"]["GeoJSONLineString"]) | null;
            properties: components["schemas"]["FeatureProperties"];
            /**
             * @description The GeoJSON object type.
             * @enum {string}
             */
            type: "Feature";
        };
        /** @description A collection of GeoJSON Feature objects. */
        FeatureCollection: {
            features: components["schemas"]["Feature"][];
            /**
             * @description The GeoJSON object type.
             * @enum {string}
             */
            type: "FeatureCollection";
        };
        FeatureProperties: {
            /** @description A description of the feature. */
            description?: string;
            /**
             * Format: int64
             * @description A specific identifier for the location.
             */
            locationId?: number;
            /** @description A custom identifier for the shape's role or type. */
            shapeType?: string;
            /** @description A title for the feature. */
            title?: string;
        };
        /** @description A GeoJSON LineString geometry. */
        GeoJSONLineString: {
            coordinates: components["schemas"]["PositionArray"];
            /**
             * @description The GeoJSON geometry type.
             * @enum {string}
             */
            type: "LineString";
        };
        GeoJSONModel: {
            features: {
                geometry: components["schemas"]["Polygon"] | components["schemas"]["Point"] | components["schemas"]["LineString"] | components["schemas"]["GeometryCollection"];
                properties: {
                    "@id": number;
                    begin_comment: string | null;
                    begin_earliest: string;
                    begin_latest: string | null;
                    description: string;
                    end_comment: string | null;
                    end_earliest: string;
                    end_latest: string | null;
                    name: string;
                    systemClass: string;
                    types: {
                        typeId?: number;
                        typeName?: string;
                    }[];
                    viewClass: string;
                };
                type?: string;
            }[];
            /** @enum {string} */
            type: "FeatureCollection";
        };
        /** @description A GeoJSON Point geometry. */
        GeoJSONPoint: {
            coordinates: components["schemas"]["Position"];
            /**
             * @description The GeoJSON geometry type.
             * @enum {string}
             */
            type: "Point";
        };
        /** @description A GeoJSON Polygon geometry. */
        GeoJSONPolygon: {
            coordinates: components["schemas"]["PolygonCoordinates"];
            /**
             * @description The GeoJSON geometry type.
             * @enum {string}
             */
            type: "Polygon";
        };
        GeoJsonGeometry: components["schemas"]["Point"] | components["schemas"]["LineString"] | components["schemas"]["Polygon"];
        GeometricEntitiesModel: {
            features?: {
                geometry?: {
                    coordinates?: number[];
                    type?: string;
                };
                properties?: {
                    description?: string;
                    /** Format: int32 */
                    id?: number;
                    /** Format: int32 */
                    locationId?: number;
                    name?: string;
                    objectDescription?: string;
                    /** Format: int32 */
                    objectId?: number;
                    objectName?: string;
                    objectType?: string;
                    shapeType?: string;
                };
                type?: string;
            }[];
            type?: string;
        };
        /** @description Represents geographic data associated with an entity.
         *     Can be explicitly null, a single GeoJSON geometry (Point, Polygon, or LineString),
         *     or a GeoJSON FeatureCollection containing Features with specific properties. */
        Geometries: (components["schemas"]["FeatureCollection"] | components["schemas"]["Feature"]) | null;
        GeometryCollection: {
            geometries: (components["schemas"]["Polygon"] | components["schemas"]["Point"] | components["schemas"]["LineString"])[];
            /** @enum {string} */
            type: "GeometryCollection";
        };
        LicensedFileOverviewModel: {
            id: {
                IIIFManifest: string;
                creator: string;
                display: string;
                extension: string;
                license: string;
                licenseHolder: string;
                publicShareable: boolean;
                thumbnail: string;
            };
        };
        LineString: {
            coordinates: components["schemas"]["LineStringCoordinates"];
            description?: string;
            locationId?: string;
            /** @enum {string} */
            shapeType?: "polyline";
            title?: string;
            /** @enum {string} */
            type: "LineString";
        };
        LineStringCoordinates: [
            components["schemas"]["Position"],
            components["schemas"]["Position"],
            ...components["schemas"]["Position"][]
        ];
        /** @description An array of four or more positions where the first and last positions are equivalent (they represent closed loops).
         *     Used for defining polygon boundaries. */
        LinearRing: [
            components["schemas"]["Position"],
            components["schemas"]["Position"],
            components["schemas"]["Position"],
            components["schemas"]["Position"],
            ...components["schemas"]["Position"][]
        ];
        LinkedPlacesModel: {
            "@context": string;
            features: {
                "@id": string;
                crmClass: string;
                depictions?: {
                    "@id"?: string;
                    IIIFBasePath?: string;
                    IIIFManifest?: string;
                    creator?: string;
                    license?: string;
                    licenseHolder?: string;
                    mimetype?: string;
                    publicShareable?: boolean;
                    title?: string;
                    url?: string;
                }[] | null;
                descriptions?: {
                    value?: string;
                }[];
                geometry?: (components["schemas"]["Polygon"] | components["schemas"]["Point"] | components["schemas"]["LineString"] | components["schemas"]["GeometryCollection"]) | null;
                links?: string | null;
                names?: string | null;
                properties?: {
                    title: string;
                };
                relations?: {
                    label?: string;
                    relationDescription?: string | null;
                    relationSystemClass?: string;
                    relationTo?: string;
                    relationType?: string;
                    type?: string | null;
                    when?: {
                        timespans?: {
                            end?: {
                                comment?: string | null;
                                earliest?: string | null;
                                latest?: string | null;
                            };
                            start?: {
                                comment?: string | null;
                                earliest?: string | null;
                                latest?: string | null;
                            };
                        }[];
                    } | null;
                }[] | null;
                systemClass: string;
                type: string;
                types?: {
                    descriptions?: string | null;
                    hierarchy?: string;
                    identifier?: string;
                    label?: string;
                    typeHierarchy?: {
                        description?: string;
                        identifier?: string;
                        label?: string;
                    }[];
                    unit?: string | null;
                    /** Format: string */
                    value?: number;
                }[] | null;
                viewClass: string;
                when?: {
                    timespans?: {
                        end?: {
                            comment?: string | null;
                            earliest?: string | null;
                            latest?: string | null;
                        };
                        start?: {
                            comment?: string | null;
                            earliest?: string | null;
                            latest?: string | null;
                        };
                    }[];
                } | null;
            }[];
            type: string;
        };
        NetworkVisualisationModel: {
            results: {
                id: number;
                label: string;
                relations: number[];
                systemClass: string;
            }[];
        };
        PaginationIndexModel: {
            page?: number;
            startId?: number;
        };
        PaginationModel: {
            entities: number;
            entitiesPerPage: number;
            index: components["schemas"]["PaginationIndexModel"][];
            totalPages: number;
        };
        Point: {
            coordinates: components["schemas"]["Position"];
            description?: string;
            locationId?: string;
            /** @enum {string} */
            shapeType?: "centerpoint";
            title?: string;
            /** @enum {string} */
            type: "Point";
        };
        Polygon: {
            coordinates: components["schemas"]["LinearRing"][];
            description?: string;
            locationId?: string;
            /** @enum {string} */
            shapeType?: "area" | "shape";
            title?: string;
            /** @enum {string} */
            type: "Polygon";
        };
        /** @description An array of LinearRing coordinate arrays. The first element MUST be the exterior ring.
         *     Subsequent elements represent interior rings (holes). */
        PolygonCoordinates: [
            components["schemas"]["LinearRing"],
            ...components["schemas"]["LinearRing"][]
        ];
        /** @description A single position represented as an array of numbers.
         *     The first two elements MUST be longitude and latitude (in that order).
         *     An optional third element represents altitude. More elements are discouraged.
         *     Example: [10.9787, 49.7606] or [10.9787, 49.7606, 150.5] */
        Position: [
            number,
            number,
            ...number[]
        ];
        /** @description An array of two or more positions. Used for LineStrings. */
        PositionArray: [
            components["schemas"]["Position"],
            components["schemas"]["Position"],
            ...components["schemas"]["Position"][]
        ];
        PresentationViewModel: {
            aliases: string[];
            description: string;
            externalReferenceSystems?: components["schemas"]["ExternalReferenceModel"][] | null;
            files?: {
                IIIFBasePath?: string;
                IIIFManifest?: string;
                creator?: string | null;
                id: number;
                license: string | null;
                licenseHolder?: string | null;
                mimetype: string;
                publicShareable?: boolean | null;
                title: string;
                url: string;
            }[] | null;
            geometries?: components["schemas"]["Geometries"];
            id: number;
            references?: {
                citation: string;
                id: number;
                pages?: string | null;
                systemClass: string;
                title: string;
                type?: string | null;
                typeId?: number | null;
            }[] | null;
            relations?: {
                acquisition?: components["schemas"]["RelatedEntityModel"][];
                activity?: components["schemas"]["RelatedEntityModel"][];
                actor_function?: components["schemas"]["RelatedEntityModel"][];
                actor_relation?: components["schemas"]["RelatedEntityModel"][];
                appellation?: components["schemas"]["RelatedEntityModel"][];
                artifact?: components["schemas"]["RelatedEntityModel"][];
                bibliography?: components["schemas"]["RelatedEntityModel"][];
                creation?: components["schemas"]["RelatedEntityModel"][];
                edition?: components["schemas"]["RelatedEntityModel"][];
                event?: components["schemas"]["RelatedEntityModel"][];
                external_reference?: components["schemas"]["RelatedEntityModel"][];
                feature?: components["schemas"]["RelatedEntityModel"][];
                file?: components["schemas"]["RelatedEntityModel"][];
                group?: components["schemas"]["RelatedEntityModel"][];
                human_remains?: components["schemas"]["RelatedEntityModel"][];
                involvement?: components["schemas"]["RelatedEntityModel"][];
                modification?: components["schemas"]["RelatedEntityModel"][];
                move?: components["schemas"]["RelatedEntityModel"][];
                person?: components["schemas"]["RelatedEntityModel"][];
                place?: components["schemas"]["RelatedEntityModel"][];
                production?: components["schemas"]["RelatedEntityModel"][];
                source?: components["schemas"]["RelatedEntityModel"][];
                source_translation?: components["schemas"]["RelatedEntityModel"][];
                stratigraphic_unit?: components["schemas"]["RelatedEntityModel"][];
            };
            systemClass: string;
            title: string;
            types?: components["schemas"]["EntityTypeModel"][] | null;
            viewClass: string;
            when?: components["schemas"]["TimeRangeModel"];
        };
        PropertiesDetailModel: {
            code: string;
            count: number;
            domainClassCode: string;
            i18n: {
                de?: string;
                en: string;
                fr?: string;
            };
            i18nInverse: string;
            name: string;
            nameInverse: string;
            rangeClassCode: string;
            sub?: string[];
            super: string[];
        };
        PropertiesModel: {
            OA7: components["schemas"]["PropertiesDetailModel"];
            OA8: components["schemas"]["PropertiesDetailModel"];
            OA9: components["schemas"]["PropertiesDetailModel"];
            P1: components["schemas"]["PropertiesDetailModel"];
            P10: components["schemas"]["PropertiesDetailModel"];
            P100: components["schemas"]["PropertiesDetailModel"];
            P101: components["schemas"]["PropertiesDetailModel"];
            P102: components["schemas"]["PropertiesDetailModel"];
            P103: components["schemas"]["PropertiesDetailModel"];
            P104: components["schemas"]["PropertiesDetailModel"];
            P105: components["schemas"]["PropertiesDetailModel"];
            P106: components["schemas"]["PropertiesDetailModel"];
            P107: components["schemas"]["PropertiesDetailModel"];
            P108: components["schemas"]["PropertiesDetailModel"];
            P109: components["schemas"]["PropertiesDetailModel"];
            P11: components["schemas"]["PropertiesDetailModel"];
            P110: components["schemas"]["PropertiesDetailModel"];
            P111: components["schemas"]["PropertiesDetailModel"];
            P112: components["schemas"]["PropertiesDetailModel"];
            P113: components["schemas"]["PropertiesDetailModel"];
            P12: components["schemas"]["PropertiesDetailModel"];
            P121: components["schemas"]["PropertiesDetailModel"];
            P122: components["schemas"]["PropertiesDetailModel"];
            P123: components["schemas"]["PropertiesDetailModel"];
            P124: components["schemas"]["PropertiesDetailModel"];
            P125: components["schemas"]["PropertiesDetailModel"];
            P126: components["schemas"]["PropertiesDetailModel"];
            P127: components["schemas"]["PropertiesDetailModel"];
            P128: components["schemas"]["PropertiesDetailModel"];
            P129: components["schemas"]["PropertiesDetailModel"];
            P13: components["schemas"]["PropertiesDetailModel"];
            P130: components["schemas"]["PropertiesDetailModel"];
            P132: components["schemas"]["PropertiesDetailModel"];
            P133: components["schemas"]["PropertiesDetailModel"];
            P134: components["schemas"]["PropertiesDetailModel"];
            P135: components["schemas"]["PropertiesDetailModel"];
            P136: components["schemas"]["PropertiesDetailModel"];
            P137: components["schemas"]["PropertiesDetailModel"];
            P138: components["schemas"]["PropertiesDetailModel"];
            P139: components["schemas"]["PropertiesDetailModel"];
            P14: components["schemas"]["PropertiesDetailModel"];
            P140: components["schemas"]["PropertiesDetailModel"];
            P141: components["schemas"]["PropertiesDetailModel"];
            P142: components["schemas"]["PropertiesDetailModel"];
            P143: components["schemas"]["PropertiesDetailModel"];
            P144: components["schemas"]["PropertiesDetailModel"];
            P145: components["schemas"]["PropertiesDetailModel"];
            P146: components["schemas"]["PropertiesDetailModel"];
            P147: components["schemas"]["PropertiesDetailModel"];
            P148: components["schemas"]["PropertiesDetailModel"];
            P15: components["schemas"]["PropertiesDetailModel"];
            P150: components["schemas"]["PropertiesDetailModel"];
            P151: components["schemas"]["PropertiesDetailModel"];
            P152: components["schemas"]["PropertiesDetailModel"];
            P156: components["schemas"]["PropertiesDetailModel"];
            P157: components["schemas"]["PropertiesDetailModel"];
            P16: components["schemas"]["PropertiesDetailModel"];
            P160: components["schemas"]["PropertiesDetailModel"];
            P161: components["schemas"]["PropertiesDetailModel"];
            P164: components["schemas"]["PropertiesDetailModel"];
            P165: components["schemas"]["PropertiesDetailModel"];
            P166: components["schemas"]["PropertiesDetailModel"];
            P167: components["schemas"]["PropertiesDetailModel"];
            P17: components["schemas"]["PropertiesDetailModel"];
            P173: components["schemas"]["PropertiesDetailModel"];
            P174: components["schemas"]["PropertiesDetailModel"];
            P175: components["schemas"]["PropertiesDetailModel"];
            P176: components["schemas"]["PropertiesDetailModel"];
            P177: components["schemas"]["PropertiesDetailModel"];
            P179: components["schemas"]["PropertiesDetailModel"];
            P180: components["schemas"]["PropertiesDetailModel"];
            P182: components["schemas"]["PropertiesDetailModel"];
            P183: components["schemas"]["PropertiesDetailModel"];
            P184: components["schemas"]["PropertiesDetailModel"];
            P185: components["schemas"]["PropertiesDetailModel"];
            P186: components["schemas"]["PropertiesDetailModel"];
            P187: components["schemas"]["PropertiesDetailModel"];
            P188: components["schemas"]["PropertiesDetailModel"];
            P189: components["schemas"]["PropertiesDetailModel"];
            P19: components["schemas"]["PropertiesDetailModel"];
            P191: components["schemas"]["PropertiesDetailModel"];
            P195: components["schemas"]["PropertiesDetailModel"];
            P196: components["schemas"]["PropertiesDetailModel"];
            P197: components["schemas"]["PropertiesDetailModel"];
            P198: components["schemas"]["PropertiesDetailModel"];
            P2: components["schemas"]["PropertiesDetailModel"];
            P20: components["schemas"]["PropertiesDetailModel"];
            P21: components["schemas"]["PropertiesDetailModel"];
            P22: components["schemas"]["PropertiesDetailModel"];
            P23: components["schemas"]["PropertiesDetailModel"];
            P24: components["schemas"]["PropertiesDetailModel"];
            P25: components["schemas"]["PropertiesDetailModel"];
            P26: components["schemas"]["PropertiesDetailModel"];
            P27: components["schemas"]["PropertiesDetailModel"];
            P28: components["schemas"]["PropertiesDetailModel"];
            P29: components["schemas"]["PropertiesDetailModel"];
            P30: components["schemas"]["PropertiesDetailModel"];
            P31: components["schemas"]["PropertiesDetailModel"];
            P32: components["schemas"]["PropertiesDetailModel"];
            P33: components["schemas"]["PropertiesDetailModel"];
            P34: components["schemas"]["PropertiesDetailModel"];
            P35: components["schemas"]["PropertiesDetailModel"];
            P37: components["schemas"]["PropertiesDetailModel"];
            P38: components["schemas"]["PropertiesDetailModel"];
            P39: components["schemas"]["PropertiesDetailModel"];
            P4: components["schemas"]["PropertiesDetailModel"];
            P40: components["schemas"]["PropertiesDetailModel"];
            P41: components["schemas"]["PropertiesDetailModel"];
            P42: components["schemas"]["PropertiesDetailModel"];
            P43: components["schemas"]["PropertiesDetailModel"];
            P44: components["schemas"]["PropertiesDetailModel"];
            P45: components["schemas"]["PropertiesDetailModel"];
            P46: components["schemas"]["PropertiesDetailModel"];
            P48: components["schemas"]["PropertiesDetailModel"];
            P49: components["schemas"]["PropertiesDetailModel"];
            P5: components["schemas"]["PropertiesDetailModel"];
            P50: components["schemas"]["PropertiesDetailModel"];
            P51: components["schemas"]["PropertiesDetailModel"];
            P52: components["schemas"]["PropertiesDetailModel"];
            P53: components["schemas"]["PropertiesDetailModel"];
            P54: components["schemas"]["PropertiesDetailModel"];
            P55: components["schemas"]["PropertiesDetailModel"];
            P56: components["schemas"]["PropertiesDetailModel"];
            P59: components["schemas"]["PropertiesDetailModel"];
            P62: components["schemas"]["PropertiesDetailModel"];
            P65: components["schemas"]["PropertiesDetailModel"];
            P67: components["schemas"]["PropertiesDetailModel"];
            P68: components["schemas"]["PropertiesDetailModel"];
            P69: components["schemas"]["PropertiesDetailModel"];
            P7: components["schemas"]["PropertiesDetailModel"];
            P70: components["schemas"]["PropertiesDetailModel"];
            P71: components["schemas"]["PropertiesDetailModel"];
            P72: components["schemas"]["PropertiesDetailModel"];
            P73: components["schemas"]["PropertiesDetailModel"];
            P74: components["schemas"]["PropertiesDetailModel"];
            P75: components["schemas"]["PropertiesDetailModel"];
            P76: components["schemas"]["PropertiesDetailModel"];
            P8: components["schemas"]["PropertiesDetailModel"];
            P86: components["schemas"]["PropertiesDetailModel"];
            P89: components["schemas"]["PropertiesDetailModel"];
            P9: components["schemas"]["PropertiesDetailModel"];
            P91: components["schemas"]["PropertiesDetailModel"];
            P92: components["schemas"]["PropertiesDetailModel"];
            P93: components["schemas"]["PropertiesDetailModel"];
            P94: components["schemas"]["PropertiesDetailModel"];
            P95: components["schemas"]["PropertiesDetailModel"];
            P96: components["schemas"]["PropertiesDetailModel"];
            P97: components["schemas"]["PropertiesDetailModel"];
            P98: components["schemas"]["PropertiesDetailModel"];
            P99: components["schemas"]["PropertiesDetailModel"];
        };
        RelatedEntityModel: {
            aliases?: string[];
            description: string;
            geometries: components["schemas"]["Geometries"];
            id: number;
            relationTypes?: components["schemas"]["RelationTypeModel"][];
            standardType?: {
                id?: number;
                title?: string;
            };
            systemClass: string;
            title: string;
            viewClass: string;
            when: components["schemas"]["TimeRangeModel"];
        } | null;
        RelationTypeModel: {
            description?: string | null;
            property: string;
            relationTo: number;
            type?: string | null;
            when?: components["schemas"]["TimeRangeModel"];
        } | null;
        SearchModel: {
            /**
             * Format: date-time
             * @description The start date of the entity
             */
            begin?: string | null;
            /** @description A description of the entity */
            description?: string | null;
            /**
             * Format: date-time
             * @description The end date of the entity
             */
            end?: string | null;
            /**
             * Format: uri
             * @description The unique identifier URL of the entity
             */
            id: string;
            /** @description The name of the entity */
            name: string;
            /** @description The system class of the entity */
            system_class: string;
        };
        SubunitsModel: {
            children: number[];
            created: string;
            crmClass: string;
            geometry: {
                coordinates?: number[];
                description?: string;
                shapeType?: string;
                title?: string;
                type?: string;
            };
            /** Format: int32 */
            id: number;
            latestModRec: string;
            modified: string;
            openatlasClassName: string;
            /** Format: int32 */
            parentId: number;
            properties: {
                aliases: string | null;
                description: string;
                externalReferences: {
                    id: string;
                    identifier: string;
                    referenceSystem: string;
                    referenceURL: string;
                    resolverURL: string;
                    type: string;
                }[];
                files: string | null;
                name: string;
                references: {
                    abbreviation: string;
                    /** Format: int32 */
                    id: number;
                    pages: string | null;
                    title: string;
                }[];
                standardType: {
                    externalReferences: {
                        id: string;
                        identifier: string;
                        referenceSystem: string;
                        referenceURL: string;
                        resolverURL: string;
                        type: string;
                    }[];
                    /** Format: int32 */
                    id: number;
                    name: string;
                    path: string;
                    /** Format: int32 */
                    rootId: number;
                };
                timespan: {
                    earliestBegin: string;
                    earliestEnd: string;
                    latestBegin: string;
                    latestEnd: string;
                };
                types: {
                    externalReferences: {
                        id?: string;
                        identifier?: string;
                        referenceSystem?: string;
                        referenceURL?: string;
                        resolverURL?: string;
                        type?: string;
                    }[];
                    /** Format: int32 */
                    id: number;
                    name: string;
                    path: string;
                    /** Format: int32 */
                    rootId: number;
                    unit: string | null;
                    value: string | null;
                }[];
            };
            /** Format: int32 */
            rootId: number;
        }[];
        SystemClassCountModel: {
            /** Format: int32 */
            acquisition: number;
            /** Format: int32 */
            activity: number;
            /** Format: int32 */
            administrative_unit: number;
            /** Format: int32 */
            artifact: number;
            /** Format: int32 */
            bibliography: number;
            /** Format: int32 */
            edition: number;
            /** Format: int32 */
            feature: number;
            /** Format: int32 */
            file: number;
            /** Format: int32 */
            group: number;
            /** Format: int32 */
            move: number;
            /** Format: int32 */
            person: number;
            /** Format: int32 */
            place: number;
            /** Format: int32 */
            reference_system: number;
            /** Format: int32 */
            source: number;
            /** Format: int32 */
            source_translation: number;
            /** Format: int32 */
            stratigraphic_unit: number;
            /** Format: int32 */
            type: number;
        };
        TimeRangeModel: {
            end: {
                comment: string | null;
                earliest: string | null;
                latest: string | null;
            };
            start: {
                comment: string | null;
                earliest: string | null;
                latest: string | null;
            };
        };
        TypeHierarchyEntryModel: {
            descriptions?: string | null;
            identifier: string;
            label: string;
        };
        TypeOverviewEntryModel: {
            children: components["schemas"]["TypeOverviewEntryModel"][];
            /** Format: int32 */
            id: number;
            name: string;
            viewClass: string[];
        };
        TypeOverviewModel: {
            custom: components["schemas"]["TypeOverviewEntryModel"][];
            place: components["schemas"]["TypeOverviewEntryModel"][];
            standard: components["schemas"]["TypeOverviewEntryModel"][];
            system: components["schemas"]["TypeOverviewEntryModel"][];
            value: components["schemas"]["TypeOverviewEntryModel"][];
        };
        TypeTreeModel: {
            type_tree: {
                type_ids: {
                    category: string;
                    count: number;
                    count_subs: number;
                    description: string;
                    first: number;
                    id: number;
                    last: number;
                    name: string;
                    origin_id: number;
                    root: number[];
                    subs: number[];
                };
            };
        };
        TypeViewClassChildren: {
            children: components["schemas"]["TypeViewClassChildren"][];
            id: string;
            label: string;
            url: string;
        };
        TypesByViewClassEntry: {
            category: string;
            children: components["schemas"]["TypeViewClassChildren"][];
            id: number;
            name: string;
        };
        TypesByViewClassModel: {
            acquisition: components["schemas"]["TypesByViewClassEntry"][];
            activity: components["schemas"]["TypesByViewClassEntry"][];
            actor_actor_relation: components["schemas"]["TypesByViewClassEntry"][];
            actor_function: components["schemas"]["TypesByViewClassEntry"][];
            artifact: components["schemas"]["TypesByViewClassEntry"][];
            bibliography: components["schemas"]["TypesByViewClassEntry"][];
            creation: components["schemas"]["TypesByViewClassEntry"][];
            edition: components["schemas"]["TypesByViewClassEntry"][];
            event: components["schemas"]["TypesByViewClassEntry"][];
            external_reference: components["schemas"]["TypesByViewClassEntry"][];
            feature: components["schemas"]["TypesByViewClassEntry"][];
            file: components["schemas"]["TypesByViewClassEntry"][];
            group: components["schemas"]["TypesByViewClassEntry"][];
            human_remains: components["schemas"]["TypesByViewClassEntry"][];
            involvement: components["schemas"]["TypesByViewClassEntry"][];
            move: components["schemas"]["TypesByViewClassEntry"][];
            person: components["schemas"]["TypesByViewClassEntry"][];
            place: components["schemas"]["TypesByViewClassEntry"][];
            production: components["schemas"]["TypesByViewClassEntry"][];
            source: components["schemas"]["TypesByViewClassEntry"][];
            source_translation: components["schemas"]["TypesByViewClassEntry"][];
            stratigraphic_unit: components["schemas"]["TypesByViewClassEntry"][];
        };
        searchCriteria: {
            /**
             * @default and
             * @enum {string}
             */
            logicalOperator: "or" | "and";
            /** @enum {string} */
            operator?: "equal" | "notEqual" | "like" | "greaterThan" | "greaterThanEqual" | "lesserThan" | "lesserThanEqual";
            values?: (string | number)[];
        }[];
    };
    responses: never;
    parameters: {
        /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
        centroid: boolean;
        /**
         * @description CIDOC class to be requested
         * @example E18
         */
        cidoc_class: "all" | "E5" | "E7" | "E8" | "E9" | "E12" | "E18" | "E20" | "E21" | "E22" | "E31" | "E32" | "E33" | "E41" | "E53" | "E54" | "E55" | "E65" | "E74";
        /**
         * @description Retrieve entities based on the specified CIDOC classes.
         * @example E18
         */
        cidoc_classes: ("all" | "E6" | "E7" | "E8" | "E9" | "E12" | "E18" | "E20" | "E21" | "E22" | "E31" | "E32" | "E33" | "E41" | "E53" | "E54" | "E55" | "E74")[];
        /**
         * @description Choose one column to sort the results by. Default value is name.
         * @example name
         */
        column: "id" | "name" | "cidoc_class" | "system_class" | "begin_from" | "begin_to" | "end_from" | "end_to";
        /** @description Show integer count of how many entities would the result give back */
        count: boolean;
        /** @description Specifies the number of connection hops to include in the query. Higher values may significantly increase processing time. Default is 1. */
        depth: number;
        /** @description Download results */
        download: boolean;
        /** @description The entity IDs to be requested. */
        entities: number[];
        /**
         * @description Specific entity ID
         * @example 40
         */
        entityId: number;
        /** @description Excludes entities with the selected system classes from the network. */
        exclude_system_classes: ("acquisition" | "activity" | "administrative_unit" | "appellation" | "artifact" | "bibliography" | "creation" | "edition" | "event" | "external_reference" | "feature" | "file" | "group" | "human_remains" | "modification" | "move" | "person" | "place" | "production" | "reference_system" | "source" | "source_translation" | "stratigraphic_unit" | "type" | "type_tools")[];
        /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
        export: "csv" | "csvNetwork";
        /**
         * @description Specific ID of a file entity.
         * @example 40
         */
        fileId: number;
        /** @description Starts the result set at the specified entity ID. */
        first: number;
        /**
         * @description Specify the format for the returned results.
         * @example lp
         */
        format: "lp" | "lpx" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
        /** @description Filters the geometries to be included in the response. The default is 'gisAll'. */
        geometry: ("gisAll" | "gisPointAll" | "gisPointSupers" | "gisPointSubs" | "gisPointSibling" | "gisLineAll" | "gisPolygonAll")[];
        /**
         * @description Select the desired image size to display. The available values are fixed but can be customized for each OpenAtlas instance. The 'thumbnail' size is 200px, and the 'table' size is 100px.
         * @example table
         */
        image_size: "thumbnail" | "table";
        /** @description Starts the result set after the specified entity ID. */
        last: number;
        /** @description Limits the number of entities returned in the response. A lower value may improve performance. The default is 20. Set to 0 to return all available entities. */
        limit: number;
        /** @description The entity IDs for which all linked entities will be retrieved. */
        linked_entities: number[];
        /** @description Displays only entities that are linked to the specified IDs. */
        linked_to_ids: number[];
        /** @description Choose language for system inherent labels */
        locale: "ca" | "de" | "en" | "es" | "fr";
        /** @description Specifies the page number to retrieve in a paginated result set. */
        page: number;
        /** @description Will include the whole place hierarchy. This means that instead of only getting entities linked to the requested entity, all entities, which are connected with the property *P46* are included in the result set. This can significantly increase the load time. */
        place_hierarchy: boolean;
        /** @description Retrieves entities that are connected to the specified entity through the given `property`. */
        properties: ("all" | "OA7" | "OA8" | "OA9" | "P1" | "P2" | "P4" | "P5" | "P7" | "P8" | "P9" | "P10" | "P11" | "P12" | "P13" | "P14" | "P15" | "P16" | "P17" | "P19" | "P20" | "P21" | "P22" | "P23" | "P24" | "P25" | "P26" | "P27" | "P28" | "P29" | "P30" | "P31" | "P32" | "P33" | "P34" | "P35" | "P37" | "P38" | "P39" | "P40" | "P41" | "P42" | "P43" | "P44" | "P45" | "P46" | "P48" | "P49" | "P50" | "P51" | "P52" | "P53" | "P54" | "P55" | "P56" | "P59" | "P62" | "P65" | "P67" | "P68" | "P69" | "P70" | "P71" | "P72" | "P73" | "P74" | "P75" | "P76" | "P86" | "P89" | "P91" | "P92" | "P93" | "P94" | "P95" | "P96" | "P97" | "P98" | "P99" | "P100" | "P101" | "P102" | "P103" | "P104" | "P105" | "P106" | "P107" | "P108" | "P109" | "P110" | "P111" | "P112" | "P113" | "P121" | "P122" | "P123" | "P124" | "P125" | "P126" | "P127" | "P128" | "P129" | "P130" | "P132" | "P133" | "P134" | "P135" | "P136" | "P137" | "P138" | "P139" | "P140" | "P141" | "P142" | "P143" | "P144" | "P145" | "P146" | "P147" | "P148" | "P150" | "P151" | "P152" | "P156" | "P157" | "P160" | "P161" | "P164" | "P165" | "P166" | "P167" | "P173" | "P174" | "P175" | "P176" | "P177" | "P179" | "P180" | "P182" | "P183" | "P184" | "P185" | "P186" | "P187" | "P188" | "P189" | "P191" | "P195" | "P196" | "P197" | "P198")[];
        /** @description Filters results to show only connections linked by the selected CIDOC CRM property code. If 'geometry', 'types', 'depictions', or 'links' are specified in the 'show' parameter, these properties will also be displayed. */
        relation_type: ("all" | "OA7" | "OA8" | "OA9" | "P1" | "P2" | "P4" | "P5" | "P7" | "P8" | "P9" | "P10" | "P11" | "P12" | "P13" | "P14" | "P15" | "P16" | "P17" | "P19" | "P20" | "P21" | "P22" | "P23" | "P24" | "P25" | "P26" | "P27" | "P28" | "P29" | "P30" | "P31" | "P32" | "P33" | "P34" | "P35" | "P37" | "P38" | "P39" | "P40" | "P41" | "P42" | "P43" | "P44" | "P45" | "P46" | "P48" | "P49" | "P50" | "P51" | "P52" | "P53" | "P54" | "P55" | "P56" | "P59" | "P62" | "P65" | "P67" | "P68" | "P69" | "P70" | "P71" | "P72" | "P73" | "P74" | "P75" | "P76" | "P86" | "P89" | "P91" | "P92" | "P93" | "P94" | "P95" | "P96" | "P97" | "P98" | "P99" | "P100" | "P101" | "P102" | "P103" | "P104" | "P105" | "P106" | "P107" | "P108" | "P109" | "P110" | "P111" | "P112" | "P113" | "P121" | "P122" | "P123" | "P124" | "P125" | "P126" | "P127" | "P128" | "P129" | "P130" | "P132" | "P133" | "P134" | "P135" | "P136" | "P137" | "P138" | "P139" | "P140" | "P141" | "P142" | "P143" | "P144" | "P145" | "P146" | "P147" | "P148" | "P150" | "P151" | "P152" | "P156" | "P157" | "P160" | "P161" | "P164" | "P165" | "P166" | "P167" | "P173" | "P174" | "P175" | "P176" | "P177" | "P179" | "P180" | "P182" | "P183" | "P184" | "P185" | "P186" | "P187" | "P188" | "P189" | "P191" | "P195" | "P196" | "P197" | "P198")[];
        /** @description This will remove any keys which are empty or have no values assigned, e.g. []. This can reduce the load time. */
        remove_empty_values: boolean;
        /** @description Search query for specific results.
         *
         *      **Filterable categories**
         *
         *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
         *
         *      **Values**
         *
         *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.
         *
         *      *Notes*:
         *      The category valueTypeID can search for values of a type ID. But it takes one or more two valued Tuple as list entry: (x,y). x is the type id and y is the searched value. This can be an int or a float, e.g: `{"operator":"lesserThan","values":[(3142,543.3)],"logicalOperator":"and"}`
         *      The date categories (beginFrom, beginTo, endFrom, endTo) only allow *one* value in the **values** field and it has to be formated the following way: YYYY-MM-DD. Month and day values need to filled up with 0, e.g. 800-01-01
         *
         *      **Compare operators**
         *
         *      equal, notEqual, like (1), greaterThan (2), greaterThanEqual (2), lesserThan (2)
         *
         *     The compare operators work like the mathematical operators. equal x=y, notEqual x!=y, greaterThan x>y , greaterThanEqual x>=y, lesserThan x<y, lesserThanEqual x<=y. The like operator searches for occurrence of the string, so a match can also occur in the middle of a word.
         *
         *     (1)Only for string based categories
         *
         *     (2)Only for beginFrom, beginTo, endFrom, endTo, valueTypeID
         *
         *     **Logical operators**
         *
         *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND.
         *
         *      The following table outlines the supported operations for each field:
         *
         *     |                  | equal     | notEqual  | like      | greaterThan | greaterThanEqual | lesserThan | lesserThanEqual |
         *     |------------------|-----------|-----------|-----------|-------------|------------------|------------|-----------------|
         *     | entityName       |     x      |     x      |    x       |             |                  |            |                 |
         *     | entityDescription|      x     |      x     |      x     |             |                  |            |                 |
         *     | entityAliases    |      x     |      x     |     x      |             |                  |            |                 |
         *     | entityCidocClass |      x     |      x     |      x     |             |                  |            |                 |
         *     | entitySystemClass|      x     |      x     |     x      |             |                  |            |                 |
         *     | typeName         |       x    |      x     |     x      |             |                  |            |                 |
         *     | entityID         |       x    |      x     |           |             |                  |            |                 |
         *     | typeID           |      x     |       x    |           |             |                  |            |                 |
         *     | valueTypeID      |      x     |      x     |           |      x       |    x              |    x        |      x           |
         *     | typeIDWithSubs   |      x     |       x    |           |             |                  |            |                 |
         *     | relationToID     |      x     |      x     |           |             |                  |            |                 |
         *     | beginFrom        |      x     |      x     |           |      x       |        x          |     x       |      x           |
         *     | beginTo          |      x     |      x     |           |      x       |          x        |      x      |       x          |
         *     | endFrom          |      x     |      x     |           |       x      |         x         |       x     |       x          |
         *     | endTo            |      x     |      x     |           |       x      |       x           |       x     |      x           |
         *
         *      */
        search: string;
        /** @description Select which keys should not be displayed. This can improve performance */
        show: ("when" | "types" | "relations" | "names" | "links" | "geometry" | "depictions" | "geonames" | "description" | "none")[];
        /**
         * @description Sorting result ascending or descending of the given column. Default value is asc.
         * @example asc
         */
        sort: "asc" | "desc";
        /**
         * @description System class to be requested
         * @example acquisition
         */
        system_class: "all" | "acquisition" | "activity" | "administrative_unit" | "appellation" | "artifact" | "bibliography" | "creation" | "edition" | "event" | "external_reference" | "feature" | "file" | "group" | "human_remains" | "modification" | "move" | "person" | "place" | "production" | "reference_system" | "source" | "source_translation" | "stratigraphic_unit" | "type" | "type_tools";
        /** @description Retrieve entities based on the specified system classes */
        system_classes: ("all" | "acquisition" | "activity" | "administrative_unit" | "appellation" | "artifact" | "bibliography" | "creation" | "edition" | "event" | "external_reference" | "feature" | "file" | "group" | "human_remains" | "move" | "person" | "place" | "production" | "reference_system" | "source" | "source_translation" | "stratigraphic_unit" | "type" | "tools")[];
        /** @description Filter results to include only entities with the specified type ID or those linked to it. */
        type_id: number[];
        /** @description A valid URL to use as input (e.g., https://openatlas.eu/). When used with an IIIF endpoint, this value replaces the base URL in all annotations. */
        url: string;
        /**
         * @description View class to be requested
         * @example actor
         */
        view_class: "all" | "actor" | "artifact" | "event" | "file" | "place" | "reference" | "reference_system" | "source" | "source_translation" | "type";
        /**
         * @description Retrieve entities based on the specified view classes.
         * @example actor
         */
        view_classes: ("all" | "actor" | "artifact" | "event" | "file" | "place" | "reference" | "reference_system" | "source" | "source_translation" | "type")[];
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    GetBackendDetails: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BackendDetailsModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetChainedEvents: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Specific entity ID
                 * @example 40
                 */
                entityId: components["parameters"]["entityId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChainEventModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetByCidocClass: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Show integer count of how many entities would the result give back */
                count?: components["parameters"]["count"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Specify the format for the returned results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
                export?: components["parameters"]["export"];
                /**
                 * @description Choose one column to sort the results by. Default value is name.
                 * @example name
                 */
                column?: components["parameters"]["column"];
                /**
                 * @description Sorting result ascending or descending of the given column. Default value is asc.
                 * @example asc
                 */
                sort?: components["parameters"]["sort"];
                /** @description Search query for specific results.
                 *
                 *      **Filterable categories**
                 *
                 *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
                 *
                 *      **Values**
                 *
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.
                 *
                 *      *Notes*:
                 *      The category valueTypeID can search for values of a type ID. But it takes one or more two valued Tuple as list entry: (x,y). x is the type id and y is the searched value. This can be an int or a float, e.g: `{"operator":"lesserThan","values":[(3142,543.3)],"logicalOperator":"and"}`
                 *      The date categories (beginFrom, beginTo, endFrom, endTo) only allow *one* value in the **values** field and it has to be formated the following way: YYYY-MM-DD. Month and day values need to filled up with 0, e.g. 800-01-01
                 *
                 *      **Compare operators**
                 *
                 *      equal, notEqual, like (1), greaterThan (2), greaterThanEqual (2), lesserThan (2)
                 *
                 *     The compare operators work like the mathematical operators. equal x=y, notEqual x!=y, greaterThan x>y , greaterThanEqual x>=y, lesserThan x<y, lesserThanEqual x<=y. The like operator searches for occurrence of the string, so a match can also occur in the middle of a word.
                 *
                 *     (1)Only for string based categories
                 *
                 *     (2)Only for beginFrom, beginTo, endFrom, endTo, valueTypeID
                 *
                 *     **Logical operators**
                 *
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND.
                 *
                 *      The following table outlines the supported operations for each field:
                 *
                 *     |                  | equal     | notEqual  | like      | greaterThan | greaterThanEqual | lesserThan | lesserThanEqual |
                 *     |------------------|-----------|-----------|-----------|-------------|------------------|------------|-----------------|
                 *     | entityName       |     x      |     x      |    x       |             |                  |            |                 |
                 *     | entityDescription|      x     |      x     |      x     |             |                  |            |                 |
                 *     | entityAliases    |      x     |      x     |     x      |             |                  |            |                 |
                 *     | entityCidocClass |      x     |      x     |      x     |             |                  |            |                 |
                 *     | entitySystemClass|      x     |      x     |     x      |             |                  |            |                 |
                 *     | typeName         |       x    |      x     |     x      |             |                  |            |                 |
                 *     | entityID         |       x    |      x     |           |             |                  |            |                 |
                 *     | typeID           |      x     |       x    |           |             |                  |            |                 |
                 *     | valueTypeID      |      x     |      x     |           |      x       |    x              |    x        |      x           |
                 *     | typeIDWithSubs   |      x     |       x    |           |             |                  |            |                 |
                 *     | relationToID     |      x     |      x     |           |             |                  |            |                 |
                 *     | beginFrom        |      x     |      x     |           |      x       |        x          |     x       |      x           |
                 *     | beginTo          |      x     |      x     |           |      x       |          x        |      x      |       x          |
                 *     | endFrom          |      x     |      x     |           |       x      |         x         |       x     |       x          |
                 *     | endTo            |      x     |      x     |           |       x      |       x           |       x     |      x           |
                 *
                 *      */
                search?: components["parameters"]["search"];
                /** @description Starts the result set at the specified entity ID. */
                first?: components["parameters"]["first"];
                /** @description Starts the result set after the specified entity ID. */
                last?: components["parameters"]["last"];
                /** @description Specifies the page number to retrieve in a paginated result set. */
                page?: components["parameters"]["page"];
                /** @description Limits the number of entities returned in the response. A lower value may improve performance. The default is 20. Set to 0 to return all available entities. */
                limit?: components["parameters"]["limit"];
                /** @description Filter results to include only entities with the specified type ID or those linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Filters results to show only connections linked by the selected CIDOC CRM property code. If 'geometry', 'types', 'depictions', or 'links' are specified in the 'show' parameter, these properties will also be displayed. */
                relation_type?: components["parameters"]["relation_type"];
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                centroid?: components["parameters"]["centroid"];
            };
            header?: never;
            path: {
                /**
                 * @description CIDOC class to be requested
                 * @example E18
                 */
                cidoc_class: components["parameters"]["cidoc_class"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json": components["schemas"]["EntitiesOutputModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ClassMapping: {
        parameters: {
            query?: {
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Download results */
                download?: components["parameters"]["download"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClassMappingModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    Classes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClassesModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    DisplayImage: {
        parameters: {
            query?: {
                image_size?: "thumbnail" | "table";
            };
            header?: never;
            path: {
                /**
                 * @description Specific ID of a file entity.
                 * @example 40
                 */
                fileId: components["parameters"]["fileId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "image/jpeg": string;
                    "image/png": string;
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetEgoNetworkVisualisation: {
        parameters: {
            query?: {
                /** @description Specifies the number of connection hops to include in the query. Higher values may significantly increase processing time. Default is 1. */
                depth?: components["parameters"]["depth"];
                /** @description Excludes entities with the selected system classes from the network. */
                exclude_system_classes?: components["parameters"]["exclude_system_classes"];
                /** @description Displays only entities that are linked to the specified IDs. */
                linked_to_ids?: components["parameters"]["linked_to_ids"];
                /** @description Download results */
                download?: components["parameters"]["download"];
            };
            header?: never;
            path: {
                /**
                 * @description Specific entity ID
                 * @example 40
                 */
                entityId: components["parameters"]["entityId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NetworkVisualisationModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetEntitiesLinkedToEntity: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Show integer count of how many entities would the result give back */
                count?: components["parameters"]["count"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Specify the format for the returned results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
                export?: components["parameters"]["export"];
                /**
                 * @description Choose one column to sort the results by. Default value is name.
                 * @example name
                 */
                column?: components["parameters"]["column"];
                /**
                 * @description Sorting result ascending or descending of the given column. Default value is asc.
                 * @example asc
                 */
                sort?: components["parameters"]["sort"];
                /** @description Search query for specific results.
                 *
                 *      **Filterable categories**
                 *
                 *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
                 *
                 *      **Values**
                 *
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.
                 *
                 *      *Notes*:
                 *      The category valueTypeID can search for values of a type ID. But it takes one or more two valued Tuple as list entry: (x,y). x is the type id and y is the searched value. This can be an int or a float, e.g: `{"operator":"lesserThan","values":[(3142,543.3)],"logicalOperator":"and"}`
                 *      The date categories (beginFrom, beginTo, endFrom, endTo) only allow *one* value in the **values** field and it has to be formated the following way: YYYY-MM-DD. Month and day values need to filled up with 0, e.g. 800-01-01
                 *
                 *      **Compare operators**
                 *
                 *      equal, notEqual, like (1), greaterThan (2), greaterThanEqual (2), lesserThan (2)
                 *
                 *     The compare operators work like the mathematical operators. equal x=y, notEqual x!=y, greaterThan x>y , greaterThanEqual x>=y, lesserThan x<y, lesserThanEqual x<=y. The like operator searches for occurrence of the string, so a match can also occur in the middle of a word.
                 *
                 *     (1)Only for string based categories
                 *
                 *     (2)Only for beginFrom, beginTo, endFrom, endTo, valueTypeID
                 *
                 *     **Logical operators**
                 *
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND.
                 *
                 *      The following table outlines the supported operations for each field:
                 *
                 *     |                  | equal     | notEqual  | like      | greaterThan | greaterThanEqual | lesserThan | lesserThanEqual |
                 *     |------------------|-----------|-----------|-----------|-------------|------------------|------------|-----------------|
                 *     | entityName       |     x      |     x      |    x       |             |                  |            |                 |
                 *     | entityDescription|      x     |      x     |      x     |             |                  |            |                 |
                 *     | entityAliases    |      x     |      x     |     x      |             |                  |            |                 |
                 *     | entityCidocClass |      x     |      x     |      x     |             |                  |            |                 |
                 *     | entitySystemClass|      x     |      x     |     x      |             |                  |            |                 |
                 *     | typeName         |       x    |      x     |     x      |             |                  |            |                 |
                 *     | entityID         |       x    |      x     |           |             |                  |            |                 |
                 *     | typeID           |      x     |       x    |           |             |                  |            |                 |
                 *     | valueTypeID      |      x     |      x     |           |      x       |    x              |    x        |      x           |
                 *     | typeIDWithSubs   |      x     |       x    |           |             |                  |            |                 |
                 *     | relationToID     |      x     |      x     |           |             |                  |            |                 |
                 *     | beginFrom        |      x     |      x     |           |      x       |        x          |     x       |      x           |
                 *     | beginTo          |      x     |      x     |           |      x       |          x        |      x      |       x          |
                 *     | endFrom          |      x     |      x     |           |       x      |         x         |       x     |       x          |
                 *     | endTo            |      x     |      x     |           |       x      |       x           |       x     |      x           |
                 *
                 *      */
                search?: components["parameters"]["search"];
                /** @description Starts the result set at the specified entity ID. */
                first?: components["parameters"]["first"];
                /** @description Starts the result set after the specified entity ID. */
                last?: components["parameters"]["last"];
                /** @description Specifies the page number to retrieve in a paginated result set. */
                page?: components["parameters"]["page"];
                /** @description Limits the number of entities returned in the response. A lower value may improve performance. The default is 20. Set to 0 to return all available entities. */
                limit?: components["parameters"]["limit"];
                /** @description Filter results to include only entities with the specified type ID or those linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Filters results to show only connections linked by the selected CIDOC CRM property code. If 'geometry', 'types', 'depictions', or 'links' are specified in the 'show' parameter, these properties will also be displayed. */
                relation_type?: components["parameters"]["relation_type"];
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                centroid?: components["parameters"]["centroid"];
            };
            header?: never;
            path: {
                /**
                 * @description Specific entity ID
                 * @example 40
                 */
                entityId: components["parameters"]["entityId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json": components["schemas"]["EntitiesOutputModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetEntity: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Specify the format for the returned results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
                export?: components["parameters"]["export"];
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                centroid?: components["parameters"]["centroid"];
            };
            header?: never;
            path: {
                /**
                 * @description Specific entity ID
                 * @example 40
                 */
                entityId: components["parameters"]["entityId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json": components["schemas"]["LinkedPlacesModel"] | components["schemas"]["GeoJSONModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ExportDatabase: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @example json */
                format: "json" | "csv" | "xml";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetGeometricEntities: {
        parameters: {
            query?: {
                /** @description Filters the geometries to be included in the response. The default is 'gisAll'. */
                geometry?: components["parameters"]["geometry"];
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Show integer count of how many entities would the result give back */
                count?: components["parameters"]["count"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GeometricEntitiesModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    IIIFManifest: {
        parameters: {
            query?: {
                /** @description A valid URL to use as input (e.g., https://openatlas.eu/). When used with an IIIF endpoint, this value replaces the base URL in all annotations. */
                url?: components["parameters"]["url"];
            };
            header?: never;
            path: {
                version: 2;
                /**
                 * @description Specific ID of a file entity.
                 * @example 40
                 */
                fileId: components["parameters"]["fileId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "image/jpeg": string;
                    "image/png": string;
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetLatest: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Specify the format for the returned results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
                export?: components["parameters"]["export"];
                /**
                 * @description Choose one column to sort the results by. Default value is name.
                 * @example name
                 */
                column?: components["parameters"]["column"];
                /**
                 * @description Sorting result ascending or descending of the given column. Default value is asc.
                 * @example asc
                 */
                sort?: components["parameters"]["sort"];
                /** @description Search query for specific results.
                 *
                 *      **Filterable categories**
                 *
                 *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
                 *
                 *      **Values**
                 *
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.
                 *
                 *      *Notes*:
                 *      The category valueTypeID can search for values of a type ID. But it takes one or more two valued Tuple as list entry: (x,y). x is the type id and y is the searched value. This can be an int or a float, e.g: `{"operator":"lesserThan","values":[(3142,543.3)],"logicalOperator":"and"}`
                 *      The date categories (beginFrom, beginTo, endFrom, endTo) only allow *one* value in the **values** field and it has to be formated the following way: YYYY-MM-DD. Month and day values need to filled up with 0, e.g. 800-01-01
                 *
                 *      **Compare operators**
                 *
                 *      equal, notEqual, like (1), greaterThan (2), greaterThanEqual (2), lesserThan (2)
                 *
                 *     The compare operators work like the mathematical operators. equal x=y, notEqual x!=y, greaterThan x>y , greaterThanEqual x>=y, lesserThan x<y, lesserThanEqual x<=y. The like operator searches for occurrence of the string, so a match can also occur in the middle of a word.
                 *
                 *     (1)Only for string based categories
                 *
                 *     (2)Only for beginFrom, beginTo, endFrom, endTo, valueTypeID
                 *
                 *     **Logical operators**
                 *
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND.
                 *
                 *      The following table outlines the supported operations for each field:
                 *
                 *     |                  | equal     | notEqual  | like      | greaterThan | greaterThanEqual | lesserThan | lesserThanEqual |
                 *     |------------------|-----------|-----------|-----------|-------------|------------------|------------|-----------------|
                 *     | entityName       |     x      |     x      |    x       |             |                  |            |                 |
                 *     | entityDescription|      x     |      x     |      x     |             |                  |            |                 |
                 *     | entityAliases    |      x     |      x     |     x      |             |                  |            |                 |
                 *     | entityCidocClass |      x     |      x     |      x     |             |                  |            |                 |
                 *     | entitySystemClass|      x     |      x     |     x      |             |                  |            |                 |
                 *     | typeName         |       x    |      x     |     x      |             |                  |            |                 |
                 *     | entityID         |       x    |      x     |           |             |                  |            |                 |
                 *     | typeID           |      x     |       x    |           |             |                  |            |                 |
                 *     | valueTypeID      |      x     |      x     |           |      x       |    x              |    x        |      x           |
                 *     | typeIDWithSubs   |      x     |       x    |           |             |                  |            |                 |
                 *     | relationToID     |      x     |      x     |           |             |                  |            |                 |
                 *     | beginFrom        |      x     |      x     |           |      x       |        x          |     x       |      x           |
                 *     | beginTo          |      x     |      x     |           |      x       |          x        |      x      |       x          |
                 *     | endFrom          |      x     |      x     |           |       x      |         x         |       x     |       x          |
                 *     | endTo            |      x     |      x     |           |       x      |       x           |       x     |      x           |
                 *
                 *      */
                search?: components["parameters"]["search"];
                /** @description Filter results to include only entities with the specified type ID or those linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Filters results to show only connections linked by the selected CIDOC CRM property code. If 'geometry', 'types', 'depictions', or 'links' are specified in the 'show' parameter, these properties will also be displayed. */
                relation_type?: components["parameters"]["relation_type"];
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                centroid?: components["parameters"]["centroid"];
            };
            header?: never;
            path: {
                limit: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json": components["schemas"]["EntitiesOutputModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    LicensedFileOverview: {
        parameters: {
            query?: {
                file_id?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LicensedFileOverviewModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetLinkedEntitiesByPropertyRecursive: {
        parameters: {
            query: {
                /** @description Retrieves entities that are connected to the specified entity through the given `property`. */
                properties: components["parameters"]["properties"];
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Show integer count of how many entities would the result give back */
                count?: components["parameters"]["count"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Specify the format for the returned results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
                export?: components["parameters"]["export"];
                /**
                 * @description Choose one column to sort the results by. Default value is name.
                 * @example name
                 */
                column?: components["parameters"]["column"];
                /**
                 * @description Sorting result ascending or descending of the given column. Default value is asc.
                 * @example asc
                 */
                sort?: components["parameters"]["sort"];
                /** @description Search query for specific results.
                 *
                 *      **Filterable categories**
                 *
                 *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
                 *
                 *      **Values**
                 *
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.
                 *
                 *      *Notes*:
                 *      The category valueTypeID can search for values of a type ID. But it takes one or more two valued Tuple as list entry: (x,y). x is the type id and y is the searched value. This can be an int or a float, e.g: `{"operator":"lesserThan","values":[(3142,543.3)],"logicalOperator":"and"}`
                 *      The date categories (beginFrom, beginTo, endFrom, endTo) only allow *one* value in the **values** field and it has to be formated the following way: YYYY-MM-DD. Month and day values need to filled up with 0, e.g. 800-01-01
                 *
                 *      **Compare operators**
                 *
                 *      equal, notEqual, like (1), greaterThan (2), greaterThanEqual (2), lesserThan (2)
                 *
                 *     The compare operators work like the mathematical operators. equal x=y, notEqual x!=y, greaterThan x>y , greaterThanEqual x>=y, lesserThan x<y, lesserThanEqual x<=y. The like operator searches for occurrence of the string, so a match can also occur in the middle of a word.
                 *
                 *     (1)Only for string based categories
                 *
                 *     (2)Only for beginFrom, beginTo, endFrom, endTo, valueTypeID
                 *
                 *     **Logical operators**
                 *
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND.
                 *
                 *      The following table outlines the supported operations for each field:
                 *
                 *     |                  | equal     | notEqual  | like      | greaterThan | greaterThanEqual | lesserThan | lesserThanEqual |
                 *     |------------------|-----------|-----------|-----------|-------------|------------------|------------|-----------------|
                 *     | entityName       |     x      |     x      |    x       |             |                  |            |                 |
                 *     | entityDescription|      x     |      x     |      x     |             |                  |            |                 |
                 *     | entityAliases    |      x     |      x     |     x      |             |                  |            |                 |
                 *     | entityCidocClass |      x     |      x     |      x     |             |                  |            |                 |
                 *     | entitySystemClass|      x     |      x     |     x      |             |                  |            |                 |
                 *     | typeName         |       x    |      x     |     x      |             |                  |            |                 |
                 *     | entityID         |       x    |      x     |           |             |                  |            |                 |
                 *     | typeID           |      x     |       x    |           |             |                  |            |                 |
                 *     | valueTypeID      |      x     |      x     |           |      x       |    x              |    x        |      x           |
                 *     | typeIDWithSubs   |      x     |       x    |           |             |                  |            |                 |
                 *     | relationToID     |      x     |      x     |           |             |                  |            |                 |
                 *     | beginFrom        |      x     |      x     |           |      x       |        x          |     x       |      x           |
                 *     | beginTo          |      x     |      x     |           |      x       |          x        |      x      |       x          |
                 *     | endFrom          |      x     |      x     |           |       x      |         x         |       x     |       x          |
                 *     | endTo            |      x     |      x     |           |       x      |       x           |       x     |      x           |
                 *
                 *      */
                search?: components["parameters"]["search"];
                /** @description Starts the result set at the specified entity ID. */
                first?: components["parameters"]["first"];
                /** @description Starts the result set after the specified entity ID. */
                last?: components["parameters"]["last"];
                /** @description Specifies the page number to retrieve in a paginated result set. */
                page?: components["parameters"]["page"];
                /** @description Limits the number of entities returned in the response. A lower value may improve performance. The default is 20. Set to 0 to return all available entities. */
                limit?: components["parameters"]["limit"];
                /** @description Filter results to include only entities with the specified type ID or those linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Filters results to show only connections linked by the selected CIDOC CRM property code. If 'geometry', 'types', 'depictions', or 'links' are specified in the 'show' parameter, these properties will also be displayed. */
                relation_type?: components["parameters"]["relation_type"];
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                centroid?: components["parameters"]["centroid"];
            };
            header?: never;
            path: {
                /**
                 * @description Specific entity ID
                 * @example 40
                 */
                entityId: components["parameters"]["entityId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json": components["schemas"]["EntitiesOutputModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetNetworkVisualisation: {
        parameters: {
            query?: {
                /** @description Excludes entities with the selected system classes from the network. */
                exclude_system_classes?: components["parameters"]["exclude_system_classes"];
                /** @description Displays only entities that are linked to the specified IDs. */
                linked_to_ids?: components["parameters"]["linked_to_ids"];
                /** @description Download results */
                download?: components["parameters"]["download"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NetworkVisualisationModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    openapi_schema: {
        parameters: {
            query?: {
                /**
                 * @description Choose the format for the results.
                 * @example json
                 */
                format?: "json" | "yaml";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetProperties: {
        parameters: {
            query?: {
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Download results */
                download?: components["parameters"]["download"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PropertiesModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetQuery: {
        parameters: {
            query?: {
                /** @description The entity IDs to be requested. */
                entities?: components["parameters"]["entities"];
                /**
                 * @description Retrieve entities based on the specified view classes.
                 * @example actor
                 */
                view_classes?: components["parameters"]["view_classes"];
                /** @description Retrieve entities based on the specified system classes */
                system_classes?: components["parameters"]["system_classes"];
                /**
                 * @description Retrieve entities based on the specified CIDOC classes.
                 * @example E18
                 */
                cidoc_classes?: components["parameters"]["cidoc_classes"];
                /** @description The entity IDs for which all linked entities will be retrieved. */
                linked_entities?: components["parameters"]["linked_entities"];
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Show integer count of how many entities would the result give back */
                count?: components["parameters"]["count"];
                /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                centroid?: components["parameters"]["centroid"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Specify the format for the returned results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
                export?: components["parameters"]["export"];
                /**
                 * @description Choose one column to sort the results by. Default value is name.
                 * @example name
                 */
                column?: components["parameters"]["column"];
                /**
                 * @description Sorting result ascending or descending of the given column. Default value is asc.
                 * @example asc
                 */
                sort?: components["parameters"]["sort"];
                /** @description Search query for specific results.
                 *
                 *      **Filterable categories**
                 *
                 *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
                 *
                 *      **Values**
                 *
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.
                 *
                 *      *Notes*:
                 *      The category valueTypeID can search for values of a type ID. But it takes one or more two valued Tuple as list entry: (x,y). x is the type id and y is the searched value. This can be an int or a float, e.g: `{"operator":"lesserThan","values":[(3142,543.3)],"logicalOperator":"and"}`
                 *      The date categories (beginFrom, beginTo, endFrom, endTo) only allow *one* value in the **values** field and it has to be formated the following way: YYYY-MM-DD. Month and day values need to filled up with 0, e.g. 800-01-01
                 *
                 *      **Compare operators**
                 *
                 *      equal, notEqual, like (1), greaterThan (2), greaterThanEqual (2), lesserThan (2)
                 *
                 *     The compare operators work like the mathematical operators. equal x=y, notEqual x!=y, greaterThan x>y , greaterThanEqual x>=y, lesserThan x<y, lesserThanEqual x<=y. The like operator searches for occurrence of the string, so a match can also occur in the middle of a word.
                 *
                 *     (1)Only for string based categories
                 *
                 *     (2)Only for beginFrom, beginTo, endFrom, endTo, valueTypeID
                 *
                 *     **Logical operators**
                 *
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND.
                 *
                 *      The following table outlines the supported operations for each field:
                 *
                 *     |                  | equal     | notEqual  | like      | greaterThan | greaterThanEqual | lesserThan | lesserThanEqual |
                 *     |------------------|-----------|-----------|-----------|-------------|------------------|------------|-----------------|
                 *     | entityName       |     x      |     x      |    x       |             |                  |            |                 |
                 *     | entityDescription|      x     |      x     |      x     |             |                  |            |                 |
                 *     | entityAliases    |      x     |      x     |     x      |             |                  |            |                 |
                 *     | entityCidocClass |      x     |      x     |      x     |             |                  |            |                 |
                 *     | entitySystemClass|      x     |      x     |     x      |             |                  |            |                 |
                 *     | typeName         |       x    |      x     |     x      |             |                  |            |                 |
                 *     | entityID         |       x    |      x     |           |             |                  |            |                 |
                 *     | typeID           |      x     |       x    |           |             |                  |            |                 |
                 *     | valueTypeID      |      x     |      x     |           |      x       |    x              |    x        |      x           |
                 *     | typeIDWithSubs   |      x     |       x    |           |             |                  |            |                 |
                 *     | relationToID     |      x     |      x     |           |             |                  |            |                 |
                 *     | beginFrom        |      x     |      x     |           |      x       |        x          |     x       |      x           |
                 *     | beginTo          |      x     |      x     |           |      x       |          x        |      x      |       x          |
                 *     | endFrom          |      x     |      x     |           |       x      |         x         |       x     |       x          |
                 *     | endTo            |      x     |      x     |           |       x      |       x           |       x     |      x           |
                 *
                 *      */
                search?: components["parameters"]["search"];
                /** @description Starts the result set at the specified entity ID. */
                first?: components["parameters"]["first"];
                /** @description Starts the result set after the specified entity ID. */
                last?: components["parameters"]["last"];
                /** @description Specifies the page number to retrieve in a paginated result set. */
                page?: components["parameters"]["page"];
                /** @description Limits the number of entities returned in the response. A lower value may improve performance. The default is 20. Set to 0 to return all available entities. */
                limit?: components["parameters"]["limit"];
                /** @description Filter results to include only entities with the specified type ID or those linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Filters results to show only connections linked by the selected CIDOC CRM property code. If 'geometry', 'types', 'depictions', or 'links' are specified in the 'show' parameter, these properties will also be displayed. */
                relation_type?: components["parameters"]["relation_type"];
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json": components["schemas"]["EntitiesOutputModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetSearchEntities: {
        parameters: {
            query?: {
                /** @description Search term */
                term?: string;
                /** @description Limits the number of entities returned in the response. A lower value may improve performance. The default is 20. Set to 0 to return all available entities. */
                limit?: components["parameters"]["limit"];
                /** @description Specifies the page number to retrieve in a paginated result set. */
                page?: components["parameters"]["page"];
            };
            header?: never;
            path: {
                /**
                 * @description System class to be requested
                 * @example acquisition
                 */
                system_class: components["parameters"]["system_class"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EntitiesOutputModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetSubunits: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
            };
            header?: never;
            path: {
                /**
                 * @description Specific entity ID
                 * @example 40
                 */
                entityId: components["parameters"]["entityId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SubunitsModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetBySystemClass: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Show integer count of how many entities would the result give back */
                count?: components["parameters"]["count"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Specify the format for the returned results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
                export?: components["parameters"]["export"];
                /**
                 * @description Choose one column to sort the results by. Default value is name.
                 * @example name
                 */
                column?: components["parameters"]["column"];
                /**
                 * @description Sorting result ascending or descending of the given column. Default value is asc.
                 * @example asc
                 */
                sort?: components["parameters"]["sort"];
                /** @description Search query for specific results.
                 *
                 *      **Filterable categories**
                 *
                 *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
                 *
                 *      **Values**
                 *
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.
                 *
                 *      *Notes*:
                 *      The category valueTypeID can search for values of a type ID. But it takes one or more two valued Tuple as list entry: (x,y). x is the type id and y is the searched value. This can be an int or a float, e.g: `{"operator":"lesserThan","values":[(3142,543.3)],"logicalOperator":"and"}`
                 *      The date categories (beginFrom, beginTo, endFrom, endTo) only allow *one* value in the **values** field and it has to be formated the following way: YYYY-MM-DD. Month and day values need to filled up with 0, e.g. 800-01-01
                 *
                 *      **Compare operators**
                 *
                 *      equal, notEqual, like (1), greaterThan (2), greaterThanEqual (2), lesserThan (2)
                 *
                 *     The compare operators work like the mathematical operators. equal x=y, notEqual x!=y, greaterThan x>y , greaterThanEqual x>=y, lesserThan x<y, lesserThanEqual x<=y. The like operator searches for occurrence of the string, so a match can also occur in the middle of a word.
                 *
                 *     (1)Only for string based categories
                 *
                 *     (2)Only for beginFrom, beginTo, endFrom, endTo, valueTypeID
                 *
                 *     **Logical operators**
                 *
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND.
                 *
                 *      The following table outlines the supported operations for each field:
                 *
                 *     |                  | equal     | notEqual  | like      | greaterThan | greaterThanEqual | lesserThan | lesserThanEqual |
                 *     |------------------|-----------|-----------|-----------|-------------|------------------|------------|-----------------|
                 *     | entityName       |     x      |     x      |    x       |             |                  |            |                 |
                 *     | entityDescription|      x     |      x     |      x     |             |                  |            |                 |
                 *     | entityAliases    |      x     |      x     |     x      |             |                  |            |                 |
                 *     | entityCidocClass |      x     |      x     |      x     |             |                  |            |                 |
                 *     | entitySystemClass|      x     |      x     |     x      |             |                  |            |                 |
                 *     | typeName         |       x    |      x     |     x      |             |                  |            |                 |
                 *     | entityID         |       x    |      x     |           |             |                  |            |                 |
                 *     | typeID           |      x     |       x    |           |             |                  |            |                 |
                 *     | valueTypeID      |      x     |      x     |           |      x       |    x              |    x        |      x           |
                 *     | typeIDWithSubs   |      x     |       x    |           |             |                  |            |                 |
                 *     | relationToID     |      x     |      x     |           |             |                  |            |                 |
                 *     | beginFrom        |      x     |      x     |           |      x       |        x          |     x       |      x           |
                 *     | beginTo          |      x     |      x     |           |      x       |          x        |      x      |       x          |
                 *     | endFrom          |      x     |      x     |           |       x      |         x         |       x     |       x          |
                 *     | endTo            |      x     |      x     |           |       x      |       x           |       x     |      x           |
                 *
                 *      */
                search?: components["parameters"]["search"];
                /** @description Starts the result set at the specified entity ID. */
                first?: components["parameters"]["first"];
                /** @description Starts the result set after the specified entity ID. */
                last?: components["parameters"]["last"];
                /** @description Specifies the page number to retrieve in a paginated result set. */
                page?: components["parameters"]["page"];
                /** @description Limits the number of entities returned in the response. A lower value may improve performance. The default is 20. Set to 0 to return all available entities. */
                limit?: components["parameters"]["limit"];
                /** @description Filter results to include only entities with the specified type ID or those linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Filters results to show only connections linked by the selected CIDOC CRM property code. If 'geometry', 'types', 'depictions', or 'links' are specified in the 'show' parameter, these properties will also be displayed. */
                relation_type?: components["parameters"]["relation_type"];
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                centroid?: components["parameters"]["centroid"];
            };
            header?: never;
            path: {
                /**
                 * @description System class to be requested
                 * @example acquisition
                 */
                system_class: components["parameters"]["system_class"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json": components["schemas"]["EntitiesOutputModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    SystemClassCount: {
        parameters: {
            query?: {
                /** @description Filter results to include only entities with the specified type ID or those linked to it. */
                type_id?: components["parameters"]["type_id"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SystemClassCountModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetTypeByViewClass: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TypesByViewClassModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetTypeEntities: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Show integer count of how many entities would the result give back */
                count?: components["parameters"]["count"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Specify the format for the returned results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
                export?: components["parameters"]["export"];
                /**
                 * @description Choose one column to sort the results by. Default value is name.
                 * @example name
                 */
                column?: components["parameters"]["column"];
                /**
                 * @description Sorting result ascending or descending of the given column. Default value is asc.
                 * @example asc
                 */
                sort?: components["parameters"]["sort"];
                /** @description Search query for specific results.
                 *
                 *      **Filterable categories**
                 *
                 *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
                 *
                 *      **Values**
                 *
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.
                 *
                 *      *Notes*:
                 *      The category valueTypeID can search for values of a type ID. But it takes one or more two valued Tuple as list entry: (x,y). x is the type id and y is the searched value. This can be an int or a float, e.g: `{"operator":"lesserThan","values":[(3142,543.3)],"logicalOperator":"and"}`
                 *      The date categories (beginFrom, beginTo, endFrom, endTo) only allow *one* value in the **values** field and it has to be formated the following way: YYYY-MM-DD. Month and day values need to filled up with 0, e.g. 800-01-01
                 *
                 *      **Compare operators**
                 *
                 *      equal, notEqual, like (1), greaterThan (2), greaterThanEqual (2), lesserThan (2)
                 *
                 *     The compare operators work like the mathematical operators. equal x=y, notEqual x!=y, greaterThan x>y , greaterThanEqual x>=y, lesserThan x<y, lesserThanEqual x<=y. The like operator searches for occurrence of the string, so a match can also occur in the middle of a word.
                 *
                 *     (1)Only for string based categories
                 *
                 *     (2)Only for beginFrom, beginTo, endFrom, endTo, valueTypeID
                 *
                 *     **Logical operators**
                 *
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND.
                 *
                 *      The following table outlines the supported operations for each field:
                 *
                 *     |                  | equal     | notEqual  | like      | greaterThan | greaterThanEqual | lesserThan | lesserThanEqual |
                 *     |------------------|-----------|-----------|-----------|-------------|------------------|------------|-----------------|
                 *     | entityName       |     x      |     x      |    x       |             |                  |            |                 |
                 *     | entityDescription|      x     |      x     |      x     |             |                  |            |                 |
                 *     | entityAliases    |      x     |      x     |     x      |             |                  |            |                 |
                 *     | entityCidocClass |      x     |      x     |      x     |             |                  |            |                 |
                 *     | entitySystemClass|      x     |      x     |     x      |             |                  |            |                 |
                 *     | typeName         |       x    |      x     |     x      |             |                  |            |                 |
                 *     | entityID         |       x    |      x     |           |             |                  |            |                 |
                 *     | typeID           |      x     |       x    |           |             |                  |            |                 |
                 *     | valueTypeID      |      x     |      x     |           |      x       |    x              |    x        |      x           |
                 *     | typeIDWithSubs   |      x     |       x    |           |             |                  |            |                 |
                 *     | relationToID     |      x     |      x     |           |             |                  |            |                 |
                 *     | beginFrom        |      x     |      x     |           |      x       |        x          |     x       |      x           |
                 *     | beginTo          |      x     |      x     |           |      x       |          x        |      x      |       x          |
                 *     | endFrom          |      x     |      x     |           |       x      |         x         |       x     |       x          |
                 *     | endTo            |      x     |      x     |           |       x      |       x           |       x     |      x           |
                 *
                 *      */
                search?: components["parameters"]["search"];
                /** @description Starts the result set at the specified entity ID. */
                first?: components["parameters"]["first"];
                /** @description Starts the result set after the specified entity ID. */
                last?: components["parameters"]["last"];
                /** @description Specifies the page number to retrieve in a paginated result set. */
                page?: components["parameters"]["page"];
                /** @description Limits the number of entities returned in the response. A lower value may improve performance. The default is 20. Set to 0 to return all available entities. */
                limit?: components["parameters"]["limit"];
                /** @description Filter results to include only entities with the specified type ID or those linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Filters results to show only connections linked by the selected CIDOC CRM property code. If 'geometry', 'types', 'depictions', or 'links' are specified in the 'show' parameter, these properties will also be displayed. */
                relation_type?: components["parameters"]["relation_type"];
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                centroid?: components["parameters"]["centroid"];
            };
            header?: never;
            path: {
                /**
                 * @description Specific entity ID
                 * @example 40
                 */
                entityId: components["parameters"]["entityId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json": components["schemas"]["EntitiesOutputModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetTypeEntitiesAll: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Show integer count of how many entities would the result give back */
                count?: components["parameters"]["count"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Specify the format for the returned results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
                export?: components["parameters"]["export"];
                /**
                 * @description Choose one column to sort the results by. Default value is name.
                 * @example name
                 */
                column?: components["parameters"]["column"];
                /**
                 * @description Sorting result ascending or descending of the given column. Default value is asc.
                 * @example asc
                 */
                sort?: components["parameters"]["sort"];
                /** @description Search query for specific results.
                 *
                 *      **Filterable categories**
                 *
                 *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
                 *
                 *      **Values**
                 *
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.
                 *
                 *      *Notes*:
                 *      The category valueTypeID can search for values of a type ID. But it takes one or more two valued Tuple as list entry: (x,y). x is the type id and y is the searched value. This can be an int or a float, e.g: `{"operator":"lesserThan","values":[(3142,543.3)],"logicalOperator":"and"}`
                 *      The date categories (beginFrom, beginTo, endFrom, endTo) only allow *one* value in the **values** field and it has to be formated the following way: YYYY-MM-DD. Month and day values need to filled up with 0, e.g. 800-01-01
                 *
                 *      **Compare operators**
                 *
                 *      equal, notEqual, like (1), greaterThan (2), greaterThanEqual (2), lesserThan (2)
                 *
                 *     The compare operators work like the mathematical operators. equal x=y, notEqual x!=y, greaterThan x>y , greaterThanEqual x>=y, lesserThan x<y, lesserThanEqual x<=y. The like operator searches for occurrence of the string, so a match can also occur in the middle of a word.
                 *
                 *     (1)Only for string based categories
                 *
                 *     (2)Only for beginFrom, beginTo, endFrom, endTo, valueTypeID
                 *
                 *     **Logical operators**
                 *
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND.
                 *
                 *      The following table outlines the supported operations for each field:
                 *
                 *     |                  | equal     | notEqual  | like      | greaterThan | greaterThanEqual | lesserThan | lesserThanEqual |
                 *     |------------------|-----------|-----------|-----------|-------------|------------------|------------|-----------------|
                 *     | entityName       |     x      |     x      |    x       |             |                  |            |                 |
                 *     | entityDescription|      x     |      x     |      x     |             |                  |            |                 |
                 *     | entityAliases    |      x     |      x     |     x      |             |                  |            |                 |
                 *     | entityCidocClass |      x     |      x     |      x     |             |                  |            |                 |
                 *     | entitySystemClass|      x     |      x     |     x      |             |                  |            |                 |
                 *     | typeName         |       x    |      x     |     x      |             |                  |            |                 |
                 *     | entityID         |       x    |      x     |           |             |                  |            |                 |
                 *     | typeID           |      x     |       x    |           |             |                  |            |                 |
                 *     | valueTypeID      |      x     |      x     |           |      x       |    x              |    x        |      x           |
                 *     | typeIDWithSubs   |      x     |       x    |           |             |                  |            |                 |
                 *     | relationToID     |      x     |      x     |           |             |                  |            |                 |
                 *     | beginFrom        |      x     |      x     |           |      x       |        x          |     x       |      x           |
                 *     | beginTo          |      x     |      x     |           |      x       |          x        |      x      |       x          |
                 *     | endFrom          |      x     |      x     |           |       x      |         x         |       x     |       x          |
                 *     | endTo            |      x     |      x     |           |       x      |       x           |       x     |      x           |
                 *
                 *      */
                search?: components["parameters"]["search"];
                /** @description Starts the result set at the specified entity ID. */
                first?: components["parameters"]["first"];
                /** @description Starts the result set after the specified entity ID. */
                last?: components["parameters"]["last"];
                /** @description Specifies the page number to retrieve in a paginated result set. */
                page?: components["parameters"]["page"];
                /** @description Limits the number of entities returned in the response. A lower value may improve performance. The default is 20. Set to 0 to return all available entities. */
                limit?: components["parameters"]["limit"];
                /** @description Filter results to include only entities with the specified type ID or those linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Filters results to show only connections linked by the selected CIDOC CRM property code. If 'geometry', 'types', 'depictions', or 'links' are specified in the 'show' parameter, these properties will also be displayed. */
                relation_type?: components["parameters"]["relation_type"];
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                centroid?: components["parameters"]["centroid"];
            };
            header?: never;
            path: {
                /**
                 * @description Specific entity ID
                 * @example 40
                 */
                entityId: components["parameters"]["entityId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json": components["schemas"]["EntitiesOutputModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetTypeOverview: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TypeOverviewModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetTypeTree: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TypeTreeModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetByViewClass: {
        parameters: {
            query?: {
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Show integer count of how many entities would the result give back */
                count?: components["parameters"]["count"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Specify the format for the returned results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities in either a simple CSV format or a ZIP file containing CSV files optimized for network analysis. */
                export?: components["parameters"]["export"];
                /**
                 * @description Choose one column to sort the results by. Default value is name.
                 * @example name
                 */
                column?: components["parameters"]["column"];
                /**
                 * @description Sorting result ascending or descending of the given column. Default value is asc.
                 * @example asc
                 */
                sort?: components["parameters"]["sort"];
                /** @description Search query for specific results.
                 *
                 *      **Filterable categories**
                 *
                 *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
                 *
                 *      **Values**
                 *
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.
                 *
                 *      *Notes*:
                 *      The category valueTypeID can search for values of a type ID. But it takes one or more two valued Tuple as list entry: (x,y). x is the type id and y is the searched value. This can be an int or a float, e.g: `{"operator":"lesserThan","values":[(3142,543.3)],"logicalOperator":"and"}`
                 *      The date categories (beginFrom, beginTo, endFrom, endTo) only allow *one* value in the **values** field and it has to be formated the following way: YYYY-MM-DD. Month and day values need to filled up with 0, e.g. 800-01-01
                 *
                 *      **Compare operators**
                 *
                 *      equal, notEqual, like (1), greaterThan (2), greaterThanEqual (2), lesserThan (2)
                 *
                 *     The compare operators work like the mathematical operators. equal x=y, notEqual x!=y, greaterThan x>y , greaterThanEqual x>=y, lesserThan x<y, lesserThanEqual x<=y. The like operator searches for occurrence of the string, so a match can also occur in the middle of a word.
                 *
                 *     (1)Only for string based categories
                 *
                 *     (2)Only for beginFrom, beginTo, endFrom, endTo, valueTypeID
                 *
                 *     **Logical operators**
                 *
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND.
                 *
                 *      The following table outlines the supported operations for each field:
                 *
                 *     |                  | equal     | notEqual  | like      | greaterThan | greaterThanEqual | lesserThan | lesserThanEqual |
                 *     |------------------|-----------|-----------|-----------|-------------|------------------|------------|-----------------|
                 *     | entityName       |     x      |     x      |    x       |             |                  |            |                 |
                 *     | entityDescription|      x     |      x     |      x     |             |                  |            |                 |
                 *     | entityAliases    |      x     |      x     |     x      |             |                  |            |                 |
                 *     | entityCidocClass |      x     |      x     |      x     |             |                  |            |                 |
                 *     | entitySystemClass|      x     |      x     |     x      |             |                  |            |                 |
                 *     | typeName         |       x    |      x     |     x      |             |                  |            |                 |
                 *     | entityID         |       x    |      x     |           |             |                  |            |                 |
                 *     | typeID           |      x     |       x    |           |             |                  |            |                 |
                 *     | valueTypeID      |      x     |      x     |           |      x       |    x              |    x        |      x           |
                 *     | typeIDWithSubs   |      x     |       x    |           |             |                  |            |                 |
                 *     | relationToID     |      x     |      x     |           |             |                  |            |                 |
                 *     | beginFrom        |      x     |      x     |           |      x       |        x          |     x       |      x           |
                 *     | beginTo          |      x     |      x     |           |      x       |          x        |      x      |       x          |
                 *     | endFrom          |      x     |      x     |           |       x      |         x         |       x     |       x          |
                 *     | endTo            |      x     |      x     |           |       x      |       x           |       x     |      x           |
                 *
                 *      */
                search?: components["parameters"]["search"];
                /** @description Starts the result set at the specified entity ID. */
                first?: components["parameters"]["first"];
                /** @description Starts the result set after the specified entity ID. */
                last?: components["parameters"]["last"];
                /** @description Specifies the page number to retrieve in a paginated result set. */
                page?: components["parameters"]["page"];
                /** @description Limits the number of entities returned in the response. A lower value may improve performance. The default is 20. Set to 0 to return all available entities. */
                limit?: components["parameters"]["limit"];
                /** @description Filter results to include only entities with the specified type ID or those linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Filters results to show only connections linked by the selected CIDOC CRM property code. If 'geometry', 'types', 'depictions', or 'links' are specified in the 'show' parameter, these properties will also be displayed. */
                relation_type?: components["parameters"]["relation_type"];
                /** @description Choose language for system inherent labels */
                locale?: components["parameters"]["locale"];
                /** @description Will calculate the centerpoint for all polygons and linestrings and *add* them to geometries */
                centroid?: components["parameters"]["centroid"];
            };
            header?: never;
            path: {
                /**
                 * @description View class to be requested
                 * @example actor
                 */
                view_class: components["parameters"]["view_class"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json": components["schemas"]["EntitiesOutputModel"];
                };
            };
            /** @description Something went wrong. Please consult the error message. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
