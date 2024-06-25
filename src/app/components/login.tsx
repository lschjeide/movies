import React, { useContext } from 'react';
import Link from 'next/link';
import { getCookie, removeCookie } from 'typescript-cookie';


// Define the main component
const App: React.FC = () => {

  const jwtToken = getCookie('jwt');
  const firstName = getCookie('firstName');

  const handleLogout = () => {
    // Clear token from context
    removeCookie('jwt', {path: './blockchainbilliards.io'});
    setTimeout(window.location.href = 'https://identity.blockchainbilliards.io/login', 5000);
  };

  return (
    <div className="">
      {jwtToken ? (
       <div className="text-white py-2 rounded-lg text-right"> Hi {firstName} | <Link
          href="#"
          onClick={handleLogout}
          className="text-white py-2 rounded-lg text-right"
        >
          Logout
        </Link></div>
      ) : (
        <>
        <Link
          href="#"
          onClick={() => window.location.href = 'https://identity.blockchainbilliards.io/login'}
          className="text-white text-right py-2 rounded-lg"
        >
          Login
        </Link>
        </>
      )}
    </div>
  );
};

export default App;