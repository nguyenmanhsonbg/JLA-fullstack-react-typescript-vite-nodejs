// services/videoProgressService.js
const { VideoProgress } = require('../../models');

const updateVideoProgress = async (accountId, videoId) => {
  try {
    let progress = await VideoProgress.findOne({
      where: { account_id: accountId, video_id: videoId }
    });
    if (progress) {
      progress.watched = true;
      await progress.save();
    } else {
      progress = await VideoProgress.create({
        account_id: accountId,
        video_id: videoId,
        watched: true
      });
    }
    return progress;
  } catch (error) {
    console.error("Error updating/creating video progress: ", error);
    throw error;
  }
};

const getUserVideoProgress = async (userId) => {
  try {
    const progress = await VideoProgress.findAll({
      where: { account_id: userId }
    });
    return progress;
  } catch (error) {
    console.error("Error fetching user video progress: ", error);
    throw error;
  }
};

module.exports = {
  updateVideoProgress,
  getUserVideoProgress
};
