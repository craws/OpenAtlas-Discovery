import type { EntityFeature } from "@/composables/use-create-entity";

export function createFeatureCollection(features: Array<EntityFeature>) {
	return { type: "FeatureCollection" as const, features };
}
