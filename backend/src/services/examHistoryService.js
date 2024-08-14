const { ExamHistory, Exam, Account } = require('../../models');

async function createExamHistory(examHistoryData) {
  const examHistory = await ExamHistory.create(examHistoryData);
  return examHistory;
}

async function getAllExamHistories() {
  const examHistories = await ExamHistory.findAll();
  return examHistories;
}

async function getAllExamHistoriesByExamIdAndAccountId(examId, accountId) {
  const examHistories = await ExamHistory.findAll({
    where: {
      exam_id: examId,
      account_id: accountId
    }
  });

  return examHistories.map(examHistory => {
    const content = JSON.parse(examHistory.content);
    return {
      examHistoryId: examHistory.exam_history_id,
      examId:examHistory.id,
      examTitle: content.examTitle,
      createdTime: examHistory.created_time,
      multiChoice: content.examData.multiChoiceQuestions.reduce((acc, question) => {
        acc.correct += question.userAnsweredId === question.correctOptionId ? 1 : 0;
        acc.total += 1;
        return acc;
      }, { correct: 0, total: 0 }),
      reading: content.examData.readingQuestions.reduce((acc, question) => {
        question.subQuestions.forEach(subQuestion => {
          acc.correct += subQuestion.userAnsweredId === subQuestion.correctOptionId ? 1 : 0;
          acc.total += 1;
        });
        return acc;
      }, { correct: 0, total: 0 }),
      listening: content.examData.listeningQuestions.reduce((acc, question) => {
        question.subQuestions.forEach(subQuestion => {
          acc.correct += subQuestion.userAnsweredId === subQuestion.correctOptionId ? 1 : 0;
          acc.total += 1;
        });
        return acc;
      }, { correct: 0, total: 0 }),
      score: examHistory.score
    };
  });
}


async function getExamHistoryById(examHistoryId) {
  const examHistory = await ExamHistory.findByPk(examHistoryId);
  if (!examHistory) {
    throw new Error('ExamHistory not found');
  }

  const examContent = JSON.parse(examHistory.content);
  
  const structuredContent = {
    examTitle: examContent.examTitle,
    examData: {
      readingQuestions: examContent.examData.readingQuestions.map(question => ({
        id: question.id,
        type: 'Reading',
        content: question.content,
        imageUrl: question.imageUrl,
        subQuestions: question.subQuestions.map(subQuestion => ({
          id: subQuestion.id,
          questionContent: subQuestion.questionContent,
          options: subQuestion.options,
          correctOptionId: subQuestion.correctOptionId,
          userAnsweredId: subQuestion.userAnsweredId
        }))
      })),
      listeningQuestions: examContent.examData.listeningQuestions.map(question => ({
        id: question.id,
        type: 'Listening',
        audioUrl: question.audioUrl,
        subQuestions: question.subQuestions.map(subQuestion => ({
          id: subQuestion.id,
          questionContent: subQuestion.questionContent,
          options: subQuestion.options,
          correctOptionId: subQuestion.correctOptionId,
          userAnsweredId: subQuestion.userAnsweredId
        }))
      })),
      multiChoiceQuestions: examContent.examData.multiChoiceQuestions.map(question => ({
        id: question.id,
        type: 'Multi-choice',
        content: question.content,
        options: question.options,
        correctOptionId: question.correctOptionId,
        userAnsweredId: question.userAnsweredId
      }))
    }
  };

  return {
    examHistoryId: examHistory.exam_history_id,
    examId: examHistory.exam_id,
    accountId: examHistory.account_id,
    content: structuredContent,
    score: examHistory.score,
    createdTime: examHistory.created_time
  };
}

async function updateExamHistory(examHistoryId, updatedData) {
  const examHistory = await ExamHistory.findByPk(examHistoryId);
  if (!examHistory) {
    throw new Error('ExamHistory not found');
  }
  await examHistory.update(updatedData);
  return examHistory;
}

async function deleteExamHistory(examHistoryId) {
  const examHistory = await ExamHistory.findByPk(examHistoryId);
  if (!examHistory) {
    throw new Error('ExamHistory not found');
  }
  await examHistory.destroy();
  return examHistory;
}

async function progressExam(examId, accountId, userAnswers) {
  // Fetch the exam data including correct answers
  const exam = await Exam.findByPk(examId);
  if (!exam) {
    throw new Error('Exam not found');
  }

  const questions = exam.questions;

  let correctAnswersCount = 0;
  const totalQuestionsCount = Object.keys(userAnswers).length;

  // Calculate score and construct content with correct answers
  const content = {
    examTitle: exam.exam_name,
    examData: {
      readingQuestions: questions.readingQuestions.map(question => ({
        ...question,
        subQuestions: question.subQuestions.map(subQuestion => {
          const isCorrect = subQuestion.correctOptionId === userAnswers[subQuestion.id];
          if (isCorrect) correctAnswersCount++;
          return {
            ...subQuestion,
            userAnsweredId: userAnswers[subQuestion.id],
            correctOptionId: subQuestion.correctOptionId
          };
        })
      })),
      listeningQuestions: questions.listeningQuestions.map(question => ({
        ...question,
        subQuestions: question.subQuestions.map(subQuestion => {
          const isCorrect = subQuestion.correctOptionId === userAnswers[subQuestion.id];
          if (isCorrect) correctAnswersCount++;
          return {
            ...subQuestion,
            userAnsweredId: userAnswers[subQuestion.id],
            correctOptionId: subQuestion.correctOptionId
          };
        })
      })),
      multiChoiceQuestions: questions.multiChoiceQuestions.map(question => {
        const isCorrect = question.correctOptionId === userAnswers[question.id];
        if (isCorrect) correctAnswersCount++;
        return {
          ...question,
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

  try {
    const examHistory = await createExamHistory(examHistoryData);
    return { content, score, examHistoryId: examHistory.exam_history_id };
  } catch (error) {
    throw new Error('Failed to create exam history: ' + error.message);
  }
}

// Example implementation of createExamHistory (ensure it creates the record with the specified ID)
async function createExamHistory(data) {
  const createdHistory = await ExamHistory.create(data); // Assuming you're using an ORM like Sequelize
  return createdHistory;
}


module.exports = {
  createExamHistory,
  getAllExamHistories,
  getExamHistoryById,
  updateExamHistory,
  deleteExamHistory,
  progressExam,
  getAllExamHistoriesByExamIdAndAccountId
};
