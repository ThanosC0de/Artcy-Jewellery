'use client'
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Logo from "@/public/assets/images/ARTCY.png";
import { Button } from "@/components/ui/button";
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { adminAppSidebarMenu } from "@/lib/adminSidebarMenu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";

const AppSidebar = () => {
  const {toggleSidebar} = useSidebar();
  return (
    <Sidebar className="z-50">
      <SidebarHeader className="border-b h-17 p-1">
        <div className="flex justify-between items-center px-4">
          <Image
            src={Logo.src}
            height={50}
            className="h-[60px] w-auto"
            width={50}
            alt="logo"
          />
          <Button onClick={toggleSidebar} type="button" size="icon" className="md:hidden">
            <IoMdClose />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <SidebarMenu>
          {adminAppSidebarMenu.map((menu, index) => (
            <Collapsible key={index} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild className="font-semibold px-2 py-5">
                    <Link href={menu?.url}>
                      <menu.icon />
                      {menu?.title}
                      {menu?.submenu && menu.submenu.length > 0 &&
                          <LuChevronRight
                            className="ml-auto transition-transform duration-200 
                            group-data-[state=open]/collapsible:rotate-90"/>
                        }
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {menu?.submenu && menu.submenu.length > 0 && 
                  <CollapsibleContent>
                  <SidebarMenuSub>
                    {menu.submenu.map((submenuItem, submenuIndext)=>(
                        <SidebarMenuSubItem key={submenuIndext}>
                          <SidebarMenuButton asChild className="px-2 py-5">
                            <Link href={submenuItem?.url}>
                              {submenuItem?.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                  </CollapsibleContent>
                }
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
