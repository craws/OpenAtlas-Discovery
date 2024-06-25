type Relations = Array<NonNullable<EntityFeature["relations"]>[0]>;

export const useFilterRelations = (
	relations: MaybeRef<Relations> | undefined,
	filters: MaybeRef<{
		relationType?: RelationType;
		systemClass?: EntityFeature["systemClass"];
	}>,
) => {
	if (!relations) return [];

	const { relationType, systemClass } = toValue(filters);
	const rels = toValue(relations);

	const test = rels.reduce((acc: Relations, relation): Relations => {
		if (!relation.relationType) return acc;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const { crmCode, inverse } = extractRelationTypeFromRelationString(relation.relationType) ?? {};

		if (
			relationType &&
			!systemClass &&
			crmCode === relationType.crmCode &&
			inverse === Boolean(relationType.inverse)
		) {
			return [...acc, relation];
		}

		if (systemClass && !relationType && systemClass === relation.relationSystemClass) {
			return [...acc, relation];
		}

		if (
			relationType &&
			systemClass &&
			crmCode === relationType.crmCode &&
			inverse === Boolean(relationType.inverse) &&
			systemClass === relation.relationSystemClass
		) {
			return [...acc, relation];
		}

		return acc;
	}, []);
	return test;
};
