import { useEffect, useState } from "react";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export default function LearningProcess() {
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchLearningProgress = async () => {
      try {
        const userEncode = localStorage.getItem("user");
        const token = userEncode ? JSON.parse(userEncode)?.token : '';
        const accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;

        const response = await axios.post("/all_course_extend", { accountId }, {
          headers: {
            Authorization: token,
          },
        });

        if (response.status === 200 && response.data.statusCode === 200) {
          // Access the correct data structure and filter enrolled courses
          const coursesData = response.data.data;       
          const enrolledCourses = [];

          for (const course of coursesData) {
            // Check if the user is enrolled in each course
            const enrollmentResponse = await axios.post('/account-enroll', {
              accountId,
              courseId: course.course_id,
            }, {
              headers: {
                Authorization: token,
              },
            });
            
            if (enrollmentResponse.data.isEnrolled) {
              enrolledCourses.push(course);
            }
          }

          setCourses(enrolledCourses);
        }
      } catch (error) {
        console.error("Error fetching learning progress", error);
        navigate('/error', { state: { message: error} });
      }
    };

    fetchLearningProgress();
  }, []);

  useEffect(() => {
    const handleResize = () => setWidthScreen(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
     <div className="flex items-center justify-center w-full mt-12">
      <div className="flex flex-col w-full h-full gap-3 p-10 bg-white shadow-sm rounded-3xl">
        <div className="mt-5 text-xl font-semibold text-center">TIẾN ĐỘ HỌC TẬP</div>
        <div className="flex flex-col gap-7">
          <div className="ml-5 text-xl font-semibold">Khóa học đã tham gia</div>
          <div className="flex flex-wrap items-center justify-around">
            {courses.map((course, index) => (
              <div key={index} className="flex flex-col w-1/3 h-full bg-[#fff8e1] rounded-md shadow-md p-5 gap-3">
                <div className="flex flex-col gap-1">
                  <div className="w-full h-[170px] bg-green-50 rounded-md"></div>
                  <div className="flex flex-row justify-between gap-3">
                    <div className="font-semibold">{course.course_name}</div>
                    <div className="text-[#9cda58]">{Math.round(course.progress.progressPercentage)}%</div>
                  </div>
                  <Progress className="h-[15px]" value={Math.round(course.progress.progressPercentage)} />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center gap-1">
                    <div className="basis-1/2">Từ vựng</div>
                    <Progress className="h-[10px]" value={Math.round(course.progress.vocabulary.percentage)} />
                    <div className="text-[#9cda58]">{Math.round(course.progress.vocabulary.percentage)}%</div>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <div className="basis-1/2">Kanji</div>
                    <Progress className="h-[10px]" value={Math.round(course.progress.kanji.percentage)} />
                    <div className="text-[#9cda58]">{Math.round(course.progress.kanji.percentage)}%</div>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <div className="basis-1/2">Ngữ pháp</div>
                    <Progress className="h-[10px]" value={Math.round(course.progress.grammar.percentage)} />
                    <div className="text-[#9cda58]">{Math.round(course.progress.grammar.percentage)}%</div>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <div className="basis-1/2">Video</div>
                    <Progress className="h-[10px]" value={Math.round(course.progress.video.percentage)} />
                    <div className="text-[#9cda58]">{Math.round(course.progress.video.percentage)}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
