import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const VocabularyTestItem = ({ question, options = [], correctAnswer, onAnswerSelect, image, error, showResults, userAnsweredId, mode }) => {
  const [selectedLocalAnswer, setSelectedLocalAnswer] = useState(null);

  const handleAnswerClick = (optionId) => {
    setSelectedLocalAnswer(optionId);
    onAnswerSelect(optionId);
  };

  const optionPrefixes = ['A', 'B', 'C', 'D'];

  return (
    <Card className="m-8">
      <CardContent className="p-8 bg-white rounded-lg shadow-md">
        <div>
          <div className="text-2xl font-bold mb-4">{question}</div>
          {image && (
            <div className="flex justify-center mb-4">
              <img src={image} alt="Vocabulary" className="max-w-full h-auto" />
            </div>
          )}
          {error && <div className="text-red-500 mb-4">Hãy chọn đáp án</div>}
          <div className="text-lg mb-4">Lựa chọn đáp án đúng:</div>
          <div className="flex flex-col gap-2">
            {options.length > 0 ? (
              options.map((option, optionIndex) => {
                const isSelected = selectedLocalAnswer === option.id;
                const isCorrect = showResults && option.id === correctAnswer;
                const isUserAnswered = showResults && option.id === userAnsweredId;
                const buttonClass = `p-4 text-lg border rounded-md transition-all duration-300 flex items-center ${
                  isCorrect ? 'bg-green-500 text-white' :
                  isUserAnswered ? 'bg-red-500 text-white' :
                  isSelected ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-gray-200'
                }`;

                return (
                  <button
                    key={option.id}
                    className={buttonClass}
                    onClick={() => handleAnswerClick(option.id)}
                    disabled={mode === 'reviewing'}
                  >
                    <span className="mr-2">{optionPrefixes[optionIndex]}.</span>
                    <span>{option.content}</span>
                  </button>
                );
              })
            ) : (
              <div>Không có lựa chọn nào</div>
            )}
          </div>
          {showResults && userAnsweredId !== correctAnswer && (
            <div className="text-green-500 mt-2">
              Đáp án đúng: {options.find(option => option.id === correctAnswer).content}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VocabularyTestItem;
