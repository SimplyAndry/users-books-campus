"use client";

import React, { useEffect, useState } from "react";
import { Api } from "@/src/lib/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteButton } from "@/components/deletebutton";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditBook from "./edit-book";

interface BookInfo {
  name: string;
  picture: string;
  sellerId: any;
  createdAt: string;
  description: string;
  buyUrl: string;
}

export default function BookPage() {
  const params = useParams();
  const id = params?.id;
  const [book, setBook] = useState<BookInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchBook = async () => {
      try {
        if (typeof id !== 'string') {
          setError(true);
          setLoading(false);
          return;
        }
        const data = await Api.getBookById(id);
        setBook(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !book) return <p>Book not found</p>;

  return (
    <main className="flex min-h-screen p-4 bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA]">
      <aside className="w-64 mr-4">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </aside>

      <div className="flex-1 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 truncate">{book.name}</h1>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Book</DialogTitle>
              </DialogHeader>
              <EditBook bookId={id as string} onClose={() => {setOpen(false)}} />
            </DialogContent>
          </Dialog>
          <img
            src={book.picture}
            alt={book.name}
            className="w-full max-w-2xl h-auto mb-4 rounded-lg shadow"
          />
          <p className="text-sm text-gray-600 mb-2">
            Created at: {new Date(book.createdAt).toLocaleDateString()}
          </p>
          <p className="text-base text-gray-800 mb-6">{book.description}</p>
          <Link href={book.buyUrl}>
            <Button variant="default" size="lg" className="w-sm h-12 bg-stone-800">
              <span className="text-xl">Buy</span>
            </Button>
          </Link>
          {typeof id === 'string' && 
          <div className="">
            <p></p>
            <Button variant="default" onClick={() => setOpen(true)} size="lg" className="w-sm h-12 bg-gray-500">
              <span className="text-xl">Edit</span>
            </Button>
            <DeleteButton id={id} sellerId={book.sellerId} />
          </div>
          }

        </div>
      </div>
    </main>
  );
}