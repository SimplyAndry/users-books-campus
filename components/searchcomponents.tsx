"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Api } from "@/src/lib/api";

// Search bar for books/articles
export function SearchBook() {
  const [query, setQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-articles", query],
    queryFn: () => Api.searchArticles(query),
    enabled: query.length > 2,
  });

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4" />
        <Input
          type="text"
          placeholder="Search book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">None found</p>}
      <ul className="mt-2 space-y-1">
        {data?.map((article: any) => (
          <li key={article.id} className="p-2 bg-gray-100 rounded">
            {article.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Search bar for users
export function SearchUser() {
  const [query, setQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-users", query],
    queryFn: () => Api.searchUsers(query),
    enabled: query.length > 2,
  });

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4" />
        <Input
          type="text"
          placeholder="Search user..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">None found</p>}
      <ul className="mt-2 space-y-1">
        {data?.map((user: any) => (
          <li key={user.id} className="p-2 bg-gray-100 rounded">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}