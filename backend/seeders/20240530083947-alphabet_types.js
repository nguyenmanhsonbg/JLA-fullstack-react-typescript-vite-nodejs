"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"AlphabetType",
			[
				{
					type_name: "hiragana",
				},
				{
					type_name: "katakana",
				},
				{
					type_name: "number",
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("AlphabetType", null, {});
	},
};
