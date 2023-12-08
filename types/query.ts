export type ViewClasses = Array<
	| "actor"
	| "all"
	| "artifact"
	| "event"
	| "file"
	| "place"
	| "reference_system"
	| "reference"
	| "source_translation"
	| "source"
	| "type"
>;
export type Format =
	| "geojson-v2"
	| "geojson"
	| "lp"
	| "n3"
	| "nt"
	| "pretty-xml"
	| "turtle"
	| "xml";
export interface Filter {
	operator: "equal";
	values: Array<number> | Array<string>;
	logicalOperator: "and" | "or";
}
export interface OrderFilter {
	operator: "greaterThan" | "greaterThanEqual" | "lesserThan" | "lesserThanEqual";
	values: Array<number> | Array<string>;
	logicalOperator: "and" | "or";
}

export interface StringFilter {
	operator: "like";
	values: Array<string>;
	logicalOperator: "and" | "or";
}
export interface Search {
	entityName?: Array<Filter | StringFilter>;
	entityDescription?: Array<Filter | StringFilter>;
	entityAliases?: Array<Filter | StringFilter>;
	entityCidocClass?: Array<Filter | StringFilter>;
	entitySystemClass?: Array<Filter | StringFilter>;
	entityID?: Array<Filter>;
	typeID?: Array<Filter>;
	valueTypeID?: Array<Filter | OrderFilter>;
	typeIDWithSubs?: Array<Filter>;
	typeName?: Array<Filter | StringFilter>;
	beginFrom?: Array<Filter | OrderFilter>;
	beginTo?: Array<Filter | OrderFilter>;
	endFrom?: Array<Filter | OrderFilter>;
	endTo?: Array<Filter | OrderFilter>;
	relationToID?: Array<Filter>;
}
export interface Query {
	search?: Array<Search>;
	view_classes: Array<"actor" | "event" | "place" | "reference" | "source">;
}
