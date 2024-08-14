// controllers/kanjiProgressController.js
const kanjiProgressService = require('../services/kanjiProgressService');

const updateKanjiProgress = async (req, res) => {
  const { accountId, kanjiId } = req.body;
  try {
    const progress = await kanjiProgressService.updateKanjiProgress(accountId, kanjiId);
    return res.status(200).json(progress);
  } catch (error) {
    console.error("Error in updateKanjiProgress: ", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateAllKanjiProgress = async (req, res) => {
  const { accountId, kanjiIds } = req.body;
  try {
    const result = await kanjiProgressService.updateAllKanjiProgress(accountId, kanjiIds);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in updateAllKanjiProgress: ", error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserKanjiProgress = async (req, res) => {
  const { accountId } = req.params;
  try {
    const progress = await kanjiProgressService.getUserKanjiProgress(accountId);
    return res.status(200).json(progress);
  } catch (error) {
    console.error("Error in getUserKanjiProgress: ", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateKanjiProgress,
  updateAllKanjiProgress,
  getUserKanjiProgress
};
