import { useAuth } from "@/hook/AuthContext";
import { Button, Form, Input, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai"; // Import the icon

interface Course {
  course_id: number;
  course_name: string;
  description: string;
  course_status_id: number;
  course_image: string;
  week: number;
}

const defaultCourseData: Course = {
  course_id: 0,
  course_name: "",
  description: "",
  course_status_id: 1,
  course_image: "",
  week: 0,
};

interface CourseModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data: Course | null;
  setReload: (reload: boolean) => void;
}

const CourseModal: React.FC<CourseModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setReload,
}) => {
  const [courseData, setCourseData] = useState<Course>(defaultCourseData);

  useEffect(() => {
    if (data) {
      setCourseData(data);
    }
  }, [data]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async () => {
    // API call to save the data
    setIsModalOpen(false);
    setReload(true);
  };

  return (
    <Modal
      title={data ? "Update Course" : "Create Course"}
      visible={isModalOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Course Name">
          <Input
            name="course_name"
            value={courseData.course_name}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            name="description"
            value={courseData.description}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Week">
          <Input
            name="week"
            type="number"
            value={courseData.week}
            onChange={handleChange}
          />
        </Form.Item>
        {/* Additional form fields can be added here */}
      </Form>
    </Modal>
  );
};

const CoursesManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleFetch } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleDeleteCourse = async (id) => {
    const confirm = window.confirm(
      `Are you sure you want to delete this course?`
    );
    if (confirm) {
      const request = await handleFetch({
        method: "patch",
        url: `/course/${id}`,
      });
      if (request.statusCode === 200) {
        alert(`Delete successfully`);
        setReload(true);
      } else {
        alert(`Delete failed`);
      }
    }
  };

  useEffect(() => {
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
        if (response.statusCode === 200) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error(error);
        navigate('/error', { state: { message: error} });
      }
    };
    if (reload) {
      fetchCourses();
      setReload(false);
    }
  }, [reload]);

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Course Image",
      dataIndex: "course_image",
      key: "course_image",
      render: (course_image) => (
        <img
          src={
            course_image?.split(", ")[1] || course_image?.split(", ")[0] || ""
          }
          style={{ maxWidth: "120px" }}
          alt="thumbnail course"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Week",
      dataIndex: "week",
      key: "week",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Course) => (
        <div className="flex flex-row gap-2">
            <FaRegEye size={24} color="#2E75B5"
              onClick={() => {
                navigate(`/admin/course-management/${record.course_id}`, {
                  state: { mode: "view" },
                });
              }}
            >
              View
            </FaRegEye>
              <CiEdit size={24} color="#feb32a"
                onClick={() => {
                  navigate(`/admin/course-management/${record.course_id}`);
                }}
              >
                Edit
              </CiEdit>
              <MdDeleteOutline size={24} color="red"
                onClick={() => {
                  handleDeleteCourse(record.course_id);
                }}
              >
                Delete
              </MdDeleteOutline>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        icon={<AiOutlineFileAdd />} // Add the icon here
        onClick={() => {
          navigate("/admin/course-exam-create");
        }}
        style={{ marginBottom: "8px" }}
      >
        Create Exam
      </Button>
      <Table dataSource={courses} columns={columns} rowKey="course_id" />
      <CourseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={selectedCourse}
        setReload={setReload}
      />
    </>
  );
};

export default CoursesManagementPage;
