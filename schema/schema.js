/* eslint-disable object-curly-newline */
const graphql = require("graphql");
const { Hour } = require("../models");

// Not meant to be a final method. Should be deleted after implementing database.
const getTimeString = hour => {
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
  GraphQLList
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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hour: {
      type: HourType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const hour = Hour.findOne({ where: { id: args.id } });

        return addCalculatedFields(hour);
      }
    },
    hours: {
      type: new GraphQLList(HourType),
      async resolve(parent, args) {
        const hours = await Hour.findAll().then(dbHours => {
          dbHours.map(hour => {
            let modHour = addCalculatedFields(hour);
            modHour.committedAdorers = 0;
            return modHour;
          });

          return dbHours;
        });

        return hours;
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
      async resolve(parent, args) {
        let newHour = await Hour.create({
          day: args.day,
          time: args.time,
          location: args.location,
          requiredNumberOfAdorers: args.requiredNumberOfAdorers
        });

        // Going to have to update the schema after adding Users
        newHour.committedAdorers = 0;

        return addCalculatedFields(newHour);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
