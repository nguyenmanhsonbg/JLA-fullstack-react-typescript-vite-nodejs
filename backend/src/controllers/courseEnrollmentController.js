// controllers/courseEnrollmentController.js
const courseEnrollmentService = require('../services/courseEnrollmentService');
const { createOneNoti } = require('../controllers/notification');
const { Course } = require('../../models'); 

const enroll = async (req, res) => {
  try {
    const { accountId, courseId } = req.body;
    const enrollment = await courseEnrollmentService.enrollUserInCourse(accountId, courseId);
    console.log("Fetch course:" + courseId);

    // Fetch the course name for the notification
 	  const course = await Course.findOne({
			where: {
				course_id: courseId,
			},
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create a notification object
    const notificationData = {
      title: `Đăng kí khóa học ${course.course_name} thành công`,
      content: `You have successfully enrolled in the course: ${course.course_name}`,
      is_read: false,
      action: 'enrolled',
      target_id: accountId,
      source_id: courseId, // Using courseId as source_id
      noti_date: new Date(),
      created_at: new Date(),
    };

    // Save the notification into the database
    const notification = await createOneNoti(notificationData);
    console.log(notification);
    res.status(200).json({
      enrollment
    });
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
