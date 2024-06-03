"use client";

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

export default function Home() {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Handle search logic here, e.g., redirect to search results page
   
    router.push(`/search/${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white bg-opacity-85 p-8 rounded-md shadow-md -mt-100">
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery || ""}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="p-2 w-64 text-black border border-gray-300 rounded-l-md"
            placeholder="Search for a movie..."
          />
          <button onClick={handleSearch}  type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded-r-md hover:bg-yellow-600">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
