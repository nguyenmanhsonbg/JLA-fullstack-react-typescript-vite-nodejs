// controllers/vocabularyProgressController.js
const vocabularyProgressService = require('../services/vocabularyProgressService');
const { createOneNoti } = require('../controllers/notification');
const { Day, Week, Course } = require('../../models'); 

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

// const updateAllVocabularyProgress = async (req, res) => {
//   const { accountId, vocabularyIds , dayId} = req.body;
//   try {
//     const result = await vocabularyProgressService.updateAllVocabularyProgress(accountId, vocabularyIds);
//     return res.status(200).json(result);
//   } catch (error) {
//     console.error("Error in updateAllVocabularyProgress: ", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

const updateAllVocabularyProgress = async (req, res) => {
  const { accountId, vocabularyIds, dayId } = req.body;

  try {
    const result = await vocabularyProgressService.updateAllVocabularyProgress(accountId, vocabularyIds);

    // Fetch day, week, and course details for the notification title
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

    // Create a notification object
    const notificationData = {
      title: `Bạn đã hoàn thành phần từ vựng của ${day.day_name} - ${week.week_name} của khóa học ${course.course_name}`,
      content: `Từ vựng của ${day.day_name} của ${week.week_name} của khóa học ${course.course_name} đã hoàn thành.`,
      is_read: false,
      action: 'vocabulary_updated',
      target_id: accountId,
      source_id: dayId, // Using dayId as source_id
      noti_date: new Date(),
      created_at: new Date(),
    };

    // Save the notification into the database
    const notification = await createOneNoti(notificationData);
    console.log(notification);

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
