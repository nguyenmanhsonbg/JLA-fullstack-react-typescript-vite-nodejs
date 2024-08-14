import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/hook/AuthContext";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    reNewPassword: ""
  });

  const { user } = useAuth();

  const validateInputs = () => {
    const newErrors = { currentPassword: "", newPassword: "", reNewPassword: "" };
    let isValid = true;

    if (!currentPassword) {
      newErrors.currentPassword = "Nhập mật khẩu hiện tại";
      isValid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = "Nhập mật khẩu mới";
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Mật khẩu mới có tối thiểu 8 ký tự";
      isValid = false;
    }

    if (!reNewPassword) {
      newErrors.reNewPassword = "Nhập xác nhận mật khẩu mới";
      isValid = false;
    } else if (newPassword !== reNewPassword) {
      newErrors.reNewPassword = "Mật khẩu mới không trùng khớp";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChangePassword = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const request = await axios.put(
        `/account/${user.account_id}/change-password`,
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

     const response = request.data;
      if (response.statusCode === 200) {
        alert(response.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setReNewPassword("");
        setErrors({ currentPassword: "", newPassword: "", reNewPassword: "" });
      } else {
        alert(response.data);
      }
    } catch (error) {
      alert("Fail to change password");
    }
  };

  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidthScreen(window.innerWidth);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setWidthScreen(window.innerWidth);
      });
  }, []);

  const renderChangePasswordForm = () => (
    <div className="flex flex-col gap-3 h-[300px] px-20">
      <div className="flex flex-row w-full py-3 basis-1/4">
        <div className="w-full basis-1/3">Nhập mật khẩu cũ</div>
        <div className="relative flex flex-row items-center basis-1/2">
          <Input
            type={showPassword ? "text" : "password"}
            className="w-full"
            placeholder="Nhập mật khẩu cũ"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEye
              className="absolute cursor-pointer right-3"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute cursor-pointer right-3"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      </div>
      {errors.currentPassword && <div className="text-red-500 text-sm mt-1">{errors.currentPassword}</div>}
      <div className="flex flex-row w-full py-3 basis-1/4">
        <div className="w-full basis-1/3 ">Nhập mật khẩu mới</div>
        <div className="relative flex flex-row items-center basis-1/2">
          <Input
            type={showNewPassword ? "text" : "password"}
            className="w-full"
            placeholder="Tói thiểu 8 ký tự"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {showNewPassword ? (
            <FaRegEye
              className="absolute cursor-pointer right-3"
              onClick={() => setShowNewPassword(false)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute cursor-pointer right-3"
              onClick={() => setShowNewPassword(true)}
            />
          )}
        </div>
      </div>
      {errors.newPassword && <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>}
      <div className="flex flex-row w-full py-3 basis-1/4">
        <div className="w-full basis-1/3 ">Nhập lại mật khẩu mới</div>
        <div className="relative flex flex-row items-center basis-1/2">
          <Input
            type={showReNewPassword ? "text" : "password"}
            className="w-full"
            placeholder="Nhập lại mật khẩu mới"
            value={reNewPassword}
            onChange={(e) => setReNewPassword(e.target.value)}
          />
          {showReNewPassword ? (
            <FaRegEye
              className="absolute cursor-pointer right-3"
              onClick={() => setShowReNewPassword(false)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute cursor-pointer right-3"
              onClick={() => setShowReNewPassword(true)}
            />
          )}
        </div>
      </div>
      {errors.reNewPassword && <div className="text-red-500 text-sm mt-1">{errors.reNewPassword}</div>}
      <div className="flex items-center justify-center w-full py-3 basis-1/4">
        <Button className="bg-[#eeb55f] hover:bg-[#ff9800]" onClick={handleChangePassword}>
          Thay đổi mật khẩu
        </Button>
      </div>
    </div>
  );

  if (widthScreen > 1200) return (
    <div className="flex items-center justify-center w-full mt-24">
      <div className="flex flex-col w-full h-[500px] gap-10 p-10 bg-white shadow-sm rounded-3xl">
        <div className="mt-5 text-xl font-semibold text-center">
          THAY ĐỔI MẬT KHẨU
        </div>
        {renderChangePasswordForm()}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center w-full mt-10">
      <div className="flex flex-col w-full h-[500px] gap-5 px-10 bg-white shadow-sm rounded-3xl">
        <div className="mt-5 text-xl font-semibold text-center">
          THAY ĐỔI MẬT KHẨU
        </div>
        {renderChangePasswordForm()}
      </div>
    </div>
  );
}
