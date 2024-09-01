"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      course_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      course_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
          course_level: {
        type: DataTypes.ENUM('N1', 'N2', 'N3', 'N4', 'N5'),
        allowNull: false, 
      },
          course_skill: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      week: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      course_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "status",
          key: "status_id",
        },
      },
      course_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      note: {
        type: DataTypes.STRING,  
        allowNull: true,
      },
    },
    {
      tableName: "course",
      timestamps: false,
    }
  );

  Course.associate = function (models) {
    Course.hasMany(models.CourseEnrollment, {
      foreignKey: "course_id",
    });
    Course.belongsToMany(models.Exam, {
      through: "CourseExam",
      foreignKey: "course_id",
      otherKey: "exam_id",
    });
  };

  return Course;
};
