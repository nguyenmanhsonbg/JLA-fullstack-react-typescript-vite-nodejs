import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
export default function Policy() {
  const navigate = useNavigate();

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
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center px-20 text-3xl font-semibold text-center">
            Điều Khoản Sử Dụng Trang Web Học Tiếng Nhật Trực Tuyến phát triển
            dựa theo Giáo Trình Dekiru Nihongo
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xl text-justify">
              Chào mừng bạn đến với Dekiru Nihongo Learning System, nền tảng học
              tiếng Nhật trực tuyến miễn phí dựa theo giáo trình Dekiru Nihongo.
              Bằng việc sử dụng trang web này, bạn đồng ý với các điều khoản và
              điều kiện sau đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào,
              vui lòng không sử dụng trang web.
            </div>
            <div className="text-xl text-justify">
              Việc truy cập và sử dụng trang web này đồng nghĩa với{" "}
              <strong>
                việc bạn đồng ý tuân thủ tất cả các điều khoản và điều kiện được
                nêu ra. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng
                ngừng sử dụng trang web ngay lập tức
              </strong>
              . Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào mà
              không cần thông báo trước. Mọi thay đổi sẽ được thông báo trên
              trang web và việc bạn tiếp tục sử dụng trang web sau khi các thay
              đổi được đăng tải đồng nghĩa với việc bạn chấp nhận những thay đổi
              đó.
            </div>
            <div className="text-xl text-justify">
              Trang web này cung cấp dịch vụ học tiếng Nhật miễn phí theo giáo
              trình Dekiru Nihongo. Tất cả nội dung trên trang web, bao gồm
              nhưng không giới hạn ở văn bản, hình ảnh, video và âm thanh, được
              cung cấp để hỗ trợ quá trình học tập của bạn. Quyền sở hữu trí tuệ
              liên quan đến nội dung trang web thuộc về công ty chúng tôi và
              được bảo vệ bởi luật pháp. Bạn không được sao chép, phân phối,
              phát hành hoặc sử dụng bất kỳ nội dung nào trên trang web mà không
              có sự cho phép trước bằng văn bản từ chúng tôi. Nếu vi phạm, chúng
              tôi có quyền khóa tài khoản của bạn mà không cần thông báo trước.
            </div>
            <div className="text-xl text-justify">
              Bạn phải giữ bí mật thông tin tài khoản và mật khẩu của mình, và
              nên thay đổi mật khẩu thường xuyên để đảm bảo an toàn. Bất kỳ hành
              vi truy cập trái phép, sử dụng thông tin với mục đích xấu, hoặc
              phá hoại trang web đều bị nghiêm cấm. Chúng tôi khuyến nghị bạn sử
              dụng các trình duyệt web được cập nhật mới nhất như Safari,
              FireFox, Google Chrome và Internet Explorer (IE 9 trở đi) để có
              trải nghiệm tốt nhất trên trang web.
            </div>
            <div className="text-xl text-justify">
              Trang web của chúng tôi có thể chứa các liên kết đến các trang web
              của bên thứ ba. Chúng tôi không chịu trách nhiệm về nội dung hoặc
              chính sách bảo mật của các trang web này. Mọi thông tin, sản phẩm
              hoặc dịch vụ được cung cấp bởi các trang web liên kết đều không
              được chúng tôi đảm bảo về tính chính xác hoặc độ tin cậy. Nếu bạn
              thiết lập liên kết với trang web của các công ty không liên kết
              với chúng tôi, chúng tôi không chịu trách nhiệm về bất kỳ thông
              tin hoặc dịch vụ nào được cung cấp bởi các trang web đó.
            </div>
            <div className="text-xl text-justify">
              Các hồ sơ đăng ký thành viên và thông tin thu thập từ khách hàng
              sẽ được xử lý theo Chính sách bảo mật của chúng tôi. Chúng tôi cam
              kết bảo vệ thông tin cá nhân của bạn và sử dụng chúng một cách hợp
              lý và hợp pháp. Vui lòng tham khảo{" "}
              <strong
                className="italic"
                onClick={() => {
                  navigate("/security");
                }}
              >
                Chính sách Bảo mật
              </strong>{" "}
              để biết thêm chi tiết về cách chúng tôi thu thập, sử dụng và bảo
              vệ thông tin cá nhân của bạn.
            </div>
            <div className="text-xl text-justify">
              Nếu bạn có bất kỳ câu hỏi nào về các điều khoản sử dụng này hoặc
              về dịch vụ của chúng tôi, xin vui lòng liên hệ với chúng tôi qua
              thông tin liên hệ được cung cấp trên trang web. Chúng tôi sẽ cố
              gắng hết sức để giải đáp mọi thắc mắc và cung cấp hỗ trợ kịp thời.
            </div>
            <div className="text-xl text-justify">
              Chúng tôi hy vọng bạn đọc kỹ các điều khoản này và hợp tác thành
              công với chúng tôi!
            </div>
            <div className="text-xl text-justify">
              Chúc bạn có một trải nghiệm học tập hiệu quả và thú vị trên Dekiru
              Nihongo Learning System.
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
