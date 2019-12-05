module.exports = (sequelize, DataTypes) => {
  const Hour = sequelize.define(
    "Hour",
    {
      time: DataTypes.INTEGER,
      day: DataTypes.INTEGER,
      location: DataTypes.STRING,
      requiredNumberOfAdorers: DataTypes.INTEGER
    },
    {}
  );

  return Hour;
};
