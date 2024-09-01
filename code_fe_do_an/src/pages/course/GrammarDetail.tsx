import { DaySchedule } from "@/components/course";
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Header from "@/layout/header/Header";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hook/AuthContext";
import { useEffect, useState } from "react";
import { notification } from "antd";
import axios from 'axios';
import PracticeModal from "@/components/Modal/PracticeModal";

export default function GrammarDetail() {
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [dayCurrent, setDayCurrent] = useState({});
  const [grammarCurrent, setGrammarCurrent] = useState({});
  const [isLearned, setIsLearned] = useState(false);
  const [practicalData, setPracticalData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleFetch } = useAuth();
  const { id, week_id, day_id, grammar_id } = useParams();


  const handleClose = () => {
    setIsModalVisible(false);
  };

    const handleSubmitClick = () => {
      setIsModalVisible(false);
  }
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
        setDayCurrent(
          result.weekData
            ?.find((item) => item.week_id === parseInt(week_id))
            ?.days?.find((item) => item.day_id === parseInt(day_id))
        );
      }
    };

    const fetchGrammarProgress = async () => {
      try {
        let token = "";
        let accountId;
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
          accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
        }
        const request = await axios.get(`/user-grammars-learned/${accountId}`, {
          headers: {
            Authorization: token,
          },
        });
        
        if (request.status === 200) {
          const progress = request.data.find(
            (item) => item.grammar_id === parseInt(grammar_id)
          );   
          if (progress) {
            setIsLearned(progress.learned);
          }
        } else {
          alert("Failed to fetch grammar progress.");
        }
      } catch (error) {
        navigate('/error', { state: { message: error} });
      }
    };

    if (reload) {
      handleFetchData();
      fetchGrammarProgress();
      setReload(false);
    }
  }, [reload, handleFetch, id, week_id, day_id, grammar_id]);

  useEffect(() => {
    setGrammarCurrent(
      dayCurrent?.lessons?.find(
        (item) => item.grammar_id === parseInt(grammar_id)
      ) || {}
    );
  }, [dayCurrent]);

  const navigate = useNavigate();

  const handleLearningByWeek = () => {
    navigate(`/learningByWeek/${id}`);
  };

  const handleBack = () => {
    navigate(`/${id}/${week_id}/${day_id}/grammar`);
  };

  const markAsLearned = async () => {
    try {
      let token = "";
      let accountId;
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
      }
      const request = await axios.post('/update-grammar-learned', {
        accountId: accountId,
        grammarId: grammar_id,
        dayId: day_id
      }, {
        headers: {
          Authorization: token,
        },
      });
       
      if (request.status === 200) {
        setIsLearned(true);
        setReload(true); 
      }
    } catch (error) {
         notification.error({
        message: "Failed to update grammar learned",
        description: `Error: ${error}`,
      });
    }
  };

    const handlePractice = async () => {
      await fetchPracticalData();
      if (practicalData) {        
          setIsModalVisible(true);
      }
  };
  
   const fetchPracticalData = async () => {
  
      try {
        const userEncode = localStorage.getItem("user");
        const token = userEncode ? JSON.parse(userEncode)?.token : '';
        const grammar_ids = [grammar_id];
        const request = await axios.post('/generate-grammar-practice-data', {
          accountId: JSON.parse(userEncode)?.account_id,
          grammarIds: grammar_ids,
        }, {
          headers: {
            Authorization: token,
          },
        });
        const response = request.data;
        if (response.statusCode === 200) {
          setPracticalData(response.data);
        }
        else {
          alert("fail");
        }
      } catch (error) {
           navigate('/error', { state: { message: error} });
      }
    };

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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/course" className="text-2xl font-semibold">
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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-2xl font-semibold">
                  {grammarCurrent.grammar_name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className={`w-[1200px] h-[700px] ml-28 mt-5 rounded-lg flex flex-col gap-5 pb-5  bg-[#d1eeb0]`}>
            <div className={`basis-[10%] rounded-t-md flex flex-row justify-between items-center px-10 bg-[#4b9c47]`}>
              <div className="flex items-center justify-center text-xl text-white">
                {grammarCurrent.grammar_name}
              </div>

              <IoArrowBackCircleOutline
                className="text-white"
                size={35}
                onClick={handleBack}
              />
            </div>
            <div className="basis-[90%] px-20 flex flex-col gap-5">
              <div className="flex flex-row gap-16 px-16 py-5 basis-1/2">
                <div className="flex items-center justify-center bg-white rounded-md shadow-md basis-1/2">
                  {grammarCurrent.grammar_structure}
                </div>
                <div className="rounded-md shadow-md basis-1/2 bg-blue-50">
                  <img
                    src={
                      grammarCurrent.grammar_image
                        ? grammarCurrent.grammar_image.split(", ")[0]
                        : "/banner.png"
                    }
                    style={{ height: "240px" }}
                  />
                </div>
              </div>
              <div className="basis-1/4 p-7">
                {grammarCurrent.grammar_description
                  ?.split(".")
                  ?.map((item, index) => (
                    <span key={index}>- {item}.</span>
                  ))}
              </div>
              <div className="flex flex-col basis-1/4 p-7">
                <div className="text-xl font-semibold">Ví dụ:</div>
                <div className="flex flex-row items-center justify-center gap-16">
                  {grammarCurrent?.grammar_examples?.map((item, index) => (
                    <div key={index}>
                      <div className="text-xl">{item.grammar_example}</div>
                      <div>{item.grammar_example_meaning}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center p-5">
                {isLearned && (
                  <div className="text-lg font-semibold text-green-600">
                    Đã hoàn thành
                  </div>
                )}

                  {!isLearned && !isModalVisible && (
                   <div className="fixed bottom-3 left-1/2 ">
                   <button
                    onClick={handlePractice}
                   className="bg-green-500 text-white p-4 rounded-lg"
                    >
                     Làm bài luyện tập
                    </button>
                      </div>
                   )} 
              </div>
            </div>
            <div>
              <PracticeModal
                  title={"Luyện tập ngữ pháp"}
                  practiceData={practicalData}
                  isModalVisible={isModalVisible}
                  onSubmit={handleSubmitClick}
                  onClose={handleClose}
                  onPass={markAsLearned}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
