import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

import { AuthProvider } from './contexts/authContext';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <AuthProvider>
        <main>
          <Header/>
          <div className="h-screen-minus-120 md:h-screen-minus-80 bg-cover bg-center overflow-scroll" style={{ backgroundImage: 'url(https://images.ctfassets.net/arqv82dvpv8e/2AzVVZBCaRH5HocAWQcaQL/7acd6da399b895307f9347522f5098e4/VideoStill3.jpg?w=2880&fm=webp)' }}>
            {children}
          </div>
        </main>
       </AuthProvider>
      </body>
    </html>
  );
}
