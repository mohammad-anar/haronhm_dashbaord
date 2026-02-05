"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getSocket } from "@/lib/socket";
import { IconBell, IconMenuOrder } from "@tabler/icons-react";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavUser } from "./nav-user";
import axios from "axios";
import Notification from "./shared/Notification";

export function SiteHeader() {
  const [notifications, setNotifications] = useState<any>([]);

  console.log(notifications);
  useEffect(() => {
    const socket = getSocket();

    const handler = (order: any) => {
      setNotifications((prev: any) => [order, ...prev]);
    };

    socket.on("new-order", handler);

    return () => {
      socket.off("new-order", handler);
    };
  }, [notifications]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "http://10.10.7.111:5000/api/v1/notification",
        );

        setNotifications(response?.data?.data?.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }

    getData();
  }, []);

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar:
        "https://i.ibb.co.com/VWkMFBWM/pngtree-user-icon-png-image-1796659.jpg",
    },
  };
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-black" />
        {/* <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        /> */}
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={
                  " hover:bg-gray-100 duration-300 cursor-pointer rounded-md p-3"
                }
              >
                <div className="relative ">
                  <div className="w-5 h-5 rounded-full bg-red-500 absolute -right-4 mr-4 flex items-center justify-center">
                    <span className="text-[10px] text-white">
                      {(notifications as any[]).reduce(
                        (acc, notification) =>
                          acc + (notification.isRead === true ? 0 : 1),
                        0,
                      )}
                    </span>
                  </div>
                  <IconBell size={35} className="h-full" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <div className="px-2">
                <h4 className="font-bold text-lg">Notification</h4>
              </div>
              <DropdownMenuSeparator />
              <div className="px-2 max-h-[200px] overflow-y-auto space-y-4">
                {notifications &&
                  notifications.map((notification: any, index: number) => (
                    <Notification key={index} data={notification} />
                  ))}
              </div>
              <div className="flex items-center justify-end p-2 pr-5">
                <Link
                  href={"/notifications"}
                  className="text-sm underline text-blue-500 hover:text-primary"
                >
                  See All
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavUser user={data?.user} />
        </div>
      </div>
    </header>
  );
}
