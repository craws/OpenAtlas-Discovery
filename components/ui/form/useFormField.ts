import {
	FieldContextKey,
	useFieldError,
	useIsFieldDirty,
	useIsFieldTouched,
	useIsFieldValid,
} from "vee-validate";

import { FORM_ITEM_INJECTION_KEY } from "@/components/ui/form/form.context";

export function useFormField() {
	const fieldContext = inject(FieldContextKey);
	const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY);

	const fieldState = {
		valid: useIsFieldValid(),
		isDirty: useIsFieldDirty(),
		isTouched: useIsFieldTouched(),
		error: useFieldError(),
	};

	if (!fieldContext) throw new Error("useFormField should be used within <FormField>");

	const { name } = fieldContext;
	const id = fieldItemContext;

	return {
		id,
		name,
		formItemId: `${String(id)}-form-item`,
		formDescriptionId: `${String(id)}-form-item-description`,
		formMessageId: `${String(id)}-form-item-message`,
		...fieldState,
	};
}
