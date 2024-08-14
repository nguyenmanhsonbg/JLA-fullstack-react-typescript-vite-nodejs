"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("GrammarExample", {
			grammar_example_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			grammar_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "grammar",
					key: "grammar_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			grammar_example: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			grammar_example_meaning: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			grammar_example_status_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("GrammarExample");
	},
};
