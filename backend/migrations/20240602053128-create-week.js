"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("week", {
			day_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			week_name: {
				type: Sequelize.STRING,
			},
			course_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "course",
					key: "course_id",
				},
			},
			week_status_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "status",
					key: "status_id",
				},
			},
			week_image: {
				type: Sequelize.STRING,
			},
			week_deadline: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("week");
	},
};
