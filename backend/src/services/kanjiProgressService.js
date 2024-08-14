const { KanjiProgress } = require('../../models');

const updateKanjiProgress = async (accountId, kanjiId) => {
  try {
    let progress = await KanjiProgress.findOne({
      where: { account_id: accountId, kanji_id: kanjiId }
    });
    if (progress) {
      progress.learned = true;
      await progress.save();
    } else {
      progress = await KanjiProgress.create({
        account_id: accountId,
        kanji_id: kanjiId,
        learned: true
      });
    }
    return progress;
  } catch (error) {
    console.error("Error updating/creating progress: ", error);
    throw error;
  }
};

const updateAllKanjiProgress = async (accountId, kanjiIds) => {
  try {
    for (const kanjiId of kanjiIds) {
      await updateKanjiProgress(accountId, kanjiId);
      }
  
    return { message: 'All kanji marked as complete' };
  } catch (error) {
    console.error("Error updating all progress: ", error);
    throw error;
  }
};

const getUserKanjiProgress = async (userId) => {
  try {
    const progress = await KanjiProgress.findAll({
      where: { account_id: userId }
    });
    return progress;
  } catch (error) {
    console.error("Error fetching user progress: ", error);
    throw error;
  }
};

module.exports = {
  updateKanjiProgress,
  updateAllKanjiProgress,
  getUserKanjiProgress
};
