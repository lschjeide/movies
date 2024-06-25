"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import axios from './services/axios';
import { useState, useEffect } from "react";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://strapi.blockchainbilliards.io/api/users/me');
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          window.location.href = 'https://identity.blockchainbilliards.io/logout';
        }
      } catch (error) {
        window.location.href = 'https://identity.blockchainbilliards.io/logout';
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return (<html lang="en">
    <body className={inter.className}>
      <main></main></body></html>); // Or a loading spinner
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Header/>
          <div className="h-screen-minus-120 md:h-screen-minus-80 bg-cover bg-center overflow-scroll" style={{ backgroundImage: 'url(https://images.ctfassets.net/arqv82dvpv8e/2AzVVZBCaRH5HocAWQcaQL/7acd6da399b895307f9347522f5098e4/VideoStill3.jpg?w=2880&fm=webp)' }}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
