"use strict";
module.exports = (sequelize, DataTypes) => {
	const Week = sequelize.define(
		"Week",
		{
			week_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			week_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			course_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "course",
					key: "course_id",
				},
			},
			week_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},
			week_topic: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "week",
			timestamps: false,
		},
	);

	return Week;
};
