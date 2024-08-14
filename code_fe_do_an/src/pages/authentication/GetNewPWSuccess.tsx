import { Button } from "@/components/ui/button";
import Logo from "@/layout/Logo";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import React from 'react';
import { Link } from "react-router-dom";

export default function GetNewPWSuccess() {
  return (
    <div className="flex justify-center pt-28">
      <div className=" flex flex-col gap-16 px-40 pt-20 w-[800px] h-[700px] border border-[#718d5a]">
        <Logo />
        <div className="flex flex-col items-center justify-center gap-10">
          <IoMdCheckmarkCircleOutline size={100} className="text-[#86b24d]" />
          <div className="flex flex-col items-center justify-center gap-2">
            <div>Đặt lại mật khẩu thành công</div>
            <div>Chọn tiếp tục để quay lại trang chủ</div>
          </div>
        </div>

        <Link to={"/"}>
          <div className="flex items-center justify-center">
            <Button className="w-1/3">Tiếp tục</Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
