const { gql } = require("apollo-server");

const typeDefs = gql`
  type Hour {
    id: ID
    time: Int
    timeString: String
    day: Int
    dayString: String
    location: String
    committedAdorers: Int
    requiredNumberOfAdorers: Int
    users: [User]
    createdAt: String
    updatedAt: String
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    hours: [Hour]
    createdAt: String
    updatedAt: String
  }

  type Query {
    hours(sortByDay: Boolean!): [Hour]
    users: [User]
  }
`;

module.exports = typeDefs;
