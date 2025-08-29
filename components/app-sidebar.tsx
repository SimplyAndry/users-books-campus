
'use client';
import { Home, Book, CircleUser, Settings, BookPlus, UserRoundPlus, Key } from "lucide-react";
import { useAuthStore } from "@/src/store/useUserStore";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

  

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: CircleUser,
  },
  {
    title: "Books",
    url: "/books",
    icon: Book,
  },
  {
    title: "Add Book",
    url: "/addingbook",
    icon: BookPlus,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { user } = useAuthStore();
  const userName = user ? user.name : "Guest";
  const menuItems = [...items];
  if (!user) {
    menuItems.push({
      title: "Sign up",
      url: "/auth/signup",
      icon: UserRoundPlus,
    });
    menuItems.push({
      title: "Login",
      url: "/auth/login",
      icon: Key,
    });
  }
  let url = "/users/" + user?.id; 
  if (userName === "Guest"){
    url = "/auth/login"; 
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem key={userName}>
              <SidebarMenuButton asChild>
                <a href={url}>
                  {user ? <img src={user.avatar} alt={userName} className="w-6 h-6 rounded-full mr-2" /> : <CircleUser className="w-6 h-6 mr-2" />}
                  <span>{userName}</span>
                </a>
              </SidebarMenuButton>  
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}