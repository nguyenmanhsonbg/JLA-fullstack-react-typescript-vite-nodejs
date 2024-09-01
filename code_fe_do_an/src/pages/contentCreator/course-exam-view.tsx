import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ExamTaking from '../../components/exam/ExamTaking';
import { Card, Typography, Layout, Row, Col } from 'antd';

const { Title, Text } = Typography;
const { Content } = Layout;

const ViewExam: React.FC = () => {
  const params = useParams();
  const { exam_id } = params;
  const [examData, setExamData] = useState(null);
  const navigate = useNavigate();

  const transformFetchedData = (data) => {
    return {
      examTitle: data.exam_name,
      examData: {
        readingQuestions: data.questions.readingQuestions ? data.questions.readingQuestions.map(question => ({
          id: question.id,
          type: question.type,
          content: question.content,
          imageUrl: question.imageUrl,
          subQuestions: question.subQuestions ? question.subQuestions.map(subQuestion => ({
            id: subQuestion.id,
            questionContent: subQuestion.questionContent,
            options: subQuestion.options,
            imageUrl: subQuestion.imageUrl,
            userAnsweredId: subQuestion.userAnsweredId || null,
            correctOptionId: subQuestion.correctOptionId,
          })) : [],
        })) : [],
        listeningQuestions: data.questions.listeningQuestions ? data.questions.listeningQuestions.map(question => ({
          id: question.id,
          type: question.type,
          audioUrl: question.audioUrl,
          subQuestions: question.subQuestions ? question.subQuestions.map(subQuestion => ({
            id: subQuestion.id,
            questionContent: subQuestion.questionContent,
            options: subQuestion.options,
            imageUrl: subQuestion.imageUrl,
            userAnsweredId: subQuestion.userAnsweredId || null,
            correctOptionId: subQuestion.correctOptionId,
          })) : [],
        })) : [],
        multiChoiceQuestions: data.questions.multiChoiceQuestions ? data.questions.multiChoiceQuestions.map(question => ({
          id: question.id,
          type: question.type,
          content: question.content,
          options: question.options,
          imageUrl: question.imageUrl,
          userAnsweredId: question.userAnsweredId || null,
          correctOptionId: question.correctOptionId,
        })) : [],
      }
    };
  };

  useEffect(() => {
    const fetchExamDetails = async (exam_id: any) => {
      try {
        let token = "";
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
        }

        const url = `/get-exam-with-answers/${exam_id}`;
        const request = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        if (request.status === 200) {
          const fetchedData = request.data.data.data;

          const transformedData = transformFetchedData(fetchedData);
          console.log(JSON.stringify(transformedData));
          setExamData(transformedData);
        } else {
          message.error('Failed to fetch exam details.');
        }
      } catch (error) {
        message.error('An error occurred while fetching exam details.');
        navigate('/error', { state: { message: error.message } });
      }
    };
    if (exam_id) {
      fetchExamDetails(exam_id);
    }
  }, [exam_id]);

  if (!examData) {
    return <div>Đang tải bài kiểm tra...</div>;
  }

  return (
    <Content style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Card style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <ExamTaking 
          examTitle={examData.examTitle || []} 
          questions={examData.examData || []} 
          mode="reviewing" 
          onSubmit={null} 
          score={0} 
        />
      </Card>
    </Content>
  );
};

export default ViewExam;
