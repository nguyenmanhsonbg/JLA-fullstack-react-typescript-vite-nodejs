import React, { useEffect, useState } from 'react';
import { DaySchedule } from "@/components/course";
import { Card, CardContent } from '@/components/ui/card';
import { Spin, message } from 'antd';
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
import ExamHistoryItem from '@/components/exam/ExamHistoryItem';
import ExamHistoryDetail from '@/components/exam/ExamHistoryDetail';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

export default function WeeklyExamHistory() {
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [examHistory, setExamHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleFetch } = useAuth();
  const { id, week_id, weekly_exam_id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const handleFetchData = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching course data:', error);
        navigate('/error', { state: { message: error.message } });
      }
    };

    const fetchExamHistories = async () => {
      try {
        let token = "";
        let accountId;
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
          accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
        }
        const url = `/examHistories/${weekly_exam_id}/${accountId}`;
        const request = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
      
        const response = request.data;
        console.log(response);
        if (response.statusCode === 200) {
          const data = response.data;
          const tempHistory = data.data;
          tempHistory.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
          console.log(data.data);
          setExamHistory(tempHistory);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching exam histories:', error);
        navigate('/error', { state: { message: error.message } });
      }
    };

    handleFetchData();
    fetchExamHistories();
  }, [id, week_id, weekly_exam_id, handleFetch, navigate]);

  const handleLearningByWeek = () => {
    navigate(`/learningByWeek/${id}`);
  };

  
  const handleViewDetailExamHistory = (examHistoryId) => {
    if (examHistoryId === null) {
      message.error("Exam history id is null");
    }
     return navigate(`/weeklyExam/${id}/${week_id}/${examHistoryId}/reviewing`);
  }

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
                  Exam History
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* Main Content */}
          <div className="flex justify-center w-full mt-7">
            <div className="w-full max-w-6xl max-h-[800px] overflow-y-auto bg-white rounded-lg shadow-lg p-6 border-2">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Spin size="large" />
                </div>
              ) : (
                <>
         {/* Main Container */}
          <div className="mt-8 flex flex-col space-y-6">
          {/* Top Row: Section 1 and Section 3 Horizontally Aligned */}
          <div className="flex flex-row space-x-8">
           {/* Section 1: Latest Exam History */}
            <div className="w-1/2">
            {examHistory.length > 0 && (
           <div>
            <h2 className="text-2xl font-semibold mb-4">Bài kiểm tra gần đây nhất:</h2>
            <Card className="m-8">
           <CardContent className="p-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-bold mb-2">{examHistory[0].examTitle}</div>
            <div className="text-md mb-2">Ngày làm: {new Date(examHistory[0].createdTime).toLocaleString()}</div>
            <div className="text-lg mb-2">Câu hỏi nhiều lựa chọn: {examHistory[0].multiChoice.correct} / {examHistory[0].multiChoice.total}</div>
            <div className="text-lg mb-2">Bài đọc: {examHistory[0].reading.correct} / {examHistory[0].reading.total}</div>
            <div className="text-lg mb-2">Bài nghe: {examHistory[0].listening.correct} / {examHistory[0].listening.total}</div>
            <div className="text-md font-bold mb-2">Điểm: {examHistory[0].score}%</div>
           <button className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all duration-300" onClick={()=>handleViewDetailExamHistory(examHistory[0].examHistoryId)}>
            View Detailed
          </button>
          </div>
        </div>
        </CardContent>
        </Card>
         </div>
          )}
         </div>
    
         {/* Section 3: Column Chart */}
       <div className="w-1/2">
      <h2 className="text-2xl font-semibold mb-10">Lịch sử kiểm tra</h2>
      <BarChart
        width={200}
        height={400}
        data={examHistory.map(exam => ({
          date: new Date(exam.createdTime).toLocaleDateString(),  // Use date as the key
          score: exam.score,
         }))}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
           >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="date" />  {/* Display date on the X-axis */}
      <YAxis />
     <Tooltip formatter={(value, name, props) => [`Score: ${value}`, `Date: ${props.payload.date}`]} /> {/* Tooltip shows date and score */}
     <Legend />
      <Bar dataKey="score" fill="#82ca9d" />
    </BarChart>
      </div>
  </div>
  {/* Bottom Row: Section 2 Full Width Below */}
  <div className="flex flex-col w-full">
    {examHistory.length > 1 && (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Các bài trước đây:</h2>
        <div className="overflow-y-auto max-h-[800px]">
          {examHistory.slice(1).map((exam, index) => (
            <ExamHistoryItem key={index} exam={exam} onClickDetail={() => handleViewDetailExamHistory(exam.examHistoryId)}/>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
