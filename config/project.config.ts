import { log } from "@acdh-oeaw/lib";
import { ColorSpace, getLuminance, HSL, OKLCH, parse, sRGB, to as convert } from "colorjs.io/fn";
import { z } from "zod";

import projectConfig from "../project.config.json" assert { type: "json" };

ColorSpace.register(sRGB);
ColorSpace.register(HSL);
ColorSpace.register(OKLCH);

const schema = z.object({
	colors: z
		.object({
			brand: z.string().min(1),
			geojsonPoints: z.string().min(1),
			geojsonAreaCenterPoints: z.string().min(1),
			entityColors: z.object({
				place: z.string().min(1),
				source: z.string().min(1),
				person: z.string().min(1),
				group: z.string().min(1),
				move: z.string().min(1),
				event: z.string().min(1),
				activity: z.string().min(1),
				acquisition: z.string().min(1),
				feature: z.string().min(1),
				artifact: z.string().min(1),
				file: z.string().min(1),
				human_remains: z.string().min(1),
				stratigraphic_unit: z.string().min(1),
				type: z.string().min(1),
			}),
			entityDefaultColor: z.string().min(1),
			disabledNodeColor: z.string().min(1),
		})
		.transform((values) => {
			const color = parse(values.brand);
			const luminance = getLuminance(convert(color, OKLCH));
			const [h, s, l] = convert(color, HSL).coords;

			return {
				...values,
				brand: `hsl(${h}deg ${s}% ${l}%)`,
				brandContrast: luminance > 0.5 ? "hsl(0deg 0% 0%)" : "hsl(0deg 0% 100%)",
			};
		}),
	defaultLocale: z.enum(["de", "en"]),
	logos: z.object({
		light: z.string(),
		dark: z.string(),
		withTextLight: z.string(),
		withTextDark: z.string(),
	}),
	imprint: z.enum(["acdh-ch", "custom", "none"]),
	twitter: z.string().optional(),
});

const result = schema.safeParse(projectConfig);

if (!result.success) {
	const message = "Invalid project configuration.";
	log.error(message, result.error.flatten().fieldErrors);
	const error = new Error(message);
	delete error.stack;
	throw error;
}

export const project = result.data;
