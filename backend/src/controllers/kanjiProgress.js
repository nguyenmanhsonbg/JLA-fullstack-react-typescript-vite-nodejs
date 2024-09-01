// controllers/kanjiProgressController.js
const kanjiProgressService = require('../services/kanjiProgressService');
const { createOneNoti } = require('../controllers/notification');
const { Day, Week, Course } = require('../../models'); 

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

// const updateAllKanjiProgress = async (req, res) => {
//   const { accountId, kanjiIds } = req.body;
//   try {
//     const result = await kanjiProgressService.updateAllKanjiProgress(accountId, kanjiIds);
//     return res.status(200).json(result);
//   } catch (error) {
//     console.error("Error in updateAllKanjiProgress: ", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

const updateAllKanjiProgress = async (req, res) => {
  const { accountId, kanjiIds, dayId } = req.body;

  try {
    const result = await kanjiProgressService.updateAllKanjiProgress(accountId, kanjiIds);

    const day = await Day.findOne({
      where: { day_id: dayId },
      attributes: ['day_name', 'week_id'],
    });

    if (!day) {
      return res.status(404).json({ message: 'Day not found' });
    }

    const week = await Week.findOne({
      where: { week_id: day.week_id },
      attributes: ['week_name', 'course_id'],
    });

    if (!week) {
      return res.status(404).json({ message: 'Week not found' });
    }

    const course = await Course.findOne({
      where: { course_id: week.course_id },
      attributes: ['course_name'],
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const notificationData = {
      title: `Bạn đã hoàn thành phần Kanji của ${day.day_name} - ${week.week_name} của khóa học ${course.course_name}`,
      content: `Kanji của ${day.day_name} của tuần ${week.week_name} khóa học ${course.course_name} đã hoàn thành.`,
      is_read: false,
      action: 'kanji_updated',
      target_id: accountId,
      source_id: dayId,
      noti_date: new Date(),
      created_at: new Date(),
    };

    const notification = await createOneNoti(notificationData);
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
