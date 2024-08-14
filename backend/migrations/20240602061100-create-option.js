"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Option", {
			option_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			question_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Question",
					key: "question_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			option_content: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Option");
	},
};
