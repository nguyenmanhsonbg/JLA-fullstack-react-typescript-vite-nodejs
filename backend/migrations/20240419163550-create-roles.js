"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Role", {
			role_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
			role_name: { type: Sequelize.STRING, allowNull: false },
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Role");
	},
};
