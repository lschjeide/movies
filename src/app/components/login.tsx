import React, { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import Link from 'next/link';
import { register, login } from "@/services/authService";
import Cookies from 'js-cookies';


// Define the login popup component
const LoginPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { setJwtToken, setShowLoginPopup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegister] = useState(false);


  const handleAuth = async () => {
    try {
      const response = registerMode
        ? await register(username, password)
        : await login(username, password);

      const token = response.jwt; // assuming the token is returned in the response

      // Store token in context
      setJwtToken(token);
      onClose();
    } catch (error) {
      // Handle login/register error
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-[99]">
      <div className="bg-yellow-500 p-8 rounded-lg shadow-lg">
        <h2 className="text-black text-xl font-bold mb-4 text-left">{ registerMode ? "Register" : "Log in" } to rate movies!</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-black w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
        />
        <button
          onClick={handleAuth}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          { registerMode ? "Register" : "Login" }
        </button>
        <button
          onClick={() => setShowLoginPopup(false)}
          className="bg-coca-cola-red text-white px-4 py-2 ml-5 rounded-lg hover:bg-red-500 mb-5"
        >
          Cancel
        </button>
        <h2 className="text-black text-xl text-md fond-bold">{ registerMode ? "Already have a login? " : "Need to register? "} 
        <a href="#" className="font-bold text-xl text-blue-500" onClick={() => setRegister(!registerMode)}>Click here!</a>
        </h2>
      </div>
    </div>
  );
};

// Define the main component
const App: React.FC = () => {
  const { setJwtToken, showLoginPopup, setShowLoginPopup } = useContext(AuthContext);

  const jwtToken = Cookies.get('jwt');
  const firstName = Cookies.get('firstName');

  const handleLogout = () => {
    // Clear token from context
    Cookies.set('jwt', null);
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
          onClick={() => setShowLoginPopup(true)}
          className="text-white text-right py-2 rounded-lg"
        >
          LoginOld
        </Link>
          {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
        </>
      )}
    </div>
  );
};

export default App;