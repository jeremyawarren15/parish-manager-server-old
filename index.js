const express = require("express");
const auth = require("./middleware/auth");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];
const cors = require("cors");

const app = express();

app.use(cors());

const enableGraphiql = () => {
  if (env === "development") return true;
  if (config.show_graphiql) {
    const configVal = process.env[config.show_graphiql];
    return configVal === "true";
  }
  return false;
};

const server = new ApolloServer({
  playground: enableGraphiql(),
  introspection: enableGraphiql(),
  typeDefs,
  resolvers,
  context: ({ req }) => {
    var result = auth(req);
    if (result === false) {
      // if authentication failed just set isAuth to false
      return {
        isAuth: false,
      };
    }

    // if authentication succeeded then set isAuth and currentUser
    return {
      isAuth: true,
      currentUser: result.userId,
    };
  },
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
