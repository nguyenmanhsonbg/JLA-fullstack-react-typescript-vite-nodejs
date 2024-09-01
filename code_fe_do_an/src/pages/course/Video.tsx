import { DaySchedule, Practice } from "@/components/course";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Header from "@/layout/header/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hook/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, notification } from "antd";
import axios from 'axios';

export default function Video() {
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [dayCurrent, setDayCurrent] = useState({});
  const [completedVideos, setCompletedVideos] = useState(new Set());
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

    const fetchCompletedVideos = async () => {
      try {
        let token = "";
        let accountId;
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
          accountId = userDecode?.account_id;
        }
        const response = await axios.get(`/user-videos-learned/${accountId}`, {
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          const completedVideoIds = response.data.map((item) => item.video_id);
          setCompletedVideos(new Set(completedVideoIds));
        } else {
          alert("Failed to fetch completed videos.");
        }
      } catch (error) {
        notification.error({
        message: "Failed to update kanji learned",
        description: `Error: ${error}`,
      });
      }
    };

    if (reload) {
      handleFetchData();
      fetchCompletedVideos();
      setReload(false);
    }
  }, [reload]);

    const handleCompleteVideo = async (video_id) => {
    try {
      let token = "";
      let accountId;
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
      }
      const request = await axios.post('/update-video-learned', {
        accountId: accountId,
        videoId: video_id,
        dayId: day_id
      }, {
        headers: {
          Authorization: token,
        },
      });
       
      if (request.status === 200) {
        setCompletedVideos(prevCompletedVideos => new Set(prevCompletedVideos).add(video_id));
        setReload(true); 
      }
    } catch (error) {
      console.error(error);
        notification.error({
        message: "Failed to update video learned",
        description: `Error: ${error}`,
      });
    }
  };
  return (
    <div>
      {/* Header */}
      <div className="bg-[#fff8e1]">
        <Header />
      </div>
      {/* Body*/}
      <div className="flex flex-row">
        {/* DaySchedule */}
        <div className="p-5 shadow-md basis-1/6 h-[830px]">
          <DaySchedule weekSelected={weekSelected} id={id} />
        </div>
        {/* Content */}
        <div className="flex flex-col basis-5/6 pt-7 pl-11">
          {/* Breadcrumb */}
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
                    Video bổ trợ
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* Video Detail*/}
          {/* <div className="w-[1200px] h-[690px] ml-32 bg-[#fff8e1] rounded-md px-20 pt-10 flex flex-col gap-5">
            <div className="text-[#4b9c47] text-xl font-semibold">Video 1</div>
            <div className="w-full h-[400px] px-20">
              <div className="w-full h-full bg-green-200 rounded-lg"></div>
            </div>
            <div>Video_Description</div>
          </div> */}
          <div className="flex justify-center w-full mt-7">
            <div className="">
              <Carousel className="w-[1200px]">
                <CarouselContent>
                  {dayCurrent?.lessons
                    ?.filter((item) => item.video_id)
                    ?.map((lesson, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className={`flex flex-col pt-10 h-[670px] w-[1200px] bg-[#f2fae9]`}>
                              <div className="flex flex-col gap-9 basis-2/5">
                                <div className="text-2xl text-[#7db660] font-semibold">
                                  {lesson.video_name}{" "}
                                  {parseInt(lesson.day_id) !==
                                    parseInt(day_id) && (
                                    <>
                                      &ensp; <Tag color="green">Nhắc lại</Tag>
                                    </>
                                  )}
                                </div>
                                <div className="flex flex-col items-center gap-5">
                                  <video
                                      className="h-[450px] w-[100%] rounded-md shadow-md"
                                      src={
                                      lesson?.video_link
                                      ? lesson?.video_link.split(", ")[0]
                                      : "/banner.png"
                                         }
                                    controls
                                   onError={(e) => {
                                    console.error('Error loading video:', e.target.error, 'Video URL:', lesson?.video_link);
                                     }}
                                   />
                                  {!completedVideos.has(lesson.video_id) ? (
                                    <Button
                                      className="mt-8"
                                      onClick={() => handleCompleteVideo(lesson.video_id)}
                                    >
                                      Đánh dấu hoàn thành
                                    </Button>
                                  ) :(
                                    <Button
                                      className="mt-8"
                                   
                                    >
                                      Đã hoàn thành
                                    </Button>
                                  )
                                  }
                              
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
