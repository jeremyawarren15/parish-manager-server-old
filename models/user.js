"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING
      }
    },
    {}
  );

  User.associate = function(models) {
    User.belongsToMany(models.Hour, {
      through: "UserHours"
    });
  };

  return User;
};
