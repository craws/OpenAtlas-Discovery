/* eslint-disable*/
//@ts-ignore

import fs from "fs";
import YAML from "yaml";
import { log } from "@acdh-oeaw/lib";

const jsonData = JSON.parse(fs.readFileSync("public/assets/icons/icons.json", "utf8"));
const template = fs.readFileSync("public/admin/config.yml", "utf8");

const snakeToCamel = (str: string) => {
	const converted = str.toLowerCase().replace(/([-_][a-z])/g, (group) => {
		return group.toUpperCase().replace("-", "").replace("_", "");
	});
	return converted[0]!.toUpperCase() + converted.slice(1);
};

// parse config into a YAML Document (preserves anchors)
const doc = YAML.parseDocument(template);

// build the list of icon names
const iconNames = Object.keys(jsonData).map((key) => {
	return snakeToCamel(key);
});

// create a node with an anchor
const iconNode = doc.createNode(iconNames);
iconNode.anchor = "icon_names";

// set into the document
doc.set("icon_names", iconNode);

try {
	// dump out to file
	fs.writeFileSync("public/admin/config.yml", String(doc));
	log.success("Successfully added icons to CMS config");
} catch (e) {
	log.error("Failed to add icons to CMS config", e);
}
