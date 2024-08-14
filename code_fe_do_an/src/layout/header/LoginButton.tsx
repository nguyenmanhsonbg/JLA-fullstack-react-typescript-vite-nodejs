import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import Login from "@/pages/authentication/Login";
import Register from "@/pages/authentication/Register";
import { useState } from "react";
import "./login.css"

export default function LoginButton() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  
  const openLogin = () => {
    setIsLogin(true);
    setIsRegister(false);
  }
  if(innerWidth>1000)
  return (
    <div className="flex gap-x-3">
      <Dialog open={isLogin} onOpenChange={(isOpen)=>{
        setIsLogin(isOpen);
      }}>
      <DialogTrigger asChild>
        <Button variant="outline"  className=" text-white  w-32 bg-[#2dab59] text-lg"  size={"sm"}>Đăng nhập</Button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center w-2/3">
        <Login/>
      </DialogContent>
    </Dialog>
      <Dialog open={isRegister} onOpenChange={(isOpen)=>{
        setIsRegister(isOpen);
      }}>
      <DialogTrigger asChild>
        <Button variant="outline"  className=" text-white  w-32 bg-[#2dab59] text-lg"  size={"sm"}>Đăng ký</Button>
      </DialogTrigger>
      <DialogContent  className="flex items-center justify-center w-2/3">
        <Register openLogin={()=>openLogin()}  />
      </DialogContent>
    </Dialog>
    </div>
  );
  if(innerWidth<=1000 && innerWidth>750)
    return (
      <div className="flex gap-x-3">
        <Dialog
          open={isLogin}
          onOpenChange={(isOpen) => {
            setIsLogin(isOpen);
          }}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className=" text-white w-16 bg-[#2dab59] text-[10px]"
              size={"sm"}
            >
              Đăng nhập
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Login />
          </DialogContent>
        </Dialog>
        <Dialog
          open={isRegister}
          onOpenChange={(isOpen) => {
            setIsRegister(isOpen);
          }}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className=" text-white w-16 bg-[#2dab59] text-[10px]"
              size={"sm"}
            >
              Đăng ký
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Register openLogin={() => openLogin()} />
          </DialogContent>
        </Dialog>
      </div>
    ); 
  if(innerWidth<=750)
        return (
          <div className="flex mr-6 max-" >
            <Dialog 
              open={isLogin}
              onOpenChange={(isOpen) => {
                setIsLogin(isOpen);
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className=" text-white w-28 bg-[#2dab59] mr-2"
                  size={"sm"}
                >
                  <p className="text-[16px]">Đăng nhập</p>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <Login />
              </DialogContent>
            </Dialog>
            <Dialog
              open={isRegister}
              onOpenChange={(isOpen) => {
                setIsRegister(isOpen);
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className=" text-white w-28 bg-[#2dab59]"
                  size={"sm"}
                >
                  <p className="text-[16px]">Đăng ký</p>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <Register openLogin={() => openLogin()} />
              </DialogContent>
            </Dialog>
          </div>
        ); 
}
