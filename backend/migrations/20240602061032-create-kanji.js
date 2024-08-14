"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Kanji", {
			kanji_id: {
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
			kanji_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cv_spelling: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			kanji_kunyomi: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			kanji_onyomi: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			kanji_image: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			kanji_status_id: {
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
		await queryInterface.dropTable("Kanji");
	},
};
