import type { components } from "@/lib/api-client/api";

export type CrmCode = keyof components["schemas"]["PropertiesModel"];

export interface RelationType {
	crmCode: CrmCode;
	inverse?: boolean;
}

export function extractRelationTypeFromRelationString(relation?: string): RelationType | null {
	if (!relation) return null;
	let crmCode = relation.replace("crm:", "");
	crmCode = crmCode.split("_")[0] ?? crmCode;
	crmCode = crmCode.split(" ")[0] ?? crmCode;

	if (!crmCode) return null;

	const inverse = crmCode.endsWith("i");
	if (inverse) crmCode = crmCode.slice(0, -1);

	/** At the moment no CRM code is longer than 4 characters. */
	if (crmCode.length > 4) return null;

	return { crmCode: crmCode as CrmCode, inverse };
}
