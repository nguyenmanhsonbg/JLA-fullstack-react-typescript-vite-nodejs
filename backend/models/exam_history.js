"use strict";
module.exports = (sequelize, DataTypes) => {
  const ExamHistory = sequelize.define(
    "ExamHistory",
    {
      exam_history_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Exam",
          key: "exam_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Account",
          key: "account_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "exam_history",
      timestamps: false,
    }
  );

  ExamHistory.associate = function (models) {
    ExamHistory.belongsTo(models.Exam, { foreignKey: "exam_id" });
    ExamHistory.belongsTo(models.Account, { foreignKey: "account_id" });
  };

  return ExamHistory;
};
