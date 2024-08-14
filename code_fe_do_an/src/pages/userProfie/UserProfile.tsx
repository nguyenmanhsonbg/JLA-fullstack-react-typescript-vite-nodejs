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


export default function UserProfile() {
  const { user } = useAuth();
  const [input, setInput] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleOnSubmitFile = async () => {
    const formData = new FormData();
    formData.append("userAvatar", input);
    try {
      const response = await axios.put(
        `/account/${user.account_id}`,
        formData,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (response.status == 200) {
        // setMessage(response.data.data.message);
        // alert(response.data.data.message);
      } else {
        throw new Error("Somthing went wrong!");
      }
    } catch (error) {
          navigate('/error', { state: { message: error } });
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
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center w-full max-w-sm gap-3">
                      <div className="flex flex-row items-center justify-center gap-3">
                        <FaCamera />
                        <Label className="text-center">Tải ảnh lên</Label>
                      </div>
                      <div className="flex flex-row gap-3 w-[250px]">
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
                          Cập nhật
                        </Button>
                      </div>
                    </div>
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
