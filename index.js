const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const cors = require("cors");

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
