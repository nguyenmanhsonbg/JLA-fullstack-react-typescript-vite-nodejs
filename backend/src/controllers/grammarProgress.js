// controllers/grammarProgressController.js
const grammarProgressService = require('../services/grammarProgressService');
const { createOneNoti } = require('../controllers/notification');
const { Day, Week, Course } = require('../../models'); 

const updateGrammarProgress = async (req, res) => {
  const { accountId, grammarId, dayId } = req.body;

  try {
    const result = await grammarProgressService.updateGrammarProgress(accountId, grammarId);

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
      title: `Bạn đã hoàn thành một cấu trúc ngữ pháp của ${day.day_name} - ${week.week_name} của khóa học ${course.course_name}`,
      content: `Cấu trúc ngữ pháp của ${day.day_name} của tuần ${week.week_name} khóa học ${course.course_name} đã hoàn thành.`,
      is_read: false,
      action: 'grammar_updated',
      target_id: accountId,
      source_id: dayId,
      noti_date: new Date(),
      created_at: new Date(),
    };

    const notification = await createOneNoti(notificationData);
    console.log(notification);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in updateAllGrammarProgress: ", error);
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
