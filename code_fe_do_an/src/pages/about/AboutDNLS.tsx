import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { useEffect, useState } from "react";
import React from 'react';
export default function AboutDNLS() {
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
          className="w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url("/public/tranggioithieu.jpg")` }}
        >
          <div className="flex flex-row w-full px-32 py-12 pb-28 h-fit">
            <div className="flex flex-col gap-5 basis-1/2">
              <div className="flex flex-col basis-1/4">
                <div className="flex flex-row gap-5">
                  <div className="text-6xl font-times text-[#316b15]">"</div>
                  <div className="pt-5 text-3xl text-[#316b15] font-semibold">
                    THÀNH CÔNG
                  </div>
                  <div className="pt-5 text-3xl font-dancing text-[#316b15]">
                    của bạn
                  </div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="basis-1/6"></div>
                  <div className="pt-5 text-3xl text-[#316b15] font-semibold">
                    SỨ MỆNH
                  </div>
                  <div className="pt-5 text-3xl font-dancing text-[#316b15]">
                    của chúng tôi
                  </div>
                  <div className="text-6xl font-times text-[#316b15]">"</div>
                </div>
                <div></div>
              </div>
              <div className="flex flex-col gap-4 basis-1/2 text-[#316b15] text-justify text-xl max-w-screen-sm">
                <div>
                  Đối với những người học tiếng Nhật đang tìm kiếm một phương
                  pháp học tập hiệu quả, trang web của chúng tôi sẽ là cuộc cách
                  mạng hóa việc học ngôn ngữ.{" "}
                </div>
                <div className="font-semibold">
                  Bằng cách ứng dụng nguyên tắc đường cong quên lãng và yếu tố
                  trò chơi hóa.
                </div>
                <div>
                  Chúng tôi cung cấp một nền tảng năng động và hấp dẫn cho người
                  học tiếng Nhật, giúp họ ôn tập kanji, từ vựng, ngữ pháp thông
                  qua các tài liệu học tập đa dạng.
                </div>
              </div>
              <div className="text-3xl basis-1/4 origin-bottom -rotate-12 font-dancing text-[#478547]">
                #Dekitu Nihongo
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full gap-5 px-32 py-12 h-fit">
          <img src="/batdauhanhtrinh.png" className="w-1/3 basis-1/3" />
          <div className="pt-5 basis-2/3">
            <div className="flex flex-col gap-20">
              <div className="basis-1/4 text-[#50a229] font-balooda text-3xl font-semibold flex justify-center">
                BẮT ĐẦU<span className="ml-2 text-black">HÀNH TRÌNH</span>
              </div>
              <div className="flex flex-row gap-3 basis-1/4">
                <div className="flex justify-end basis-1/5">
                  <img className="w-[50px] h-[56px]" src="/icon_1.png" />
                </div>
                <div className="text-xl basis-4/5">
                  Người học bắt đầu bằng cách đăng ký tài khoản trên trang web
                  và đăng nhập vào hệ thống.
                </div>
              </div>
              <div className="flex flex-row gap-3 basis-1/4">
                <div className="flex justify-end basis-1/4">
                  <img className="w-[60px] h-[56px]" src="/icon_2.png" />
                </div>
                <div className="text-xl basis-3/4">
                  {" "}
                  Sau khi đăng nhập, họ sẽ chọn khóa học và hệ thống sẽ hiển thị
                  lộ trình học tập theo tuần và các ngày nhỏ trong tuần.{" "}
                </div>
              </div>
              <div className="flex flex-row gap-3 basis-1/4">
                <div className="flex justify-end basis-1/5">
                  <img className="w-[56px] h-[56px]" src="/icon_3.png" />
                </div>
                <div className="text-xl basis-4/5">
                  {" "}
                  Người học sẽ bắt đầu học các bài học được thiết kế theo từng
                  ngày, bao gồm phần từ vựng, kanji, ngữ pháp và video bổ trợ kỹ
                  năng nghe hoặc đọc được trình bày sinh động và dễ hiểu.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-32 py-12 h-fit">
          <div className="bg-[#f0fdf1] w-full h-fit flex flex-row gap-5 py-12 px-5">
            <div className="basis-2/3">
              <div className="flex flex-col pt-5 gap-7">
                <div className="basis-1/3 text-[#50a229] font-balooda text-3xl font-semibold flex justify-center">
                  CỦNG CỐ<span className="ml-2 text-black">KIẾN THỨC</span>
                </div>
                <div className="flex flex-col items-center justify-center basis-2/3">
                  <div className="w-3/5 h-full border-dashed border-2 text-xl border-[#50a229] px-20 py-20 text-center rounded-md">
                    Trong mỗi bài học, chúng tôi kèm theo bài kiểm tra nhỏ để
                    người học ôn lại ngay lập tức những kiến thức vừa học, từ đó
                    củng cố trí nhớ và tăng khả năng ghi nhớ lâu dài.
                  </div>
                  <img className="w-1/5" src="/echnang.png" />
                </div>
              </div>
            </div>
            <div className="basis-1/3">
              <img src="/ontapcungco.png" />
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full gap-5 px-32 py-12 h-fit">
          <img src="/hieuquabenvung.png" className="w-1/3 basis-1/3" />
          <div className="pt-28 basis-2/3">
            <div className="flex flex-col items-center gap-12">
              <div className="basis-1/4 text-[#50a229] font-balooda text-3xl font-semibold flex justify-center">
                THÀNH TÍCH<span className="ml-2 mr-2 text-black">VÀ</span>BỀN
                VỮNG
              </div>
              <div className="flex flex-col items-center justify-center max-w-screen-sm gap-10 basis-3/4">
                <div className="text-xl text-justify ">
                  Nhờ vào sự kết hợp giữa nguyên tắc đường cong quên lãng trang
                  web của chúng tôi không chỉ giúp người học xây dựng thói quen
                  học tập đều đặn mỗi ngày mà còn tránh được tình trạng học nhồi
                  nhét trong thời gian ngắn. Điều này nâng cao chất lượng và
                  hiệu quả học tập một cách bền vững và lâu dài.
                </div>
                <div className="text-xl text-justify ">
                  Hãy tham gia cùng chúng tôi để trải nghiệm một phương pháp học
                  tiếng Nhật hoàn toàn mới, hiệu quả và đầy hứng khởi!
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
      <div className="flex flex-col w-full h-full bg-[#fff8e1] ">
        <div className="bg-[#f2fae9]">
          <Header />
        </div>

        <div className="bg-[#88d3dd]">
          <div className="flex flex-row w-full px-32 py-12 pb-28 h-fit">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col basis-1/4">
                <div className="flex flex-row gap-5">
                  <div className="text-6xl font-times text-[#316b15]">"</div>
                  <div className="pt-5 text-3xl text-[#316b15] font-semibold">
                    THÀNH CÔNG
                  </div>
                  <div className="pt-5 text-3xl font-dancing text-[#316b15]">
                    của bạn
                  </div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="basis-1/6"></div>
                  <div className="pt-5 text-3xl text-[#316b15] font-semibold">
                    SỨ MỆNH
                  </div>
                  <div className="pt-5 text-3xl font-dancing text-[#316b15]">
                    của chúng tôi
                  </div>
                  <div className="text-6xl font-times text-[#316b15]">"</div>
                </div>
                <div></div>
              </div>
              <div className="flex flex-col gap-4 basis-1/2 text-[#316b15] text-justify text-xl max-w-screen-sm">
                <div>
                  Đối với những người học tiếng Nhật đang tìm kiếm một phương
                  pháp học tập hiệu quả, trang web của chúng tôi sẽ là cuộc cách
                  mạng hóa việc học ngôn ngữ.{" "}
                </div>
                <div className="font-semibold">
                  Bằng cách ứng dụng nguyên tắc đường cong quên lãng và yếu tố
                  trò chơi hóa.
                </div>
                <div>
                  Chúng tôi cung cấp một nền tảng năng động và hấp dẫn cho người
                  học tiếng Nhật, giúp họ ôn tập kanji, từ vựng, ngữ pháp thông
                  qua các tài liệu học tập đa dạng.
                </div>
              </div>
              <div className="text-3xl basis-1/4 origin-bottom -rotate-12 font-dancing text-[#478547]">
                #Dekitu Nihongo
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5 px-32 py-12 h-fit">
          <img src="/batdauhanhtrinh.png" className="w-full" />
          <div className="w-full pt-5 h-fit">
            <div className="flex flex-col gap-20">
              <div className="basis-1/4 text-[#50a229] font-balooda text-3xl font-semibold flex justify-center">
                BẮT ĐẦU<span className="ml-2 text-black">HÀNH TRÌNH</span>
              </div>
              <div className="flex flex-row gap-3 basis-1/4">
                <div className="flex justify-end basis-1/5">
                  <img className="w-[50px] h-[56px]" src="/icon_1.png" />
                </div>
                <div className="text-xl basis-4/5">
                  Người học bắt đầu bằng cách đăng ký tài khoản trên trang web
                  và đăng nhập vào hệ thống.
                </div>
              </div>
              <div className="flex flex-row gap-3 basis-1/4">
                <div className="flex justify-end basis-1/4">
                  <img className="w-[60px] h-[56px]" src="/icon_2.png" />
                </div>
                <div className="text-xl basis-3/4">
                  {" "}
                  Sau khi đăng nhập, họ sẽ chọn khóa học và hệ thống sẽ hiển thị
                  lộ trình học tập theo tuần và các ngày nhỏ trong tuần.{" "}
                </div>
              </div>
              <div className="flex flex-row gap-3 basis-1/4">
                <div className="flex justify-end basis-1/5">
                  <img className="w-[56px] h-[56px]" src="/icon_3.png" />
                </div>
                <div className="text-xl basis-4/5">
                  {" "}
                  Người học sẽ bắt đầu học các bài học được thiết kế theo từng
                  ngày, bao gồm phần từ vựng, kanji, ngữ pháp và video bổ trợ kỹ
                  năng nghe hoặc đọc được trình bày sinh động và dễ hiểu.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-32 py-12 h-fit">
          <div className="bg-[#f0fdf1] w-full h-fit flex flex-col gap-5 py-12 px-5">
            <div className="w-full">
              <div className="flex flex-col pt-5 gap-7">
                <div className="basis-1/3 text-[#50a229] font-balooda text-3xl font-semibold flex justify-center">
                  CỦNG CỐ<span className="ml-2 text-black">KIẾN THỨC</span>
                </div>
                <div className="flex flex-col items-center justify-center basis-2/3">
                  <div className="w-3/5 h-full border-dashed border-2 text-xl border-[#50a229] px-20 py-20 text-center rounded-md">
                    Trong mỗi bài học, chúng tôi kèm theo bài kiểm tra nhỏ để
                    người học ôn lại ngay lập tức những kiến thức vừa học, từ đó
                    củng cố trí nhớ và tăng khả năng ghi nhớ lâu dài.
                  </div>
                  <img className="w-1/5" src="/echnang.png" />
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <img className="w-1/2" src="/ontapcungco.png" />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5 px-32 py-12 h-fit">
          <img src="/hieuquabenvung.png" className="w-full basis-1/3" />
          <div className="w-full pt-28">
            <div className="flex flex-col items-center gap-12">
              <div className="basis-1/4 text-[#50a229] font-balooda text-3xl font-semibold flex justify-center">
                THÀNH TÍCH<span className="ml-2 mr-2 text-black">VÀ</span>BỀN
                VỮNG
              </div>
              <div className="flex flex-col items-center justify-center w-full max-w-screen-sm gap-10">
                <div className="text-xl text-justify ">
                  Nhờ vào sự kết hợp giữa nguyên tắc đường cong quên lãng trang
                  web của chúng tôi không chỉ giúp người học xây dựng thói quen
                  học tập đều đặn mỗi ngày mà còn tránh được tình trạng học nhồi
                  nhét trong thời gian ngắn. Điều này nâng cao chất lượng và
                  hiệu quả học tập một cách bền vững và lâu dài.
                </div>
                <div className="text-xl text-justify ">
                  Hãy tham gia cùng chúng tôi để trải nghiệm một phương pháp học
                  tiếng Nhật hoàn toàn mới, hiệu quả và đầy hứng khởi!
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
