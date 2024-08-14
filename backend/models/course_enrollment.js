"use strict";

module.exports = (sequelize, DataTypes) => {
    const CourseEnrollment = sequelize.define(
        "CourseEnrollment",
        {
            enrollment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            account_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "account",
                    key: "account_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            course_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "course",
                    key: "course_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            enrollment_date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "course_enrollment",
            timestamps: false,
        }
    );

    CourseEnrollment.associate = function (models) {
        CourseEnrollment.belongsTo(models.Account, {
            foreignKey: "account_id",
        });
        CourseEnrollment.belongsTo(models.Course, {
            foreignKey: "course_id",
        });
    };

    return CourseEnrollment;
};
