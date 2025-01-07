LaundryLess App
A brief description of your project, its purpose, and what it does.

Table of Contents
Introduction
Features
Installation
Usage
Configuration
Contributing
License
Contact
Introduction
---------


Features
List the main features of your project.

User Authentication: Secure sign-up and login functionality.

Progress Tracking: Visual charts to monitor task completion.
Responsive Design: Optimized for both desktop and mobile devices.
Installation
Provide step-by-step instructions on how to set up your project locally.

Clone the Repository:


git clone git@github.com:YoussefShabo/Laundrylockers.git
Navigate to the Project Directory:


npm install
For Python projects:

npm start
Or for Python:

Example:

Register an Account:

Navigate to https://laundrylessatx.web.app/ and create a new account.

Create a New Task:

Go to the "Dashboard" to see visual representations of your task completion rates.

Configuration
Detail any configuration settings or environment variables required for your project.

package.json have the deploy script, 

npm run deploy

runs the following commands 
1- git add .
2- git commit -m "automated commit"
3- git push origin main
4- npm run build
5- firebase deploy

in addition adding the flag --message allows you add a special message to the commit script

npm run deploy --message "Your custom commit message here"

Please ensure your contributions adhere to the project's coding standards and include appropriate tests.test

In case something wrong happend and you already sent the changes with 

***npm run deploy

Staging all changes...
Committing changes...
Committed changes with message: "Automated commit"
---------- Latest commit hash: 4744f209f27a234b488a5b71fb62ff340f68786e
Pushing to origin main...
Pushed to origin main.
Building the project...
Build succeeded.
Deploying to Firebase...
Deployment complete!

use the Hash for the commit and revert the changes you did 

*** git revert <Hash>

Commit the changes which sends a new deployment with the last working changes 