Tên dự án: JLA Fullstack React TypeScript Vite Node.js (website hỗ trợ học tiếng Nhật)

Mô tả ngắn gọn: Đây là một dự án web full-stack sử dụng các công nghệ hiện đại như React, TypeScript, Vite cho frontend và Node.js 
cho backend. Dự án có mục tiêu xây dựng một ứng dụng web hoàn chỉnh với cả frontend và backend. Dự án tạo ra với mục đích hỗ trợ học
sinh sinh viên học tiếng Nhật. Người dùng sẽ được chọn khóa học mà mình muốn học. Khóa học sẽ cho phép người dùng tham gia học với 
các chế độ học từ vựng, cấu trúc ngữ pháp, cách viết chữ... Ngoài ra, website cũng cung cấp phần luyện tập theo ngày học và kiểm tra
theo từng tuần học của khóa học đó.

Yêu cầu hệ thống: 
+ Node.js (phiên bản đề xuất: >=20.x), npm hoặc yarn.
+ MySQL.

Cấu trúc thư mục:
/frontend: Chứa mã nguồn frontend.
/backend: Chứa mã nguồn backend.
/config: Chứa các tệp cấu hình.

Hướng dẫn cài đặt:
+ Clone repository về máy.
+ Cài đặt các dependencies cho cả frontend và backend bằng lệnh npm install hoặc yarn install.
+ Sau khi cài đặt MySQL, Import file database từ folder /database
(lưu ý: sửa trường DB_PASS trong file .env của folder /backend theo mật khẩu define trên máy)
+ Chạy lệnh npm run dev cho frontend và npm run dev cho backend để khởi động server.
  
Hướng dẫn sử dụng: Truy cập vào địa chỉ local sau khi khởi động server để truy cập giao diện web. 
Sử dụng các tính năng cơ bản của ứng dụng thông qua giao diện người dùng.
Bước tạo tài khoản mới (có thể lấy mã otp trực tiếp trong DB)

Danh sách công nghệ sử dụng: 
+ Frontend: React, TypeScript, Vite, 
+ BackendL: Node.js, Express.
+ DatabaseL: MySQL.

Screenshot
Màn login
![image](https://github.com/user-attachments/assets/c20f79a5-5599-4249-8285-51b04fe0bc9c)

Chức năng đăng ký có thể lấy otp từ database
![image](https://github.com/user-attachments/assets/c66bec5a-b6a5-49d7-8116-0aa6795925c1)
