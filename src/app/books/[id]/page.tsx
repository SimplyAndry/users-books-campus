'use client';

import React from "react";
import { notFound } from "next/navigation";
import { Api } from "@/src/lib/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { deleteBookAction } from "./delete/action";
import Link from "next/link";

interface BookPageProps {
  params: Promise<{ id: string }>;
}
interface BookInfo{
    name: string;
    picture: any;
    sellerId: any;
    createdAt: string;
    description: string;
    buyUrl: string;
}
export default async function BookPage({ params }: BookPageProps ) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  let book: BookInfo;

  try {
    book= await Api.getBookById(id);
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
          <h1 className="text-2xl font-bold mb-4">{book.name}</h1>
          <img src={book.picture} alt={book.name} className="w-2xl h-auto mb-4 rounded-lg shadow" />
          <p className="text-sm text-gray-600 mb-2">Created at: {new Date(book.createdAt).toLocaleDateString()}</p>
          <p className="text-base text-gray-800 mb-6">{book.description}</p>
          <Link href={book.buyUrl}>
            <Button variant="default" size="lg" className="w-sm h-12 bg-stone-800">
                <span className="text-xl">Buy</span>
            </Button>
        </Link>
        <form action={deleteBookAction} className="mt-4" >
          <Button type="submit" variant="destructive" size="lg" className="w-sm h-12 bg-red-600">
            <span className="text-xl">Delete Book</span>
          </Button>
          <input type="text" name="id" id="id" defaultValue={id} className="hidden" />
        </form>
        </div>
      </div>
    </main>
  );
}
