import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export default function HeaderAdmin() {
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
                    src="https://github.com/shadcn.png"
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
