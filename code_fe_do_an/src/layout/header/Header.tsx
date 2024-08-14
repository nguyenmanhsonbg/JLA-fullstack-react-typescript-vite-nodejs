import { useAuth } from "@/hook/AuthContext";
import Logo from "../Logo";
import LoginButton from "./LoginButton";
import { Nav } from "./Nav";
import { UserDropDown } from "./UserDropDown";

export default function Header() {
  const auth = useAuth();
  if (window.innerWidth >1000)
     return (
       <div className="w-screen h-28">
         <div className="container flex items-center justify-between h-full">
           <Logo />
           <div className="flex gap-7">
             <Nav />
             {auth.user?.token ? <UserDropDown /> : <LoginButton />}
           </div>
         </div>
       </div>
     );
  if(window.innerWidth <= 1000 && window.innerWidth > 750)
         return (
           <div className="w-screen h-28">
             <div className="container flex flex-row items-center justify-between h-full">
              <Logo />
              <Nav />
              {auth.user?.token ? <UserDropDown /> : <LoginButton />}
             </div>
           </div>
         );
  if(window.innerWidth <= 750)
    return (
      <div className="w-screen h-28">
        <div className="flex flex-row items-center justify-between h-full ">
          <div className="flex flex-row ml-6">
            <Logo />
            <Nav />
          </div>
          {auth.user?.token ? <UserDropDown /> : <LoginButton />}
        </div>
      </div>
    );
}
