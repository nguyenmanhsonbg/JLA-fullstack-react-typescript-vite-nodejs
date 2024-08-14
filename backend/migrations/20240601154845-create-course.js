"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("course", {
			course_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			course_name: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			week: {
				type: Sequelize.INTEGER,
			},
			course_status_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "status",
					key: "status_id",
				},
			},
			course_image: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("course");
	},
};
