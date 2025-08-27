import React from "react";
import { notFound } from "next/navigation";
import { Api } from "@/src/lib/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

interface UserInfo {
  name: string;
  createdAt: string;
  avatar: string;
  birthdate: string;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  let user: UserInfo;

  try {
    user = await Api.getUserById(id);
  } catch (error) {
    notFound();
  }

  return (
    <main className="flex min-h-screen p-4 bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA]">
      <aside className="w-64 mr-4">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </aside>

      <div className="flex-1 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
          <img src={user.avatar || "/user.svg"} alt={user.name} className="w-32 h-32 rounded-full mb-4" />
          <p className="text-sm text-gray-600 mb-2">Created at: {new Date(user.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600 mb-2">Birthdate: {user.birthdate}</p>
          <Link href={`/settings`}>
            <Button variant="default" size="lg" className="w-sm h-12 bg-stone-800">
              <span className="text-xl">Edit User</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )

}
