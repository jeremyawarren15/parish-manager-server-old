## Running for the First Time

In order to run the server for this project you will have to have the most recent version of [Node.js](https://nodejs.org/en/) installed.

After cloning the project you must open whatever command line application you want to use and enter `npm install`. Doing so will install all of the dependencies that are required for this project. Any dependencies that you need will be outlined in the package.json.

You should now be ready to move to the next step.

## Setting up the Database

The Postgres database has not been set up. Details are coming soon.

## Running the Development Server

In order to develop on the client, you have to keep an instance of this server running in the background while you are running the client server. Because we are using Nodemon for this project it is not usually necessary to stop then restart the server after making changes. Nodemon should recognize any changes and re-start itself after saving any changes. Nodemon is not used on the production server.

This project should be able to tell that it's not running in a production environment and adjust itself accordingly.

To run this server open your command line application and ender `npm run devstart`.

## Code Formatting

We will be using two different packages for automatic code formatting: ESLint and prettier. ESLint gives us some helpful code hints for formatting and logic. Prettier is used for forcing code styling. You will need to install the extensions in VSCode to be able to use the configuration properly. You shouldn't have to set anything up except you may want to enable `Editor: Format on Save` as a global setting in vscode which will trigger Prettier to auto-format your code. We will be using the Airbnb style guid for this project, but as we get going I'm sure that there will be some custom rules that will have to be enabled/disabled as we figure out more and more about this style guide.
