export function createDateSpan(date: { earliest?: string; latest?: string }) {
	const { d } = useI18n();

	const segments: Array<string> = [];

	if (date.earliest != null) {
		segments.push(d(date.earliest, { dateStyle: "medium" }));
	}
	if (date.latest != null) {
		segments.push(d(date.latest, { dateStyle: "medium" }));
	}

	return segments.join(" - ");
}
