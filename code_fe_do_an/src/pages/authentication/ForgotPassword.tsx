import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/layout/Logo";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { notification } from "antd";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import React from 'react';
export default function ForgotPassword() {
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    try {
      if (Email.length === 0) {
        notification.error({
        message: "Lỗi khôi phục",
        description: `Email trống`,
      });
        return;
      }
      const request = await axios.post('/check-exiting-account', { Email });
      const response = request.data;
      if (response.statusCode === 200) {
        const requestSendOtp = await axios.post('resend-otp', { email: Email  });
        const responseSendOtp = requestSendOtp.data;
        if (responseSendOtp.statusCode === 200) {
             navigate(`/getAuthenticationCode?email=${encodeURIComponent(Email)}`);
        } else {
           notification.error({
        message: "Lỗi khôi phục",
        description: `Không thể gửi otp`,
      });
      }
      } else {
        notification.error({
        message: "Lỗi khôi phục",
        description: `Tài khoản không tồn tại`,
      });
      }
    } catch (error) {
          navigate('/error', { state: { message: error} });
    }
  };
  return (
    <div className="flex justify-center pt-28">
      <div className=" flex flex-col gap-16 px-40 pt-20 w-[800px] h-[700px] border border-[#7d9c64]">
        <Logo />
        <div>
          <div className="text-2xl font-semibold">Quên mật khẩu?</div>
          <div className="flex flex-col gap-10">
            <div> Nhập email của bạn và chúng tôi sẽ gửi bạn mã xác nhận. </div>
            <div className=" grid w-full items-center gap-1.5">
              <Label className="font-semibold" htmlFor="email">
                Email
              </Label>
              <div className="flex gap-3">
                <MdOutlineMail size={36} />
                <Input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                  placeholder="Vui lòng nhập email của bạn"
                />
              </div>
            </div>
          </div>
            <Button onClick={handleSubmit} className="w-full mt-5">Gửi mã xác nhận</Button>
          <div className="mt-12 text-center">
            <NavLink className={"w-fit"} to={"/"}>
              Quay lại trang chủ
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
