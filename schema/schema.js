/* eslint-disable object-curly-newline */
const graphql = require("graphql");
const { Hour, User } = require("../models");

// Not meant to be a final method. Should be deleted after implementing database.
const getTimeString = hour => {
  if (hour > 23 || hour < 0) return "Invalid time";
  if (hour === 0) return "12PM-1AM";
  if (hour === 12) return "12AM-1PM";
  const isAfternoon = hour > 10;
  const newHour = isAfternoon ? hour - 12 : hour;
  return `${newHour}-${newHour + 1}${isAfternoon ? "PM" : "AM"}`;
};

const getDayString = day => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Invalid";
  }
};

const addCalculatedFields = hour => {
  hour.dayString = getDayString(hour.day);
  hour.timeString = getTimeString(hour.time);
  return hour;
};

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean
} = graphql;

const HourType = new GraphQLObjectType({
  name: "Hour",
  fields: () => ({
    id: { type: GraphQLID },
    time: { type: GraphQLInt },
    timeString: { type: GraphQLString },
    day: { type: GraphQLInt },
    dayString: { type: GraphQLString },
    location: { type: GraphQLString },
    committedAdorers: { type: GraphQLInt },
    requiredNumberOfAdorers: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hour: {
      type: HourType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const hour = await Hour.findOne({ where: { id: args.id } });

        return addCalculatedFields(hour);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await User.findOne({ where: { id: args.id } });
      }
    },
    hours: {
      type: new GraphQLList(HourType),
      args: { sortByDay: { type: GraphQLBoolean } },
      async resolve(parent, { sortByDay }) {
        const hours = await Hour.findAll(
          sortByDay && {
            order: [
              ["day", "ASC"],
              ["time", "ASC"]
            ]
          }
        ).then(dbHours => {
          dbHours.map(hour => {
            let modHour = addCalculatedFields(hour);
            modHour.committedAdorers = 0;
            return modHour;
          });
          return dbHours;
        });
        return hours;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        return await User.findAll();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    create_hour: {
      type: HourType,
      args: {
        day: { type: GraphQLInt },
        time: { type: GraphQLInt },
        location: { type: GraphQLString },
        requiredNumberOfAdorers: { type: GraphQLInt }
      },
      async resolve(parent, { day, time, location, requiredNumberOfAdorers }) {
        let newHour = await Hour.create({
          day,
          time,
          location,
          requiredNumberOfAdorers
        });

        // Going to have to update the schema after adding Users
        newHour.committedAdorers = 0;

        return addCalculatedFields(newHour);
      }
    },
    create_user: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phoneNumber: { type: GraphQLString }
      },
      async resolve(parent, { firstName, lastName, email, phoneNumber }) {
        let newUser = await User.create({
          firstName,
          lastName,
          email,
          phoneNumber
        });

        return newUser;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
