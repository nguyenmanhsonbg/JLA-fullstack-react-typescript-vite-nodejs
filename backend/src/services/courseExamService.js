const { Json } = require('sequelize/lib/utils');
const { CourseExam, Course, Exam, Week } = require('../../models');

async function assignExamToCourse({ course_id, exam_id, week_id }) {
  try {
    // Check if the course, week, and exam exist
    const course = await Course.findByPk(course_id);
    const week = await Week.findByPk(week_id);
    const exam = await Exam.findByPk(exam_id);

    if (!course || !week || !exam) {
      throw new Error('Course, Week, or Exam not found');
    }

    // Check if an entry already exists with the same course_id and week_id
    const existingCourseExam = await CourseExam.findOne({
      where: {
        course_id: course_id,
        week_id: week_id
      }
    });

    if (existingCourseExam) {
      // Update the existing entry only if the exam_id is different
      if (existingCourseExam.exam_id !== exam_id) {
        existingCourseExam.exam_id = exam_id;
        await existingCourseExam.save();
      }
      return existingCourseExam;
    }

    // Create a new CourseExam entry if none exists
    const courseExam = await CourseExam.create({
      course_id,
      exam_id,
      week_id
    });

    return courseExam;
  } catch (error) {
    console.error("Error assigning exam to course:", error);
    throw new Error("An error occurred while assigning the exam to the course.");
  }
}

  async function updateCourseExam({ course_id, exam_id, week_id }) {
  try {
    // Find the existing CourseExam entry by course_id and week_id
    const courseExam = await CourseExam.findOne({
      where: {
        course_id: course_id,
        week_id: week_id
      }
    });

    if (!courseExam) {
      throw new Error('CourseExam not found');
    }

    // Update the exam_id field
    courseExam.exam_id = exam_id;

    // Save the updated record
    await courseExam.save();

    return courseExam;
  } catch (error) {
    console.error("Error updating course exam:", error);
    throw new Error("An error occurred while updating the course exam.");
  }
}

async function removeExamFromCourse(courseId, examId) {
  const courseExam = await CourseExam.findOne({
    where: {
      course_id: courseId,
      exam_id: examId,
    },
  });
  
  if (!courseExam) {
    throw new Error('Exam not assigned to the course');
  }
  
  await courseExam.destroy();
  return { message: 'Exam removed from course successfully' };
}

async function getAllExamsByCourse(courseId) {
  const course = await Course.findByPk(courseId, {
    include: [
      {
        model: Exam,
        through: { attributes: [] },
      },
    ],
  });
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  return course.Exams;
}

async function getAllCoursesByExam(examId) {
  const exam = await Exam.findByPk(examId, {
    include: [
      {
        model: Course,
        through: { attributes: [] },
      },
    ],
  });
  
  if (!exam) {
    throw new Error('Exam not found');
  }
  
  return exam.Courses;
}

async function getExamByCourseAndWeek(course_id, week_id) {
  const courseExam = await CourseExam.findOne({
    where: {
      course_id: course_id,
      week_id: week_id
    },
    include: [
      {
        model: Exam,
      },
    ],
  });
  
  return courseExam ? courseExam.Exam : null;
}

module.exports = {
  assignExamToCourse,
  updateCourseExam,
  removeExamFromCourse,
  getAllExamsByCourse,
  getAllCoursesByExam,
  getExamByCourseAndWeek
};
