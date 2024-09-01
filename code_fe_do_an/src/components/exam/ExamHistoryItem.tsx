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
      <CardContent className="relative p-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 text-xl font-bold">{exam.examTitle}</div>
            <div className="mb-2 text-md">Ngày làm: {new Date(exam.createdTime).toLocaleString()}</div>
            <div className="mb-2 text-md">Điểm: {exam.score}%</div>
            <button
              className="p-2 mt-4 text-white transition-all duration-300 bg-blue-500 rounded-lg hover:bg-blue-700"
              onClick={() => onClickDetail(exam.examHistoryId)}
            >
              Xem chi tiết
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
