"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hook/AuthContext";
import { FaBars } from "react-icons/fa";

export function Nav() {

  const auth = useAuth();
  function onNavChange() {
    setTimeout(() => {
      const triggers = document.querySelectorAll(
        '.submenu-trigger[data-state="open"]'
      );
      if (triggers.length === 0) return;

      const firstTrigger = triggers[0] as HTMLElement;
      const viewports = document.getElementsByClassName("submenu-viewport");

      if (viewports.length > 0) {
        const viewport = viewports[0] as HTMLElement;
        viewport.style.left = `${firstTrigger.offsetLeft}px`;
      }
    });
  }
  if(window.innerWidth > 1170)
  return (
    <NavigationMenu onValueChange={onNavChange}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink to="/">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent w-40 text-[#6fb24d] font-semibold text-[20px] hover:bg-[#B6DA9F] hover:text-black"
              )}
            >
              TRANG CHỦ
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:bg-[#B6DA9F] hover:text-black rounded-md">
          <NavigationMenuTrigger className="bg-transparent font-semibold w-40 submenu-trigger text-[#6fb24d] text-[20px] ">
            HỌC TẬP
          </NavigationMenuTrigger>
          {auth.token !== "" ? (
            <NavigationMenuContent>
              <ul className="gap-3 p-6 text-xl w-60">
                <ListItem href="/alphabet" title="Bảng chữ cái" ></ListItem>
                <ListItem href="/course" title="Khóa học" />
              </ul>
            </NavigationMenuContent>
          ) : (
            <NavigationMenuContent>
              <ul className="gap-3 p-6 w-60">
                <ListItem title="Bạn chưa đăng nhập!!!" />
              </ul>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
        {/* <NavigationMenuItem  className="hover:bg-[#B6DA9F] hover:text-black rounded-md">
          <NavigationMenuTrigger className="bg-transparent w-40 font-semibold submenu-trigger text-[#6fb24d] text-[20px]">
            TRÒ CHƠI
          </NavigationMenuTrigger>
          {auth.token !== "" ? (
            <NavigationMenuContent>
              <ul className="gap-3 p-6 w-60">
                <ListItem href="/" title="Trò chơi 1" />
                <ListItem href="/" title="Trò chơi 2" />
              </ul>
            </NavigationMenuContent>
          ) : (
            <NavigationMenuContent>
              <ul className="gap-3 p-6 w-60">
                <ListItem title="Bạn chưa đăng nhập!!!" />
              </ul>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem> */}
        <NavigationMenuItem  className="hover:bg-[#B6DA9F] hover:text-black rounded-md">
          <NavigationMenuTrigger className="bg-transparent w-40 font-semibold submenu-trigger text-[#6fb24d] text-[20px]">
            GIỚI THIỆU
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 p-6 w-60">
              <ListItem href="/aboutDNLS" title="Về trang web" />
              <ListItem href="/aboutDekiru" title="Về giáo trình Dekiru Nihongo" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
  if(window.innerWidth <= 1170 && window.innerWidth > 750)
      return (
        <NavigationMenu onValueChange={onNavChange}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink to="/">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent  text-[#6fb24d] font-semibold text-[15px] hover:bg-[#B6DA9F] hover:text-black"
                  )}
                >
                  TRANG CHỦ
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hover:bg-[#B6DA9F] hover:text-black rounded-md">
              <NavigationMenuTrigger className="bg-transparent font-semibold submenu-trigger text-[#6fb24d] text-[15px] ">
                HỌC TẬP
              </NavigationMenuTrigger>
              {auth.token !== "" ? (
                <NavigationMenuContent>
                  <ul className="gap-3 p-6 text-xl w-60">
                    <ListItem href="/alphabet" title="Học bảng chữ cái" />
                    <ListItem href="/course" title="Học theo mã môn" />
                  </ul>
                </NavigationMenuContent>
              ) : (
                <NavigationMenuContent>
                  <ul className="gap-3 p-6 w-60">
                    <ListItem title="Bạn chưa đăng nhập!!!" />
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
            {/* <NavigationMenuItem className="hover:bg-[#B6DA9F] hover:text-black rounded-md">
              <NavigationMenuTrigger className="bg-transparent font-semibold submenu-trigger text-[#6fb24d] text-[15px]">
                TRÒ CHƠI
              </NavigationMenuTrigger>
              {auth.token !== "" ? (
                <NavigationMenuContent>
                  <ul className="gap-3 p-6 w-60">
                    <ListItem href="/" title="Trò chơi 1" />
                    <ListItem href="/" title="Trò chơi 2" />
                  </ul>
                </NavigationMenuContent>
              ) : (
                <NavigationMenuContent>
                  <ul className="gap-3 p-6 w-60">
                    <ListItem title="Bạn chưa đăng nhập!!!" />
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem> */}
            <NavigationMenuItem className="hover:bg-[#B6DA9F] hover:text-black rounded-md">
              <NavigationMenuTrigger className="bg-transparent font-semibold submenu-trigger text-[#6fb24d] text-[15px]">
                GIỚI THIỆU
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="gap-3 p-6 w-60">
                  <ListItem href="/" title="Về trang web" />
                  <ListItem href="/" title="Về giáo trình Dekiru Nihongo" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
if(window.innerWidth <= 750)
        return (
          <NavigationMenu onValueChange={onNavChange}>
            <NavigationMenuList>
              <NavigationMenuItem className="hover:bg-[#B6DA9F] hover:text-black rounded-md">
                <NavigationMenuTrigger className="bg-transparent font-semibold submenu-trigger text-[#6fb24d] text-[9px]">
                  <FaBars className="size-8" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="gap-3 text-[#6fb24d] p-6 w-60">
                    <ListItem href="/alphabet" title="Học bảng chữ cái" />
                    <ListItem href="/course" title="Học theo mã môn" />
                    {/* <ListItem href="/" title="Trò chơi 1" />
                    <ListItem href="/" title="Trò chơi 2" /> */}
                    <ListItem href="/" title="Về trang web" />
                    <ListItem href="/" title="Về giáo trình Dekiru Nihongo" />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
