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

module.exports = { getTimeString, getDayString };
