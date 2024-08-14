import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { message} from 'antd'
import axios from "axios";
import React from 'react';
type OtpVerificationProps = {
  email: string;
  full_name: string;
  password: string;
  onOtpVerified: () => void;
};

const OtpVerification = ({ email, full_name, password, onOtpVerified }: OtpVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [resendAttempts, setResendAttempts] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setIsResendVisible(true);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async () => {
    try {
      const request = await axios.post("/verify-otp-account-create", { email, otp, full_name, password });
      const response = request.data;
      if (response.statusCode === 200) {
        message.success("Tạo tài khoản thành công!");
        onOtpVerified();
      } else {
        setOtpError(response.data);
      }
    } catch (error) {
      if (error.response) {
        setOtpError(error.response.data?.message || "Có lỗi xảy ra khi xác thực OTP.");
      } else if (error.request) {
        setOtpError("Không nhận được phản hồi từ máy chủ.");
      } else {
        setOtpError("Có lỗi xảy ra khi xác thực OTP.");
      }
    }
  };

  const handleResendOtp = async () => {
    if (resendAttempts >= 2) {
      setOtpError("Bạn đã gửi lại mã OTP quá 2 lần. Đăng ký thất bại.");
      setTimeout(() => {
        setOtpError("");
        setIsResendVisible(false);
        onOtpVerified(); // Close the OTP popup
      }, 3000);
      return;
    }

    try {
      const request = await axios.post("/resend-otp", { email });
      const response = request.data;
      if (response.statusCode === 200) {
        message.info("OTP mới đã được gửi.");
        setCountdown(60); // Reset countdown
        setIsResendVisible(false);
        setResendAttempts(resendAttempts + 1);
      } else {
         message.warning(response.data?.message);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi lại OTP.");
      message.error("Có lỗi xảy ra khi gửi lại OTP.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 py-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Xác thực OTP</h2>
      <div className="flex flex-col gap-3">
        <Label htmlFor="otp">Nhập mã OTP</Label>
        <Input
          type="text"
          id="otp"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Nhập mã OTP"
          className="bg-[#f3f4f6]"
        />
        {otpError && <p style={{ color: "red" }}>{otpError}</p>}
        <Button onClick={handleOtpSubmit} className="w-full bg-[#70be58] shadow-md">
          Xác thực
        </Button>
        {countdown > 0 ? (
          <p>Mã OTP sẽ hết hạn trong {countdown} giây.</p>
        ) : (
          <p>
            Mã OTP đã hết hạn.{" "}
            {isResendVisible && (
              <span
                onClick={handleResendOtp}
                className="text-blue-500 cursor-pointer"
              >
                Gửi lại mã
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default OtpVerification;
