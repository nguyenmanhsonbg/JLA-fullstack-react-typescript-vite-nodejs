"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Alphabet", {
			alphabet_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			type_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "alphabettype",
					key: "type_id",
				},
			},
			japanese_character: {
				type: Sequelize.STRING,
			},
			romaji_character: {
				type: Sequelize.STRING,
			},
			alphabet_audio: {
				type: Sequelize.STRING,
			},
			alphabet_image: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Alphabet");
	},
};
