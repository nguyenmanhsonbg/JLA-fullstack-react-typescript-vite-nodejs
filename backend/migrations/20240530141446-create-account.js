"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("account", {
			account_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			full_name: {
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
			},
			phone_number: {
				type: Sequelize.STRING,
			},
			dob: {
				type: Sequelize.DATE,
			},
			avatar: {
				type: Sequelize.STRING,
			},
			role_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "role",
					key: "role_id",
				},
			},
			point: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			status_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "status",
					key: "status_id",
				},
			},
			refresh_token: {
				type: Sequelize.TEXT, 
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("account");
	},
};
