const { User } = require("../models");
const { GetAllHours, GetHoursFromParent } = require("./hourResolvers");

const resolvers = {
  Hour: {
    users: (parent, args, context, info) => parent.getUsers()
  },
  User: {
    hours: async (parent, args, context, info) =>
      await GetHoursFromParent(parent, args, context, info)
  },
  Query: {
    hours: async (parent, args, context, info) =>
      await GetAllHours(parent, args, context, info),
    users: () => User.findAll()
  }
};

module.exports = resolvers;
