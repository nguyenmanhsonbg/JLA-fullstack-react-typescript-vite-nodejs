"use strict";
module.exports = (sequelize, DataTypes) => {
	const Quiz = sequelize.define(
		"Quiz",
		{
			quiz_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			week_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "week",
					key: "week_id",
				},
			},
			quiz_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			quiz_type_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			quiz_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
			point: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			tableName: "quiz",
			timestamps: false,
		},
	);

	return Quiz;
};
