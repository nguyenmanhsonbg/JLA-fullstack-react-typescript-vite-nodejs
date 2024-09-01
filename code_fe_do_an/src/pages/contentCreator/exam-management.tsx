import React, { useState, useEffect } from 'react';
import { Button, Table, message, Tooltip } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuth } from '@/hook/AuthContext';

interface Exam {
  exam_id: number;
  exam_name: string;
  questions: any; // Adjust this type based on your actual data structure
  account_id: number;
}

const ExamManagementPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();
  const { handleFetch } = useAuth();

  const getAllExams = async () => {
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
        setExams(request.data.data.data); // Ensure data is an array
      } else {
        setExams([]);
      }
    } catch (error) {
      message.error('Failed to fetch exams.');
      navigate('/error', { state: { message: error.message } });
    }
  };

  useEffect(() => {
    if (reload) {
      getAllExams();
      setReload(false);
    }
  }, [reload]);

  const handleDeleteExam = async (id: number) => {
    const confirm = window.confirm(`Are you sure you want to delete this exam?`);
    if (confirm) {
      const request = await handleFetch({
        method: "delete",
        url: `/api/exams/${id}`,
      });
      if (request.statusCode === 200) {
        message.success('Delete successfully');
        setReload(true);
      } else {
        message.error('Delete failed');
      }
    }
  };

  const columns = [
    {
      title: "Tên bài kiểm tra",
      dataIndex: "exam_name",
      key: "exam_name",
    },
     {
      title: "Câu hỏi nhiều lựa chọn",
      key: "multiChoiceQuestions",
      render: (text, record: Exam) => (
        <div>{record.questions.multiChoiceQuestions.length}</div>
      ),
    },
    {
      title: "Câu hỏi bài đọc",
      key: "readingQuestions",
      render: (text, record: Exam) => (
        <div>{record.questions.readingQuestions.length}</div>
      ),
    },
    {
      title: "Câu hỏi bài nghe",
      key: "listeningQuestions",
      render: (text, record: Exam) => (
        <div>{record.questions.listeningQuestions.length}</div>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Exam) => (
        <div className="flex flex-row gap-2">
          <Tooltip title="View Exam">
            <FaEye size={20} color="#4CAF50"
              onClick={() => {
                navigate(`/contentCreator/exam-management/view/${record.exam_id}`, {
                  state: { mode: "view" },
                });
              }}
              style={{ cursor: 'pointer' }}
            />
          </Tooltip>
          <Tooltip title="Edit Exam">
            <FiEdit size={20} color="#FFC107"
              onClick={() => {
                navigate(`/contentCreator/exam-management/edit/${record.exam_id}`);
              }}
              style={{ cursor: 'pointer' }}
            />
          </Tooltip>
          <Tooltip title="Delete Exam">
            <RiDeleteBin6Line size={20} color="#F44336"
              onClick={() => {
                handleDeleteExam(record.exam_id);
              }}
              style={{ cursor: 'pointer' }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={exams} columns={columns} rowKey="exam_id" />
    </>
  );
};

export default ExamManagementPage;
