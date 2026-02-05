import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { SocketProvider } from "@/providers/SocketProvider";
const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {" "}
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 60)",
            "--header-height": "calc(var(--spacing) * 15)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          
            {" "}
            <SocketProvider>{children}</SocketProvider>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default CommonLayout;
