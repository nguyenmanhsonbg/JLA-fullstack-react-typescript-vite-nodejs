import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/layout/Logo";
import { Label } from "@radix-ui/react-label";
import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/hook/AuthContext";
import React from 'react';
export default function GetAuthenticationCode() {
  const [authenticationCode, setAuthenticationCode] = useState("");
  const [resendAttempts, setResendAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();

  const email = new URLSearchParams(location.search).get("email");

  useEffect(() => {
    if (!email) {
      navigate("/forgotPassword");
    } else {
      fetchOtpExpiration();
    }
  }, [email]);

  const fetchOtpExpiration = async () => {
    try {
      const response = await axios.post('/get-otp-expiration', { email });
      if (response.data.data) {
        const expiresAt = new Date(response.data.data.message);
        const currentTime = new Date();
        const remainingTime = Math.max(0, Math.floor((expiresAt - currentTime) / 1000));
        setErrorMessage("");
        setCountdown(remainingTime);
      } else {
        setErrorMessage("Unable to fetch OTP expiration time.");
      }
    } catch (error) {
      setErrorMessage("Error fetching OTP expiration time.");
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleOtpSubmit = async () => {
    if (!authenticationCode) {
      setErrorMessage("Hãy nhập OTP");
      return;
    }

    try {
      const response = await axios.post('/verify-otp-for-recover-password', { email, otp: authenticationCode });
      if (response.data.statusCode === 200) {
        const resetToken = response.data.data;
        verifyOtp();
        navigate(`/getNewPassword?token=${resetToken}`);
      } else {
        setErrorMessage("Mã OTP không hợp lệ");
      }
    } catch (error) {
      setErrorMessage("Error verifying OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (resendAttempts >= 3) {
      setErrorMessage("Bạn đã đạt tới giới hạn cấp OTP");
      navigate("/forgotPassword");
      return;
    }

    try {
      const response = await axios.post('/resend-otp', { email });
      if (response.data.statusCode === 200) {
        setSuccessMessage("OTP đã được gửi lại.");
        setResendAttempts(resendAttempts + 1);
        fetchOtpExpiration(); // Fetch the new expiration time
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to resend OTP. Please try again!");
      }
    } catch (error) {
      setErrorMessage("Error resending OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center pt-28">
      <div className="flex flex-col gap-16 px-40 pt-20 w-[800px] h-[700px] border border-[#718d5a]">
        <Logo />
        <div>
          <div className="text-2xl font-semibold">Quên mật khẩu</div>
          <div className="flex flex-col gap-10">
            <div> Mã xác nhận đã được gửi tới địa chỉ email <strong>{email}</strong></div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="font-semibold" htmlFor="otp">
                Nhập mã xác nhận
              </Label>
              <div className="flex gap-3">
                <Input
                  type="text"
                  id="otp"
                  value={authenticationCode}
                  onChange={(e) => setAuthenticationCode(e.target.value)}
                  placeholder="Nhập mã OTP"
                />
              </div>
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}
            {countdown > 0 ? (
              <div className="text-blue-500">
                Mã sẽ hết hạn trong {countdown} giây.
              </div>
            ) : (
              <div className="text-red-500">
                OTP đã hết hạn.
              </div>
            )}
          </div>
          <Button onClick={handleOtpSubmit} className="w-full mt-5">Xác nhận</Button>
          <div className="flex pt-5">
            <span
              onClick={handleResendOtp}
              style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
            >
              Gửi lại mã
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
