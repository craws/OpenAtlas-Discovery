import { log } from "@acdh-oeaw/lib";
import { ColorSpace, getLuminance, HSL, OKLCH, parse, sRGB, to as convert } from "colorjs.io/fn";
import * as v from "valibot";

import projectConfig from "../project.config.json" assert { type: "json" };

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
	network: v.object({
		excludeSystemClasses: v.array(v.string()),
	}),
	defaultLocale: v.picklist(["de", "en"]),
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
		mapDisplayedSystemClasses: v.array(v.string()),
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
