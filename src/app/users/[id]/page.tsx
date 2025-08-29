"use client";

import React, { useEffect, useState } from "react";
import { Api } from "@/src/lib/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/src/store/useUserStore";
import Link from "next/link";
import { useParams } from "next/navigation";

interface UserInfo {
  name: string;
  createdAt: string;
  avatar: string;
  birthdate: string;
}

export default function UserPage() {
  const params = useParams();
  const id = params?.id;
  const { user } = useAuthStore();

  const [userinfo, setUserinfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      return;
    }

    const fetchUser = async () => {
      try {
        if (typeof id !== 'string') {
          setError(true);
          return;
        }
        const data = await Api.getUserById(id);
        setUserinfo(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !userinfo) return <p>User not found</p>;

  return (
    <main className="flex min-h-screen p-4 bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA]">
      <aside className="w-64 mr-4">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </aside>

      <div className="flex-1 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{userinfo.name}</h1>
          <img
            src={userinfo.avatar || "/user.svg"}
            alt={userinfo.name}
            className="w-32 h-32 rounded-full mb-4"
          />
          <p className="text-sm text-gray-600 mb-2">
            Created at: {new Date(userinfo.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mb-2">Birthdate: {userinfo.birthdate}</p>
          {id === user?.id && (
            <Link href={`/settings`}>
              <Button
                variant="default"
                size="lg"
                className="w-sm h-12 bg-stone-800"
              >
                <span className="text-xl">Edit User</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}