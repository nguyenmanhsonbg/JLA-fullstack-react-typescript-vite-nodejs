import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography, Input, List } from "antd";
import { useEffect, useState } from "react";
import AddDayModal from "../Modal/AddDay";
import AddLessonModal from "../Modal/AddLesson";
import DayCard from "./DayCard";

function WeekCard({
  weekIndex = 0,
  setWeekData,
  weekData = [],
  id,
  setReload,
  reload,
  mode,
}) {
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dayData, setDayData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [topicName, setTopicName] = useState(weekData[weekIndex]?.week_topic);
  const [daySelected, setDaySelected] = useState(null);
  const [dayIndexSelected, setDayIndexSelected] = useState(null);
  const [lessonSelected, setLessonSelected] = useState(null);
  const [lessonIndexSelected, setLessonIndexSelected] = useState(null);

  const showLessonModal = () => {
    setIsModalVisible(true);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleLessonCancel = () => {
    setIsModalVisible(false);
    setLessonSelected(null);
  };

  const handleCancel = () => {
    setVisible(false);
    setDaySelected(null);
  };

  const handleTopicClick = () => {
    setIsEditing(true);
  };

  const handleTopicChange = (e) => {
    setTopicName(e.target.value);
  };

  const handleTopicBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (id) setDayData(weekData[weekIndex]?.days);
  }, [id, reload]);

  useEffect(() => {
    let cloneWeekData = [...weekData];
    cloneWeekData[weekIndex] = {
      week_name: `Week ${weekIndex + 1}`,
      week_topic: topicName,
      course_id: null,
      week_status_id: 1,
      days: dayData,
      week_id: cloneWeekData[weekIndex]?.week_id,
    };
    setWeekData(cloneWeekData);
  }, [dayData, topicName]);

  useEffect(() => {
    setTopicName(weekData[weekIndex]?.week_topic);
  }, [weekData, weekIndex]);

  return (
    <>
      <Flex align="center" justify="space-between">
        {isEditing ? (
          <Input
            value={topicName}
            onChange={handleTopicChange}
            onBlur={handleTopicBlur}
            style={{ maxWidth: "200px" }}
            autoFocus
            placeholder="Topic Name"
          />
        ) : (
          <Typography.Title
            level={3}
            style={{ cursor: "pointer" }}
            onClick={handleTopicClick}
          >
            Topic: <b style={{ color: "red" }}>{topicName}</b>
          </Typography.Title>
        )}
        {mode !== "view" && (
          <Flex>
            <Button
              icon={<PlusOutlined />}
              className="custom-button"
              onClick={() => {
                showModal();
                setDayIndexSelected(null);
              }}
            >
              Add New Day
            </Button>
            <div style={{ width: "10px" }}></div>
            <Button
              icon={<PlusOutlined />}
              className="custom-button"
              onClick={showLessonModal}
            >
              Add New Lesson
            </Button>
          </Flex>
        )}
      </Flex>

      <DayCard
        dayData={dayData}
        setDayData={setDayData}
        setVisibleNewDay={setVisible}
        setVisibleLesson={setIsModalVisible}
        setDaySelected={setDaySelected}
        setLessonSelected={setLessonSelected}
        setDayIndexSelected={setDayIndexSelected}
        setLessonIndexSelected={setLessonIndexSelected}
        setReload={setReload}
        mode={mode}
      />
      <AddDayModal
        dayData={dayData}
        setDayData={setDayData}
        onCancel={handleCancel}
        visible={visible}
        daySelected={daySelected}
        id={id}
        dayIndexSelected={dayIndexSelected}
        weekData={weekData}
        weekIndex={weekIndex}
      />
      <AddLessonModal
        onCancel={handleLessonCancel}
        visible={isModalVisible}
        dayData={dayData}
        setDayData={setDayData}
        lessonSelected={lessonSelected}
        lessonIndexSelected={lessonIndexSelected}
        id={id}
        mode={mode}
      />
    </>
  );
}

export default WeekCard;
