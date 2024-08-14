"use strict";
module.exports = (sequelize, DataTypes) => {
  const PasswordResetToken = sequelize.define(
    "PasswordResetToken",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Account",  // Assumes the Account model/table is named 'Account'
          key: "account_id",
        },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "password_reset_tokens",
      timestamps: true, 
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  );

  PasswordResetToken.associate = function (models) {
    PasswordResetToken.belongsTo(models.Account, {
      foreignKey: "account_id",
      as: "account",
    });
  };

  return PasswordResetToken;
};
