import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
export default function AboutTextbook() {
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const navigate = useNavigate();
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
      <div
        className="w-full h-full bg-center bg-cover"
        style={{ backgroundImage: `url("/public/nenmau.jpg")` }}
      >
        <div className="bg-[#f2fae9] shadow-md">
          <Header />
        </div>

        <div
          className="w-full bg-center bg-cover h-[800px] flex items-center justify-center"
          style={{ backgroundImage: `url("/public/giaotrinhdekiru.jpg")` }}
        >
          <div className="max-w-screen-sm text-xl text-center text-[#648e49]">
            Giáo trình "Dekiru Nihongo" là một công cụ học tập hiện đại và toàn
            diện, được thiết kế dành riêng cho người học tiếng Nhật ở các trình
            độ khác nhau, từ sơ cấp đến trung cấp và cao cấp. Giáo trình này
            không chỉ giúp người học phát triển các kỹ năng ngôn ngữ cơ bản mà
            còn chú trọng đến việc nâng cao khả năng giao tiếp thực tế.
          </div>
        </div>

        <div
          className="w-full bg-center bg-cover h-[300px] flex items-center justify-center"
          style={{ backgroundImage: `url("/public/titlegiaotrinh.jpg")` }}
        ></div>

        <div className="flex flex-col w-full gap-20 py-20 h-fit">
          <div className="flex flex-row w-full gap-16 h-fit">
            <div className="basis-1/4">
              <img className="w-full" src="/so1.png" />
            </div>
            <div className="flex flex-col justify-center basis-1/2 gap-7">
              <div className="text-3xl font-semibold text-[#5ea85c] text-left">
                PHƯƠNG PHÁP HỌC TẬP CHỦ ĐỘNG
              </div>
              <div className="text-xl text-left">
                "Dekiru Nihongo" khuyến khích người học tự mình suy nghĩ và diễn
                đạt ý tưởng bằng tiếng Nhật. Phương pháp này giúp người học
                không chỉ hiểu ngữ pháp mà còn biết cách áp dụng nó trong các
                tình huống giao tiếp hàng ngày.
              </div>
            </div>
            <div className="basis-1/4"></div>
          </div>
          <div className="flex flex-row w-full gap-16 h-fit">
            <div className="flex justify-center basis-1/4">
              <img className="w-2/3" src="/bongbay.png" />
            </div>
            <div className="flex flex-col justify-center basis-1/2 gap-7">
              <div className="text-3xl font-semibold text-[#5ea85c] text-right">
                CHÚ TRỌNG GIAO TIẾP{" "}
              </div>
              <div className="text-xl text-right">
                Giáo trình đặt trọng tâm vào việc phát triển kỹ năng đối thoại
                và giao tiếp, giúp người học tự tin hơn khi nói chuyện với người
                Nhật.
              </div>
            </div>
            <div className="flex basis-1/4">
              <img className="w-full " src="/so2.png" />
            </div>
          </div>
          <div className="flex flex-row w-full gap-16 h-fit">
            <div className="basis-1/4">
              <img className="w-full" src="/so3.png" />
            </div>
            <div className="flex flex-col justify-center basis-1/2 gap-7">
              <div className="text-3xl font-semibold text-[#5ea85c] text-left">
                PHÁT TRIỂN TOÀN DIỆN CÁC KỸ NĂNG{" "}
              </div>
              <div className="text-xl text-left">
                Không chỉ tập trung vào kỹ năng nghe, nói, đọc, viết, "Dekiru
                Nihongo" còn giúp người học làm quen với các bài kiểm tra trình
                độ như OPI (Oral Proficiency Interview).
              </div>
            </div>
            <div className="flex items-center basis-1/4">
              <img className="w-full " src="/maybay1.png" />
            </div>
          </div>
          <div className="flex flex-row w-full gap-16 h-fit">
            <div className="flex items-center justify-center basis-1/4">
              <img className="w-full h-1/2" src="/maybay2.png" />
            </div>
            <div className="flex flex-col justify-center basis-1/2 gap-7">
              <div className="text-3xl font-semibold text-[#5ea85c] text-right">
                CẤU TRÚC BÀI HỌC LOGIC{" "}
              </div>
              <div className="text-xl text-right">
                Mỗi bài học đều được thiết kế rõ ràng, từ cơ bản đến nâng cao,
                giúp người học dễ dàng tiếp cận và theo dõi tiến trình học tập
                của mình.
              </div>
            </div>
            <div className="flex basis-1/4">
              <img className="w-full " src="/so4.png" />
            </div>
          </div>
          <div className="flex flex-row w-full gap-16 h-fit">
            <div className="basis-1/4">
              <img className="w-full" src="/so5.png" />
            </div>
            <div className="flex flex-col justify-center basis-1/2 gap-7">
              <div className="text-3xl font-semibold text-[#5ea85c] text-left">
                THỰC HÀNH LIÊN TỤC{" "}
              </div>
              <div className="text-xl text-left">
                Giáo trình này không chỉ dừng lại ở việc giới thiệu kiến thức
                mới mà còn liên tục ôn tập lại những gì đã học, giúp người học
                ghi nhớ và áp dụng kiến thức một cách hiệu quả.
              </div>
            </div>
            <div className="flex items-center basis-1/4">
              <img className="w-full " src="/maybay.png" />
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full mb-12 h-fit">
          <div className="basis-1/6"></div>
          <div
            className="basis-1/2 text-[#3a8238] text-2xl cursor-pointer"
            onClick={() => {navigate("/detailTextbook")}}
          >
            <span className="underline underline-offset-8">
              Nội dung giáo trình
            </span>{" "}
            {">>"}
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    );

  if (widthScreen <= 900)
    return (
      <div
        className="w-full h-full bg-center bg-cover"
        style={{ backgroundImage: `url("/public/nenmau.jpg")` }}
      >
        <div className="bg-[#f2fae9]">
          <Header />
        </div>

        <div
          className="w-full bg-center bg-cover h-[300px] flex items-center justify-center"
          style={{ backgroundImage: `url("/public/giaotrinhdekiru.jpg")` }}
        >
          <div className="max-w-[400px] text-sm text-center text-[#648e49]">
            Giáo trình "Dekiru Nihongo" là một công cụ học tập hiện đại và toàn
            diện, được thiết kế dành riêng cho người học tiếng Nhật ở các trình
            độ khác nhau, từ sơ cấp đến trung cấp và cao cấp. Giáo trình này
            không chỉ giúp người học phát triển các kỹ năng ngôn ngữ cơ bản mà
            còn chú trọng đến việc nâng cao khả năng giao tiếp thực tế.
          </div>
        </div>

        <div
          className="w-full bg-center bg-cover h-[120px] flex items-center justify-center"
          style={{ backgroundImage: `url("/public/titlegiaotrinh.jpg")` }}
        ></div>

        <div className="flex flex-col w-full gap-20 py-20 h-fit">
          <div className="flex flex-row w-full gap-16 h-fit">
            <div className="basis-1/6">
              <img className="w-full" src="/so1.png" />
            </div>
            <div className="flex flex-col justify-center gap-3 basis-2/3">
              <div className="text-xl font-semibold text-[#5ea85c] text-left">
                PHƯƠNG PHÁP HỌC TẬP CHỦ ĐỘNG
              </div>
              <div className="text-sm text-left">
                "Dekiru Nihongo" khuyến khích người học tự mình suy nghĩ và diễn
                đạt ý tưởng bằng tiếng Nhật. Phương pháp này giúp người học
                không chỉ hiểu ngữ pháp mà còn biết cách áp dụng nó trong các
                tình huống giao tiếp hàng ngày.
              </div>
            </div>
            <div className="basis-1/6"></div>
          </div>
          <div className="flex flex-row w-full gap-16 h-fit">
            <div className="flex justify-center basis-1/6">
              <img className="w-2/3" src="/bongbay.png" />
            </div>
            <div className="flex flex-col justify-center gap-3 basis-2/3">
              <div className="text-xl font-semibold text-[#5ea85c] text-right">
                CHÚ TRỌNG GIAO TIẾP{" "}
              </div>
              <div className="text-sm text-right">
                Giáo trình đặt trọng tâm vào việc phát triển kỹ năng đối thoại
                và giao tiếp, giúp người học tự tin hơn khi nói chuyện với người
                Nhật.
              </div>
            </div>
            <div className="flex basis-1/6">
              <img className="w-full " src="/so2.png" />
            </div>
          </div>
          <div className="flex flex-row w-full gap-16 h-fit">
            <div className="basis-1/6">
              <img className="w-full" src="/so3.png" />
            </div>
            <div className="flex flex-col justify-center gap-3 basis-2/3">
              <div className="text-xl font-semibold text-[#5ea85c] text-left">
                PHÁT TRIỂN TOÀN DIỆN CÁC KỸ NĂNG{" "}
              </div>
              <div className="text-sm text-left">
                Không chỉ tập trung vào kỹ năng nghe, nói, đọc, viết, "Dekiru
                Nihongo" còn giúp người học làm quen với các bài kiểm tra trình
                độ như OPI (Oral Proficiency Interview).
              </div>
            </div>
            <div className="flex items-center basis-1/6">
              <img className="w-full " src="/maybay1.png" />
            </div>
          </div>
          <div className="flex flex-row w-full gap-16 h-fit">
            <div className="flex items-center justify-center basis-1/6">
              <img className="w-full h-1/3" src="/maybay2.png" />
            </div>
            <div className="flex flex-col justify-center gap-3 basis-2/3">
              <div className="text-xl font-semibold text-[#5ea85c] text-right">
                CẤU TRÚC BÀI HỌC LOGIC{" "}
              </div>
              <div className="text-sm text-right">
                Mỗi bài học đều được thiết kế rõ ràng, từ cơ bản đến nâng cao,
                giúp người học dễ dàng tiếp cận và theo dõi tiến trình học tập
                của mình.
              </div>
            </div>
            <div className="flex basis-1/6">
              <img className="w-full " src="/so4.png" />
            </div>
          </div>
          <div className="flex flex-row w-full gap-16 h-fit">
            <div className="basis-1/6">
              <img className="w-full" src="/so5.png" />
            </div>
            <div className="flex flex-col justify-center gap-3 basis-2/3">
              <div className="text-xl font-semibold text-[#5ea85c] text-left">
                THỰC HÀNH LIÊN TỤC{" "}
              </div>
              <div className="text-sm text-left">
                Giáo trình này không chỉ dừng lại ở việc giới thiệu kiến thức
                mới mà còn liên tục ôn tập lại những gì đã học, giúp người học
                ghi nhớ và áp dụng kiến thức một cách hiệu quả.
              </div>
            </div>
            <div className="flex items-center basis-1/6">
              <img className="w-full " src="/maybay.png" />
            </div>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    );
}
