import React, { useState, useEffect } from 'react';
import { Button, Form, Select, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/AuthContext'

const { Option } = Select;

interface Course {
  course_id: number;
  course_name: string;
}

interface Week {
  week_id: number;
  week_name: string;
}

interface Exam {
  exam_id: number;
  exam_name: string;
}

const AssignWeeklyExamToCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const navigate = useNavigate();
  const { handleFetch } = useAuth();

  useEffect(() => {
    fetchCourses();
    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchWeeksByCourse(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }
      const request = await axios.get("/all_course", {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      console.log(response.data);
      if (response.statusCode === 200) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error(error);
      navigate('/error', { state: { message: error} });
    }
  };

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
        setExams(request.data.data.data); 
      } else {
        setExams([]);
      }
    } catch (error) {
      message.error('Failed to fetch exams.');
      navigate('/error', { state: { message: error.message } });
    }
  };

  const fetchWeeksByCourse = async (courseId: number) => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }

      const request = await axios.get(`/course-detail/${courseId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (request.status === 200) {
         setWeeks(request.data.data.weekData);
      } else {
        setWeeks([]);
      }
    } catch (error) {
      message.error('Failed to fetch weeks.');
      navigate('/error', { state: { message: error.message } });
    }
  };

  const handleAssign = async () => {
    if (!selectedCourse || !selectedWeek || !selectedExam) {
      message.warning('Please select a course, a week, and an exam.');
      return;
    }
    try {
      let token = "";
      let accountId;
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
      }

      const request = await axios.post(`/assign`, {
        account_id: accountId,
        course_id: selectedCourse,
        week_id: selectedWeek,
        exam_id: selectedExam
      }, {
        headers: {
          Authorization: token,
        },
      });

      if (request.status === 200) {
        message.success('Exam assigned successfully!');
      }
    } catch (error) {
      message.error('Failed to save exam.');
      // navigate('/error', { state: { message: error.message } });
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Chỉ định bài kiểm tra hàng tuần cho khóa học</h1>
      <Form layout="vertical">
        <Form.Item label="Lựa chọn khóa học">
          <Select
            placeholder="Chọn khóa học"
            onChange={(value) => setSelectedCourse(value as number)}
          >
            {courses.map(course => (
              <Option key={course.course_id} value={course.course_id}>
                {course.course_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {selectedCourse && (
          <Form.Item label="Lựa chọn tuần">
            <Select
              placeholder="Chọn tuần"
              onChange={(value) => setSelectedWeek(value as number)}
            >
              {weeks.map(week => (
                <Option key={week.week_id} value={week.week_id}>
                  {week.week_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {selectedWeek && (
          <Form.Item label="Lựa chọn bài kiểm tra">
            <Select
              placeholder="Chọn bài kiểm tra"
              onChange={(value) => setSelectedExam(value as number)}
            >
              {exams.map(exam => (
                <Option key={exam.exam_id} value={exam.exam_id}>
                  {exam.exam_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {selectedExam && (
          <Form.Item>
            <Button type="primary" onClick={handleAssign}>
              Lưu
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default AssignWeeklyExamToCourse;
