import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { useEffect, useState } from "react";
import React from 'react';
export default function Security() {
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

  return (
    <div className="flex flex-col w-full h-full bg-[#f2fae9] ">
      <div className="bg-[#f2fae9]">
        <Header />
      </div>

      <div className="container max-w-[1400px] w-11/12 h-fit p-7 bg-white rounded-xl shadow-md mt-10">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center px-20 text-3xl font-semibold text-center">
              Chính sách bảo mật Trang Web Học Tiếng Nhật Trực Tuyến phát triển
              dựa theo Giáo Trình Dekiru Nihongo
            </div>
            <div className="text-xl text-justify">
              Chúng tôi cam kết bảo vệ quyền riêng tư của bạn và đảm bảo rằng
              thông tin cá nhân của bạn được bảo mật. Chính sách bảo mật này
              giải thích cách chúng tôi thu thập, sử dụng, và bảo vệ thông tin
              của bạn khi bạn sử dụng trang web học tiếng Nhật của chúng tôi.
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold">
                Chúng tôi sử dụng thông tin của bạn để:
              </div>
              <div className="text-xl text-justify">
                Cung cấp và duy trì dịch vụ học tiếng Nhật.
              </div>
              <div className="text-xl text-justify">
                Cải thiện và cá nhân hóa trải nghiệm học tập của bạn.
              </div>
              <div className="text-xl text-justify">
                Liên lạc với bạn về các cập nhật, thông tin khóa học, và các
                thông báo quan trọng.
              </div>
              <div className="text-xl text-justify">
                Phân tích và theo dõi dữ liệu sử dụng trang web để cải thiện
                dịch vụ của chúng tôi.
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold">
                Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba
                ngoại trừ trong các trường hợp sau:
              </div>
              <div className="text-xl text-justify">
                Khi có sự đồng ý của bạn.
              </div>
              <div className="text-xl text-justify">
                Khi cần thiết để cung cấp dịch vụ bạn yêu cầu.
              </div>
              <div className="text-xl text-justify">
                Khi chúng tôi tin rằng việc chia sẻ thông tin là cần thiết để
                tuân thủ pháp luật hoặc bảo vệ quyền lợi hợp pháp của chúng tôi.
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold">
                Chúng tôi cam kết bảo mật thông tin cá nhân của người dùng
              </div>
              <div className="text-xl text-justify">
                Thông tin cá nhân của Người Dùng trên Dekiru Nihongo Learning
                System được Ban quản trị cam kết bảo mật tuyệt đối theo chính
                sách bảo mật thông tin cá nhân được đăng tải trên website
                DNLS.com. Việc thu thập và sử dụng thông tin của mỗi Người Dùng
                chỉ được thực hiện khi có sự đồng ý của Người Dùng trừ những
                trường hợp pháp luật có quy định khác và quy định này.
              </div>
              <div className="text-xl text-justify">
                Không sử dụng, không chuyển giao, cung cấp hoặc tiết lộ cho bên
                thứ 3 về thông tin cá nhân của Người Dùng khi không có sự đồng ý
                của Người Dùng ngoại trừ các trường hợp được quy định tại quy
                định này hoặc quy định của pháp luật.
              </div>
              <div className="text-xl text-justify">
                Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công
                dẫn đến mất mát dữ liệu cá nhân của Người Dùng, Ban quản trị có
                trách nhiệm thông báo và làm việc với cơ quan chức năng điều tra
                và xử lý kịp thời, đồng thời thông báo cho Người Dùng được biết
                về vụ việc.
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold">Bạn có quyền:</div>
              <div className="text-xl text-justify">
                Truy cập và cập nhật thông tin cá nhân của mình.
              </div>
              <div className="text-xl text-justify">
                Yêu cầu chúng tôi xóa thông tin cá nhân của bạn.
              </div>
              <div className="text-xl text-justify">
                Rút lại sự đồng ý của bạn cho chúng tôi sử dụng thông tin cá
                nhân của bạn bất cứ lúc nào.
              </div>
              <div className="text-xl text-justify">
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian.
                Mọi thay đổi sẽ được đăng tải trên trang web và có hiệu lực kể
                từ ngày đăng tải. Chúng tôi khuyến khích bạn thường xuyên kiểm
                tra chính sách bảo mật để hiểu rõ về cách chúng tôi bảo vệ thông
                tin của bạn.
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="basis-5/6"></div>
            <div className="flex flex-row items-center gap-3 basis-1/6">
              <div className="text-xl font-semibold text-right text-[#5fb633]">
                DNLS Team
              </div>
              <img className="w-2/5 h-full" src="echlaplo.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f2fae9]">
        <Footer />
      </div>
    </div>
  );
}
