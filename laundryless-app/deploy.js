import simpleGit from 'simple-git';
import { exec } from 'child_process';

const git = simpleGit();

// Retrieve the commit message from command line arguments
const args = process.argv.slice(2);
let commitMessage = 'Automated commit';

// Parse --message flag
const messageIndex = args.indexOf('--message');
if (messageIndex !== -1 && args[messageIndex + 1]) {
  commitMessage = args[messageIndex + 1];
}

// Async function to perform deploy steps
async function deploy() {
  try {
    // Stage all changes
    await git.add('.');

    // Check if there are changes to commit
    const status = await git.status();
    if (status.staged.length === 0 && status.modified.length === 0) {
      console.log('No changes to commit.');
    } else {
      // Commit changes
      await git.commit(commitMessage);
      console.log(`Committed changes with message: "${commitMessage}"`);
    }

    // Push to main branch
    await git.push('origin', 'main');
    console.log('Pushed to origin main.');

    // Run the build command
    console.log('Building the project...');
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error(`Build error: ${error.message}`);
        process.exit(1);
      }
      if (stderr) {
        console.error(`Build stderr: ${stderr}`);
        // Not exiting; build might still succeed
      }
      console.log(`Build stdout: ${stdout}`);

      // Deploy to Firebase
      console.log('Deploying to Firebase...');
      exec('firebase deploy', (deployError, deployStdout, deployStderr) => {
        if (deployError) {
          console.error(`Deploy error: ${deployError.message}`);
          process.exit(1);
        }
        if (deployStderr) {
          console.error(`Deploy stderr: ${deployStderr}`);
          // Not exiting; deploy might still succeed
        }
        console.log(`Deploy stdout: ${deployStdout}`);
        console.log('Deployment complete!');
      });
    });
  } catch (err) {
    console.error(`Deployment failed: ${err.message}`);
    process.exit(1);
  }
}

deploy();