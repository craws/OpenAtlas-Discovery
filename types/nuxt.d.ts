import type { ResourcePath } from "@intlify/core-base";

import type { Messages } from "@/config/i18n.config";

declare module "#app" {
	interface PageMeta {
		title: ResourcePath<Messages>;
		description?: ResourcePath<Messages>;
	}
}
