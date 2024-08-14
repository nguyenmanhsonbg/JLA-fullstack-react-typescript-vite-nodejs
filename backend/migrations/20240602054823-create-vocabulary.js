"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Vocabulary", {
			vocab_id: {
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
			vocab_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			vocab_kanji: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			vocab_meaning: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			vocab_example: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			vocab_image: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			vocab_status_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			vocab_audio: {
				type: Sequelize.STRING,
				allowNull: true,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Vocabulary");
	},
};
