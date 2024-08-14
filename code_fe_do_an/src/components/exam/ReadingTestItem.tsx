import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ReadingTestItem = ({ content, image, subQuestions = [], onAnswerSelect, errors = {}, showResults, selectedAnswers = {}, mode }) => {
  const [selectedLocalAnswers, setSelectedLocalAnswers] = useState({});

  const handleAnswerClick = (questionId, optionId) => {
    setSelectedLocalAnswers(prevState => ({
      ...prevState,
      [questionId]: optionId
    }));
    onAnswerSelect(questionId, optionId);
  };

  const optionPrefixes = ['A', 'B', 'C', 'D'];

  return (
    <Card className="m-8">
      <CardContent className="p-8 bg-white rounded-lg shadow-md">
        <div>
          <div className="text-2xl mb-4 p-4 bg-gray-100 rounded-lg shadow-md whitespace-pre-wrap">
            {content}
          </div>
          {image && (
            <div className="flex justify-center mb-4">
              <img src={image} alt="Reading" className="max-w-full h-auto" />
            </div>
          )}
          {subQuestions.length > 0 ? (
            subQuestions.map((subQuestion, questionIndex) => {
              const isSelected = selectedLocalAnswers[subQuestion.id];
              const isCorrect = showResults && selectedAnswers[subQuestion.id] === subQuestion.correctOptionId;
              const isUserAnswered = showResults && subQuestion.id === selectedAnswers[subQuestion.id];

              return (
                <div key={subQuestion.id} className="mb-12">
                  <div className={`text-lg mb-4 ${showResults ? (isCorrect ? 'text-green-500' : 'text-red-500') : ''}`}>
                    {questionIndex + 1}. {subQuestion.questionContent}
                  </div>
                  <div className="flex flex-col gap-4">
                    {subQuestion.options.map((option, optionIndex) => {
                      const isSelected = selectedLocalAnswers[subQuestion.id] === option.id;
                      const buttonClass = `p-4 text-lg border rounded-md transition-all duration-300 flex items-center ${
                        showResults && option.id === subQuestion.correctOptionId ? 'bg-green-500 text-white' :
                        showResults && option.id === subQuestion.userAnsweredId ? 'bg-red-500 text-white' :
                        isSelected ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-gray-200'
                      }`;

                      return (
                        <button
                          key={option.id}
                          className={buttonClass}
                          onClick={() => handleAnswerClick(subQuestion.id, option.id)}
                          disabled={mode === 'reviewing'}
                        >
                          <span className="mr-2">{optionPrefixes[optionIndex]}.</span>
                          <span>{option.content}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors[subQuestion.id] && <div className="text-red-500 mt-2">Hãy chọn đáp án.</div>}
                  {showResults && selectedAnswers[subQuestion.id] !== subQuestion.correctOptionId && (
                    <div className="text-green-500 mt-2">Đáp án đúng: {subQuestion.options.find(option => option.id === subQuestion.correctOptionId).content}</div>
                  )}
                </div>
              );
            })
          ) : (
            <div>Không có lựa chọn nào.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingTestItem;
