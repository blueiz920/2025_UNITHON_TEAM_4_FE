// src/components/search-bar.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export function SearchBar({ onSearch, defaultValue = "" }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="축제 이름, 지역, 설명 등 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-9"
      />
    </div>
  );
}
