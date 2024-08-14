import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hook/AuthContext";
import { useNavigate } from "react-router-dom";
import { NotificationArea } from "./NotificationArea";
export function UserDropDown() {
  const auth = useAuth();
  const {handleLogout} = auth
  const navigate = useNavigate();
  const handleUserProfile = () => {
    navigate("/userProfile");
  };
  if(window.innerWidth > 1000)
  return (
    <div className="flex gap-5">
      <NotificationArea userId={auth.user.account_id}/>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleUserProfile}>Thông tin cá nhân</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
if(window.innerWidth <= 1000 && window.innerWidth > 750)
    return (
      <div className="flex items-center ">
        <NotificationArea userId={auth.user.account_id}/>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="start-2 size-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleUserProfile}>
              Thông tin cá nhân
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  if(window.innerWidth <= 750)
        return (
          <div className="flex items-center ">
            <NotificationArea userId={auth.user.account_id}/>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="mr-5 end-1 size-10">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleUserProfile}>
                  Thông tin cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
}
