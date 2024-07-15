import type { Locale, Schema } from "@/config/i18n.config";
import type { RelationType } from "@/utils/extract-crm-code";

export const useRelationTitle = (relation: RelationType, systemClass?: string): string => {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { te } = useI18n<Schema, Locale>();
	const t = useTranslations();

	const key = `${relation.crmCode}.title${relation.inverse ? "Inverse" : ""}`;
	const systemClassKey = `${systemClass ?? ""}.${key}`;

	if (te(systemClassKey)) {
		return t(systemClassKey);
	}
	return t(key);
};

export const useRelationGroupTitle = (relation: RelationType, systemClass?: string): string => {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { te } = useI18n<Schema, Locale>();
	const t = useTranslations();

	const key = `${relation.crmCode}.groupTitle${relation.inverse ? "Inverse" : ""}`;
	const systemClassKey = `${systemClass ?? ""}.${key}`;

	if (te(systemClassKey)) {
		return t(systemClassKey);
	}
	return t(key);
};
