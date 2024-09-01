import React, { useState, useEffect } from 'react';
import VocabularyTestItem from './VocabularyTestItem';
import ReadingTestItem from './ReadingTestItem';
import ListeningTestItem from './ListeningTestItem';

const splitQuestions = (data) => {
  const readingQuestions = [];
  const listeningQuestions = [];
  const multiChoiceQuestions = [];

  if (data.readingQuestions) {
    data.readingQuestions.forEach(question => {
      readingQuestions.push(question);
    });
  }

  if (data.listeningQuestions) {
    data.listeningQuestions.forEach(question => {
      listeningQuestions.push(question);
    });
  }

  if (data.multiChoiceQuestions) {
    data.multiChoiceQuestions.forEach(question => {
      multiChoiceQuestions.push(question);
    });
  }

  return { readingQuestions, listeningQuestions, multiChoiceQuestions };
};

const ExamTaking = ({ examTitle, questions, mode, onSubmit, score }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const { readingQuestions, listeningQuestions, multiChoiceQuestions } = splitQuestions(questions);

  useEffect(() => {
    if (mode === 'reviewing') {
      handleReview();
    }
  }, [mode]);

  const handleReadingAnswerSelect = (questionId, optionId) => {
    if (mode !== 'view') {
      setSelectedAnswers(prevState => ({
        ...prevState,
        [questionId]: optionId
      }));
      setErrors(prevState => ({
        ...prevState,
        [questionId]: undefined
      }));
    }
  };

  const handleListeningAnswerSelect = (questionId, optionId) => {
    if (mode !== 'view') {
      setSelectedAnswers(prevState => ({
        ...prevState,
        [questionId]: optionId
      }));
      setErrors(prevState => ({
        ...prevState,
        [questionId]: undefined
      }));
    }
  };

  const handleVocabularyAnswerSelect = (questionId, optionId) => {
    if (mode !== 'view') {
      setSelectedAnswers(prevState => ({
        ...prevState,
        [questionId]: optionId
      }));
      setErrors(prevState => ({
        ...prevState,
        [questionId]: undefined
      }));
    }
  };

  const handleSubmit = () => {
    if (mode !== 'view') {
      const unansweredQuestions = {};
      const allQuestions = [
        ...multiChoiceQuestions.map(q => q.id),
        ...readingQuestions.flatMap(q => q.subQuestions.map(sq => sq.id)),
        ...listeningQuestions.flatMap(q => q.subQuestions.map(sq => sq.id))
      ];

      allQuestions.forEach(questionId => {
        if (selectedAnswers[questionId] === undefined) {
          unansweredQuestions[questionId] = true;
        }
      });

      if (Object.keys(unansweredQuestions).length > 0) {
        setErrors(unansweredQuestions);
        return;
      }

      onSubmit(selectedAnswers);
    }
  };

  const handleReview = () => {
    const allQuestions = [
      ...multiChoiceQuestions.map(q => q.id),
      ...readingQuestions.flatMap(q => q.subQuestions.map(sq => sq.id)),
      ...listeningQuestions.flatMap(q => q.subQuestions.map(sq => sq.id))
    ];

    let correctAnswersCount = 0;
    allQuestions.forEach(questionId => {
      const isCorrect = questions.multiChoiceQuestions.some(q => q.id === questionId && q.correctOptionId === selectedAnswers[questionId]) ||
        questions.readingQuestions.flatMap(q => q.subQuestions).some(sq => sq.id === questionId && sq.correctOptionId === selectedAnswers[questionId]) ||
        questions.listeningQuestions.flatMap(q => q.subQuestions).some(sq => sq.id === questionId && sq.correctOptionId === selectedAnswers[questionId]);

      if (isCorrect) correctAnswersCount++;
    });

    const totalQuestionsCount = allQuestions.length;
    const score = (correctAnswersCount / totalQuestionsCount) * 100;

    setResults({
      score,
      selectedAnswers
    });
  };

  return (
    <div className="bg-white rounded-lg p-8 w-full max-w-6xl max-h-full overflow-y-auto relative">
      <div className="header mb-8">
        <h1 className="text-4xl font-bold">{examTitle}</h1>
      </div>
      {results && (
        <div className="mb-8">
          {/* <h3 className="text-2xl font-semibold mb-4">Điểm: {score}%</h3> */}
        </div>
      )}
<div className="questions-container">
  <div className="multi-choice-section mb-8">
 
          {multiChoiceQuestions.map((question, index) => (
            <>
        <h3 className="text-2xl font-semibold mb-4">Câu hỏi nhiều lựa chọn</h3>
        <div key={question.id}>
        <p>{`Câu hỏi ${index + 1}`}</p> 
        <VocabularyTestItem
          question={question.content}
          options={question.options.map(opt => ({ id: opt.id, content: opt.content }))}
          correctAnswer={question.correctOptionId}
          onAnswerSelect={(optionId) => handleVocabularyAnswerSelect(question.id, optionId)}
          image={question.imageUrl || undefined}
          error={errors[question.id]}
          showResults={mode === 'reviewing'}
          userAnsweredId={question.userAnsweredId}
          mode={mode}
        />
      </div>
      </>
    ))}
  </div>
  <div className="reading-section mb-8">
        {readingQuestions.map((question, index) => (
        <>
        <h3 className="text-2xl font-semibold mb-4">Bài đọc</h3>
        <div key={question.id}>
        <p>{`Câu hỏi  ${index + 1}`}</p> {/* Display the question index */}
        <ReadingTestItem
          content={question.content}
          image={question.imageUrl}
          subQuestions={question.subQuestions}
          onAnswerSelect={handleReadingAnswerSelect}
          errors={errors}
          showResults={mode === 'reviewing' || mode === 'view'}
          selectedAnswers={selectedAnswers}
          mode={mode}
        />
        </div>
        </>
    ))}
  </div>
  <div className="listening-section mb-8">
        {listeningQuestions.map((question, index) => (
          <>
        <h3 className="text-2xl font-semibold mb-4">Bài nghe</h3>
        <div key={question.id}>
        <p>{`Câu hỏi  ${index + 1}`}</p> 
        <ListeningTestItem
          audioUrl={question.audioUrl}
          subQuestions={question.subQuestions}
          onAnswerSelect={handleListeningAnswerSelect}
          errors={errors}
          showResults={mode === 'reviewing' || mode === 'view'}
          selectedAnswers={selectedAnswers}
          mode={mode}
        />
        </div>
        </>
    ))}
  </div>
</div>

      {mode === 'doing' && (
        <button
          onClick={handleSubmit}
          className="mt-8 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          disabled={results !== null}
        >
          Nộp bài
        </button>
      )}
    </div>
  );
};

export default ExamTaking;
export { splitQuestions };
