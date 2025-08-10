import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  User,
  Camera,
  Images,
  FolderOpen,
  Mail,
  Settings,
} from "lucide-react";

const items = [
  { title: "Overview", href: "#overview", icon: LayoutDashboard },
  { title: "Hero", href: "#hero", icon: Camera },
  { title: "About", href: "#about", icon: User },
  { title: "Services", href: "#services", icon: FolderOpen },
  { title: "Gallery", href: "#gallery", icon: Images },
  { title: "Contact", href: "#contact", icon: Mail },
  { title: "Settings", href: "#settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-60">
      <SidebarHeader>
        <div className="px-2 py-1.5 text-sm font-medium opacity-80">Portfolio CMS</div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <Link to="/" className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100">
          Back to site
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
