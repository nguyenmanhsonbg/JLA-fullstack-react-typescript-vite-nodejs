import React, { useState, useEffect } from 'react';
import { Button, Table, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineFileAdd } from 'react-icons/ai';
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
      
    //   console.log(exams);
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
      title: "Exam Name",
      dataIndex: "exam_name",
      key: "exam_name",
    },
    {
      title: "Reading Questions",
      key: "readingQuestions",
      render: (text, record: Exam) => (
        <ul>
          {record.questions.readingQuestions.map((q: any) => (
            <li key={q.id}>{q.content}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Listening Questions",
      key: "listeningQuestions",
      render: (text, record: Exam) => (
        <ul>
          {record.questions.listeningQuestions.map((q: any) => (
            <li key={q.id}>{q.type}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Multi-choice Questions",
      key: "multiChoiceQuestions",
      render: (text, record: Exam) => (
        <ul>
          {record.questions.multiChoiceQuestions.map((q: any) => (
            <li key={q.id}>{q.content}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Exam) => (
        <div className="flex flex-row gap-2">
          <FaRegEye size={24} color="#2E75B5"
            onClick={() => {
              navigate(`/admin/exam-management/${record.exam_id}`, {
                state: { mode: "view" },
              });
            }}
          />
          <CiEdit size={24} color="#feb32a"
            onClick={() => {
              navigate(`/admin/exam-management/${record.exam_id}`);
            }}
          />
          <MdDeleteOutline size={24} color="red"
            onClick={() => {
              handleDeleteExam(record.exam_id);
            }}
          />
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
