'use client'
import React from "react";
import { useQuery } from '@tanstack/react-query'
import { Api } from '@/src/lib/api'


export default function BooksPage() {
    const { data: articles, isLoading, isError, error } = useQuery({
    queryKey: ['articles'],
    queryFn: Api.getArticles,
  })
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 space-y-8 bg-gradient-to-br from-white via-gray-200 to-[#d6bfa9]">
      <h1 className="text-4xl text-stone-950">Books Page</h1>
      <p className="text-stone-900 text-xl">This is the books page.</p>
      {isLoading && <p className="text-gray-500">Caricamento...</p>}
      {isError && <p className="text-red-500">Errore: {(error as Error).message}</p>}

      {!isLoading && !isError && (
        <ul className="list-disc text-left">
          {articles.map((article: any) => (
            <li key={article.id}>
              <strong>{article.title}</strong> - venditore: {article.sellerId}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}