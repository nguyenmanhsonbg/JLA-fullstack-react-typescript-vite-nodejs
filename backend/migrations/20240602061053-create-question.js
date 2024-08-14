"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Question", {
			question_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
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
			question_content: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			question_answer: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			question_type_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			question_status_id: {
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
		await queryInterface.dropTable("Question");
	},
};
