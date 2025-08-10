import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-svh flex w-full">
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
