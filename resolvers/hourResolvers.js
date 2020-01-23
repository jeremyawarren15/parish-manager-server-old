const { Hour } = require("../models");
const { getDayString, getTimeString } = require("../dateTimeHelpers");

const addCalculatedFields = hour => {
  hour.dayString = getDayString(hour.day);
  hour.timeString = getTimeString(hour.time);
  hour.committedAdorers = 0;
  return hour;
};

const assignFieldsToHours = dbHours => {
  const hours = dbHours.map(hour => {
    let modHour = addCalculatedFields(hour);
    modHour.committedAdorers = 0;
    return modHour;
  });

  return hours;
};

const GetAllHours = async (parent, args, context, info) => {
  const sorter = () => {
    if (args.sortByDay)
      return {
        order: [
          ["day", "ASC"],
          ["time", "ASC"]
        ]
      };
  };

  const dbHours = await Hour.findAll(sorter());

  const hours = assignFieldsToHours(dbHours);

  return hours;
};

const GetHoursFromParent = async (parent, args, context, info) => {
  const dbHours = await parent.getHours();
  const hours = assignFieldsToHours(dbHours);

  return hours;
};

module.exports = { GetAllHours, GetHoursFromParent };
