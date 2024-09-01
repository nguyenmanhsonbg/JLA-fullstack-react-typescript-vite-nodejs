import { CourseItem } from "@/components/course";
import React from 'react';
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { CourseResponse } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Course() {
  const [courseList, setCourseList] = useState<CourseResponse[]>([]);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);

  useEffect(() => {
    const handleFetchData = async () => {
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

    handleFetchData();
  }, []);

  useEffect(() => {
    const updateWidth = () => setWidthScreen(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div
      className="w-full h-full bg-center bg-cover"
      style={{ backgroundImage: `url("/public/bg2.jpg")` }}
    >
      <div className="flex flex-col w-full h-full">
        <div className="bg-[#f2fae9]">
          <Header />
        </div>
        <div className="w-full container max-w-[1400px] h-fit p-7">
          <div className="container w-full h-full p-10 flex flex-col gap-y-7 items-center bg-[#f2fae9]">
            <div className="text-2xl font-semibold text-[#78b24d]">
              KHÓA HỌC
            </div>
            {courseList
              .filter((courseData: any) => courseData.course_status_id === 2)
              .map((courseData: any, index) => (
                <CourseItem
                  key={index}
                  course_name={courseData.course_name}
                  course_id={courseData.course_id}
                  course_image={courseData.course_image ? courseData.course_image  :  "https://github.com/shadcn.png"}
                  description={courseData.description}
                  week={courseData.week}
                  course_level={courseData.course_level}
                  course_skill={courseData.course_skill}
                  progressPercentage={courseData.progress.progressPercentage}
                />
              ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

interface PaginationProps {
  coursesPerPage: number;
  totalCourses: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({ coursesPerPage, totalCourses, paginate, currentPage }: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex justify-center mt-4 space-x-2">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button
              onClick={() => paginate(number)}
              className={`page-link px-3 py-1 rounded-md focus:outline-none ${number === currentPage ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
