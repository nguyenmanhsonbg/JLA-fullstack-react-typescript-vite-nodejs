const { Exam, Course, CourseExam } = require('../../models');


  async function createExam(examData) {
    const exam = await Exam.create(examData);
    return exam;
}
  
async function progressExam(examId, accountId, userAnswers) {
  // Fetch the exam data including correct answers
  const exam = await Exam.findByPk(examId, {
    include: ['readingQuestions', 'listeningQuestions', 'multiChoiceQuestions']
  });

  if (!exam) {
    throw new Error('Exam not found');
  }

  let correctAnswersCount = 0;
  const totalQuestionsCount = Object.keys(userAnswers).length;

  // Calculate score and construct content with correct answers
  const content = {
    examTitle: exam.exam_name,
    examData: {
      readingQuestions: exam.readingQuestions.map(question => ({
        ...question.toJSON(),
        subQuestions: question.subQuestions.map(subQuestion => {
          const isCorrect = subQuestion.correctOptionId === userAnswers[subQuestion.id];
          if (isCorrect) correctAnswersCount++;
          return {
            ...subQuestion.toJSON(),
            userAnsweredId: userAnswers[subQuestion.id],
            correctOptionId: subQuestion.correctOptionId
          };
        })
      })),
      listeningQuestions: exam.listeningQuestions.map(question => ({
        ...question.toJSON(),
        subQuestions: question.subQuestions.map(subQuestion => {
          const isCorrect = subQuestion.correctOptionId === userAnswers[subQuestion.id];
          if (isCorrect) correctAnswersCount++;
          return {
            ...subQuestion.toJSON(),
            userAnsweredId: userAnswers[subQuestion.id],
            correctOptionId: subQuestion.correctOptionId
          };
        })
      })),
      multiChoiceQuestions: exam.multiChoiceQuestions.map(question => {
        const isCorrect = question.correctOptionId === userAnswers[question.id];
        if (isCorrect) correctAnswersCount++;
        return {
          ...question.toJSON(),
          userAnsweredId: userAnswers[question.id],
          correctOptionId: question.correctOptionId
        };
      })
    }
  };

  // Calculate score
  const score = (correctAnswersCount / totalQuestionsCount) * 100;

  // Create exam history
  const examHistoryData = {
    exam_id: examId,
    account_id: accountId,
    content: JSON.stringify(content),
    score: score
  };

  const examHistory = await createExamHistory(examHistoryData);

  return { content, score };
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
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      throw new Error('Exam not found');
    }
    await exam.update(updatedData);
    return exam;
  }

  async function deleteExam(examId) {
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      throw new Error('Exam not found');
    }
    await exam.destroy();
    return exam;
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
