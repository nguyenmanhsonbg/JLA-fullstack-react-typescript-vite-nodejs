import React from 'react';
import { DaySchedule } from "@/components/course";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hook/AuthContext";
import Header from "@/layout/header/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Progress } from "../../components/ui/progress";

export default function LearningByWeek() {
  const { id } = useParams();
  const { handleFetch } = useAuth();
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [weekSelected, setWeekSelected] = useState([]);
  const [listCourse, setCourseList] = useState([]);

  useEffect(() => {
    const handleFetchAllCourseData = async () => {
      let token = "";
      let accountId;
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        accountId = userDecode?.account_id;
      }
      const request = await axios.post("/all_course_extend", { accountId }, {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      if (response.statusCode === 200) {
        setCourseList(response.data);
      }
    };

    const handleFetchData = async () => {
      const response = await handleFetch({
        method: "get",
        url: `/course-detail/${id}`,
      });

      if (response.statusCode === 200) {
        const result = response.data;
        setCourseData(result.courseData);
        setWeekData(result.weekData);
        setWeekSelected(result.weekData[0]);
      }
    };

    if (reload) {
      handleFetchAllCourseData();
      handleFetchData();
      setReload(false);
    }
  }, [reload, id]);

  // Find the course that matches the current id
  const matchedCourse = listCourse.find(course => course.course_id === parseInt(id));
  return (
    <div>
      <div className="bg-[#f2fae9]">
        <Header />
      </div>
      <div className="container flex flex-row w-full h-fit">
        <div className="basis-1/5 h-[900px] flex flex-col items-center p-5 shadow-lg gap-7">
          <div className="text-2xl text-[#56a251] font-semibold">Tuần học</div>
          <div className="flex flex-col w-full h-full gap-3">
            {weekData.map((item, index) => (
              <Button
                className={
                  weekSelected?.week_id === item?.week_id
                    ? ""
                    : "text-black bg-white hover:bg-[#2dac5c] hover:text-white text-base"
                }
                key={index}
                onClick={() => setWeekSelected(item)}
              >
                {item?.week_name}
              </Button>
            ))}
          </div>
        </div>
        <div className="basis-4/5 h-[800px] pt-7 pl-11 flex flex-col">
          <div>
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
                  <BreadcrumbPage className="text-2xl font-semibold">
                    {courseData?.course_name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-2xl font-semibold">
                    {weekSelected?.week_topic}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-row justify-between gap-10 pt-10">
  <div className="basis-4/5">
    <DaySchedule weekSelected={weekSelected} id={id} />
  </div>
  <div className="basis-1/5 flex flex-col gap-4 p-6 border border-[#56a251] rounded-lg bg-[#f9f9f9] shadow-md self-start">
              <div className="text-lg font-semibold text-[#56a251] text-center mb-2">Quá trình</div>
    {/* Tu vung progress */}
  
      {matchedCourse?.progress?.vocabulary.total !== 0 &&(  <div className="flex flex-row items-center gap-2">
      <div className="basis-2/5 text-sm text-left whitespace-nowrap min-w-[70px]">
        Từ vựng
      </div>
      <Progress className="h-[8px] basis-3/5" value={Math.ceil(matchedCourse?.progress?.vocabulary?.percentage || 0)} />
      <div className="text-[#9cda58] text-xs min-w-[30px] text-right">
        {Math.ceil(matchedCourse?.progress?.vocabulary?.percentage || 0)}%
      </div>
      </div>)}
  
              
     {/* Kanji progress */}
      {matchedCourse?.progress?.kanji?.total !== 0 &&( <div className="flex flex-row items-center gap-2">
      <div className="basis-2/5 text-sm text-left whitespace-nowrap min-w-[70px]">
        Kanji
      </div>
      <Progress className="h-[8px] basis-3/5" value={Math.ceil(matchedCourse?.progress?.kanji?.percentage || 0)} />
      <div className="text-[#9cda58] text-xs min-w-[30px] text-right">
        {Math.ceil(matchedCourse?.progress?.kanji?.percentage || 0)}%
      </div>
      </div>)}
   

       {/* Ngu phap progress */}
    {matchedCourse?.progress?.grammar?.total !== 0 &&( <div className="flex flex-row items-center gap-2">
      <div className="basis-2/5 text-sm text-left whitespace-nowrap min-w-[70px]">
        Ngữ pháp
      </div>
      <Progress className="h-[8px] basis-3/5" value={Math.ceil(matchedCourse?.progress?.grammar?.percentage || 0)} />
      <div className="text-[#9cda58] text-xs min-w-[30px] text-right">
        {Math.ceil(matchedCourse?.progress?.grammar?.percentage || 0)}%
      </div>
     </div>)}
  

     {/* Video progress */}
      {matchedCourse?.progress?.video?.total !== 0 &&( <div className="flex flex-row items-center gap-2">
      <div className="basis-2/5 text-sm text-left whitespace-nowrap min-w-[70px]">
        Video
      </div>
      <Progress className="h-[8px] basis-3/5" value={Math.ceil(matchedCourse?.progress?.video?.percentage || 0)} />
      <div className="text-[#9cda58] text-xs min-w-[30px] text-right">
        {Math.ceil(matchedCourse?.progress?.video?.percentage || 0)}%
      </div>
    </div>)}
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
