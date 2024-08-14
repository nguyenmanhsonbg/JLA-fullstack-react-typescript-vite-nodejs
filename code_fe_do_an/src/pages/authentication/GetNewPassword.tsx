import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/layout/Logo";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React from 'react';
export default function GetNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

   // Extract the token from the URL query parameters
  const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (password.length < 8) {
      setErrorMessage("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const response = await axios.post('/recover-password', { token , password });
      if (response.data.statusCode === 200) {
        setSuccessMessage("Mật khẩu đã được thay đổi thành công.");
        navigate("/getNewPWSuccess");
      } else {
        setErrorMessage("Cập nhật mật khẩu thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      setErrorMessage("Lỗi trong quá trình cập nhật mật khẩu.");
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="flex justify-center pt-28">
      <div className="flex flex-col gap-16 px-20 pt-10 w-[800px] h-[700px] border border-[#7d9c64]">
        <Logo />
        <div>
          <div className="text-2xl font-semibold">Mật khẩu mới</div>
          <div className="flex flex-col gap-10">
            <div> Mật khẩu của bạn phải ít nhất 8 ký tự </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="font-semibold" htmlFor="password">
                Nhập mật khẩu mới
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Vui lòng nhập mật khẩu mới"
                className="bg-[#f3f4f6]"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className="bg-[#f3f4f6]"
              />
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}
          </div>
          <Button onClick={handleSubmit} className="w-full mt-5">Xác nhận</Button>
          <div className="mt-8 text-center">
            <Link className={"w-fit"} to={"/"}>
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
