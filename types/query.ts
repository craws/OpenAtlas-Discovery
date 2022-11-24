export type ViewClasses = (
  | 'all'
  | 'actor'
  | 'artifact'
  | 'event'
  | 'place'
  | 'reference'
  | 'source'
  | 'type'
  | 'file'
  | 'source_translation'
  | 'reference_system'
)[]
export type Format = 'lp' | 'geojson' | 'geojson-v2' | 'pretty-xml' | 'n3' | 'turtle' | 'nt' | 'xml';
export interface Filter {
    operator: 'equal'
    values: number[] | string[]
    logicalOperator: 'or' | 'and'
}
export interface OrderFilter {
    operator: 'greaterThan' | 'greaterThanEqual' | 'lesserThan' | 'lesserThanEqual'
    values: number[] | string[]
    logicalOperator: 'or' | 'and'
}

export interface StringFilter {
    operator: 'like'
    values: string[]
    logicalOperator: 'or' | 'and'
}
export interface Search {
  entityName?: (Filter | StringFilter)[]
  entityDescription?: (Filter | StringFilter)[]
  entityAliases?: (Filter | StringFilter)[]
  entityCidocClass?: (Filter | StringFilter)[]
  entitySystemClass?: (Filter | StringFilter)[]
  entityID?: Filter[]
  typeID?: Filter[]
  valueTypeID?: (Filter | OrderFilter)[]
  typeIDWithSubs?: Filter[]
  typeName?: (Filter | StringFilter)[]
  beginFrom?: (Filter | OrderFilter)[]
  beginTo?: (Filter | OrderFilter)[]
  endFrom?: (Filter | OrderFilter)[]
  endTo?: (Filter | OrderFilter)[]
  relationToID?: Filter[]
}
export interface Query {
  search?: Search[],
  view_classes: ('actor' | 'event' | 'place' | 'reference' | 'source')[]
}
