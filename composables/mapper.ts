import { GeometryModel } from "./api"
import { GeoJsonObject, GeoJsonTypes, Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, GeometryCollection } from "geojson";


export function useMapGeometryModelToGeoJsonObject(model: GeometryModel): Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | GeometryCollection | undefined {
    switch (model?.type) {
        case "Polygon":
            return {
                type: "Polygon",
                coordinates: [model.coordinates] as number[][][]
            }
        case "Point":
            return {
                type: "Point",
                coordinates: model.coordinates as number[]
            }
        case "LineString":
            return {
                type: "LineString",
                coordinates: model.coordinates as number[][]
            }
        case "MultiPoint":
            return {
                type: "MultiPoint",
                coordinates: model.coordinates as number[][]
            }
        case "MultiLineString":
            return {
                type: "MultiLineString",
                coordinates: [model.coordinates] as number[][][]
            }
        case "MultiPolygon":
            return {
                type: "MultiPolygon",
                coordinates: [[model.coordinates]] as number[][][][]
            }
        default:
            return undefined
    }
}

export function useMapGeometryModelListToGeoJsonObjectList(models: GeometryModel[]): (Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | GeometryCollection | undefined)[] {
    return models.map(useMapGeometryModelToGeoJsonObject)
}

