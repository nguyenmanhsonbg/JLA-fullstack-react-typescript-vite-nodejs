import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@/hook/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useState, useEffect } from "react";

export default function HeaderAdmin() {
  const { user } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar || null);


   useEffect(() => {
     if (user.avatar) {
       console.log(user.avatar);
      setAvatarPreview(user.avatar);
    }
  }, [user.avatar]);
  return (
    <div
      style={{ backgroundColor: "#FFF8E1" }}
      className="container w-full border h-28 border-inherit"
    >
      <div className="flex items-center justify-between h-full">
        <div></div>
        <div className="flex flex-row items-center">
          <button>
            <FontAwesomeIcon
              icon={faSearch}
              className="text-2xl text-gray-800 "
            />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faBell}
              className="text-2xl text-gray-800 ml-9"
            />
          </button>
          <div className="ml-9">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={avatarPreview || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24 p-3">
                <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
