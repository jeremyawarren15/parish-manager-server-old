# This code is no longer in active development

I have restarted this project several times and I got to a point where this solution wasn't working out for me, for various reasons. So I have decided to move the next iteration to a separate repo.

## Running for the First Time

In order to run the server for this project you will have to have the most recent version of [Node.js](https://nodejs.org/en/) installed.

After cloning the project you must open whatever command line application you want to use and enter `npm install`. Doing so will install all of the dependencies that are required for this project. Any dependencies that you need will be outlined in the package.json.

You should now be ready to move to the next step.

## Setting up the Database

We are using Postgres for this database. To run this locally you will need to install [Postgres](https://www.postgresql.org/download/). You will need to add a user in pgAdmin that match the details in the config file in `config/config.json`.

You can run the migrations by running the command `npm run build`. This will run the migrator using the sequelize cli. This is assigned to the build command because build is run every time there is a deployment to Heroku so it was a convenient time to also perform the database migrations.

There is no need to create a new data model manually. If you use the sequelize cli it will make the model and migration in one command. You can find more information about how to use that [here](https://sequelize.org/master/manual/migrations.html). Since I have installed the cli as a dev dependency there is no need to use npx sequelize-cli. You can access the cli by running `.\\node_modules\\.bin\\sequelize` instead of `npx sequelize-cli`. Using npx is kind of like a one-off use kind of thing. Other than that, there is no difference.

## Running the Development Server

In order to develop on the client, you have to keep an instance of this server running in the background while you are running the client server. Because we are using Nodemon for this project it is not usually necessary to stop then restart the server after making changes. Nodemon should recognize any changes and re-start itself after saving any changes. Nodemon is not used on the production server.

This project should be able to tell that it's not running in a production environment and adjust itself accordingly.

To run this server open your command line application and ender `npm run devstart`.

## Code Formatting

We will be using two different packages for automatic code formatting: ESLint and prettier. ESLint gives us some helpful code hints for formatting and logic. Prettier is used for forcing code styling. You will need to install the extensions in VSCode to be able to use the configuration properly. You shouldn't have to set anything up except you may want to enable `Editor: Format on Save` as a global setting in vscode which will trigger Prettier to auto-format your code. We will be using the Airbnb style guid for this project, but as we get going I'm sure that there will be some custom rules that will have to be enabled/disabled as we figure out more and more about this style guide.
