"use strict";
module.exports = (sequelize, DataTypes) => {
	const Status = sequelize.define(
		"Status",
		{
			status_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			status_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "status",
			timestamps: false,
		},
	);
	return Status;
};
