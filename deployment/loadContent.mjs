import child_process from 'child_process';
import { argv } from 'node:process';
import fs from 'fs-extra'

const reposBasePath = 'temp';

const repo = argv[2] ?? 'Mocca101/oad-content-test';
const branch = argv[3] ?? 'main';
const configPath = `${reposBasePath}/discoveryConfig.json`;
const contentSourcePath = `${reposBasePath}/content`;
const contentDestPath = `content`;

cloneRepo(reposBasePath, repo, branch);

if(fs.existsSync(reposBasePath)) {
  handleConfig();
  handleContent();

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
  if(fs.existsSync(configPath)) {
    try {
      fs.copyFile(configPath, 'discoveryConfig.json');
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
