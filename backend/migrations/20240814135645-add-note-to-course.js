"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the 'note' column to the 'course' table
    await queryInterface.addColumn("course", "note", {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "Optional note or reason for the course status", // You can add a comment if needed
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the 'note' column from the 'course' table
    await queryInterface.removeColumn("course", "note");
  },
};
