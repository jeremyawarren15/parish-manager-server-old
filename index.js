/* eslint-disable no-console */
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");

const PORT = process.env.PORT || 4000;

const app = express();

// Test Database
const { sequelize } = require("./models/");

let test = "";

sequelize
  .authenticate()
  .then(() => {
    test = "success";
    console.log("Connection to database has been established.");
  })
  .error(error => {
    test = "failed";
    console.error("Unable to connect to the database:", error);
  });

// Configure Server
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.get("/", (req, res) => {
  res.send(test);
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
