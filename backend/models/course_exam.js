"use strict";
module.exports = (sequelize, DataTypes) => {
  const CourseExam = sequelize.define(
    "CourseExam",
    {
      course_exam_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Course",
          key: "course_id",
        },
      },
      exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Exam",
          key: "exam_id",
        },
      },
      week_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Week",
          key: "week_id",
        },
      },
    },
    {
      tableName: "course_exam",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["course_exam_id", "course_id", "week_id"]
        }
      ]
    }
  );

  CourseExam.associate = function (models) {
    CourseExam.belongsTo(models.Course, { foreignKey: "course_id" });
    CourseExam.belongsTo(models.Exam, { foreignKey: "exam_id" });
    CourseExam.belongsTo(models.Week, { foreignKey: "week_id" });
  };

  return CourseExam;
};
