// controllers/videoProgressController.js
const videoProgressService = require('../services/videoProgressService');

const updateVideoProgress = async (req, res) => {
  const { accountId, videoId } = req.body;
  try {
    const progress = await videoProgressService.updateVideoProgress(accountId, videoId);
    return res.status(200).json(progress);
  } catch (error) {
    console.error("Error in updateVideoProgress: ", error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserVideoProgress = async (req, res) => {
  const { accountId } = req.params;
  try {
    const progress = await videoProgressService.getUserVideoProgress(accountId);
    return res.status(200).json(progress);
  } catch (error) {
    console.error("Error in getUserVideoProgress: ", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateVideoProgress,
  getUserVideoProgress
};
