// controllers/courseEnrollmentController.js
const courseEnrollmentService = require('../services/courseEnrollmentService');

const enroll = async (req, res) => {

  try {
    const { accountId, courseId } = req.body;
    const enrollment = await courseEnrollmentService.enrollUserInCourse(accountId, courseId);
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserEnrollments = async (req, res) => {
  try {
    const { accountId } = req.params;
    const enrollments = await courseEnrollmentService.getUserEnrollments(accountId);
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkEnrollment = async (req, res) => {
  try {
      const { accountId, courseId } = req.body;
      const isEnrolled = await courseEnrollmentService.checkEnrollment(accountId, courseId);
      res.status(200).json({ isEnrolled });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


module.exports = {
  enroll,
  getUserEnrollments,
  checkEnrollment
};
