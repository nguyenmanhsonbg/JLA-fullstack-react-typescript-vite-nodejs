import { DaySchedule, ResetDeadline } from "@/components/course";
import React from 'react';

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

export default function LearningByWeek() {
  const { id } = useParams();
  const { handleFetch } = useAuth();
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [weekSelected, setWeekSelected] = useState([]);

  useEffect(() => {
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
      handleFetchData();
   setReload(false);
      }
    
  }, [reload,weekSelected]);
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
          <div className="flex flex-col items-center gap-3 pt-10">
            {/* <div>
              <ResetDeadline />
            </div> */}
            <div className="w-[800px]">
              <DaySchedule weekSelected={weekSelected} id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
