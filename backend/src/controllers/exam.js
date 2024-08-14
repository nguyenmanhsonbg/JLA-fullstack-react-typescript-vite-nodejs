const {createExam,
  getAllExams,
   getExamWithAnswerById,
  getExamWithoutAnswerById,
  updateExam,
  deleteExam,
  assignExamToCourse,
  removeExamFromCourse} = require('../services/examService');
const { ok, created, badRequest, notfound, error } = require('../handlers/response_handler');

class ExamController {
  async createExam(req, res) {
    try {
       const { account_id, exam_data } = req.body;
       const exam = await createExam(exam_data);
       return created(res, exam);
    } catch (err) {
      console.log(err);
      return badRequest(res, err.message);
    }
  }

  async getAllExams(req, res) {
    try {
      console.log("get all exam");
      const exams = await getAllExams();
      return ok(res, exams);
    } catch (err) {
      return error(res, err.message);
    }
  }

  async getExamWithAnswerById(req, res) {
    try {
      const { weekly_exam_id } = req.params;
      const exam = await getExamWithAnswerById(weekly_exam_id);
      if (!exam) {
        return notfound(res, 'Exam not found');
      }
      return ok(res, exam);
    } catch (err) {
      return notfound(res, err.message);
    }
  }

   async getExamWithoutAnswerById(req, res) {
    try {
      const { weekly_exam_id } = req.params;
      const exam = await getExamWithoutAnswerById(weekly_exam_id);
      if (!exam) {
        return notfound(res, 'Exam not found');
      }
      return ok(res, exam);
    } catch (err) {
      return notfound(res, err.message);
    }
  }


  async updateExam(req, res) {
    try {
      const exam = await examService.updateExam(req.params.examId, req.body);
      if (!exam) {
        return notfound(res, 'Exam not found');
      }
      return ok(res, exam);
    } catch (err) {
      return badRequest(res, err.message);
    }
  }

  async deleteExam(req, res) {
    try {
      const exam = await examService.deleteExam(req.params.examId);
      if (!exam) {
        return notfound(res, 'Exam not found');
      }
      return ok(res, 'Exam deleted successfully');
    } catch (err) {
      return badRequest(res, err.message);
    }
  }

  async assignExamToCourse(req, res) {
    try {
      const result = await examService.assignExamToCourse(req.params.examId, req.params.courseId);
      return ok(res, result);
    } catch (err) {
      return badRequest(res, err.message);
    }
  }

  async removeExamFromCourse(req, res) {
    try {
      const result = await examService.removeExamFromCourse(req.params.examId, req.params.courseId);
      return ok(res, result);
    } catch (err) {
      return badRequest(res, err.message);
    }
  }
  
}

module.exports = new ExamController();
