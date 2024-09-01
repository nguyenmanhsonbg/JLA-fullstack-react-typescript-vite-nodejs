import {
  Button,
  Card,
  Collapse,
  Empty,
  Flex,
  List,
  Tag,
  Typography,
  notification,
} from "antd";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const { Panel } = Collapse;

function DayCard({
  dayData,
  setDayData,
  setVisibleNewDay,
  setVisibleLesson,
  setDaySelected,
  setDayIndexSelected,
  setLessonSelected,
  setLessonIndexSelected,
  setReload,
  mode,
}) {

  const handleOpenNewDay = (item, index) => {
    setVisibleNewDay(true);
    setDaySelected(item);
    setDayIndexSelected(index);
  };
  const handleOpenLesson = (item, index) => {
    setVisibleLesson(true);
    setLessonSelected(item);
    setLessonIndexSelected(index);
  };
  const handleDeleteDay = async (dayId, pos) => {
    if (dayId) {
      try {
        let token = "";
        let userId = "";
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
          userId = userDecode?.account_id;
        }
        const response = await axios.patch(
          `/day/${dayId}`,
          { account_id: userId },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status === 200) {
          notification.success({
            message: "Xóa thành công",
            description: response.data.data.message,
          });
          setReload(true);
        }
      } catch (error) {
        console.error(
          "Lỗi khi xóa ngày :",
          error.response ? error.response.data : error.message
        );
        notification.error({
          message: "Xóa ngày thất bại",
          description: `Error: ${error.message}`,
        });
      }
    } else {
      let newData = dayData.filter((_, index) => index !== pos);
      setDayData(newData);
    }
  };

  const handleDeleteLesson = async (lesson, dayIndex, lessonIndex) => {
    const lessonId =
      lesson.vocab_id ||
      lesson.kanji_id ||
      lesson.grammar_id ||
      lesson.video_id;
    if (lessonId) {
      const url = lesson.vocab_id
        ? "vocabulary"
        : lesson.kanji_id
        ? "kanji"
        : lesson.grammar_id
        ? "grammar"
        : lesson.video_id
        ? "video"
        : null;
      try {
        let token = "";
        let userId = "";
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
          userId = userDecode?.account_id;
        }
        const response = await axios.patch(
          `/${url}/${lessonId}`,
          { account_id: userId },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status === 200) {
          notification.success({
            message: "Deleted successfully",
            description: response.data.data.message,
          });
          setReload(true);
        }
      } catch (error) {
        console.error(
          "Error deleting the lesson:",
          error.response ? error.response.data : error.message
        );
        notification.error({
          message: "Failed to Delete lesson",
          description: `Error: ${error.message}`,
        });
      }
    } else {
      let cloneDayData = [...dayData];
      cloneDayData[dayIndex].lessons = cloneDayData[dayIndex].lessons.filter(
        (_, pos) => pos !== lessonIndex
      );
      setDayData(cloneDayData);
    }
  };
  return (
    <>
      {dayData.length ? (
        dayData.map((day, index) => (
          <Collapse
            key={index}
            defaultActiveKey={["0"]}
            bordered={false}
            style={{
              margin: "2% 0",
              borderRadius: "8px",
              backgroundColor: "#e3eaef",
              textAlign: "left",
            }}
          >
            <Panel
              header={
                <Flex align="center" justify="space-between">
                  <Typography.Title level={5} style={{ marginBottom: "0" }}>
                    Day {index + 1}: {day.day_name}{" "}
                    {day?.repeat_lesson &&
                      day?.repeat_lesson.length > 0 &&
                      day?.repeat_lesson !== "null" &&
                      day?.repeat_lesson !== "[]" && (
                        <>
                          &ensp;
                          <Tag color="warning">Have Repeat</Tag>
                        </>
                      )}
                  </Typography.Title>
                  {mode !== "view" ? (
                    <Flex>
                      <AiOutlineEdit
                        style={{ width: "20px", height: "20px" }}
                        onClick={() => handleOpenNewDay(day, index)}
                      />
                      &ensp;
                      <AiOutlineDelete
                        style={{ width: "20px", height: "20px" }}
                        onClick={() => handleDeleteDay(day.day_id, index)}
                      />
                    </Flex>
                  ) : null}
                </Flex>
              }
              key={index + 1}
            >
              {day.lessons.length ? (
                <>
                  {day?.lessons?.filter((item) => item.type === "vocab")
                    ?.length > 0 && (
                    <List
                      header={<div>Vocabulary</div>}
                      bordered
                      dataSource={day.lessons.filter(
                        (item) => item.type === "vocab"
                      )}
                      style={{ marginBottom: "2%", backgroundColor: "#fff" }}
                      renderItem={(item, pos) => {
                        const vocab_title = item.vocab_name;
                        const vocab_meaning = item.vocab_meaning;

                        return (
                          <List.Item>
                            <div style={{ fontWeight: "bold", fontSize: "1.1em", color: "#333" }}>
                              <span style={{ color: "#007BFF" }}>{vocab_title}</span>: {vocab_meaning}
                            </div>
                            {mode !== "view" ? (
                              <Flex>
                                <Button onClick={() => handleOpenLesson(item, pos)}>
                                  Edit
                                </Button>
                                &ensp;
                                <Button onClick={() => handleDeleteLesson(item, index, pos)}>
                                  Delete
                                </Button>
                              </Flex>
                            ) : (
                              <Button onClick={() => handleOpenLesson(item, pos)}>
                                View
                              </Button>
                            )}
                          </List.Item>
                        );
                      }}
                    />
                  )}
                  {day?.lessons?.filter((item) => item.type === "kanji")
                    ?.length > 0 && (
                    <List
                      header={<div>Kanji</div>}
                      bordered
                      style={{ marginBottom: "2%", backgroundColor: "#fff" }}
                      dataSource={day.lessons.filter(
                        (item) => item.type === "kanji"
                      )}
                      renderItem={(item, pos) => {
                        const kanji_title = item.kanji_name;

                        return (
                          <List.Item>
                            <div style={{ fontWeight: "bold", fontSize: "1.1em", color: "#333" }}>
                              <span style={{ color: "#007BFF" }}>{kanji_title}</span>
                            </div>
                            {mode !== "view" ? (
                              <Flex>
                                <Button onClick={() => handleOpenLesson(item, pos)}>
                                  Edit
                                </Button>
                                &ensp;
                                <Button onClick={() => handleDeleteLesson(item, index, pos)}>
                                  Delete
                                </Button>
                              </Flex>
                            ) : (
                              <Button onClick={() => handleOpenLesson(item, pos)}>
                                View
                              </Button>
                            )}
                          </List.Item>
                        );
                      }}
                    />
                  )}
                  {day?.lessons?.filter((item) => item.type === "grammar")
                    ?.length > 0 && (
                    <List
                      header={<div>Grammar</div>}
                      bordered
                      style={{ marginBottom: "2%", backgroundColor: "#fff" }}
                      dataSource={day.lessons.filter(
                        (item) => item.type === "grammar"
                      )}
                      renderItem={(item, pos) => {
                        const grammar_title = item.grammar_name;
                        const grammar_description = item.grammar_description;
                        return (
                          <List.Item>
                            <div style={{ fontWeight: "bold", fontSize: "1.1em", color: "#333" }}>
                              <span style={{ color: "#28A745" }}>{grammar_title}</span>: {grammar_description}
                            </div>
                            {mode !== "view" ? (
                              <Flex>
                                <Button onClick={() => handleOpenLesson(item, pos)}>
                                  Edit
                                </Button>
                                &ensp;
                                <Button onClick={() => handleDeleteLesson(item, index, pos)}>
                                  Delete
                                </Button>
                              </Flex>
                            ) : (
                              <Button onClick={() => handleOpenLesson(item, pos)}>
                                View
                              </Button>
                            )}
                          </List.Item>
                        );
                      }}
                    />
                  )}
                  {day?.lessons?.filter((item) => item.type === "video")
                    ?.length > 0 && (
                    <List
                      header={<div>Video</div>}
                      bordered
                      style={{ marginBottom: "2%", backgroundColor: "#fff" }}
                      dataSource={day.lessons.filter(
                        (item) => item.type === "video"
                      )}
                      renderItem={(item, pos) => {
                        const title = item.video_name;
                        return (
                          <List.Item>
                            <div>
                              Lesson Name: <b>{title}</b>
                            </div>
                            {mode !== "view" ? (
                              <Flex>
                                <Button onClick={() => handleOpenLesson(item, pos)}>
                                  Edit
                                </Button>
                                &ensp;
                                <Button onClick={() => handleDeleteLesson(item, index, pos)}>
                                  Delete
                                </Button>
                              </Flex>
                            ) : (
                              <Button onClick={() => handleOpenLesson(item, pos)}>
                                View
                              </Button>
                            )}
                          </List.Item>
                        );
                      }}
                    />
                  )}
                </>
              ) : (
                <Card style={{ margin: "3% 0" }}>
                  <Empty description={"Không có bài học"} />
                </Card>
              )}
            </Panel>
          </Collapse>
        ))
      ) : (
        <Card style={{ margin: "3% 0" }}>
          <Empty description={"Không có ngày học"} />
        </Card>
      )}
    </>
  );
}

export default DayCard;
