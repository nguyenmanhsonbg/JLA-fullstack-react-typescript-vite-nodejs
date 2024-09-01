"use strict";
module.exports = (sequelize, DataTypes) => {
	const Day = sequelize.define(
		"Day",
		{
			day_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			day_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			week_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "week",
					key: "week_id",
				},
			},
			day_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "status",
					key: "status_id",
				},
			},			
		},
		{
			tableName: "day",
			timestamps: false,
		},
	);

	return Day;
};
