// controllers/grammarProgressController.js
const grammarProgressService = require('../services/grammarProgressService');

const updateGrammarProgress = async (req, res) => {
    const { accountId, grammarId } = req.body;

  try {
    const progress = await grammarProgressService.updateGrammarProgress(accountId, grammarId);
    return res.status(200).json(progress);
  } catch (error) {
    console.error("Error in updateGrammarProgress: ", error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserGrammarProgress = async (req, res) => {
  const { accountId } = req.params;
  try {
    const progress = await grammarProgressService.getUserGrammarProgress(accountId);
    return res.status(200).json(progress);
  } catch (error) {
    console.error("Error in getUserGrammarProgress: ", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateGrammarProgress,
  getUserGrammarProgress
};
