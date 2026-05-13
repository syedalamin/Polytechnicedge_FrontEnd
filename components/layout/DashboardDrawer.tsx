"use client";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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

const navLinks = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Create Admin", href: "/admin/create-admin", icon: Users },
  { label: "Category", href: "/admin/category", icon: BookOpen },
];

export function DashboardDrawer() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <SidebarHeader className="bg-[#0a0e27] border-b border-white/10 p-4 md:hidden">
        <SidebarTrigger className="text-white hover:bg-white/10" />
      </SidebarHeader>
      <Sidebar collapsible="icon" className=" bg-[#0a0e27] ">
        <SidebarHeader className="p-4    ">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <span className="block text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight">
                Polytechnic Edge
              </span>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navLinks.map((link) => {
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
                            ? "bg-gradient-to-r from-cyan-400/15 via-purple-500/15 to-pink-500/15 text-white border border-white/10 shadow-[0_0_12px_-4px_rgba(168,85,247,0.3)]"
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

          <div className="mx-4 my-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-data-[collapsible=icon]:hidden" />
        </SidebarContent>

        <SidebarFooter className="border-t border-white/[0.03] p-4">
          <SidebarMenuButton
            tooltip="Logout"
            className="h-9 text-sm font-medium rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
