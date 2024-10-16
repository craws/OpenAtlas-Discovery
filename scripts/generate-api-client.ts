import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { assert, log } from "@acdh-oeaw/lib";
import openapi, { astToString } from "openapi-typescript";
import * as v from "valibot";

const schema = v.object({
	NUXT_PUBLIC_DATABASE: v.optional(v.picklist(["enabled", "disabled"]), "enabled"),
	NUXT_PUBLIC_OPENAPI_BASE_URL: v.pipe(
		v.unknown(),
		v.transform((v) => {
			return v === "" ? undefined : v;
		}),
		v.optional(v.pipe(v.string(), v.url())),
	),
});

async function generate() {
	const result = v.safeParse(schema, process.env);

	if (!result.success) {
		const message = "Invalid environment variables";
		log.error(`${message}:`, v.flatten(result.issues).nested);
		const error = new Error(message);
		delete error.stack;
		throw error;
	}

	const isDatabaseEnabled = result.output.NUXT_PUBLIC_DATABASE === "enabled";
	if (!isDatabaseEnabled) {
		return { isOverriden: false, api: "" };
	}

	const url = result.output.NUXT_PUBLIC_OPENAPI_BASE_URL;

	assert(url, "NUXT_PUBLIC_OPENAPI_BASE_URL environment variable not provided.");

	const ast = await openapi(url, {
		arrayLength: true,
	});
	const content = astToString(ast);
	const folderPath = join(process.cwd(), "lib", "api-client");
	await mkdir(folderPath, { recursive: true });
	await writeFile(join(folderPath, "api.ts"), content, { encoding: "utf-8" });

	return { isOverriden: true, api: url };
}

generate()
	.then(({ isOverriden, api }) => {
		if (isOverriden) {
			log.success("Successfully generated api client from ", api);
		} else {
			log.info(
				"Used default api client from the demo data, because no other database is provided.",
			);
		}
	})
	.catch((error: unknown) => {
		log.error("Failed to generate api client.\n", String(error));
		process.exitCode = 1;
	});
