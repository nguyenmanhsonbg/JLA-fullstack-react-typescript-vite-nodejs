import { DaySchedule } from "@/components/course";
import React from 'react';
import GrammarItem from "@/components/course/GrammarItem";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Header from "@/layout/header/Header";

import { useAuth } from "@/hook/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

  
export default function Grammar() {
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [dayCurrent, setDayCurrent] = useState({});
  const [learnedStatuses, setLearnedStatuses] = useState({});
  const { handleFetch } = useAuth();
  const { id, week_id, day_id } = useParams();


  const navigate = useNavigate();

  const handleLearningByWeek = () => {
    navigate(`/learningByWeek/${id}`);
  };
  
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
        const _weekData = result.weekData;
        let _dayCurrent = result.weekData
          ?.find((item) => item.week_id === parseInt(week_id))
          ?.days?.find((item) => item.day_id === parseInt(day_id));
        if (
          _dayCurrent.repeat_lesson &&
          typeof _dayCurrent.repeat_lesson === "string"
        ) {
          const _repeatLesson = JSON.parse(_dayCurrent.repeat_lesson) || [];
          _repeatLesson.forEach((item) => {
            const weekRepeatIndex = item?.split(" - ")[0]?.replace("Week ", "");
            const dayRepeatIndex = item?.split(" - ")[1]?.replace("Day ", "");
            _dayCurrent.lessons = [
              ..._dayCurrent?.lessons,
              ..._weekData[weekRepeatIndex - 1]?.days[dayRepeatIndex - 1]
                ?.lessons,
            ];
          });
        }
        setDayCurrent(_dayCurrent);
      }
    };

    const fetchLearnedStatuses = async () => {
      try {
         let token = "";
        let accountId;
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
          accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
        }
        
          const response = await axios.get(`/user-grammars-learned/${accountId}`, {
          headers: {
            Authorization: token,
          },
        });
        
        if (response.status === 200) {
          const statuses = response.data.reduce((acc, item) => {
            acc[item.grammar_id] = item.learned;
            return acc;
          }, {});
          setLearnedStatuses(statuses);
        }
      } catch (error) {
        navigate('/error', { state: { message: error } });
      }
    };

    if (reload) {
      handleFetchData();
      fetchLearnedStatuses();
      setReload(false);
    }
  }, [reload, handleFetch, id, week_id, day_id]);

  return (
    <div>
      <div className="bg-[#f2fae9]">
        <Header />
      </div>
      <div className="flex flex-row">
        <div className="p-5 shadow-md basis-1/6 h-[830px]">
          <DaySchedule weekSelected={weekSelected} id={id} />
        </div>
        <div className="flex flex-col basis-5/6 pt-7 pl-11">
          <div className="mb-7">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/course"
                    className="text-2xl font-semibold"
                  >
                    Khóa học
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
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-2xl font-semibold">
                    {weekSelected?.week_name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-2xl font-semibold">
                    {dayCurrent?.day_name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-2xl font-semibold">
                    Ngữ Pháp
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="w-[1300px] h-[650px] ml-16 bg-[#f2fae9] mt-5 rounded-md px-20 pt-10 flex flex-col gap-10">
            <div className="text-[#4b9c47] font-semibold text-xl">Ngữ pháp</div>
            <div className="flex flex-col gap-5 w-full h-[370px] ">
              {dayCurrent?.lessons
                ?.filter((item) => item.grammar_id)
                ?.map((lesson, index) => (
                  <GrammarItem
                    grammar_name={lesson.grammar_name}
                    grammar_id={lesson.grammar_id}
                    grammar_structure={lesson.grammar_structure}
                    checkIsRepeat={parseInt(lesson.day_id) !== parseInt(day_id)}
                    isLearned={learnedStatuses[lesson.grammar_id] || false}
                    key={index}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
