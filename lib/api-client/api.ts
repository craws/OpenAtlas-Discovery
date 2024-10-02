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
    "/display/{entityId}": {
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
    "/iiif_manifest/{version}/{entityId}": {
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
            results: (components["schemas"]["LinkedPlacesModel"] | components["schemas"]["GeoJSONModel"])[];
        };
        GeoJSONModel: {
            features: {
                geometry: components["schemas"]["Polygon"] | components["schemas"]["Point"] | components["schemas"]["LineString"] | components["schemas"]["GeometryCollection"];
                properties: {
                    "@id": number;
                    /** Format: nullable */
                    begin_comment: string;
                    begin_earliest: string;
                    /** Format: nullable */
                    begin_latest: string;
                    description: string;
                    /** Format: nullable */
                    end_comment: string;
                    end_earliest: string;
                    /** Format: nullable */
                    end_latest: string;
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
                /** Format: nullable */
                depictions?: {
                    "@id"?: string;
                    IIIFManifest?: string;
                    creator?: string;
                    license?: string;
                    licenseHolder?: string;
                    mimetype?: string;
                    publicShareable?: boolean;
                    title?: string;
                    url?: string;
                }[];
                descriptions: {
                    value?: string;
                }[];
                geometry: components["schemas"]["Polygon"] | components["schemas"]["Point"] | components["schemas"]["LineString"] | components["schemas"]["GeometryCollection"];
                /** Format: nullable */
                links?: string;
                /** Format: nullable */
                names?: string;
                properties: {
                    title: string;
                };
                relations?: {
                    label?: string;
                    /** Format: nullable */
                    relationDescription?: string;
                    relationSystemClass?: string;
                    relationTo?: string;
                    relationType?: string;
                    /** Format: nullable */
                    type?: string;
                    when?: {
                        timespans?: {
                            end?: {
                                /** Format: nullable */
                                comment?: string;
                                /** Format: nullable */
                                earliest?: string;
                                /** Format: nullable */
                                latest?: string;
                            };
                            start?: {
                                /** Format: nullable */
                                comment?: string;
                                /** Format: nullable */
                                earliest?: string;
                                /** Format: nullable */
                                latest?: string;
                            };
                        }[];
                    };
                }[];
                systemClass: string;
                type: string;
                types?: {
                    /** Format: nullable */
                    descriptions?: string;
                    hierarchy?: string;
                    identifier?: string;
                    label?: string;
                    typeHierarchy?: {
                        description?: string;
                        identifier?: string;
                        label?: string;
                    }[];
                    /** Format: nullable */
                    unit?: string;
                    /** Format: float */
                    value?: number;
                }[];
                viewClass: string;
                when?: {
                    timespans?: {
                        end?: {
                            /** Format: nullable */
                            comment?: string;
                            /** Format: nullable */
                            earliest?: string;
                            /** Format: nullable */
                            latest?: string;
                        };
                        start?: {
                            /** Format: nullable */
                            comment?: string;
                            /** Format: nullable */
                            earliest?: string;
                            /** Format: nullable */
                            latest?: string;
                        };
                    }[];
                };
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
            /** @enum {string} */
            shapeType?: "centerpoint";
            title?: string;
            /** @enum {string} */
            type: "Point";
        };
        Polygon: {
            coordinates: components["schemas"]["LinearRing"][];
            description?: string;
            /** @enum {string} */
            shapeType?: "area" | "shape";
            title?: string;
            /** @enum {string} */
            type: "Polygon";
        };
        Position: [
        ] | [
            number
        ];
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
                /** Format: nullable */
                aliases: string;
                description: string;
                externalReferences: {
                    id: string;
                    identifier: string;
                    referenceSystem: string;
                    referenceURL: string;
                    resolverURL: string;
                    type: string;
                }[];
                /** Format: nullable */
                files: string;
                name: string;
                references: {
                    abbreviation: string;
                    /** Format: int32 */
                    id: number;
                    /** Format: nullable */
                    pages: string;
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
                    /** Format: nullable */
                    unit: string;
                    /** Format: nullable */
                    value: string;
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
         * @description CIDOC classes to be requested
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
        /** @description Download results */
        download: boolean;
        /** @description Entity ids which will be requested */
        entities: number[];
        /**
         * @description Specific entity ID
         * @example 40
         */
        entityId: number;
        /** @description System classes to be excluded from network */
        exclude_system_classes: ("acquisition" | "activity" | "administrative_unit" | "appellation" | "artifact" | "bibliography" | "creation" | "edition" | "event" | "external_reference" | "feature" | "file" | "group" | "human_remains" | "move" | "person" | "place" | "production" | "reference_system" | "source" | "source_translation" | "stratigraphic_unit" | "type" | "type_tools")[];
        /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
        export: "csv" | "csvNetwork";
        /** @description Begin results at the given entity id. */
        first: number;
        /**
         * @description Choose the format for the results.
         * @example lp
         */
        format: "lp" | "lpx" | "geojson" | "geojson-v2" | "pretty-xml" | "n3" | "turtle" | "nt" | "xml";
        /** @description Filters which geometries will be received. Default is gisAll */
        geometry: ("gisAll" | "gisPointAll" | "gisPointSupers" | "gisPointSubs" | "gisPointSibling" | "gisLineAll" | "gisPolygonAll")[];
        /**
         * @description Select which size of the image you want to display. Values are fixed but can be changed for each OpenAtlas instance. Thumbnail is 200px and table 100px.
         * @example table
         */
        image_size: "thumbnail" | "table";
        /** @description Begin results after the given entity id. */
        last: number;
        /** @description Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
        limit: number;
        /** @description Entity IDs, from which all linked entities are requested */
        linked_entities: number[];
        /** @description Show only entities, which are linked to given IDs */
        linked_to_ids: number[];
        /** @description Choose language for system inherent labels */
        locale: "ca" | "de" | "en" | "es" | "fr";
        /** @description Jump to page number. */
        page: number;
        /** @description Retrieves entities which are connected to the requested entity with the `property` */
        properties: ("all" | "P43" | "P140" | "P99" | "P112" | "P113" | "P17" | "P104" | "P142" | "P195" | "P164" | "P129" | "P33" | "P53" | "P42" | "P48" | "P37" | "P182" | "P132" | "P56" | "P148" | "P150" | "P100" | "P180" | "P98" | "P74" | "P124" | "P152" | "OA8" | "P20" | "P25" | "P144" | "P2" | "P54" | "P97" | "P34" | "P175" | "P51" | "P123" | "P55" | "P70" | "P8" | "P11" | "P196" | "P126" | "P105" | "P44" | "P109" | "P12" | "P9" | "P156" | "P86" | "P111" | "P4" | "P197" | "P179" | "P128" | "P141" | "P19" | "P65" | "P103" | "P59" | "P183" | "P15" | "P89" | "P184" | "P94" | "P92" | "P110" | "P16" | "P130" | "P72" | "P1" | "P68" | "P188" | "P23" | "P125" | "P93" | "P160" | "P50" | "P95" | "P40" | "P62" | "P198" | "P49" | "P145" | "P139" | "P174" | "P31" | "P28" | "P177" | "P21" | "P26" | "P5" | "P135" | "P22" | "P14" | "P136" | "P189" | "P137" | "P106" | "P166" | "P69" | "P27" | "P101" | "P38" | "P35" | "P10" | "P143" | "P173" | "P75" | "P176" | "P127" | "P108" | "P76" | "P91" | "P24" | "P73" | "P133" | "P29" | "OA9" | "P191" | "P96" | "P71" | "P165" | "P7" | "P67" | "P161" | "P186" | "P107" | "P134" | "P146" | "P13" | "P121" | "P46" | "P185" | "P39" | "P45" | "P32" | "P187" | "P147" | "P157" | "P122" | "P30" | "OA7" | "P52" | "P151" | "P167" | "P102" | "P41" | "P138")[];
        /** @description Displays only connections connected by the selected CIDOC CRM property code. If geometry, types, depictions and/or links is in the show parameter, these properties are also displayed. */
        relation_type: ("P43" | "P140" | "P99" | "P112" | "P113" | "P17" | "P104" | "P142" | "P195" | "P164" | "P129" | "P33" | "P53" | "P42" | "P48" | "P37" | "P182" | "P132" | "P56" | "P148" | "P150" | "P100" | "P180" | "P98" | "P74" | "P124" | "P152" | "OA8" | "P20" | "P25" | "P144" | "P2" | "P54" | "P97" | "P34" | "P175" | "P51" | "P123" | "P55" | "P70" | "P8" | "P11" | "P196" | "P126" | "P105" | "P44" | "P109" | "P12" | "P9" | "P156" | "P86" | "P111" | "P4" | "P197" | "P179" | "P128" | "P141" | "P19" | "P65" | "P103" | "P59" | "P183" | "P15" | "P89" | "P184" | "P94" | "P92" | "P110" | "P16" | "P130" | "P72" | "P1" | "P68" | "P188" | "P23" | "P125" | "P93" | "P160" | "P50" | "P95" | "P40" | "P62" | "P198" | "P49" | "P145" | "P139" | "P174" | "P31" | "P28" | "P177" | "P21" | "P26" | "P5" | "P135" | "P22" | "P14" | "P136" | "P189" | "P137" | "P106" | "P166" | "P69" | "P27" | "P101" | "P38" | "P35" | "P10" | "P143" | "P173" | "P75" | "P176" | "P127" | "P108" | "P76" | "P91" | "P24" | "P73" | "P133" | "P29" | "OA9" | "P191" | "P96" | "P71" | "P165" | "P7" | "P67" | "P161" | "P186" | "P107" | "P134" | "P146" | "P13" | "P121" | "P46" | "P185" | "P39" | "P45" | "P32" | "P187" | "P147" | "P157" | "P122" | "P30" | "OA7" | "P52" | "P151" | "P167" | "P102" | "P41" | "P138")[];
        /** @description Search query for specific results.
         *
         *      **Filterable categories**
         *
         *      entityName, entityDescription, entityAliases, entityCidocClass, entitySystemClass, entityID, typeID, valueTypeID, typeIDWithSubs, typeName, beginFrom, beginTo, endFrom, endTo, relationToID
         *
         *      **Values**
         *
         *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.\n *Notes*:
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
         *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND. */
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
        system_class: "all" | "acquisition" | "activity" | "administrative_unit" | "appellation" | "artifact" | "bibliography" | "creation" | "edition" | "event" | "external_reference" | "feature" | "file" | "group" | "human_remains" | "move" | "object_location" | "person" | "place" | "production" | "reference_system" | "source" | "source_translation" | "stratigraphic_unit" | "type" | "tools";
        /** @description System classes to be requested */
        system_classes: ("all" | "acquisition" | "activity" | "administrative_unit" | "appellation" | "artifact" | "bibliography" | "creation" | "edition" | "event" | "external_reference" | "feature" | "file" | "group" | "human_remains" | "move" | "object_location" | "person" | "place" | "production" | "reference_system" | "source" | "source_translation" | "stratigraphic_unit" | "type" | "tools")[];
        /** @description Show only entities with the given type id or linked to it. */
        type_id: number[];
        /** @description Provide a valid URL, e.g. https://openatlas.eu/. At an IIIF endpoint this will replace the base URL of all annotations. */
        url: string;
        /**
         * @description View class to be requested
         * @example actor
         */
        view_class: "all" | "actor" | "artifact" | "event" | "file" | "place" | "reference" | "reference_system" | "source" | "source_translation" | "type";
        /**
         * @description View classes to be requested
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
                 * @description Choose the format for the results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
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
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.\n *Notes*:
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
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND. */
                search?: components["parameters"]["search"];
                /** @description Begin results at the given entity id. */
                first?: components["parameters"]["first"];
                /** @description Begin results after the given entity id. */
                last?: components["parameters"]["last"];
                /** @description Jump to page number. */
                page?: components["parameters"]["page"];
                /** @description Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
                limit?: components["parameters"]["limit"];
                /** @description Show only entities with the given type id or linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Displays only connections connected by the selected CIDOC CRM property code. If geometry, types, depictions and/or links is in the show parameter, these properties are also displayed. */
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
                 * @description Choose the format for the results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
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
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.\n *Notes*:
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
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND. */
                search?: components["parameters"]["search"];
                /** @description Begin results at the given entity id. */
                first?: components["parameters"]["first"];
                /** @description Begin results after the given entity id. */
                last?: components["parameters"]["last"];
                /** @description Jump to page number. */
                page?: components["parameters"]["page"];
                /** @description Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
                limit?: components["parameters"]["limit"];
                /** @description Show only entities with the given type id or linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Displays only connections connected by the selected CIDOC CRM property code. If geometry, types, depictions and/or links is in the show parameter, these properties are also displayed. */
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
                 * @description Choose the format for the results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
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
                /** @description Filters which geometries will be received. Default is gisAll */
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
                /** @description Provide a valid URL, e.g. https://openatlas.eu/. At an IIIF endpoint this will replace the base URL of all annotations. */
                url?: components["parameters"]["url"];
            };
            header?: never;
            path: {
                version: 2;
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
                 * @description Choose the format for the results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
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
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.\n *Notes*:
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
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND. */
                search?: components["parameters"]["search"];
                /** @description Show only entities with the given type id or linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Displays only connections connected by the selected CIDOC CRM property code. If geometry, types, depictions and/or links is in the show parameter, these properties are also displayed. */
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
                /** @description Retrieves entities which are connected to the requested entity with the `property` */
                properties: components["parameters"]["properties"];
                /** @description Download results */
                download?: components["parameters"]["download"];
                /** @description Show integer count of how many entities would the result give back */
                count?: components["parameters"]["count"];
                /** @description Select which keys should not be displayed. This can improve performance */
                show?: components["parameters"]["show"];
                /**
                 * @description Choose the format for the results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
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
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.\n *Notes*:
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
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND. */
                search?: components["parameters"]["search"];
                /** @description Begin results at the given entity id. */
                first?: components["parameters"]["first"];
                /** @description Begin results after the given entity id. */
                last?: components["parameters"]["last"];
                /** @description Jump to page number. */
                page?: components["parameters"]["page"];
                /** @description Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
                limit?: components["parameters"]["limit"];
                /** @description Show only entities with the given type id or linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Displays only connections connected by the selected CIDOC CRM property code. If geometry, types, depictions and/or links is in the show parameter, these properties are also displayed. */
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
                /** @description System classes to be excluded from network */
                exclude_system_classes?: components["parameters"]["exclude_system_classes"];
                /** @description Show only entities, which are linked to given IDs */
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
                /** @description Entity ids which will be requested */
                entities?: components["parameters"]["entities"];
                /**
                 * @description View classes to be requested
                 * @example actor
                 */
                view_classes?: components["parameters"]["view_classes"];
                /** @description System classes to be requested */
                system_classes?: components["parameters"]["system_classes"];
                /**
                 * @description CIDOC classes to be requested
                 * @example E18
                 */
                cidoc_classes?: components["parameters"]["cidoc_classes"];
                /** @description Entity IDs, from which all linked entities are requested */
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
                 * @description Choose the format for the results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
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
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.\n *Notes*:
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
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND. */
                search?: components["parameters"]["search"];
                /** @description Begin results at the given entity id. */
                first?: components["parameters"]["first"];
                /** @description Begin results after the given entity id. */
                last?: components["parameters"]["last"];
                /** @description Jump to page number. */
                page?: components["parameters"]["page"];
                /** @description Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
                limit?: components["parameters"]["limit"];
                /** @description Show only entities with the given type id or linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Displays only connections connected by the selected CIDOC CRM property code. If geometry, types, depictions and/or links is in the show parameter, these properties are also displayed. */
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
                 * @description Choose the format for the results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
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
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.\n *Notes*:
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
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND. */
                search?: components["parameters"]["search"];
                /** @description Begin results at the given entity id. */
                first?: components["parameters"]["first"];
                /** @description Begin results after the given entity id. */
                last?: components["parameters"]["last"];
                /** @description Jump to page number. */
                page?: components["parameters"]["page"];
                /** @description Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
                limit?: components["parameters"]["limit"];
                /** @description Show only entities with the given type id or linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Displays only connections connected by the selected CIDOC CRM property code. If geometry, types, depictions and/or links is in the show parameter, these properties are also displayed. */
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
                /** @description Show only entities with the given type id or linked to it. */
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
                 * @description Choose the format for the results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
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
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.\n *Notes*:
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
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND. */
                search?: components["parameters"]["search"];
                /** @description Begin results at the given entity id. */
                first?: components["parameters"]["first"];
                /** @description Begin results after the given entity id. */
                last?: components["parameters"]["last"];
                /** @description Jump to page number. */
                page?: components["parameters"]["page"];
                /** @description Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
                limit?: components["parameters"]["limit"];
                /** @description Show only entities with the given type id or linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Displays only connections connected by the selected CIDOC CRM property code. If geometry, types, depictions and/or links is in the show parameter, these properties are also displayed. */
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
                 * @description Choose the format for the results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
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
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.\n *Notes*:
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
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND. */
                search?: components["parameters"]["search"];
                /** @description Begin results at the given entity id. */
                first?: components["parameters"]["first"];
                /** @description Begin results after the given entity id. */
                last?: components["parameters"]["last"];
                /** @description Jump to page number. */
                page?: components["parameters"]["page"];
                /** @description Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
                limit?: components["parameters"]["limit"];
                /** @description Show only entities with the given type id or linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Displays only connections connected by the selected CIDOC CRM property code. If geometry, types, depictions and/or links is in the show parameter, these properties are also displayed. */
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
                 * @description Choose the format for the results.
                 * @example lp
                 */
                format?: components["parameters"]["format"];
                /** @description Export the entities into either a simple CSV representation or a zip file of CSV's especially designed for network analyses. */
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
                 *      Values has to be a list of items. The items can be either a string, an integer or a tuple (see Notes). Strings need to be marked with “” or ‘’, while integers does not allow this.\n *Notes*:
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
                 *     Not mandatory, OR is the default value. Logical operators handles, if the values are treated as OR or AND. */
                search?: components["parameters"]["search"];
                /** @description Begin results at the given entity id. */
                first?: components["parameters"]["first"];
                /** @description Begin results after the given entity id. */
                last?: components["parameters"]["last"];
                /** @description Jump to page number. */
                page?: components["parameters"]["page"];
                /** @description Limits the entities displayed. Influences the performance of the request. Default value is 20. 0 means all available entities will be displayed. */
                limit?: components["parameters"]["limit"];
                /** @description Show only entities with the given type id or linked to it. */
                type_id?: components["parameters"]["type_id"];
                /** @description Displays only connections connected by the selected CIDOC CRM property code. If geometry, types, depictions and/or links is in the show parameter, these properties are also displayed. */
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
