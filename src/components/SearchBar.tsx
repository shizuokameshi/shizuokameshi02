"use client";

import { useState, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocate: () => void;
  loading: boolean;
}

export function SearchBar({ onSearch, onLocate, loading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl mx-auto">
      <div className="flex flex-1 bg-white/90 backdrop-blur rounded-2xl shadow-lg overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="都市名を入力 (例: Tokyo, Osaka)"
          disabled={loading}
          className="flex-1 px-4 py-3 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-4 py-3 text-blue-600 hover:text-blue-800 disabled:opacity-40 transition-colors"
          aria-label="検索"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </button>
      </div>
      <button
        type="button"
        onClick={onLocate}
        disabled={loading}
        className="px-4 py-3 bg-white/90 backdrop-blur rounded-2xl shadow-lg text-blue-600 hover:text-blue-800 disabled:opacity-40 transition-colors"
        aria-label="現在地を取得"
        title="現在地を取得"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
          <circle cx="12" cy="9" r="2.5" strokeWidth={2} />
        </svg>
      </button>
    </form>
  );
}
