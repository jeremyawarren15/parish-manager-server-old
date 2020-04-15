const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, Hour } = require("../models");
const { GetAllHours, GetHoursFromParent } = require("./hourResolvers");

const resolvers = {
  Hour: {
    users: async (parent) => await parent.getUsers(),
  },
  User: {
    hours: async (parent, args, context, info) =>
      await GetHoursFromParent(parent, args, context, info),
  },
  Query: {
    hours: async (parent, args, context, info) =>
      await GetAllHours(parent, args, context, info),
    users: async (parent, args) => {
      const cursor = args.cursor || 0;
      return await User.findAll({
        limit: 10,
        where: {
          id: {
            [Op.gt]: cursor,
          },
        },
      });
    },
    userAggregates: async () => {
      return {
        totalCount: await User.count(),
      };
    },
  },
  Mutation: {
    addUser: (_, { firstName, lastName, email, phoneNumber }) => {
      return User.create({ firstName, lastName, email, phoneNumber });
    },
    addHour: (_, { time, day, location, requiredNumberOfAdorers }) => {
      return Hour.create({ time, day, location, requiredNumberOfAdorers });
    },
  },
};

module.exports = resolvers;
