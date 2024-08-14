"use strict";
module.exports = (sequelize, DataTypes) => {
	const VideoOption = sequelize.define(
		"VideoOption",
		{
			option_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			option_content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			video_question_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "videoquestion",
					key: "video_question_id",
				},
			},
			video_option_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
		},
		{
			tableName: "videooption",
			timestamps: false,
		},
	);

	return VideoOption;
};
