import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ExamHistoryDetail = ({ exam }) => {
  const {
    examHistoryId,
    examTitle,
    createdTime,
    multiChoice,
    reading,
    listening,
    score
  } = exam;

  return (
    <Card className="m-8">
      <CardContent className="p-8 bg-white rounded-lg shadow-md">
        <div className="text-lg mb-2">Câu hỏi nhiều lựa chọn: {multiChoice.correct} / {multiChoice.total}</div>
        <div className="text-lg mb-2">Bài đọc: {reading.correct} / {reading.total}</div>
        <div className="text-lg mb-2">Bài nghe: {listening.correct} / {listening.total}</div>
      </CardContent>
    </Card>
  );
};
export default ExamHistoryDetail;
