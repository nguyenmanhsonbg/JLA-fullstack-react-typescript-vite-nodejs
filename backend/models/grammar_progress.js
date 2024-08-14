"use strict";

module.exports = (sequelize, DataTypes) => {
  const GrammarProgress = sequelize.define(
    "GrammarProgress",
    {
      progress_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "account",
          key: "account_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      grammar_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "grammar",
          key: "grammar_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      learned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "grammar_progress",
      timestamps: true,
    }
  );

  GrammarProgress.associate = function (models) {
    GrammarProgress.belongsTo(models.Account, {
      foreignKey: "account_id",
    });
    GrammarProgress.belongsTo(models.Grammar, {
      foreignKey: "grammar_id",
    });
  };

  return GrammarProgress;
};
