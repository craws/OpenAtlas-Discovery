/* eslint-disable require-atomic-updates, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */

import { isNonEmptyString } from "@acdh-oeaw/lib";
import { parseMarkdown } from "@nuxtjs/mdc/runtime";

/**
 * `nuxt/content` cannot render frontmatter fields as markdown, so we work around this
 * limitation here by explicitly parsing any hero section `lead-in` fields in system pages.
 */
export default defineNitroPlugin((nitroApp) => {
	// @ts-expect-error Missing type information.
	nitroApp.hooks.hook("content:file:afterParse", async (file) => {
		if (file._path.startsWith("/system-pages/") && file._id.endsWith(".md")) {
			if (isNonEmptyString(file.leadIn)) {
				file.leadIn = await parseMarkdown(file.leadIn);
			}
		}
	});
});
