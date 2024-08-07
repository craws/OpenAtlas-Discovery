import {
	BoneIcon,
	CalendarFoldIcon,
	CodeSquareIcon,
	MapPinIcon,
	ShapesIcon,
	TextIcon,
	UserIcon,
} from "lucide-vue-next";

type Icon = typeof CalendarFoldIcon;

const icons: Record<string, Icon> = {
	acquisition: CalendarFoldIcon,
	activity: CalendarFoldIcon,
	// actor_appellation: null,
	administrative_unit: MapPinIcon,
	// appellation: null,
	artifact: ShapesIcon,
	bibliography: TextIcon,
	edition: TextIcon,
	external_reference: TextIcon,
	event: CalendarFoldIcon,
	feature: MapPinIcon,
	file: TextIcon,
	find: MapPinIcon,
	group: UserIcon,
	human_remains: BoneIcon,
	move: CalendarFoldIcon,
	object_location: MapPinIcon,
	person: UserIcon,
	place: MapPinIcon,
	// referenceSystem: null,
	source: TextIcon,
	stratigraphic_unit: MapPinIcon,
	source_translation: TextIcon,
	type: CodeSquareIcon,
};

export function getEntityIcon(systemClass: string): Icon | null {
	return icons[systemClass] ?? null;
}
