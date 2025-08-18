"use client";

import Link from "next/link"
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/src/lib/api";
import { UserCard } from "@/components/usercard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function UsersPage() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => Api.getUsers(),
  });

  if (isLoading) return <div className="p-4">Caricamento...</div>;
  if (error) return <div className="p-4 text-red-500">Errore nel caricamento utenti.</div>;

  return (
    
  <main className="flex min-h-screen p-4 bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA]">
   
    <aside className="w-64 mr-4">
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </aside>
    
    <div className="flex-1 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sticky font-bold mb-4">Lista Utenti</h1>
        <div className="grid gap-4">
          {users?.map((user: any) => (
            <Link key={user.id} href={`/users/${user.id}`}>
              <UserCard
                key={user.id}
                name={user.name}
                avatar={user.avatar}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </main>

  );
}