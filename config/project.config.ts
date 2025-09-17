import { log } from "@acdh-oeaw/lib";
import { ColorSpace, getLuminance, HSL, OKLCH, parse, sRGB, to as convert } from "colorjs.io/fn";
import * as v from "valibot";

import projectConfig from "../project.config.json" with { type: "json" };

ColorSpace.register(sRGB);
ColorSpace.register(HSL);
ColorSpace.register(OKLCH);

const schema = v.object({
	colors: v.pipe(
		v.object({
			brand: v.pipe(v.string(), v.nonEmpty()),
			geojsonPoints: v.pipe(v.string(), v.nonEmpty()),
			geojsonAreaCenterPoints: v.pipe(v.string(), v.nonEmpty()),
			geojsonMovement: v.pipe(v.string(), v.nonEmpty()),
		}),
		v.transform((values) => {
			const color = parse(values.brand);
			const luminance = getLuminance(convert(color, OKLCH));
			const [h, s, l] = convert(color, HSL).coords;

			return {
				...values,
				brand: `hsl(${String(h)}deg ${String(s)}% ${String(l)}%)`,
				brandContrast: luminance > 0.5 ? "hsl(0deg 0% 0%)" : "hsl(0deg 0% 100%)",
			};
		}),
	),
	detailView: v.array(
		v.object({
			affectedSystemClasses: v.optional(v.array(v.string())),
			customOrdering: v.optional(v.array(v.string())),
			primarySystemClasses: v.optional(v.array(v.string())),
			furtherSystemClasses: v.optional(v.array(v.string())),
			excludeTypeIds: v.optional(
				v.array(
					v.pipe(
						v.string(),
						v.transform((input) => {
							return parseInt(input);
						}),
					),
				),
			),
		}),
	),
	network: v.object({
		excludeSystemClasses: v.array(v.string()),
	}),
	defaultLocale: v.picklist(["de", "en"]),
	footer: v.object({
		partner_logos: v.array(
			v.object({
				name: v.string(),
				url: v.string(),
				light: v.string(),
				dark: v.string(),
			}),
		),
	}),
	fullscreen: v.boolean(),
	imprint: v.picklist(["acdh-ch", "custom", "none"]),
	logos: v.object({
		light: v.string(),
		dark: v.string(),
		withTextLight: v.string(),
		withTextDark: v.string(),
	}),
	map: v.object({
		startPage: v.boolean(),
		flyToZoom: v.number(),
		mapDisplayedSystemClasses: v.array(v.string()),
		customIconConfig: v.array(
			v.object({
				entityType: v.number(),
				iconName: v.string(),
				color: v.optional(v.string()),
			}),
		),
		customMovementConfig: v.object({
			colorConfig: v.array(
				v.object({
					entityType: v.number(),
					color: v.string(),
				}),
			),
			arcThickness: v.boolean(),
		}),
	}),
	twitter: v.optional(v.string()),
});

const result = v.safeParse(schema, projectConfig);

if (!result.success) {
	const message = "Invalid project configuration.";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	log.error(message, v.flatten<any>(result.issues).nested);
	const error = new Error(message);
	delete error.stack;
	throw error;
}

export const project = result.output;
