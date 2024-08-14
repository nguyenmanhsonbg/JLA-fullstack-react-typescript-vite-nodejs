const { assignExamToCourse, removeExamFromCourse, getAllExamsByCourse, getAllCoursesByExam, getExamByCourseAndWeek } = require('../services/courseExamService');
const { ok, badRequest, notFound, error, responseWithData } = require('../handlers/response_handler');

class CourseExamController {
  async assignExamToCourse(req, res) {
    try {
      const { course_id, exam_id, week_id } = req.body;

      if (course_id == null || exam_id == null || week_id == null) {
        console.log("One or more required fields are null");
        return badRequest(res, "Course ID, Exam ID, and Week ID are required");
      }

      const courseExam = await assignExamToCourse({
        course_id,
        exam_id,
        week_id
      });

      return ok(res, courseExam);
    } catch (err) {
      return badRequest(res, err.message);
    }
  }

  async removeExamFromCourse(req, res) {
    try {
      const result = await removeExamFromCourse(req.params.courseId, req.params.examId);
      return ok(res, result);
    } catch (err) {
      return badRequest(res, err.message);
    }
  }

  async getAllExamsByCourse(req, res) {
    try {
      const exams = await getAllExamsByCourse(req.params.courseId);
      return ok(res, exams);
    } catch (err) {
      return notFound(res, err.message);
    }
  }

  async getAllCoursesByExam(req, res) {
    try {
      const courses = await getAllCoursesByExam(req.params.examId);
      return ok(res, courses);
    } catch (err) {
      return notFound(res, err.message);
    }
  }

  async getExamByCourseAndWeek(req, res) {
    try {
      const { courseId, weekId } = req.body;

      if (courseId == null || weekId == null) {
        console.log("One or more required fields are null");
        return badRequest(res, "Course ID and Week ID are required");
      }

      const exam = await getExamByCourseAndWeek(courseId, weekId);
   
      return ok(res, exam);
    } catch (err) {
      return responseWithData(res, 202, "Not have any exam");
    }
  }
}

module.exports = new CourseExamController();
