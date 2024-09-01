import { useAuth } from "@/hook/AuthContext";
import {
  BookOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  AppstoreAddOutlined,
  NotificationOutlined// Import the new icon for exam management
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const statusRole= {
  1: "Quản trị viên",
  2: "Người duyệt nội dung",
  3: "Người tạo nội dung",
};

const CommonLayout = ({ children }) => {
  const auth = useAuth();
  const { handleLogout } = auth;
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState("");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
      const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          setRole(userDecode?.role_id.toString());
    }
  }, [auth])
  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ maxWidth: "300px", width: "300px", minWidth: "300px" }}
      >
        <div className="demo-logo-vertical" style={{ padding: "30px" }}>
          <h1
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            FPT Nihongo Dekiru
          </h1>
           <h2
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 3
            }}
          >
           {statusRole[role]}
          </h2>
          
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {/* admin - user management */}
          {role === '1' && (
            <>
              <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin/user-management">Quản lý người dùng</Link>
              </Menu.Item>
                  <SubMenu key="sub3" icon={<NotificationOutlined />} title="Thông báo">
            <Menu.Item key="8" icon={<PlusOutlined/>}>
              <Link to="/admin/notification/create">Tạo mới</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<SettingOutlined/>}>
              <Link to="/admin/notification/manage">Quản lý</Link>
            </Menu.Item>
          </SubMenu>
            </>
            
          )}
          
          {/* content manager - course manager */}
          {role === '2' && (
            <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/contentManager/course-management/manage">Quản lý khóa học</Link>
            </Menu.Item>)}
          
          {/* content creator - course manager - exam manager */}
          {role === '3' && (
          <>
          <SubMenu key="courseSubmenu" icon={<BookOutlined />} title="Khóa học">
          <Menu.Item key="createCourse" icon={<PlusOutlined />}>
          <Link to="/contentCreator/course-management/create">Tạo mới</Link>
           </Menu.Item>
           <Menu.Item key="manageCourse" icon={<SettingOutlined />}>
           <Link to="/contentCreator/course-management/manage">Quản lý</Link>
          </Menu.Item>
           </SubMenu>
          <SubMenu key="examSubmenu" icon={<FileTextOutlined />} title="Bài kiểm tra">
          <Menu.Item key="createExam" icon={<PlusOutlined />}>
          <Link to="/contentCreator/exam-management/create">Tạo mới</Link>
          </Menu.Item>
           <Menu.Item key="manageExam" icon={<SettingOutlined />}>
          <Link to="/contentCreator/exam-management/manage">Quản lý</Link>
        </Menu.Item> 
         <Menu.Item key="assignExam" icon={<AppstoreAddOutlined />}>
        <Link to="/contentCreator/exam-management/assign">Chỉ định bài kiểm tra</Link>
       </Menu.Item>
       </SubMenu>
         </>
          )}
          <Menu.Item
            key="logout"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
          >
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
