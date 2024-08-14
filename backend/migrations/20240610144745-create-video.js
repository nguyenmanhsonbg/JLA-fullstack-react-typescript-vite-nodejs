"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		
    await queryInterface.createTable("Video", {
			video_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			lesson_id: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: "lesson",
					key: "lesson_id",
				},
			},
			video_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			video_status_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
			video_link: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			video_question_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		});
	
  await queryInterface.createTable("VideoQuestion", {
			question_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			video_id: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: "video",
					key: "video_id",
				},
			},
			question_content: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			question_answer: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			
		});
    

	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Video");
    await queryInterface.dropTable("VideoQuestion");
	},
};
