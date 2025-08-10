'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { createBookAction } from "./action";
// Api.createArticle()

export default function AddingBookPage() {
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
                            <label className="block mb-1 font-medium">Seller ID</label>
                            <input
                                name="sellerId"
                                type="string"
                                className="w-full border rounded px-3 py-2"
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