const { Hour } = require("../models");
const { assignFieldsToHours } = require("./hourResolverHelper");

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
