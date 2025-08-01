'use client'
import React, { useState, useRef, useCallback } from "react";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { BookCard } from '@/components/bookcard'
import { Button } from '@/components/ui/button'
import { Api } from '@/src/lib/api'

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

  if (loadingUsers) return <div>Loading users...</div>;

  return (
    <main className="items-center p-4 bg-gradient-to-br from-white via-gray-200 to-[#d6bfa9]">
    <div className="items-center p-4 bg-gradient-to-br from-white via-gray-200 to-[#d6bfa9]">
      <h1 className="text-2xl font-bold mb-4">Books:</h1>

      <div className="grid gap-4">
        {articles.map((article) => {
          const userId = String(article.sellerId);
          const user = users?.find((u: any) => u.id === userId || u.name === userId);
          return (
            <BookCard
              key={article.id}
              title={article.name}
              userFullName={user ? `${user.name}` : "Utente sconosciuto"}
            />
          );
        })}
      </div>

      {hasNextPage && (
        <div className="mt-6 flex justify-center">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Caricamento..." : "Carica altri"}
          </Button>
        </div>
      )}
    </div>
    </main>
  );
  

}