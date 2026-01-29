import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { IconBell } from "@tabler/icons-react";

export function SiteHeader() {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "https://i.ibb.co.com/ynWCGpFB/marbapp.png",
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
          <div className={"relative"}>
            <div className="w-5 h-5 rounded-full bg-red-500 absolute -right-4 mr-4 flex items-center justify-center">
              <span className="text-[10px] text-white">5</span>
            </div>
            <IconBell size={35} className="h-full" />
          </div>
          <NavUser user={data?.user} />
        </div>
      </div>
    </header>
  );
}
