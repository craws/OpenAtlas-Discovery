import child_process from 'child_process';
import fs from 'fs-extra';

const clonedContentPath = 'temp';

const repo = process.env.CONTENT_REPO ?? 'acdh-oeaw/OpenAtlas-Discovery-Content-Template';
const branch = process.env.CONTENT_BRANCH ?? 'main';
const configSourcePath = `${clonedContentPath}/discoveryConfig.json`;
const configDestPath = 'config/discoveryConfig.json';

const contentSourcePath = `${clonedContentPath}/content`;
const contentDestPath = 'content';

const publicSourcePath = `${clonedContentPath}/public`;
const publicDestPath = 'public';

cloneRepo(clonedContentPath, repo, branch);
// Log the commit hash of the content repo
console.log('Content repo commit hash: ', child_process.execSync(`git -C ${clonedContentPath} rev-parse HEAD`).toString().trim());

if (fs.existsSync(clonedContentPath)) {
  handleConfig();
  handleContent();
  handlePublic();

  fs.rmSync(clonedContentPath, { recursive: true, force: true });
  console.log('Removed cloned repos');
}

/**
 * @param {string} targetpath
 * @param {string} repo following then format "user/repositoryName"
 * @param {string} branch
 */
function cloneRepo (targetpath, repo, branch, useHttp = true) {
  // From https://cheatcode.co/tutorials/how-to-clone-and-sync-a-github-repo-via-node-js
  // child_process.execSync(`git clone ${getBranch(branch)} https://${username}:${process.env.PERSONAL_ACCESS_TOKEN}@github.com/${username}/${repo}.git ${targetpath}`);

  if (fs.existsSync(targetpath)) {
    fs.rmSync(clonedContentPath, { recursive: true, force: true });
  }

  if (useHttp) {
    console.log(`Attempting to clone ${getBranch(branch)} on https://github.com/${repo}.git to ${targetpath}`);
    child_process.execSync(`git clone ${getBranch(branch)} https://github.com/${repo}.git ${targetpath}`);
  } else {
    console.log(`Attempting to clone ${getBranch(branch)} on git@github.com:${repo}.git to ${targetpath}`);
    child_process.execSync(`git clone ${getBranch(branch)} git@github.com:${repo}.git ${targetpath}`);
  }
  console.log('Clone successful');
}

/**
 *
 * @param {string} branch
 * @returns {string}
 */
function getBranch (branch) {
  return branch ? `-b ${branch}` : '';
}

function handleConfig () {
  if (fs.existsSync(configSourcePath)) {
    try {
      fs.copyFile(configSourcePath, configDestPath);
      console.log('Successfully set config from content repo!');
    } catch (err) {
      console.error(err);
    }
  }
}

function handleContent () {
  if (fs.existsSync(contentSourcePath)) {
    try {
      fs.copySync(contentSourcePath, contentDestPath, { overwrite: true });
      console.log('Successfully set content from content repo!');
    } catch (err) {
      console.error(err);
    }
  }
}

function handlePublic () {
  if (fs.existsSync(publicSourcePath)) {
    try {
      fs.copySync(publicSourcePath, publicDestPath, { overwrite: true });
      console.log('Successfully set public folder from content repo!');
      console.log('Public folder contents: ', fs.readdirSync(publicDestPath));
    } catch (err) {
      console.error(err);
    }
  }
}
