import React, { useEffect, useState } from 'react';
import { DaySchedule } from "@/components/course";
import { message, Spin } from 'antd';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Header from "@/layout/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hook/AuthContext";
import ExamTaking from '@/components/exam/ExamTaking';
import axios from 'axios';

export default function WeeklyExam() {
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleFetch } = useAuth();
  const { id, week_id, weekly_exam_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleFetchData = async () => {
      const response = await handleFetch({
        method: "get",
        url: `/course-detail/${id}`,
      });
      if (response.statusCode === 200) {
        const result = response.data;
        setCourseData(result.courseData);
        setWeekSelected(
          result.weekData?.find((item) => item.week_id === parseInt(week_id))
        );
      }
    };

    const fetchCourseWeeklyExam = async () => {
      try {
        let token = "";
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
        }

        const url = `/get-exam-without-answers/${weekly_exam_id}`;
        const request = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        if (request.status === 200) {
          const fetchedData = request.data.data.data;
          const transformedData = transformFetchedData(fetchedData);
          setExamData(transformedData);
        }
      } catch (error) {
        navigate('/error', { state: { message: error.message } });
      }
    };

    handleFetchData();
    fetchCourseWeeklyExam();
  }, [id, week_id, weekly_exam_id, handleFetch, navigate]);

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
            correctOptionId: null,
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
            correctOptionId: null,
          })) : [],
        })) : [],
        multiChoiceQuestions: data.questions.multiChoiceQuestions ? data.questions.multiChoiceQuestions.map(question => ({
          id: question.id,
          type: question.type,
          content: question.content,
          options: question.options,
          imageUrl: question.imageUrl,
          userAnsweredId: question.userAnsweredId || null,
          correctOptionId: null,
        })) : [],
      }
    };
  };

  const handleExamSubmit = async (selectedAnswers) => {
    setLoading(true);
    try {
      let token = "";
      let accountId;
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
          accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
        }

      const request = await axios.post("/progressExam", {
        exam_id: weekly_exam_id,
        account_id: accountId,
        userAnswers: selectedAnswers
      }, {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      if (response.statusCode === 200) {
        const { content, score, examHistoryId } = response.data.data;
        if (content && examHistoryId) {
          message.success(`Nộp bài thành công! Điểm của bạn là ${score}`);
          navigate(`/weeklyExam/${id}/${week_id}/${examHistoryId}/reviewing`);
        }
      }
    } catch (error) {
      message.error('Failed to submit exam. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLearningByWeek = () => {
    navigate(`/learningByWeek/${id}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-[#f2fae9]">
        <Header />
      </div>
      {/* Body */}
      <div className="flex flex-row">
        {/* DaySchedule */}
        <div className="p-5 shadow-md basis-1/6 h-[830px]">
          <DaySchedule weekSelected={weekSelected} id={id} />
        </div>
        {/* Content */}
        <div className="flex flex-col basis-5/6 pt-7 pl-11">
          {/* Breadcrumb */}
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/course"
                    className="text-2xl font-semibold"
                  >
                    Courses
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={handleLearningByWeek}
                    className="text-2xl font-semibold"
                  >
                    {courseData?.course_name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage className="text-2xl font-semibold">
                  {weekSelected?.week_name}
                </BreadcrumbPage>
                <BreadcrumbSeparator />
                <BreadcrumbPage className="text-2xl font-semibold">
                  Weekly Exam
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* ExamTaking Component */}
          <div className="flex justify-center w-full mt-7">
            <div className="w-full max-w-6xl max-h-[800px] overflow-y-auto bg-white rounded-lg shadow-lg p-6 border-2">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Spin size="large" />
                </div>
              ) : examData ? (
                <ExamTaking        
                  examTitle={examData.examTitle} 
                  questions={examData.examData} 
                  mode="doing"
                    onSubmit={handleExamSubmit}
                    score={0}
                />
              ) : (
                <div className="flex justify-center items-center h-full">
                  <Spin size="large" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
