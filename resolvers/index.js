const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;
const { User, Hour } = require("../models");
const { GetAllHours, GetHoursFromParent } = require("./hourResolvers");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const resolvers = {
  Hour: {
    users: async (parent, args, { isAuth }) => {
      if (!isAuth) {
        throw new Error("Not Authenticated");
      }
      await parent.getUsers();
    },
  },
  User: {
    hours: async (parent, args, context, info) => {
      if (!context.isAuth) {
        throw new Error("Not Authenticated");
      }
      await GetHoursFromParent(parent, args, context, info);
    },
  },
  Query: {
    hours: async (parent, args, context, info) => {
      if (!context.isAuth) {
        throw new Error("Not Authenticated");
      }

      await GetAllHours(parent, args, context, info);
    },
    users: async (parent, args, { isAuth }) => {
      if (!isAuth) {
        throw new Error("Not Authenticated");
      }

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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Credentials are incorrect.");
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw new Error("Credentials are incorrect.");
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        config.jsonWebTokenKey,
        { expiresIn: "1h" }
      );

      return { userId: user.id, token, tokenExpiration: 1 };
    },
  },
  Mutation: {
    createUser: async (
      parent,
      { email, password, firstName, lastName, phoneNumber }
    ) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("User already exists.");
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      return await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
      });
    },
    addHour: async (_, { time, day, location, requiredNumberOfAdorers }) => {
      return await Hour.create({
        time,
        day,
        location,
        requiredNumberOfAdorers,
      });
    },
  },
};

module.exports = resolvers;
