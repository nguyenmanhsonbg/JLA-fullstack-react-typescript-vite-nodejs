import Layout from "@/layout/Layout";
import { ContentHome1, ContentHome2, ContentHome3 } from "@/components/home";
import { useEffect, useState } from "react";
import React from 'react';
export default function Home() {
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  useEffect(()=> {
    window.addEventListener("resize", ()=> {
      setWidthScreen(window.innerWidth)
    });
    return () => 
      window.removeEventListener("resize", ()=> {
      setWidthScreen(window.innerWidth)
    })
  }, [])
  if (widthScreen > 1000)
    return (
      <Layout>
        <div className="container flex justify-between gap-10 p-16 ">
          <ContentHome1
            image={"/thuchanh.gif"}
            title="Thực hành"
            description="“Dekiru Nihongo” giúp người học luyện kỹ năng qua bài tập và tình huống thực tế, dễ áp dụng vào đời sống."
          />
          <ContentHome1
            image={"/tuongtac.gif"}
            title="Tương tác"
            description="Tạo điều kiện tương tác giữa người học và người dạy qua các hoạt động nhóm và bài tập đối thoại, cải thiện kỹ năng giao tiếp của người học."
          />
          <ContentHome1
            image={"/tiepcan.gif"}
            title="Tiếp cận thực tế"
            description="Áp dụng tiếng Nhật vào giao tiếp hằng ngày, công việc, du lịch và mua sắm, dễ dàng sử dụng từ vựng và ngữ pháp trong thực tế."
          />
        </div>

        <div className="pt-10 bg-white ">
          <div className="container flex flex-col">
            <p className="text-center mb-16 text-4xl font-semibold text-[#6fb24d]">
              PHƯƠNG PHÁP HỌC TIẾNG NHẬT
            </p>
            <div className="flex justify-center gap-16 mb-20">
              <ContentHome2
                image={"/content2_p1.png"}
                title="Chinh phục tiếng nhật thời đại 4.0"
                description="Rèn luyện kỹ năng nói tiếng Nhật thông qua các đoạn hội thoại trong các tình huống thực tế bằng phương pháp shadowing và reflexing giúp người học cải thiện khả năng giao tiếp một cách hiệu quả. Bên cạnh đó, các bài tập sắp xếp câu hỗ trợ rèn luyện tư duy và nắm vững cấu trúc tiếng Nhật. Ngoài ra, việc nhập ký tự tiếng Nhật qua các bài quiz và game giúp người dùng thành thạo kỹ năng gõ tiếng Nhật trên máy tính. Kết hợp những phương pháp này không chỉ giúp người học hoàn thành tốt việc học tiếng Nhật mà còn trang bị cho họ những kỹ năng cần thiết trong công việc và cuộc sống hiện đại."
              />
              <ContentHome2
                image={"/content2_p2.png"}
                title="Chơi mà học, áp dụng tương lai"
                description="Chơi và học có thể được kết hợp một cách tinh tế để tạo ra một trải nghiệm học tập đầy thú vị và hiệu quả. Bên cạnh việc tiếp cận kiến thức thông qua sách vở, việc chơi game cũng là một phương tiện hữu ích để luyện tập và thử thách kiến thức, đồng thời kích thích sự cạnh tranh thông qua chế độ đua top. Kết hợp với các phương pháp học tân tiến và sử dụng công nghệ AI, người dùng không chỉ hoàn thành tốt việc học tiếng Nhật mà còn biến những kiến thức và kỹ năng này thành một tài nguyên quý báu cho tương lai, đặc biệt là trong việc học ngôn ngữ mới"
              />
            </div>
          </div>
        </div>

        <div className="container flex items-center justify-center pt-10 p-x-10">
          <ContentHome3 />
        </div>
      </Layout>
    );
  if (widthScreen <= 1000 && widthScreen > 600)
    return (
      <Layout>
        <div className="container flex justify-between gap-10 p-16">
          <ContentHome1
            image={"/thuchanh.gif"}
            title="Thực hành"
            description="“Dekiru Nihongo” giúp người học luyện kỹ năng qua bài tập và tình huống thực tế, dễ áp dụng vào đời sống."
          />
          <ContentHome1
            image={"/tuongtac.gif"}
            title="Tương tác"
            description="Tạo điều kiện tương tác giữa người học và người dạy qua các hoạt động nhóm và bài tập đối thoại, cải thiện kỹ năng giao tiếp của người học."
          />
          <ContentHome1
            image={"/tiepcan.gif"}
            title="Tiếp cận thực tế"
            description="Áp dụng tiếng Nhật vào giao tiếp hằng ngày, công việc, du lịch và mua sắm, dễ dàng sử dụng từ vựng và ngữ pháp trong thực tế."
          />
        </div>

        <div className="py-10 bg-white">
          <div className="container flex flex-col">
            <p className="text-center mb-16 text-2xl font-semibold text-[#6fb24d]">
              PHƯƠNG PHÁP HỌC TIẾNG NHẬT
            </p>
            <div className="flex justify-center gap-16 mb-20 ">
              <ContentHome2
                image={"/content2_p1.png"}
                title="Chinh phục tiếng nhật thời đại 4.0"
                description="Rèn luyện kỹ năng nói tiếng Nhật thông qua các đoạn hội thoại trong các tình huống thực tế bằng phương pháp shadowing và reflexing giúp người học cải thiện khả năng giao tiếp một cách hiệu quả. Bên cạnh đó, các bài tập sắp xếp câu hỗ trợ rèn luyện tư duy và nắm vững cấu trúc tiếng Nhật. Ngoài ra, việc nhập ký tự tiếng Nhật qua các bài quiz và game giúp người dùng thành thạo kỹ năng gõ tiếng Nhật trên máy tính. Kết hợp những phương pháp này không chỉ giúp người học hoàn thành tốt việc học tiếng Nhật mà còn trang bị cho họ những kỹ năng cần thiết trong công việc và cuộc sống hiện đại."
              />
              <ContentHome2
                image={"/content2_p2.png"}
                title="Chơi mà học, áp dụng tương lai"
                description="Chơi và học có thể được kết hợp một cách tinh tế để tạo ra một trải nghiệm học tập đầy thú vị và hiệu quả. Bên cạnh việc tiếp cận kiến thức thông qua sách vở, việc chơi game cũng là một phương tiện hữu ích để luyện tập và thử thách kiến thức, đồng thời kích thích sự cạnh tranh thông qua chế độ đua top. Kết hợp với các phương pháp học tân tiến và sử dụng công nghệ AI, người dùng không chỉ hoàn thành tốt việc học tiếng Nhật mà còn biến những kiến thức và kỹ năng này thành một tài nguyên quý báu cho tương lai, đặc biệt là trong việc học ngôn ngữ mới"
              />
            </div>
          </div>
        </div>

        <div className="container flex items-center justify-center pt-10 p-x-10">
          <ContentHome3 />
        </div>
      </Layout>
    );
  if (widthScreen <= 600)
        return (
          <Layout>
            <div className="container flex justify-between gap-10 p-16">
              <ContentHome1
                image={"/thuchanh.gif"}
                title="Thực hành"
                description="“Dekiru Nihongo” giúp người học luyện kỹ năng qua bài tập và tình huống thực tế, dễ áp dụng vào đời sống."
              />
              <ContentHome1
                image={"/tuongtac.gif"}
                title="Tương tác"
                description="Tạo điều kiện tương tác giữa người học và người dạy qua các hoạt động nhóm và bài tập đối thoại, cải thiện kỹ năng giao tiếp của người học."
              />
              <ContentHome1
                image={"/tiepcan.gif"}
                title="Tiếp cận thực tế"
                description="Áp dụng tiếng Nhật vào giao tiếp hằng ngày, công việc, du lịch và mua sắm, dễ dàng sử dụng từ vựng và ngữ pháp trong thực tế."
              />
            </div>

            <div className="py-10 bg-white">
              <div className="container flex flex-col">
                <p className="text-center mb-16 text-xl font-semibold text-[#6fb24d]">
                  PHƯƠNG PHÁP HỌC TIẾNG NHẬT
                </p>
                <div className="flex justify-center gap-16 mb-20 ">
                  <ContentHome2
                    image={"/content2_p1.png"}
                    title="Chinh phục tiếng nhật thời đại 4.0"
                    description="Rèn luyện kỹ năng nói tiếng Nhật thông qua các đoạn hội thoại trong các tình huống thực tế bằng phương pháp shadowing và reflexing giúp người học cải thiện khả năng giao tiếp một cách hiệu quả. Bên cạnh đó, các bài tập sắp xếp câu hỗ trợ rèn luyện tư duy và nắm vững cấu trúc tiếng Nhật. Ngoài ra, việc nhập ký tự tiếng Nhật qua các bài quiz và game giúp người dùng thành thạo kỹ năng gõ tiếng Nhật trên máy tính. Kết hợp những phương pháp này không chỉ giúp người học hoàn thành tốt việc học tiếng Nhật mà còn trang bị cho họ những kỹ năng cần thiết trong công việc và cuộc sống hiện đại."
                  />
                  <ContentHome2
                    image={"/content2_p2.png"}
                    title="Chơi mà học, áp dụng tương lai"
                    description="Chơi và học có thể được kết hợp một cách tinh tế để tạo ra một trải nghiệm học tập đầy thú vị và hiệu quả. Bên cạnh việc tiếp cận kiến thức thông qua sách vở, việc chơi game cũng là một phương tiện hữu ích để luyện tập và thử thách kiến thức, đồng thời kích thích sự cạnh tranh thông qua chế độ đua top. Kết hợp với các phương pháp học tân tiến và sử dụng công nghệ AI, người dùng không chỉ hoàn thành tốt việc học tiếng Nhật mà còn biến những kiến thức và kỹ năng này thành một tài nguyên quý báu cho tương lai, đặc biệt là trong việc học ngôn ngữ mới"
                  />
                </div>
              </div>
            </div>

            <div className="container flex items-center justify-center pt-10 p-x-10">
              <ContentHome3 />
            </div>
          </Layout>
        );
}