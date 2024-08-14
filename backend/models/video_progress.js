"use strict";

module.exports = (sequelize, DataTypes) => {
  const VideoProgress = sequelize.define(
    "VideoProgress",
    {
      progress_id: {
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
      video_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "video",
          key: "video_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      watched: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "video_progress",
      timestamps: true,
    }
  );

  VideoProgress.associate = function (models) {
    VideoProgress.belongsTo(models.Account, {
      foreignKey: "account_id",
    });
    VideoProgress.belongsTo(models.Video, {
      foreignKey: "video_id",
    });
  };

  return VideoProgress;
};
