'use client'
import React, { useState, useRef, useCallback } from "react";
import Link from "next/link"
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { BookCard } from '@/components/bookcard'
import { Button } from '@/components/ui/button'
import { Api } from '@/src/lib/api'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const LIMIT = 10;
export default function BooksPage() {
  const {
    data: users,
    isLoading: loadingUsers,
  } = useQuery({
    queryKey: ["users"], 
    queryFn: () => Api.getUsers()
  });

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ["articles"],
  queryFn: ({ pageParam = 1 }) => Api.getArticles({ page: pageParam, limit: LIMIT }),
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length === LIMIT ? allPages.length + 1 : undefined;
  },
  initialPageParam: 1,
});

const articles = data?.pages.flat() || [];

  if (loadingUsers) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen p-4 bg-gradient-to-br from-white via-gray-200 to-[#d6bfa9]">
      <aside className="w-64 mr-4">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </aside>
      <div className="flex-1 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Books:</h1>
          <div className="grid gap-4">
            {articles.map((article) => {
              const userId = String(article.sellerId);
              const user = users?.find((u: any) => u.id === userId || u.name === userId);
              return (
                <Link href={`/books/${article.id}`} key={article.id}>
                  <BookCard
                    key={article.id}
                    title={article.name}
                    userFullName={user ? `${user.name}` : `Unkown user (${article.sellerId})`}
                  />
                </Link>
              );
            })}
          </div>

        {hasNextPage && (
          <div className="mt-6 flex justify-center">
            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? "Loading..." : "Search more"}
            </Button>
          </div>
        )}

        </div>
      </div>
    </main>
  );
  

}