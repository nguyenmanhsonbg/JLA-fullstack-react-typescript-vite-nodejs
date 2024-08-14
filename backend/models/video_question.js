"use strict";
module.exports = (sequelize, DataTypes) => {
	const VideoQuestion = sequelize.define(
		"VideoQuestion",

		{
			video_question_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			video_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "video",
					key: "video_id",
				},
			},
			question_content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			question_answer: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			video_question_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		},
		{
			tableName: "videoquestion",
			timestamps: false,
		},
	);

	return VideoQuestion;
};
