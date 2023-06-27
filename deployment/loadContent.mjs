import child_process from 'child_process';
import { argv } from 'node:process';
import fs from 'fs-extra'

const reposBasePath = 'temp';

const repo = process.env["CONTENT_REPO"] ?? 'Mocca101/oad-content-test';
const branch = process.env["CONTENT_BRANCH"] ?? 'main';
const configSourcePath = `${reposBasePath}/discoveryConfig.json`;
const configDestPath = `config/discoveryConfig.json`;

const contentSourcePath = `${reposBasePath}/content`;
const contentDestPath = `content`;

const publicSourcePath = `${reposBasePath}/public`;
const publicDestPath = `public`;

cloneRepo(reposBasePath, repo, branch);

if(fs.existsSync(reposBasePath)) {
  handleConfig();
  handleContent();
  handlePublic();

  fs.rmSync(reposBasePath, { recursive: true, force: true });
  console.log('Removed cloned repos');
}

/**
 * @param {string} targetpath
 * @param {string} repo following then format "user/repositoryName"
 * @param {string} branch
 */
function cloneRepo(targetpath, repo, branch) {
  // From https://cheatcode.co/tutorials/how-to-clone-and-sync-a-github-repo-via-node-js
  // child_process.execSync(`git clone ${getBranch(branch)} https://${username}:${process.env.PERSONAL_ACCESS_TOKEN}@github.com/${username}/${repo}.git ${targetpath}`);

  if(fs.existsSync(targetpath)) {
    fs.rmSync(reposBasePath, { recursive: true, force: true });
  }

  console.log(`Attempting to clone ${getBranch(branch)} on git@github.com:${repo}.git to ${targetpath}`);
  child_process.execSync(`git clone ${getBranch(branch)} git@github.com:${repo}.git ${targetpath}`);
  console.log('Clone successful');
}

/**
 *
 * @param {string} branch
 * @returns {string}
 */
function getBranch(branch) {
  return branch ? `-b ${branch}` : '';
}

function handleConfig() {
  if(fs.existsSync(configSourcePath)) {
    try {
      fs.copyFile(configSourcePath, configDestPath);
      console.log('Successfully set config from content repo!');
    } catch (err) {
      console.error(err)
    }
  }
}

function handleContent() {
  if(fs.existsSync(contentSourcePath)) {
    try {
      fs.copySync(contentSourcePath, contentDestPath, { overwrite: true })
      console.log('Successfully set content from content repo!')
    } catch (err) {
      console.error(err)
    }
  }
}

function handlePublic() {
  if(fs.existsSync(publicSourcePath)) {
    try {
      fs.copySync(publicSourcePath, publicDestPath, { overwrite: true })
      console.log('Successfully set public folder from content repo!')
    } catch (err) {
      console.error(err)
    }
  }
}
