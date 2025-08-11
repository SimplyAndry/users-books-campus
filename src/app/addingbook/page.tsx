'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { createBookAction } from "./action";
import { useAuthStore } from "@/src/store/useUserStore";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


export default function AddingBookPage() {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();
     useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) {
    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg">U need to login first!</p>
            <Button>
                <a href="/auth">Login</a>
            </Button>
        </div>
  );
}
    return(
        <main className="flex min-h-screen p-4 bg-gradient-to-br from-white via-gray-200 to-[#d6bfa9]">
            <aside className="w-64 mr-4">
                <SidebarProvider>
                    <AppSidebar />
                </SidebarProvider>
            </aside>

            <div className="flex-1 relative">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
                    <form action={createBookAction} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Title</label>
                            <input
                                name="name"
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Description</label>
                            <input
                                name="description"
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Image URL</label>
                            <input
                                name="picture"
                                type="url"
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Buy URL</label>
                            <input
                                name="buyUrl"
                                type="url"
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="hidden">Seller ID</label>
                            <input
                                name="sellerId"
                                type="string"
                                value={user.id}
                                className="hidden"
                                required
                            />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </main>
    );
}