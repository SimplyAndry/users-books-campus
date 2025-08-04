"use client";

import { useQuery } from "@tanstack/react-query";
import { Api } from "@/src/lib/api";
import { UserCard } from "@/components/usercard";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
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
    <>
      <main className="items-center p-4 bg-gradient-to-br from-white via-gray-200 to-[#d6bfa9]">
      <div>
        <SidebarProvider>
          <AppSidebar/>
        </SidebarProvider>
      </div>    
      <div className="relative col-span-1"> 
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sticky font-bold mb-4">Lista Utenti</h1>
          <div className="grid gap-4">
            {users?.map((user: any) => (
              <UserCard
                key={user.id}
                name={user.name}
                avatar={user.avatar}
              />
            ))}
          </div>
        </div>
      </div>
        
      </main>
    </>
  );
}