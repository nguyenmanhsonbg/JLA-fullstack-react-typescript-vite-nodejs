// models/vocabulary_progress.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const VocabularyProgress = sequelize.define(
    "VocabularyProgress",
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
      vocabulary_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "vocabulary",
          key: "vocab_id",
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
      tableName: "vocabulary_progress",
      timestamps: true, // Enable timestamps to match migration
    }
  );

  VocabularyProgress.associate = function (models) {
    VocabularyProgress.belongsTo(models.Account, {
      foreignKey: "account_id",
    });
    VocabularyProgress.belongsTo(models.Vocabulary, {
      foreignKey: "vocabulary_id",
    });
  };

  return VocabularyProgress;
};
