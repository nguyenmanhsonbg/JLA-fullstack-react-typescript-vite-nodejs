"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("course_exam", {
      course_exam_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Course",
          key: "course_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      exam_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Exam",
          key: "exam_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      week_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Week",
          key: "week_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.addConstraint("course_exam", {
      fields: ["course_exam_id", "course_id", "week_id"],
      type: "unique",
      name: "unique_course_exam"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("course_exam");
  },
};
