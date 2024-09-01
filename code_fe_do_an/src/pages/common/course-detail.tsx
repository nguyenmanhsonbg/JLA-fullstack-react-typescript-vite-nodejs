import { StepOne, StepThree, StepTwo } from "../../components/createCoure"
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Card, Steps, Typography, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function CourseDetailPage() {
  const params = useParams();
  const { state } = useLocation();
  const { id } = params;
  const navigate = useNavigate();
  const [reload, setReload] = useState(true);
  const [waitingCreate, setWaitingCreate] = useState(false);
  const [step, setStep] = useState(0);
  const [course, setCourse] = useState({
    course_name: "",
    description: "",
    course_image: "",
    course_status_id: 1,
    week: "0",
    course_level:"",
    course_skill: ""
  });
  const [weekData, setWeekData] = useState([]);

  const [mode] = useState(state?.mode);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => {
  setStep(prevStep => {
    if (prevStep > 0) {
      return prevStep - 1;
    }
    return prevStep;
  });
};


  const handleSubmit = async () => {
    try {
      let token = "";
      let userId = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        userId = userDecode?.account_id;
      }
      if (id) {
        const updateCourse = await axios.put(
          `/course-detail`,
          {
            courseData: {
              ...course,
              course_image: fileList.map((file) => file.url).join(),
            },
            weeksData: weekData,
            account_id: id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (updateCourse.status === 200) {
          notification.success({
            message: id
              ? "Cập nhật khóa học thành công"
              : "Tạo khóa học thành công",
            description: updateCourse.data.data.message,
          });
          setTimeout(() => {
            setWaitingCreate(false);
            navigate("/contentCreator/course-management/manage");
          }, 2000);
        }
      } else {
        setWaitingCreate(true);
        const createCourse = await axios.post(
          "/course",
          {
            ...course,
            account_id: userId,
            course_image: fileList.map((file) => file.url).join(),
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (createCourse.status === 201) {
          const createCourseResponse = createCourse.data?.data?.data;
          const courseId = createCourseResponse.course_id;
          await weekData.forEach(async (week) => {
            const createWeek = await axios.post(
              "/week",
              {
                ...week,
                course_id: courseId,
                account_id: userId,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            if (createWeek.status === 201) {
              let selectedExamId = week.exam_id;
              const createWeekResponse = createWeek.data?.data?.data;
              const weekId = createWeekResponse.week_id;
              await week.days.forEach(async (day) => {
                const createDay = await axios.post(
                  "/day",
                  {
                    ...day,
                    week_id: weekId,
                    account_id: userId,
                  },
                  {
                    headers: {
                      Authorization: token,
                    },
                  }
                );
                if (createDay.status === 201) {
                  const createDayResponse = createDay.data?.data?.data;
                  const dayId = createDayResponse.day_id;
                  day.lessons.forEach(async (lesson) => {
                    switch (lesson.type) {
                      case "vocab":
                        await axios.post(
                          "/vocabulary",
                          {
                            ...lesson,
                            vocab_status_id: 1,
                            account_id: userId,
                            day_id: dayId,
                          },
                          {
                            headers: {
                              Authorization: token,
                            },
                          }
                        );
                        break;
                      case "kanji":
                        const createKanji = await axios.post(
                          "/kanji",
                          {
                            ...lesson,
                            kanji_status_id: 1,
                            account_id: userId,
                            day_id: dayId,
                          },
                          {
                            headers: {
                              Authorization: token,
                            },
                          }
                        );
                        if (createKanji.status === 201) {
                          const createKanjiResponse =
                            createKanji.data?.data?.data;
                          const kanjiId = createKanjiResponse.kanji_id;
                          lesson.kanji_words.forEach(async (kanji) => {
                            await axios.post(
                              "/kanji_word",
                              {
                                ...kanji,
                                kanji_word_status_id: 1,
                                account_id: userId,
                                kanji_id: kanjiId,
                              },
                              {
                                headers: {
                                  Authorization: token,
                                },
                              }
                            );
                          });
                        }
                        break;
                      case "grammar":
                        const createGrammar = await axios.post(
                          "/grammar",
                          {
                            ...lesson,
                            grammar_status_id: 1,
                            account_id: userId,
                            day_id: dayId,
                          },
                          {
                            headers: {
                              Authorization: token,
                            },
                          }
                        );
                        if (createGrammar.status === 201) {
                          const createGrammarResponse =
                            createGrammar.data?.data?.data;
                          const grammarId = createGrammarResponse.grammar_id;
                          lesson.grammar_examples.forEach(async (grammar) => {
                            await axios.post(
                              "/grammar_example",
                              {
                                ...grammar,
                                grammar_example_status_id: 1,
                                account_id: userId,
                                grammar_id: grammarId,
                              },
                              {
                                headers: {
                                  Authorization: token,
                                },
                              }
                            );
                          });
                        }
                        break;
                      case "video":
                        const createVideo = await axios.post(
                          "/video",
                          {
                            ...lesson,
                            video_status_id: 1,
                            account_id: userId,
                            day_id: dayId,
                            video_link: lesson.video_link
                              ? lesson.video_link
                              : "",
                          },
                          {
                            headers: {
                              Authorization: token,
                            },
                          }
                        );
                        if (createVideo.status === 201) {
                          const createVideoResponse =
                            createVideo.data?.data?.data;
                          const videoId = createVideoResponse.video_id;
                          lesson.questions.forEach(async (question) => {
                            const createVideoQuestion = await axios.post(
                              "/video_question",
                              {
                                ...question,
                                video_question_status_id: 1,
                                account_id: userId,
                                video_id: videoId,
                              },
                              {
                                headers: {
                                  Authorization: token,
                                },
                              }
                            );
                            if (createVideoQuestion.status === 201) {
                              const createVideoQuestionResponse =
                                createVideoQuestion.data?.data?.data;
                              const videoQuestionId =
                                createVideoQuestionResponse.video_question_id;
                              question.options.forEach(async (option) => {
                                await axios.post(
                                  "/video_option",
                                  {
                                    ...option,
                                    video_option_status_id: 1,
                                    account_id: userId,
                                    video_question_id: videoQuestionId,
                                  },
                                  {
                                    headers: {
                                      Authorization: token,
                                    },
                                  }
                                );
                              });
                            }
                          });
                        }
                        break;
                      default:
                        break;
                    }
                  });
                }
              });


              if (selectedExamId) {
              await axios.post(`/assign`, {
               account_id: id,
               course_id: courseId,
               week_id: weekId,
              exam_id: selectedExamId
                }, {
               headers: {
                Authorization: token,
               },
                });
              }
            }
          });
        }
        notification.success({
          message: id
            ? "Cập nhật khóa học thành công"
            : "Tạo khóa học thành công",
          description: id
            ? "Cập nhật thông tin khóa học thành công"
            : "Tạo khóa học mới thành công",
        });
        setTimeout(() => {
          setWaitingCreate(false);
          navigate("/contentCreator/course-management/manage");
        }, 2000);
      }
    } catch (e) {
      setWaitingCreate(false);
      notification.error({
        message: "Failed to Create Course",
        description: `Error: ${e.message}`,
      });
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (id) {
      const handleFetchData = async () => {
        let token = "";
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
        }
        const request = await axios(`/course-detail/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        if (request.status === 200) {
          const response = request.data.data;
          const listFileCourse = response.courseData?.course_image
            ? response.courseData?.course_image?.split()
            : [];
          const listFileAntd = listFileCourse.length
            ? listFileCourse?.map((url, index) => ({
                uid: -index,
                name: `Image ${index}`,
                status: "done",
                url: url,
              }))
            : [];
          setWeekData(response.weekData);
          setCourse(response.courseData);
          setFileList(listFileAntd);
          setReload(false);
        }
      };
      if (reload) handleFetchData();
    }
  }, [id, reload]);

  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <Typography.Title level={3}>
        {mode === "view"
          ? "Chi tiết khóa học"
          : id
          ? "Cập nhật khóa học"
          : "Tạo khóa học"}
      </Typography.Title>
      {mode !== "view" && (
        <Steps current={step} style={{ margin: "2% auto", maxWidth: "800px" }}>
          <Steps.Step title={id ? "Cập nhật khóa học" : "Tạo khóa học"} />
          <Steps.Step title="Tuần và bài học" />
          <Steps.Step title="Hoàn tất" />
        </Steps>
      )}
      <Card style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {step === 0 && (
          <StepOne
            course={course}
            setCourse={setCourse}
            fileList={fileList}
            setFileList={setFileList}
            onPreview={onPreview}
            handleNextStep={handleNextStep}
            mode={mode}
            originalWeek={weekData.length}
          />
        )}
        {step === 1 && (
          <StepTwo
            week={parseInt(course.week)}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            weekData={weekData}
            setWeekData={setWeekData}
            id={id}
            setReload={setReload}
            reload={reload}
            mode={mode}
            navigate={navigate}
          />
        )}
        {mode !== "view" && step === 2 && (
          <StepThree
            handlePreviousStep={handlePreviousStep}
            handleSubmit={handleSubmit}
            waitingCreate={waitingCreate}
            id={id}
          />
        )}
      </Card>
    </div>
  );
}

export default CourseDetailPage;
