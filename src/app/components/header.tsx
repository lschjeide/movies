"use client";
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '@/contexts/authContext';

import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

import { useParams } from 'next/navigation';

import AppWithAuthProvider from './login';

const Header: React.FC = () => {
  const { slug } = useParams() || "";
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { showLoginPopup } = useContext(AuthContext);

  useEffect(() => {
  }, [showLoginPopup]);

  const router = useRouter();
  const isHHomePage = usePathname() === '/'

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Handle search logic here, e.g., redirect to search results page
    setSearchQuery('');
    router.push(`/search/${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              src="https://valuable-flowers-710ac6d0c7.media.strapiapp.com/popcorn_6478baee74.png"
              alt="Popcorn Icon"
              width={50}
              height={50}
            />
            <span className="text-3xl font-bold text-yellow-500 pr-10">Popcorn</span>
          </div>
          </Link>
          <nav className="hidden md:flex space-x-4 mx-15">
            <Link href="/top-ten">
              Top Ten Movies
            </Link>
          </nav>
        </div>
        {!isHHomePage && <div className="hidden md:flex mx-5 flex-1 justify-center">
          <div className="flex w-full max-w-md">
            <input
              type="text"
              value={searchQuery || ""}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="flex-grow p-2 rounded-l-md text-black"
              placeholder="Search for Movies..."
            />
            <button onClick={handleSearch} type="submit" className="bg-yellow-500 p-2 rounded-r-md">
              Search
            </button>
          </div>
        </div>}
        <div className="hidden md:flex items-center space-x-4">
          <AppWithAuthProvider/>
        </div>
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
      {(isOpen || showLoginPopup) && (
        <div className="md:hidden p-4">
          <nav className="space-y-2 text-right">
            <Link href="/top-ten" onClick={() => setIsOpen(false)}>
              <span>Top Ten Movies</span>
            </Link>
            <AppWithAuthProvider/>
          </nav>
        </div>
      )}
       {!isHHomePage && <div className="md:hidden flex flex-1 bg-gray-800 p-4 -mt-8">

          <div className="mt-4 flex w-full">
            <input
              type="text"
              value={searchQuery || ""}
              onChange={handleSearchChange}
              className="flex-grow p-2 rounded-l-md text-black"
              onKeyDown={handleKeyDown}
              placeholder="Search for Movies..."
            />
            <button onClick={handleSearch} type="submit" className="bg-yellow-500 p-2 rounded-r-md">
              Search
            </button>
          </div>
        </div>}
    </header>

    
  );
}

export default Header;