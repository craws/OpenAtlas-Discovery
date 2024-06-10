import { log } from "@acdh-oeaw/lib";
import fs from "fs";

import { defaultLocale, localesMap } from "@/config/i18n.config";

log.info("Generating prerender index");

const dir = "./.output/public/";

if (Object.keys(localesMap).length <= 1) {
	log.info("Single or no locales found, skipping reroute index generation");
}
if (Object.keys(localesMap).length > 1) {
	log.info("Multiple locales found, generating reroute index");
	const indexString = `<!DOCTYPE html>
	<html>
	<head>
		<meta http-equiv="refresh" content="0; url=/${defaultLocale}/">
	</head>
	</html>`;

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	fs.writeFileSync(dir + "/index.html", indexString);
	log.success("Reroute index generated");
}
