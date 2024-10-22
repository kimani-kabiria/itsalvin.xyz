const { execSync } = require('child_process');
const fs = require('fs');

console.log('Updating version...');

// Function to get the version from package.json
function getVersionFromPackageJson() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  return packageJson.version;
}

// Try to get the last tag (the latest version bump), fallback to package.json if no tags exist
let lastTag;
try {
  lastTag = execSync('git describe --tags --abbrev=0').toString().trim();
  console.log(`Last version tag: ${lastTag}`);
} catch (error) {
  console.log('No tags found, using version from package.json.');
  lastTag = getVersionFromPackageJson();
  console.log(`Fallback version from package.json: ${lastTag}`);
}

// Get commit messages since the last tag
const commitsSinceLastTag = execSync(`git log ${lastTag}..HEAD --pretty=format:%s`).toString().trim().split('\n');

// Determine the type of version bump based on commit messages
let bumpType = null;

commitsSinceLastTag.forEach((commitMessage) => {
  if (commitMessage.includes('BREAKING CHANGE')) {
    bumpType = 'major'; // If there's a breaking change, bump to major
  } else if (/^feat(\(.+\))?:/.test(commitMessage)) {
    // If a feature is detected, set bumpType to minor if it's not already major
    bumpType = bumpType === null ? 'minor' : bumpType;
  } else if (/^fix(\(.+\))?:/.test(commitMessage)) {
    // If a fix is detected, set bumpType to patch if it's not already major or minor
    bumpType = bumpType === null ? 'patch' : bumpType;
  }
});

// If we didn't set bumpType, it means no relevant commit messages were found
if (!bumpType) {
  console.log('No version bump necessary based on commit messages.');
  return;
}

console.log(`Bumping version (${bumpType})...`);

// Run the release command to bump the version based on the commit analysis
if (bumpType === 'major') {
  execSync('pnpm release --major', { stdio: 'inherit' });
} else if (bumpType === 'minor') {
  execSync('pnpm release --minor', { stdio: 'inherit' });
} else if (bumpType === 'patch') {
  execSync('pnpm release --patch', { stdio: 'inherit' });
}

// Prepare the files to commit
const filesToCommit = ['package.json'];
if (fs.existsSync('CHANGELOG.md')) {
  filesToCommit.push('CHANGELOG.md');
}

// Check if there are changes to commit
const hasChanges = execSync('git diff --name-only').toString().trim();

if (hasChanges) {
  console.log('Committing changes...');
  execSync(`git add ${filesToCommit.join(' ')}`, { stdio: 'inherit' });
  execSync(`git commit -m "chore(release): bump version [skip ci]"`, { stdio: 'inherit' });
  execSync('git push --follow-tags origin dev', { stdio: 'inherit' });
} else {
  console.log('No changes to commit after version bump.');
}
