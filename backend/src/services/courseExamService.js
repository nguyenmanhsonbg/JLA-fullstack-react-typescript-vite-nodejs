const { CourseExam, Course, Exam, Week } = require('../../models');

async function assignExamToCourse({ course_id, exam_id, week_id }) {
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
    // Update the existing entry with the new exam_id
    existingCourseExam.exam_id = exam_id;
    await existingCourseExam.save();
    return existingCourseExam;
  }

  // Create a new CourseExam entry
  const courseExam = await CourseExam.create({
    course_id,
    exam_id,
    week_id
  });

  return courseExam;
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
  
  return courseExam.Exam;
}

module.exports = {
  assignExamToCourse,
  removeExamFromCourse,
  getAllExamsByCourse,
  getAllCoursesByExam,
  getExamByCourseAndWeek
};
