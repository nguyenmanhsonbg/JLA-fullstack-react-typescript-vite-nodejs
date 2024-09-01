import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography, Input, List, Collapse, Select } from "antd"; // Import Select component
import { useEffect, useState } from "react";
import AddDayModal from "../Modal/AddDay";
import AddLessonModal from "../Modal/AddLesson";
import DayCard from "./DayCard";
import ExamTaking from "../exam/ExamTaking";
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Panel } = Collapse;
const { Option } = Select; // Use Option for the dropdown

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
  const [listExam, setListExams] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [topicName, setTopicName] = useState(weekData[weekIndex]?.week_topic);
  const [daySelected, setDaySelected] = useState(null);
  const [dayIndexSelected, setDayIndexSelected] = useState(null);
  const [lessonSelected, setLessonSelected] = useState(null);
  const [lessonIndexSelected, setLessonIndexSelected] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(weekData[weekIndex]?.exam_id || null); 
  const navigate = useNavigate();

  const fetchExams = async () => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }
      const request = await axios.get('/getAllExam', {
        headers: {
          Authorization: token,
        },
      });
      if (request.status === 200) {
        setListExams(request.data.data.data);
      } else {
        setListExams([]);
      }
    } catch (error) {
      message.error('Failed to fetch exams.');
      navigate('/error', { state: { message: error.message } });
    }
  };

  const handleExamSelect = (examId) => {
    setSelectedExamId(examId);

    // Save selected exam ID in weekData
    let cloneWeekData = [...weekData];
    cloneWeekData[weekIndex] = {
      ...cloneWeekData[weekIndex],
      selectedExamId: examId,
    };
    setWeekData(cloneWeekData);
  };

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
    if(mode !== "view")
    setIsEditing(true);
  };

  const handleTopicChange = (e) => {
    setTopicName(e.target.value);
  };

  const handleTopicBlur = () => {
    setIsEditing(false);
  };

 useEffect(() => {
  if (id) {
    setDayData(weekData[weekIndex]?.days || []);
    // Set selectedExamId if weekData.exam_id is not null
    if (weekData[weekIndex]?.exam_id) {
      setSelectedExamId(weekData[weekIndex].exam_id);
    } 
  }
}, [id, reload]);

  useEffect(() => {
    let cloneWeekData = [...weekData];
    cloneWeekData[weekIndex] = {
      week_name: `Tuần ${weekIndex + 1}`,
      week_topic: topicName,
      course_id: null,
      week_status_id: 1,
      days: dayData,
      exam_id: selectedExamId,
      week_id: cloneWeekData[weekIndex]?.week_id,
    };
    setWeekData(cloneWeekData);
  }, [dayData, topicName, selectedExamId]); 

  useEffect(() => {
    setTopicName(weekData[weekIndex]?.week_topic);
  }, [weekData, weekIndex]);

  useEffect(() => {
      fetchExams();
  }, [mode]);

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
            <b style={{ color: "red" }}>{topicName}</b>
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
              Thêm ngày mới
            </Button>
            <div style={{ width: "10px" }}></div>
            <Button
              icon={<PlusOutlined />}
              className="custom-button"
              onClick={showLessonModal}
            >
              Thêm bài học
            </Button>
          </Flex>
        )}
      </Flex>

      {/* Render dropdown to select exam if mode is not view and no examData */}
      {mode !== "view" && (
      <Select
      style={{ width: "200px", marginTop: "10px" }}
      placeholder="Chọn bài kiểm tra"
      onChange={handleExamSelect}
      value={selectedExamId !== null ? selectedExamId : undefined}
      >
      {listExam.map((exam) => (
      <Option key={exam.exam_id} value={exam.exam_id}>
      {exam.exam_name}
        </Option>
      ))}
      </Select>
      )}

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

      <Collapse>
      <Panel header="Bài kiểm tra" key="1">
      {listExam
      .filter((exam) => exam.exam_id === selectedExamId)
      .map((exam, index) => (
        <ExamTaking
          key={index}
          examTitle={exam.title}
          questions={exam.questions}
          mode={"reviewing"}
          onSubmit={null}
          score={0}
        />
      ))}
      </Panel>
      </Collapse>

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
