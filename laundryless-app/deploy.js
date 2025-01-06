import simpleGit from 'simple-git';
import { exec } from 'child_process';

const git = simpleGit();

// Retrieve the commit message from environment variables
const commitMessage = process.env.npm_config_message || 'Automated commit';

// Function to execute shell commands and return a Promise
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
        return;
      }
      resolve(stdout);
    });

    // Pipe the stdout and stderr to the parent process
    process.stdout.pipe(process.stdout);
    process.stderr.pipe(process.stderr);
  });
}

// Async function to perform deploy steps
async function deploy() {
  let lastCommitHash = null;
  try {
    console.log('Staging all changes...');
    await git.add('.');

    console.log('Committing changes...');
    const commitResult = await git.commit(commitMessage);
    console.log(`Committed changes with message: "${commitMessage}"`);

    // Get the latest commit hash
    const log = await git.log({ n: 1 });
    lastCommitHash = log.latest.hash;
    console.log(`Latest commit hash: ${lastCommitHash}`);

    console.log('Pushing to origin main...');
    await git.push('origin', 'main');
    console.log('Pushed to origin main.');

    console.log('Building the project...');
    await executeCommand('npm run build');
    console.log('Build succeeded.');

    console.log('Deploying to Firebase...');
    await executeCommand('firebase deploy');
    console.log('Deployment complete!');
  } catch (deployError) {
    console.error(`Deployment failed: ${deployError.error ? deployError.error.message : deployError}`);

    if (lastCommitHash) {
      try {
        console.log('Reverting the last commit...');
        // Revert the last commit without editing the commit message
        await git.revert(lastCommitHash, { '--no-edit': null });
        console.log('Reverted the last commit.');

        console.log('Pushing the revert to origin main...');
        await git.push('origin', 'main');
        console.log('Reverted commit pushed to origin main.');
      } catch (revertError) {
        console.error(`Failed to revert the last commit: ${revertError}`);
        console.error('Manual intervention required to fix the repository state.');
      }
    }

    process.exit(1);
  }
}

deploy();