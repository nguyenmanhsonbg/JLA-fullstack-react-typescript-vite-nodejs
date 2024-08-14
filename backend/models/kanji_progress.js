"use strict";

module.exports = (sequelize, DataTypes) => {
  const KanjiProgress = sequelize.define(
    "KanjiProgress",
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
      kanji_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "kanji",
          key: "kanji_id",
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
      tableName: "kanji_progress",
      timestamps: true, // Enable timestamps to match migration
    }
  );

  KanjiProgress.associate = function (models) {
    KanjiProgress.belongsTo(models.Account, {
      foreignKey: "account_id",
    });
    KanjiProgress.belongsTo(models.Kanji, {
      foreignKey: "kanji_id",
    });
  };

  return KanjiProgress;
};
