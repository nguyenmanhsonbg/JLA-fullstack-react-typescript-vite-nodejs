import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

const PracticeItem = ({ question, options, correctAnswer, onAnswerSelect, image }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      onAnswerSelect(answer === correctAnswer);
    }
  };

  return (
    <Card className="m-8">
      <CardContent className="p-8 bg-white rounded-lg shadow-md">
        <div className="flex">
          <div className="w-1/2 flex items-center justify-center">
            <div>
              <div className="text-2xl font-bold">{question}</div>
                {image !== undefined && (<img
                width={200}
                height={200}
                src={image}
                alt="Vocabulary"
                className="mb-4 mt-4 ml-8"
              />)}
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="text-lg mb-8 mt-4">Hãy chọn đáp án đúng:</div>
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => {
                const isCorrect = option === correctAnswer;
                const isSelected = option === selectedAnswer;
                let buttonClass = 'p-4 text-lg border rounded-md transition-all duration-300 flex items-center justify-center ';
                
                if (selectedAnswer !== null) {
                  if (isSelected && isCorrect) {
                    buttonClass += 'bg-green-500 text-white';
                  } else if (isSelected && !isCorrect) {
                    buttonClass += 'bg-red-500 text-white';
                  } else if (isCorrect) {
                    buttonClass += 'bg-green-500 text-white';
                  } else {
                    buttonClass += 'bg-white text-black';
                  }
                } else {
                  buttonClass += 'bg-white text-black hover:bg-gray-200';
                }

                // Apply fixed size
                buttonClass += ' w-32 h-20';

                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {isSelected && isCorrect && <FaCheckCircle className="mr-2" />}
                    {isSelected && !isCorrect && <FaTimesCircle className="mr-2" />}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeItem;
