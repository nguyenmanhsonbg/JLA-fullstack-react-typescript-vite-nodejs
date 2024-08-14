"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Grammar", {
			grammar_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			lesson_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "lesson",
					key: "lesson_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			grammar_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			grammar_structure: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			grammar_description: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			grammar_image: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			grammar_status_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Grammar");
	},
};
