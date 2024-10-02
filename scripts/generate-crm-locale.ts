/**
 * This script generates CRM messages for all locales specified in `i18n.config.ts`.
 * It fetches CRM types as well as their translations from the API and generates a JSON file for each locale.
 * To override the translations, add the custom translations to the `customDictionary` object.
 * The structure of the generated JSON files is as follows:
 * {
 *  "relationTypeCode": {
 * 		"title": "Title",
 * 		"titleInverse": "Inverse title",
 * 		"groupTitle": "Group title",
 * 		"groupTitleInverse": "Inverse group title"
 * }
 *
 * for special cases, it's also possible to add translations specific to a system class:
 * {
 * 	"systemClassName": {
 * 		"relationTypeCode": {
 * 			"title": "Title",
 * 			"titleInverse": "Inverse title",
 * 			"groupTitle": "Group title",
 * 			"groupTitleInverse": "Inverse group title"
 * 		}
 * 	}
 */
// FIXME: mocca will fix it in taiwan.
/* eslint-disable */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as v from "valibot";

import { assert, log } from "@acdh-oeaw/lib";
import createApiClient from "@stefanprobst/openapi-client";

import { defaultLocale, locales } from "@/config/i18n.config";
import type { paths } from "@/lib/api-client/api";

const schema = v.object({
	NUXT_PUBLIC_DATABASE: v.optional(v.picklist(["enabled", "disabled"]), "enabled"),
	NUXT_PUBLIC_API_BASE_URL: v.pipe(
		v.unknown(),
		v.transform((v) => {
			return v === "" ? undefined : v;
		}),
		v.optional(v.pipe(v.string(), v.url())),
	),
});

interface Translations {
	title?: string;
	titleInverse?: string;
	groupTitle?: string;
	groupTitleInverse?: string;
}

const customDictionary: Record<
	string,
	Record<string, Record<string, Translations> | Translations>
> = {
	en: {
		person: {
			OA8: {
				title: "Born in",
				titleInverse: "Birthplace of",
			},
			OA9: {
				title: "Died in",
				titleInverse: "Deathplace of",
			},
		},
		P107: {
			title: "has Member(s)",
			titleInverse: "Member of",
			groupTitle: "Members",
			groupTitleInverse: "Memberships",
		},
		P74: {
			title: "Residence",
		},
		OA7: {
			groupTitle: "Relationships",
			groupTitleInverse: "Relationships",
		},
		P53: {
			title: "Location",
		},
	},
	de: {
		person: {
			OA8: {
				title: "Geboren in",
				titleInverse: "Geburtort von",
			},
			OA9: {
				title: "Gestorben in",
				titleInverse: "Sterbeort von",
			},
		},
		P107: {
			title: "hat Mitglied(er)",
			titleInverse: "Mitglied bei",
			groupTitle: "Mitglieder",
			groupTitleInverse: "Mitgliedschaften",
		},
		P74: {
			title: "Residenz",
		},
		OA7: {
			groupTitle: "Beziehungen",
			groupTitleInverse: "Beziehungen",
		},
		OA8: {
			title: "Beginnt in",
		},
		P53: {
			title: "Ort",
		},
	},
};

async function writeCrmMessages(obj: object, locale: string) {
	const content = JSON.stringify(obj, null, "\t");

	const folderPath = join(process.cwd(), "messages", locale);
	await mkdir(folderPath, { recursive: true });
	await writeFile(join(folderPath, `crm.json`), content, {
		encoding: "utf-8",
	});
}
/**
 * Generates CRM messages for the specified locale.
 * @param locale - The locale for which to generate CRM messages. Defaults to `defaultLocale` if not provided.
 * @returns A Promise that resolves when the CRM messages have been generated.
 */
async function generate(locale = defaultLocale) {
	const result = v.safeParse(schema, process.env);

	if (!result.success) {
		const message = "Invalid environment variables";
		const error = new Error(message);
		delete error.stack;
		throw error;
	}

	const baseUrl = result.output.NUXT_PUBLIC_API_BASE_URL;

	const isDatabaseEnabled = result.output.NUXT_PUBLIC_DATABASE === "enabled";

	if (!isDatabaseEnabled) {
		await writeCrmMessages({}, locale);
		return false;
	}

	assert(baseUrl, "NUXT_PUBLIC_API_BASE_URL environment variable not provided.");

	log.info(`Generating crm messages for locale: "${locale}" from url: ${baseUrl} ...`);
	const apiClient = createApiClient<paths>({ baseUrl });

	const crmTypes = await apiClient.GET("/properties/");

	const obj: Record<string, Record<string, Translations> | Translations> =
		customDictionary[locale] ?? {};

	for (const [key, type] of Object.entries(crmTypes)) {
		if (!type.code) continue;

		const title = type.i18n[locale] ?? type.i18n[defaultLocale];
		const inverseTitle =
			//@ts-expect-error The type is not correct, its isn't a string
			type.i18nInverse[locale] ??
			//@ts-expect-error The type is not correct, its isn't a string
			type.i18nInverse[defaultLocale] ??
			title;

		const typeTranslations = obj[type.code] || {};
		if (!typeTranslations.title) typeTranslations.title = title;
		if (!typeTranslations.titleInverse) typeTranslations.titleInverse = inverseTitle;
		if (!typeTranslations.groupTitle) typeTranslations.groupTitle = typeTranslations.title ?? title;
		if (!typeTranslations.groupTitleInverse)
			typeTranslations.groupTitleInverse = typeTranslations.titleInverse ?? inverseTitle;

		obj[key] = typeTranslations;
	}

	await writeCrmMessages(obj, locale);

	return true;
}

for (const locale of locales) {
	generate(locale)
		.then((isGenerated) => {
			if (isGenerated) {
				log.success(`Successfully generated crm messages for ${locale}.`);
			} else {
				log.info("Skipped generating crm messages.");
			}
		})
		.catch((error) => {
			log.error(`Failed to generate crm messages for ${locale}.\n`, String(error));
			process.exitCode = 1;
		});
}
