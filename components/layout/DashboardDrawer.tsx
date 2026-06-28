"use client";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

import { getCookie } from "@/utils/cookie";

import LogoutButton from "../common/LogoutButton";

type NavLink = { label: string; href: string; icon: any };

const adminLinks: NavLink[] = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Create Admin", href: "/admin/create-admin", icon: Users },
  { label: "Category", href: "/admin/category", icon: BookOpen },
];

const instructorLinks: NavLink[] = [
  { label: "Instructor Dashboard", href: "/instructor", icon: LayoutDashboard },
  { label: "My Courses", href: "/instructor/courses", icon: BookOpen },
];

const studentLinks: NavLink[] = [
  { label: "Student Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "Enrolled Courses", href: "/student/my-courses", icon: BookOpen },
];

export function DashboardDrawer() {
  const pathname = usePathname();
 

  let links: NavLink[] = [];
  const loginData = getCookie("loginData");
  if (loginData) {
    const role = loginData?.role;

    if (role === "SUPER_ADMIN") {
      links = adminLinks;
    }
    if (role === "ADMIN") {
      links = adminLinks;
    } else if (role === "INSTRUCTOR") {
      links = instructorLinks;
    } else if (role === "STUDENT") {
      links = studentLinks;
    }
  }

  

  return (
    <TooltipProvider>
      <SidebarHeader className="bg-[#0a0e27] border-b border-white/10 p-4 md:hidden">
        <SidebarTrigger className="text-white hover:bg-white/10" />
      </SidebarHeader>
      <Sidebar collapsible="icon" className=" bg-[#0a0e27] ">
        <SidebarHeader className="p-4    ">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <span className="block text-sm font-bold text-transparent bg-clip-text bg-linear-to-br from-cyan-400 via-purple-400 to-pink-400 leading-tight">
                Polytechnic Edge
              </span>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={link.label}
                        className={cn(
                          "h-9 text-sm font-medium rounded-lg transition-all duration-200  my-1 ",
                          isActive
                            ? "bg-linear-to-br from-cyan-400/15 via-purple-500/15 to-pink-500/15 text-white border border-white/10 shadow-[0_0_12px_-4px_rgba(168,85,247,0.3)]"
                            : "text-white/50 hover:text-white hover:bg-white/[0.07]",
                        )}
                      >
                        <Link href={link.href}>
                          <span
                            className={cn(
                              "flex items-center justify-center w-5 h-5 rounded-md transition-all duration-200",
                              isActive
                                ? "text-cyan-400"
                                : "text-white/40 group-hover/menu-button:text-white/70",
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span>{link.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="mx-4 my-3 h-px bg-linear-to-r  from-transparent via-white/10 to-transparent group-data-[collapsible=icon]:hidden" />
        </SidebarContent>

        <SidebarFooter className="border-t border-white/3 p-4">
          <LogoutButton/>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
