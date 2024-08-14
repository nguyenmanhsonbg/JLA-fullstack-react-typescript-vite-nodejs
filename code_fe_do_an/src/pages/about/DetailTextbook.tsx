import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { useEffect, useState } from "react";
import React from 'react';
export default function DetailTextbook() {
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
  if (widthScreen > 900)
    return (
      <div className="flex flex-col w-full h-full bg-[#fff8e1]">
        <div className="bg-[#f2fae9]">
          <Header />
        </div>

        <div
          className="w-full bg-center bg-cover h-[1200px] flex items-center justify-center"
          style={{ backgroundImage: `url("/public/detailgiaotrinhbg.png")` }}
        ></div>
        <div
          className="w-full bg-center bg-cover h-[190px] flex items-center justify-center"
          style={{ backgroundImage: `url("/public/thoigianhoctap.png")` }}
        ></div>

        <div className="w-full px-56 py-20 h-[800px]  ">
          <div className="grid w-full h-full grid-cols-4 gap-10">
            <div className="flex items-center justify-center text-2xl text-white rounded-md bg-[#44803c]">
              <strong>Cấp độ</strong>
            </div>
            <div className="flex items-center justify-center text-2xl text-white rounded-md bg-[#44803c]">
              <strong className="mr-2">OPI Cấp độ</strong>
              (Dự kiến)
            </div>
            <div className="flex items-center justify-center text-2xl text-white rounded-md bg-[#44803c]">
              <strong className="mr-2">Thời gian học</strong> (Tháng)
            </div>
            <div className="flex items-center justify-center text-2xl text-white rounded-md bg-[#44803c]">
              <strong className="mr-2">Thời gian học</strong> (Giờ)
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f48b3b]">
              Dekiru Nihongo Trung cấp
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f48b3b]">
              Trung cấp - Cao cấp
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f48b3b]">
              6 tháng
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f48b3b]">
              350 giờ
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f4aa3b]">
              Dekiru Nihongo Sơ trung cấp
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f4aa3b]">
              Sơ trung cấp - Trung cấp
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f4aa3b]">
              3,5 tháng
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f4aa3b]">
              200 giờ
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f4cb3b]">
              Dekiru Nihongo Sơ cấp
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f4cb3b]">
              Sơ cấp - Sơ trung cấp
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f4cb3b]">
              2,5 tháng
            </div>
            <div className="flex items-center justify-center text-xl text-white rounded-md bg-[#f4cb3b]">
              150 giờ
            </div>
          </div>
        </div>

        <div className="w-full h-fit">
          <div className="flex flex-col items-center w-full gap-10 mb-24">
            <div className="text-2xl text-[#4b9c47] font-semibold">LỜI KẾT</div>
            <div className="w-1/2 bg-[#fdc06e] h-[450px] p-9">
              <div className="w-full h-[380px] border-2 border-white flex justify-center text-center items-center">
                <div className="max-w-screen-sm text-[#517636] text-xl">
                  "Dekiru Nihongo" không chỉ là một giáo trình học tiếng Nhật mà
                  còn là một người bạn đồng hành đáng tin cậy trên con đường
                  chinh phục ngôn ngữ của bạn. Với phương pháp học tập hiện đại
                  và hiệu quả, "Dekiru Nihongo" chắc chắn sẽ giúp bạn đạt được
                  mục tiêu học tiếng Nhật của mình một cách nhanh chóng và bền
                  vững. Hãy cùng khám phá và trải nghiệm sự thú vị của tiếng
                  Nhật với "Dekiru Nihongo"!
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fff8e1]">
          <Footer />
        </div>
      </div>
    );

  if (widthScreen <= 900)
    return (
      <div className="flex flex-col w-full h-full bg-[#fff8e1]">
        <div className="bg-[#f2fae9]">
          <Header />
        </div>

        <div
          className="w-full bg-center bg-cover h-[600px] flex items-center justify-center"
          style={{ backgroundImage: `url("/public/detailgiaotrinhbg.png")` }}
        ></div>

        <div
          className="w-full bg-center bg-cover h-[100px] flex items-center justify-center"
          style={{ backgroundImage: `url("/public/thoigianhoctap.png")` }}
        ></div>

        <div className="w-full px-10 py-20 h-[700px]  ">
          <div className="grid w-full h-full grid-cols-4 gap-10">
            <div className="flex items-center justify-center text-white rounded-md bg-[#44803c]">
              Cấp độ
            </div>
            <div className="flex items-center justify-center  text-white rounded-md bg-[#44803c]">
              OPI Cấp độ (Dự kiến)
            </div>
            <div className="flex items-center justify-center  text-white rounded-md bg-[#44803c]">
              Thời gian học (Tháng)
            </div>
            <div className="flex items-center justify-center  text-white rounded-md bg-[#44803c]">
              Thời gian học (Giờ)
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f48b3b]">
              Dekiru Nihongo Trung cấp
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f48b3b]">
              Trung cấp - Cao cấp
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f48b3b]">
              6 tháng
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f48b3b]">
              350 giờ
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f4aa3b]">
              Dekiru Nihongo Sơ trung cấp
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f4aa3b]">
              Sơ trung cấp - Trung cấp
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f4aa3b]">
              3,5 tháng
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f4aa3b]">
              200 giờ
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f4cb3b]">
              Dekiru Nihongo Sơ cấp
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f4cb3b]">
              Sơ cấp - Sơ trung cấp
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f4cb3b]">
              2,5 tháng
            </div>
            <div className="flex items-center justify-center text-sm text-white rounded-md bg-[#f4cb3b]">
              150 giờ
            </div>
          </div>
        </div>

        <div className="w-full h-fit">
          <div className="flex flex-col items-center w-full gap-10 mb-24">
            <div className="text-2xl text-[#4b9c47] font-semibold">LỜI KẾT</div>
            <div className="w-5/6 bg-[#fdc06e] h-[480px] p-9">
              <div className="w-full h-[410px] border-2 border-white flex justify-center text-center items-center">
                <div className="max-w-screen-sm text-[#517636] text-xl">
                  "Dekiru Nihongo" không chỉ là một giáo trình học tiếng Nhật mà
                  còn là một người bạn đồng hành đáng tin cậy trên con đường
                  chinh phục ngôn ngữ của bạn. Với phương pháp học tập hiện đại
                  và hiệu quả, "Dekiru Nihongo" chắc chắn sẽ giúp bạn đạt được
                  mục tiêu học tiếng Nhật của mình một cách nhanh chóng và bền
                  vững. Hãy cùng khám phá và trải nghiệm sự thú vị của tiếng
                  Nhật với "Dekiru Nihongo"!
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fff8e1]">
          <Footer />
        </div>
      </div>
    );
}
