import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ExamHistoryDetail from './ExamHistoryDetail';

const ExamHistoryItem = ({ exam, onClickDetail }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const status = exam.score >= 80 ? 'Passed' : 'Failed';
  const statusColor = exam.score >= 80 ? 'bg-green-500' : 'bg-red-500';

  return (
    <Card className="m-8">
      <CardContent className="p-8 bg-white rounded-lg shadow-md relative">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-bold mb-2">{exam.examTitle}</div>
            <div className="text-md mb-2">Created Time: {new Date(exam.createdTime).toLocaleString()}</div>
            <div className="text-md mb-2">Score: {exam.score}%</div>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              onClick={() => onClickDetail(exam.examHistoryId)}
            >
              View Detailed
            </button>
          </div>
          <button onClick={handleToggleCollapse} className="text-2xl">
            {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
          </button>
        </div>
        <div
          className={`absolute top-0 right-0 p-2 text-white font-bold rounded-bl-lg ${statusColor}`}
        >
          {status}
        </div>
        {!isCollapsed && <ExamHistoryDetail exam={exam} />}
      </CardContent>
    </Card>
  );
};

export default ExamHistoryItem;
