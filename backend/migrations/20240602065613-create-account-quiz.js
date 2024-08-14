"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("accountquiz", {
			account_quiz_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			account_email: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "account",
					key: "account_id",
				},
			},
			quiz_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "quiz",
					key: "quiz_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			finish_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},

			quiz_point: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},

		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("accountquiz");
	},
};
