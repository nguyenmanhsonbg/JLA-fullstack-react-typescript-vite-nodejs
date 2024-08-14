"use strict";
module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define(
    "Exam",
    {
      exam_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      exam_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      questions: {
        type: DataTypes.JSON,
        allowNull: false,
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
    },
    {
      tableName: "exam",
      timestamps: false,
    }
  );

  Exam.associate = function (models) {
    Exam.belongsToMany(models.Course, {
      through: "CourseExam",
      foreignKey: "exam_id",
      otherKey: "course_id",
    });
    Exam.belongsTo(models.Account, { foreignKey: "account_id" });
  };

  return Exam;
};
