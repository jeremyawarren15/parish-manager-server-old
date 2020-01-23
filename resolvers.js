const { Hour, User } = require("./models");

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
  hour.committedAdorers = 0;
  return hour;
};

const resolvers = {
  Hour: {
    users: (parent, args, context, info) => parent.getUsers()
  },
  User: {
    hours: async (parent, args, context, info) => {
      const dbHours = await parent.getHours();
      const hours = dbHours.map(hour => {
        let modHour = addCalculatedFields(hour);
        modHour.committedAdorers = 0;
        return modHour;
      });
      return hours;
    }
  },
  Query: {
    hours: async (parent, args, context, info) => {
      const dbHours = await Hour.findAll(
        args.sortByDay && {
          order: [
            ["day", "ASC"],
            ["time", "ASC"]
          ]
        }
      );
      const hours = dbHours.map(hour => {
        let modHour = addCalculatedFields(hour);
        modHour.committedAdorers = 0;
        return modHour;
      });
      return hours;
    },
    users: () => User.findAll()
  }
};

module.exports = resolvers;
