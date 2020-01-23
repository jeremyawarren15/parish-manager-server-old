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

module.exports = { addCalculatedFields, assignFieldsToHours };
