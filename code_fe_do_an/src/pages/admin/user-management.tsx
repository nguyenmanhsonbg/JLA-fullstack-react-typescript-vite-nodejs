import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,Pagination
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  full_name: string;
  email: string;
  avatar?: string;
  password?: string;
  phone_number?: string;
  status_id?: number;
  role_id: number;
  point: number;
  dob: string;
}

const UserDefaultData: User = {
  id: 0,
  full_name: "",
  email: "",
  avatar: "",
  role_id: 4,
  dob: "",
  point: 0,
  password: "",
  phone_number: "",
  status_id: 1,
};

interface ModalEditProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data: User | null;
  setReload: (reload: boolean) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setReload,
}) => {
  const [userData, setUserData] = useState<User>(UserDefaultData);
  const navigate = useNavigate();
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
 
    if (data) {
      setUserData({
        id: data.id,
        full_name: data.full_name || "",
        password: "",
        email: data.email,
        phone_number: data.phone_number || "",
        role_id: data.role_id || 4,
        status_id: data.status_id || 2,
        dob: data.dob || "",
        point: data.point || 0,
      });
    } else {
      setUserData(UserDefaultData);
    }
  }, [data]);

  const handleCreateAccount = async () => {
    if (!userData.password) {
      userData.password = '12345678'; // Set your default password here
    }
  
    if (
      !userData.full_name.trim() ||
      !userData.email.trim() ||
      !userData.phone_number.trim() ||
      !userData.password.trim() ||
      !userData.role_id ||
      userData.point === null || 
      !userData.dob.trim() ||
      !userData.status_id
    ) {
      alert("Please fill in all required fields");
      return;
    }
  
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(userData.phone_number)) {
      alert("Phone number is invalid");
      return;
    }
  
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }
      const response = await axios.post("/account", { ...userData, role_id: userData.role_id });
      if (response.status === 201) {
        alert("Create successful");
        setReload(true);
        setIsModalOpen(false);
      } else {
        alert("Operation failed");
      }
    } catch (error) {
      console.error(error);
      navigate('/error', { state: { message: error} });
    }
  };

  return (
    <Modal
      title={"Create User"}
      visible={isModalOpen}
      onOk={handleCreateAccount}
      onCancel={handleCancel}
    >
      <Form style={{ maxWidth: 600 }} layout="vertical" autoComplete="off">
        <Form.Item label="User Name">
          <Input
            value={userData.full_name}
            onChange={handleChangeInput}
            name="full_name"
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            value={userData.email}
            onChange={handleChangeInput}
            name="email"
          />
        </Form.Item>

        <Form.Item label="Password">
        <Input.Password
        value={userData.password  ? userData.password : '12345678'}
        onChange={handleChangeInput}
        name="password"
        readOnly
          />
        </Form.Item>

        <Form.Item label="Status">
          <Select
            onChange={(value) => setUserData({ ...userData, status_id: value })}
            value={userData.status_id}
          >
            <Select.Option value={2}>Active</Select.Option>
            <Select.Option value={3}>Deactive</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Role">
          <Select
            onChange={(value) => setUserData({ ...userData, role_id: value })}
            value={userData.role_id}
            options={[
              { label: "Admin", value: 1 },
              { label: "Content Manager", value: 2 },
              { label: "Content Creator", value: 3 },
              { label: "User", value: 4 },
            ]}
          />
        </Form.Item>

        <Form.Item label="Phone Number">
          <Input
            value={userData.phone_number}
            onChange={handleChangeInput}
            name="phone_number"
          />
        </Form.Item>

        <Form.Item label="DOB">
          <Input
            value={userData.dob}
            onChange={handleChangeInput}
            name="dob"
            type="date"
          />
        </Form.Item>

        <Form.Item label="Point">
          <Input
            value={userData.point}
            onChange={handleChangeInput}
            name="point"
            readOnly
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UserManagementPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleDeleteUser = async (id: number) => {};

  const handleUpdateUserData = async () => {
    if (!selectedItem.role_id || !selectedItem.status_id) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }
      const response = await axios.put(
        `/account/${selectedItem.account_id}`,
        selectedItem, {
          headers: {
            Authorization : token
          }
        }
      );

      if (response.status === 200) {
        alert("Update successful");
        setReload(true);
        setSelectedItem(null);
      } else {
        alert("Operation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "account_id",
      key: "account_id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string) => (
        <img
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          src={
            text ||
            "https://png.pngtree.com/png-clipart/20190902/original/pngtree-cute-girl-avatar-element-icon-png-image_4393286.jpg"
          }
          alt="avatar"
        />
      ),
    },
    {
      title: "Tên người dùng",
      dataIndex: "full_name",
      key: "full_name",
      render: (text: string) => <p style={{ fontWeight: "bold" }}>{text}</p>,
    },
    {
      title: "Địa chỉ Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Vị trí",
      dataIndex: "role_id",
      key: "role_id",
      render: (_: any, user: User) => {
        const { role_id, account_id } = user;
        const bgColor =
          role_id === 1
            ? "cyan"
            : role_id === 2
            ? "green"
            : role_id === 3
            ? "volcano"
            : role_id === 4
            ? "magenta"
            : "";
        const content =
          role_id === 1
            ? "Admin"
            : role_id === 2
            ? "Content manager"
            : role_id === 3
            ? "Content creator"
            : role_id === 4
            ? "User"
            : "";
        return (
          <>
            {selectedItem?.account_id !== account_id ? (
              <Tag color={bgColor} key={role_id}>
                {content}
              </Tag>
            ) : (
              <Select
                onChange={(value) =>
                  setSelectedItem({ ...selectedItem, role_id: value })
                }
                value={selectedItem.role_id}
                options={[
              
                  { label: "Content Manager", value: 2 },
                  { label: "Content Creator", value: 3 },
                  { label: "User", value: 4 },
                ]}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Trạng thái",
      key: "status_id",
      render: (_: any, user: User) => {
        const { status_id, account_id } = user;
        const bgColor =
          status_id === 1
            ? "cyan"
            : status_id === 2
            ? "green"
            : status_id === 3
            ? "volcano"
            : status_id === 4
            ? "magenta"
            : status_id === 5
            ? "magenta"
            : "";
        const content =
          status_id === 1
            ? "Pending"
            : status_id === 2
            ? "active"
            : status_id === 3
            ? "deactive"
            : status_id === 4
            ? "done"
            : status_id === 5
            ? "undone"
            : "";
        return (
          <>
            {selectedItem?.account_id !== account_id ? (
              <Tag
                color={bgColor}
                key={status_id}
                style={{ textTransform: "capitalize" }}
              >
                {content}
              </Tag>
            ) : (
              <Select
                onChange={(value) =>
                  setSelectedItem({ ...selectedItem, status_id: value })
                }
                value={selectedItem.status_id}
              >
                <Select.Option value={2}>Active</Select.Option>
                <Select.Option value={3}>Deactive</Select.Option>
              </Select>
            )}
          </>
        );
      },
    },
    {
      title: "Sinh nhật",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => {
        return (
          <>
            {selectedItem?.account_id === record?.account_id ? (
              <Button type="primary" onClick={handleUpdateUserData}>
                Complete
              </Button>
            ) : (
              <Space size="middle">
                <a
                  onClick={() => {
                    setSelectedItem(record);
                  }}
                >
                  <AiOutlineEdit
                    style={{ fontSize: "20px", color: "orange" }}
                  />
                </a>
              </Space>
            )}
          </>
        );
      },
    },
  ];

  const handleFetchData = async (page = 1) => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }
      const request = await axios.get(`/account?page=${page}&pageSize=10`, {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      if (response.statusCode === 200) {
        setData(response.data.data);
        setTotalPages(response.data.total_pages);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (reload) {
      handleFetchData(currentPage);
      setReload(false);
    }
  }, [reload, currentPage]);

  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setSelectedItem(null);
        }}
        type="primary"
        style={{ marginBottom: "1%" }}
      >
       Tạo người dùng mới
      </Button>
      <Table
        loading={reload}
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          total: totalPages * 10,
          showSizeChanger:false,
          onChange: (page) => {
            setCurrentPage(page);
            setReload(true);
          },
          
        }}
      />
       
      <ModalEdit
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={selectedItem}
        setReload={setReload}
      />
    </>
  );
};

export default UserManagementPage;
