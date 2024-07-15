import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { log } from "@acdh-oeaw/lib";
import openapi, { astToString } from "openapi-typescript";
import * as v from "valibot";

const schema = v.object({
	NUXT_PUBLIC_OPENAPI_BASE_URL: v.pipe(v.string(), v.url()),
});

const result = v.safeParse(schema, process.env);

if (!result.success) {
	const message = "Invalid environment variables";
	log.error(`${message}:`, v.flatten(result.issues).nested);
	const error = new Error(message);
	delete error.stack;
	throw error;
}

const url = result.output.NUXT_PUBLIC_OPENAPI_BASE_URL;

async function generate() {
	const ast = await openapi(url, {
		arrayLength: true,
	});
	const content = astToString(ast);
	const folderPath = join(process.cwd(), "lib", "api-client");
	await mkdir(folderPath, { recursive: true });
	await writeFile(join(folderPath, "api.ts"), content, { encoding: "utf-8" });
}

generate()
	.then(() => {
		log.success("Successfully generated api client.");
	})
	.catch((error: unknown) => {
		log.error("Failed to generate api client.\n", String(error));
		process.exitCode = 1;
	});
