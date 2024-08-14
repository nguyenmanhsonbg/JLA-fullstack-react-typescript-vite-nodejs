// controllers/vocabularyProgressController.js
const vocabularyProgressService = require('../services/vocabularyProgressService');

const updateVocabularyProgress = async (req, res) => {
  const { accountId, vocabularyId } = req.body;
  try {
    const progress = await vocabularyProgressService.updateVocabularyProgress(accountId, vocabularyId);
    return res.status(200).json(progress);
  } catch (error) {
    console.error("Error in updateVocabularyProgress: ", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateAllVocabularyProgress = async (req, res) => {
  const { accountId, vocabularyIds } = req.body;
  try {
    const result = await vocabularyProgressService.updateAllVocabularyProgress(accountId, vocabularyIds);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in updateAllVocabularyProgress: ", error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserVocabularyProgress = async (req, res) => {
  const { accountId } = req.params;
  try {

    const progress = await vocabularyProgressService.getUserVocabularyProgress(accountId);
    return res.status(200).json(progress);
  } catch (error) {
    console.error("Error in getUserVocabularyProgress: ", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateVocabularyProgress,
  updateAllVocabularyProgress,
  getUserVocabularyProgress
};
