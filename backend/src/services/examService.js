const { Exam, Course, CourseExam } = require('../../models');
const { notfound,ok, error } = require('../handlers/response_handler');


  async function createExam(examData) {
    const exam = await Exam.create(examData);
    return exam;
}

  async function getAllExams() {
    const exams = await Exam.findAll();
    return exams;
  }

  async function getExamWithAnswerById(examId) {
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      throw new Error('Exam not found');
    }
    return exam;
}
  
async function getExamWithoutAnswerById(examId) {
  const exam = await Exam.findByPk(examId);
  if (!exam) {
    throw new Error('Exam not found');
  }
  
  const examData = exam.toJSON();

  // Remove correctOptionId from the questions
  if (examData.questions) {
    if (examData.questions.readingQuestions) {
      examData.questions.readingQuestions = examData.questions.readingQuestions.map(question => {
        question.subQuestions.forEach(subQuestion => delete subQuestion.correctOptionId);
        return question;
      });
    }
    if (examData.questions.listeningQuestions) {
      examData.questions.listeningQuestions = examData.questions.listeningQuestions.map(question => {
        question.subQuestions.forEach(subQuestion => delete subQuestion.correctOptionId);
        return question;
      });
    }
    if (examData.questions.multiChoiceQuestions) {
      examData.questions.multiChoiceQuestions = examData.questions.multiChoiceQuestions.map(question => {
        delete question.correctOptionId;
        return question;
      });
    }
  }

  return examData;
}


async function updateExam(examId, updatedData) {
  console.log("Updating exam for exam ID:", examId);
  console.log("Updated Data:", JSON.stringify(updatedData));

  // Find the exam by the correct exam_id key
  const exam = await Exam.findOne({
    where: { exam_id: examId },
  });

  if (!exam) {
    throw new Error('Exam not found');
  }

  // Update both exam_name and questions fields
  await exam.update({
    exam_name: updatedData.exam_data.exam_name,
    questions: updatedData.exam_data.questions,
  });
  
  return exam;
}

  async function deleteExam(examId) {
    try {
      const exam = await Exam.findByPk(examId);
		if (!exam) {
			return notfound(res, "Không tìm thấy bài kiểm tra!");
		}
    exam.exam_status_id = 3;
		await exam.save();
		return ok(res, "Xóa bài kiểm tra thành công");
    } catch (err) {
      return error(res);
    }
  }

  async function assignExamToCourse(examId, courseId) {
    const exam = await Exam.findByPk(examId);
    const course = await Course.findByPk(courseId);
    if (!exam || !course) {
      throw new Error('Exam or Course not found');
    }
    await CourseExam.create({ exam_id: examId, course_id: courseId });
    return { message: 'Exam assigned to course successfully' };
  }

  async function removeExamFromCourse(examId, courseId) {
    const courseExam = await CourseExam.findOne({
      where: {
        exam_id: examId,
        course_id: courseId,
      },
    });
    if (!courseExam) {
      throw new Error('Exam not assigned to the course');
    }
    await courseExam.destroy();
    return { message: 'Exam removed from course successfully' };
  }


module.exports = {
  createExam,
  getAllExams,
  getExamWithAnswerById,
  getExamWithoutAnswerById,
  updateExam,
  deleteExam,
  assignExamToCourse,
  removeExamFromCourse
}
