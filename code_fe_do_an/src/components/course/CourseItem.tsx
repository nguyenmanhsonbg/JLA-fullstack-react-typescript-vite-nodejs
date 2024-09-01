import { CourseResponse } from "@/type";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import axios from "axios";
import Modal from "react-modal";

const CourseItem: React.FC<CourseResponse> = (course: CourseResponse) => {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const userEncode = localStorage.getItem("user");
        const token = userEncode ? JSON.parse(userEncode)?.token : '';
        const response = await axios.post('/account-enroll', {
          accountId: JSON.parse(userEncode)?.account_id,
          courseId: course.course_id,
        }, {
          headers: {
            Authorization: token,
          },
        });
        setIsEnrolled(response.data.isEnrolled);
      } catch (error) {
        navigate('/error', { state: { message: 'Error checking enrollment in course' } });
      }
    };

    checkEnrollment();
  }, [course.course_id]);

  const handleEnroll = () => {
    if (isEnrolled) {
      navigate(`/learningByWeek/${course.course_id}`);
    } else {
      setModalIsOpen(true);
    }
  };

  const handleConfirmEnroll = async () => {
    try {
      const userEncode = localStorage.getItem("user");
      const token = userEncode ? JSON.parse(userEncode)?.token : '';
      await axios.post('/enroll', {
        accountId: JSON.parse(userEncode)?.account_id,
        courseId: course.course_id,
      }, {
        headers: {
          Authorization: token,
        },
      });
      setIsEnrolled(true);
      setModalIsOpen(false);
      navigate(`/learningByWeek/${course.course_id}`);
    } catch (error) {
      navigate('/error', { state: { message: 'Error enrolling in course' } });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-full gap-3">
      <div
        className={`w-full h-full bg-[#b6da9f] rounded-2xl justify-around flex flex-row py-3 items-center ${
          isEnrolled ? "bg-[#68ccd9]" : "bg-[#b6da9f]"
        }`}
      >
        <img
          className="w-1/4 h-full rounded-2xl"
          src={course.course_image}
          alt={course.course_name}
        />
        <div className="flex flex-col w-1/2 h-full gap-5 p-4">
          <div className="font-semibold text-2xl text-green-700">
            {course.course_name}
          </div>
          <div className="text-xs">{course.description}</div>
          {isEnrolled && course.progressPercentage !== 0 && (
            <div className="flex flex-row items-center gap-3">
              <Progress
                className="h-[10px] basis-11/12"
                value={Math.round(course.progressPercentage)}
              />
              <div className="basis-1/12">
                {Math.round(course.progressPercentage)}%
              </div>
            </div>
          )}
        </div>
        <Button onClick={handleEnroll}>
          {isEnrolled ? "Tiếp tục" : "Đăng ký"}
        </Button>
      </div>
     <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Course Details"
  style={{
    content: {
      display: "flex",
      flexDirection: "column", 
      justifyContent: "space-between", 
      alignItems: "center",
      padding: "20px",
      width: "55%",
      height: "55%", 
      margin: "auto",
      borderRadius: "10px",
      maxWidth: "800px",
    },
  }}
>
  <div className="flex flex-row w-full h-full gap-3">
    <div className="flex flex-col w-1/2 gap-3 p-4">
      <h2 className="font-bold text-3xl text-green-700">
        {course.course_name}
      </h2>
      <div>
        <strong>Tên khóa học:</strong> {course.course_name}
      </div>
      <div>
        <strong>Miêu tả ngắn:</strong> {course.description}
      </div>
      <div>
        <strong>Số tuần học:</strong> {course.week}
      </div>
      <div>
        <strong>Cấp độ:</strong> {course.course_level}
      </div>
      <div>
        <strong>Kĩ năng:</strong> {course.course_skill}
      </div>
    </div>
    <div className="flex flex-col w-1/2 gap-3 p-4 items-center">

        <img
          className="w-full h-auto rounded-2xl"
          src={course.course_image ? course.course_image : "https://github.com/shadcn.png"}
          alt={course.course_name}
        />

    </div>
  </div>
  <div className="w-full flex justify-center mt-auto">
    <Button
      className="bg-green-600 text-white font-bold py-4 px-6 rounded hover:bg-green-700"
      onClick={handleConfirmEnroll}
    >
      <span className="text-lg font-bold leading-none">Đăng ký</span>
    </Button>
  </div>
</Modal>

    </div>
  );
};

export default CourseItem;
