// node command to run this script:
// node deployment/generateStaticRelease.mjs

import childProcess from "child_process";
import fs from "fs";

const repoPaths = [
	"acdh-oeaw/OAD-Moving-Byzantium-Content",
	"acdh-oeaw/OpenAtlas-Discovery-Content",
];

const tempBackupPath = "temp_backup";

function backupContentAndConfig() {
	if (!fs.existsSync(tempBackupPath)) {
		console.log(`${tempBackupPath} folder does not exist, creating it`);
		childProcess.execSync(`mkdir ${tempBackupPath}`);
	} else {
		fs.readdirSync(tempBackupPath).forEach((f) =>
			fs.rmSync(`${tempBackupPath}/${f}`, { recursive: true }),
		);
	}

	if (fs.existsSync("config/discoveryConfig.json")) {
		fs.renameSync("config/discoveryConfig.json", `${tempBackupPath}/discoveryConfig.json`);
	}

	fs.renameSync("content", `${tempBackupPath}/content`);

	fs.renameSync("public", `${tempBackupPath}/public`);
}

function restoreContentAndConfig() {
	if (fs.existsSync(`${tempBackupPath}/discoveryConfig.json`)) {
		fs.renameSync(`${tempBackupPath}/discoveryConfig.json`, "config/discoveryConfig.json");
	}

	fs.renameSync(`${tempBackupPath}/content`, "content");

	fs.renameSync(`${tempBackupPath}/public`, "public");

	fs.rmSync(tempBackupPath, { recursive: true });
}

function clearContentAndConfig() {
	if (fs.existsSync("config/discoveryConfig.json")) {
		fs.rmSync("config/discoveryConfig.json");
	}
	if (fs.existsSync("content")) {
		fs.rmSync("content", { recursive: true });
	}
	if (fs.existsSync("public")) {
		fs.rmSync("public", { recursive: true });
	}
}

function createRelease(repoPath) {
	console.log(`Start Creating release from ${repoPath}`);

	clearContentAndConfig();

	childProcess.execSync(`node deployment/loadContent.mjs ${repoPath}`);

	// run npm run generate
	console.log("Running npm run generate");
	childProcess.execSync("npm run generate");
	console.log("npm run generate finished");

	if (!fs.existsSync("releases")) {
		fs.mkdirSync("releases");
	}
	const currentGitTagVersion = childProcess
		.execSync("git describe --tags --abbrev=0")
		.toString()
		.trim();

	if (!fs.existsSync(`releases/${currentGitTagVersion}`)) {
		fs.mkdirSync(`releases/${currentGitTagVersion}`);
	}

	console.log(`Moving output to releases/${currentGitTagVersion}/${repoPath.split("/")[1]}`);

	if (fs.existsSync(`releases/${currentGitTagVersion}/${repoPath.split("/")[1]}`)) {
		fs.rmSync(`releases/${currentGitTagVersion}/${repoPath.split("/")[1]}`, { recursive: true });
	}

	fs.renameSync(".output/public", `releases/${currentGitTagVersion}/${repoPath.split("/")[1]}`);
	console.log(`Finished Creating release from ${repoPath}`);
}

backupContentAndConfig();

repoPaths.forEach((repo) => {
	createRelease(repo);
});

clearContentAndConfig();
restoreContentAndConfig();
