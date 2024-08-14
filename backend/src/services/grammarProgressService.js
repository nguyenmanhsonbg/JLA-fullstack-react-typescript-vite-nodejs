// services/grammarProgressService.js
const { GrammarProgress } = require('../../models');

const updateGrammarProgress = async (accountId, grammarId) => {
  try {
    let progress = await GrammarProgress.findOne({
      where: { account_id: accountId, grammar_id: grammarId }
    });
    if (progress) {
      progress.learned = true;
      await progress.save();
    } else {
      progress = await GrammarProgress.create({
        account_id: accountId,
        grammar_id: grammarId,
        learned: true
      });
    }
    return progress;
  } catch (error) {
    console.error("Error updating/creating grammar progress: ", error);
    throw error;
  }
};

const getUserGrammarProgress = async (userId) => {
  try {
    const progress = await GrammarProgress.findAll({
      where: { account_id: userId }
    });
    return progress;
  } catch (error) {
    console.error("Error fetching user grammar progress: ", error);
    throw error;
  }
};

module.exports = {
  updateGrammarProgress,
  getUserGrammarProgress
};
