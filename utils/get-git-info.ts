import { execSync } from "node:child_process";

import { log } from "@acdh-oeaw/lib";

export function getGitInfo() {
	try {
		const branchName = execSync("git rev-parse --abbrev-ref HEAD").toString().trimEnd();
		const commitHash = execSync("git rev-parse HEAD").toString().trimEnd();
		const tag = execSync("git describe --always --tags").toString().trimEnd();

		return {
			branchName,
			commitHash,
			tag,
		};
	} catch (error) {
		log.error("Failed to get git info, using fallback values.");

		return {
			branchName: "development",
			commitHash: "",
			tag: "",
		};
	}
}
