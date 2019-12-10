/* eslint-disable no-console */
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");

const PORT = process.env.PORT || 4000;

const app = express();

// Configure Server
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
