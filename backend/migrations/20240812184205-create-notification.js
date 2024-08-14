'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Notification", {
			noti_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			content: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			is_read: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			action: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			target_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			source_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			noti_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Notification");
  }
};
