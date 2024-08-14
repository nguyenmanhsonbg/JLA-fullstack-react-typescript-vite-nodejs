"use strict";

const alphabet = require("../models/alphabet");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Alphabet",
			[
				{
					type_id: 1,
					japanese_character: "あ",
					romaji_character: "a",
					alphabet_audio: "D:/alphabet/hiragana/audio/a",
					alphabet_image: "D:/alphabet/hiragana/image/a",
				},
				{
					type_id: 1,
					japanese_character: "い",
					romaji_character: "i",
					alphabet_audio: "D:/alphabet/hiragana/audio/i",
					alphabet_image: "D:/alphabet/hiragana/image/i",
				},
				{
					type_id: 1,
					japanese_character: "う",
					romaji_character: "u",
					alphabet_audio: "D:/alphabet/hiragana/audio/u",
					alphabet_image: "D:/alphabet/hiragana/image/u",
				},
				{
					type_id: 1,
					japanese_character: "え",
					romaji_character: "e",
					alphabet_audio: "D:/alphabet/hiragana/audio/e",
					alphabet_image: "D:/alphabet/hiragana/image/e",
				},
				{
					type_id: 1,
					japanese_character: "お",
					romaji_character: "o",
					alphabet_audio: "D:/alphabet/hiragana/audio/o",
					alphabet_image: "D:/alphabet/hiragana/image/o",
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Alphabet", null, {});
	},
};
