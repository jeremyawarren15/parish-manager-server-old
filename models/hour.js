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

  Hour.associate = function(models) {
    Hour.belongsToMany(models.User, {
      through: "UserHours"
    });
  };

  return Hour;
};
