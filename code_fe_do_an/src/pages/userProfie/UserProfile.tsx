import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChangePassword,
  DetailUserProfile,
  GameHistory,
  LearningProcess,
} from "@/components/userProfile";
import { useAuth } from "@/hook/AuthContext";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Upload, message } from "antd";
import ImgCrop from 'antd-img-crop';
import { IoMdSettings } from "react-icons/io";



export default function UserProfile() {
  const { user, setUser } = useAuth();
  const [input, setInput] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar || null);
  const [fileList, setFileList] = useState([]);
  const [showUpload, setShowUpload] = useState(false); 


  const navigate = useNavigate();

  useEffect(() => {
     if (user.avatar) {
       console.log(user.avatar);
      setAvatarPreview(user.avatar);
      setFileList([{
        uid: '-1',
        name: 'current_avatar.png',
        status: 'done',
        url: user.avatar,
      }]);
    }
  }, [user.avatar]);

  const handleUpload = async (options) => {
    const { file } = options;

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5000/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: user.token,
        },
      });

      const { filePath } = response.data;
      setFileList([{
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: filePath,
      }]);
      setAvatarPreview(filePath);
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      message.error('Upload failed.');
    }
  };

  const beforeUpload = (file) => {
    if (fileList.length >= 1) {
      message.warning('You can only upload one image.');
      return false;
    }
    return true;
  };

  const handleRemoveImage = () => {
    setAvatarPreview(null);
    setFileList([]);
  };


    const handleOnSubmitFile = async () => {
    if (!avatarPreview) {
      message.warning('Please upload an avatar image first.');
      return;
    }

    try {
      // Update the user's avatar in the database
      const updateResponse = await axios.put(
        `/account/${user.account_id}`,
        { avatar: avatarPreview }, 
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      if (updateResponse.status === 200) {
        message.success("Cập nhật avatar thành công!");
        setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          avatar: avatarPreview,
        };
        });
        setShowUpload(false);
      } else {
        throw new Error("Failed to update avatar in the database.");
      }
    } catch (error) {
      console.error(error);
      navigate('/error', { state: { message: error.message } });
    }
  };



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
  if (widthScreen > 1100)
    return (
      <div className="bg-[#f2fae9] h-full w-full">
        <Header />
        <div className="bg-white shadow-md p-7">
          <div className="flex flex-row h-auto bg-[#f1f8e9] rounded-3xl w-full">
            <div className="flex w-full m-20">
              <Tabs defaultValue="account" className="flex flex-col w-full">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col items-center w-1/4 gap-10">
                    <Avatar className="w-full h-auto mt-14">
                      <AvatarImage
                      className="rounded-full"
                      src={avatarPreview || "https://github.com/shadcn.png"}
                      alt="User Avatar"
                    />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    
                  {/* Button Icon */}
           <Button
        className="mt-0"
        onClick={() => setShowUpload(!showUpload)} // Toggle visibility
      >
        <IoMdSettings />
      </Button>

      {/* Conditional Rendering of Upload Section */}
      {showUpload && (
        <div className="flex flex-col items-center mt-4">
          <ImgCrop rotationSlider>
            <Upload
              customRequest={handleUpload}
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              maxCount={1}
              onRemove={handleRemoveImage}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true,
                showDownloadIcon: false,
              }}
            >
              {fileList.length < 1 && '+ Upload'}
              </Upload>
              </ImgCrop>
              <Button className="mt-2" onClick={handleOnSubmitFile}>
                  Cập nhật
                </Button>
                      </div>
                   )}
                    <TabsList className="flex flex-col w-full gap-2 mt-12 bg-[#f1f8e9]">
                      <TabsTrigger value="account" className="mb-2">
                        Thông tin cá nhân
                      </TabsTrigger>
                      <TabsTrigger value="password">
                        Thay đổi mật khẩu
                      </TabsTrigger>
                      <TabsTrigger value="learningProcess">
                        Tiến độ học tập
                      </TabsTrigger>
                      {/* <TabsTrigger value="game">Lịch sử trò chơi</TabsTrigger> */}
                    </TabsList>
                  </div>
                  <div>
                    <hr className="w-1 h-[700px] bg-[#d2e7cb] ml-24 mt-5" />
                  </div>
                  <div className="w-3/4 ml-16">
                    <TabsContent value="account">
                      <DetailUserProfile />
                    </TabsContent>
                    <TabsContent value="password">
                      <ChangePassword />
                    </TabsContent>
                    <TabsContent value="learningProcess">
                      <LearningProcess />
                    </TabsContent>
                    <TabsContent value="game">
                      <GameHistory />
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  if (widthScreen <= 1100 && widthScreen > 920)
    return (
      <div className="bg-[#f2fae9] h-full w-full">
        <Header />
        <div className="bg-white shadow-md p-7">
          <div className="flex flex-row h-auto bg-[#f1f8e9] rounded-3xl w-full">
            <div className="flex w-full m-20">
              <Tabs defaultValue="account" className="flex flex-col w-full">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col items-center w-1/2 gap-10">
                    <Avatar className="w-full h-auto mt-14">
                      <AvatarImage
                        className="rounded-full"
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center w-full gap-3">
                      <div className="flex flex-row items-center justify-center gap-3">
                        <FaCamera />
                        <Label className="text-center">Tải ảnh lên</Label>
                      </div>
                      <div className="flex flex-row w-full gap-1">
                        <Input
                          className="w-3/5"
                          id="picture"
                          type="file"
                          multiple={false}
                          accept=".png,.jpg,.jpeg"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setInput(event.target.files[0]);
                            console.log(event.target.files[0]);
                          }}
                        />
                        <Button className="w-2/5" onClick={handleOnSubmitFile}>
                          <p className="text-xs">Cập nhật</p>
                        </Button>
                      </div>
                    </div>
                    <TabsList className="flex flex-col w-full gap-2 mt-24 bg-[#f1f8e9]">
                      <TabsTrigger value="account" className="mb-2">
                        Thông tin cá nhân
                      </TabsTrigger>
                      <TabsTrigger value="password">
                        Thay đổi mật khẩu
                      </TabsTrigger>
                      <TabsTrigger value="learningProcess">
                        Tiến độ học tập
                      </TabsTrigger>
                      <TabsTrigger value="game">Lịch sử trò chơi</TabsTrigger>
                    </TabsList>
                  </div>
                  <div>
                    <hr className="w-1 h-[700px] bg-[#d2e7cb] ml-24 mt-5" />
                  </div>

                  <div className="w-3/4 ml-16">
                    <TabsContent value="account">
                      <DetailUserProfile />
                    </TabsContent>
                    <TabsContent value="password">
                      <ChangePassword />
                    </TabsContent>

                    <TabsContent value="learningProcess">
                      <LearningProcess />
                    </TabsContent>
                    <TabsContent value="game">
                      <GameHistory />
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  if (widthScreen <= 920 && widthScreen > 550)
    return (
      <div className="bg-[#f2fae9] h-full w-full">
        <Header />
        <div className="mb-10 bg-white shadow-md p-7">
          <div className="flex flex-row w-full h-[700px] bg-[#f1f8e9] rounded-3xl">
            <div className="flex w-full m-10">
              <Tabs defaultValue="account" className="flex flex-col w-full">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col items-center w-1/2 gap-10 ">
                    <Avatar className="w-full h-auto mt-10">
                      <AvatarImage
                        className="rounded-full"
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center w-full gap-3 ">
                      <div className="flex flex-row items-center justify-center gap-3">
                        <FaCamera />
                        <Label className="text-center">Tải ảnh lên</Label>
                      </div>
                      <div className="flex flex-row w-full gap-1">
                        <Input
                          className="w-3/5"
                          id="picture"
                          type="file"
                          multiple={false}
                          accept=".png,.jpg,.jpeg"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setInput(event.target.files[0]);
                            console.log(event.target.files[0]);
                          }}
                        />
                        <Button className="w-2/5" onClick={handleOnSubmitFile}>
                          <p className="text-xs">Cập nhật</p>
                        </Button>
                      </div>
                    </div>
                    <TabsList className="flex flex-col w-full gap-2 mt-16 bg-[#f1f8e9]">
                      <TabsTrigger value="account" className="mb-2">
                        Thông tin cá nhân
                      </TabsTrigger>
                      <TabsTrigger value="password">
                        Thay đổi mật khẩu
                      </TabsTrigger>
                      <TabsTrigger value="learningProcess">
                        Tiến độ học tập
                      </TabsTrigger>
                      <TabsTrigger value="game">Lịch sử trò chơi</TabsTrigger>
                    </TabsList>
                  </div>
                  <div>
                    <hr className="w-1 h-full bg-[#d2e7cb] ml-2 mt-auto" />
                  </div>

                  <div className="w-3/4 ml-2">
                    <TabsContent value="account">
                      <DetailUserProfile />
                    </TabsContent>
                    <TabsContent value="password">
                      <ChangePassword />
                    </TabsContent>

                    <TabsContent value="learningProcess">
                      <LearningProcess />
                    </TabsContent>
                    <TabsContent value="game">
                      <GameHistory />
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  if (widthScreen <= 550)
    return (
      <div className="bg-[#fff8e1] h-full w-full">
        <Header />
        <div className="mb-10 bg-white shadow-md p-7">
          <div className="flex flex-row w-full h-auto bg-[#f1f8e9] rounded-3xl">
            <div className="flex w-full m-10">
              <Tabs defaultValue="account" className="flex flex-col w-full">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col items-center w-1/2 gap-10">
                    <Avatar className="w-full h-auto mt-10">
                      <AvatarImage
                        className="rounded-full"
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center w-full gap-3">
                      <div className="flex flex-row items-center justify-center gap-3">
                        <FaCamera />
                        <Label className="text-center">Tải ảnh lên</Label>
                      </div>
                      <div className="flex flex-row w-full gap-1">
                        <Input
                          className="w-3/5"
                          id="picture"
                          type="file"
                          multiple={false}
                          accept=".png,.jpg,.jpeg"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setInput(event.target.files[0]);
                            console.log(event.target.files[0]);
                          }}
                        />
                        <Button className="w-2/5" onClick={handleOnSubmitFile}>
                          <p className="text-xs">Cập nhật</p>
                        </Button>
                      </div>
                    </div>
                    <TabsList className="flex flex-col w-full gap-2 mt-10 bg-[#f1f8e9]">
                      <TabsTrigger value="account" className="mb-2">
                        Thông tin cá nhân
                      </TabsTrigger>
                      <TabsTrigger value="password">
                        Thay đổi mật khẩu
                      </TabsTrigger>
                      <TabsTrigger value="learningProcess">
                        Tiến độ học tập
                      </TabsTrigger>
                      <TabsTrigger value="game">Lịch sử trò chơi</TabsTrigger>
                    </TabsList>
                  </div>
                  <div>
                    <hr className="w-1 h-full bg-[#d2e7cb] ml-2 mt-auto" />
                  </div>

                  <div className="w-3/4 ml-2">
                    <TabsContent value="account">
                      <DetailUserProfile />
                    </TabsContent>
                    <TabsContent value="password">
                      <ChangePassword />
                    </TabsContent>

                    <TabsContent value="learningProcess">
                      <LearningProcess />
                    </TabsContent>
                    <TabsContent value="game">
                      <GameHistory />
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}
