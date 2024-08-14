import Logo from "@/layout/Logo";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HomeBar.css";

export default function HomeBar() {
  return (
    <div
      style={{ backgroundColor: "#FFF8E1" }}
      className="flex flex-col w-full h-full p-3 border border-inherit"
    >
      <div className="pt-3 size-24">
        <Logo />
      </div>
      <div className="flex flex-col items-start h-full pt-12">
        <button className="flex items-center w-full h-12 pl-2 rounded-lg home-bar">
          <FontAwesomeIcon icon={faHome} className="text-gray-700 " />
          <p className="pl-2 textHomeBar">Trang chủ</p>
        </button>
        <button className="flex items-center w-full h-12 pl-2 mt-2 rounded-lg home-bar">
          <FontAwesomeIcon icon={faUserCircle} className="text-gray-700" />
          <p className="pl-2 textHomeBar">Quản lý tài khoản</p>
        </button>
        <button className="flex items-center w-full h-12 pl-2 mt-2 rounded-lg home-bar">
          <FontAwesomeIcon icon={faGraduationCap} className="text-gray-700 " />
          <p className="pl-2 textHomeBar">Quản lý học tập</p>
        </button>
        <button className="flex items-center w-full h-12 pl-2 mt-2 rounded-lg home-bar">
          <FontAwesomeIcon icon={faGamepad} className="text-gray-700 " />
          <p className="pl-2 textHomeBar">Quản lý trò chơi</p>
        </button>
        <button className="flex items-center w-full h-12 pl-2 mt-2 rounded-lg home-bar">
          <FontAwesomeIcon icon={faBell} className="text-gray-700 " />
          <p className="pl-2 textHomeBar">Quản lý thông báo</p>
        </button>
        <button className="flex items-center w-full h-12 pl-2 mt-2 rounded-lg home-bar">
          <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-700 " />
          <p className="pl-2 textHomeBar">Quản lý bài thi</p>
        </button>
      </div>
      <div>
        <button className="flex items-center w-full h-12 pl-2 rounded-lg home-bar">
          <FontAwesomeIcon icon={faSignOut} className="text-gray-700 " />
          <p className="pl-2 textHomeBar">Đăng xuất</p>
        </button>
      </div>
    </div>
  );
}
