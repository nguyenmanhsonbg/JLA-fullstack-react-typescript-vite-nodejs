import React, { useEffect, useState } from 'react';
import { DaySchedule } from "@/components/course";
import { Spin } from 'antd';
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

export default function WeeklyExamReviewing() {
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [examData, setExamData] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { handleFetch } = useAuth();
  const { id, week_id, examHistoryId } = useParams();
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
        const url = `/get-exam-history-by-id/${examHistoryId}`;
        const request = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        if (request.status === 200) {
            const fetchedData = request.data.data.data;
            setScore(fetchedData.score);
            setExamData(fetchedData.content);
          setLoading(false);
        }
      } catch (error) {
        navigate('/error', { state: { message: error.message } });
      }
    };

    handleFetchData();
    fetchCourseWeeklyExam();
  }, [id, week_id, examHistoryId, handleFetch, navigate]);

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
                  Weekly Exam Reviewing
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
                  mode="reviewing"
                  onSubmit={null}
                  score={score}
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
