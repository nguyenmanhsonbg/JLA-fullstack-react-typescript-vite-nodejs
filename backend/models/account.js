"use strict";
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATE,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "role",
          key: "role_id",
        },
      },
      point: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: false,
        references: {
          model: "status",
          key: "status_id",
        },
      },
      refresh_token: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "account",
      timestamps: false,
    }
  );

  Account.associate = function (models) {
    Account.hasMany(models.CourseEnrollment, {
        foreignKey: "account_id",
    });
};



  return Account;
};
