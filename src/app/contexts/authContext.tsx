"use client"

import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    jwtToken: string | null;
    setJwtToken: (token: string | null) => void;
    showLoginPopup: boolean | null;
    setShowLoginPopup: (showLoginPopup: boolean | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    jwtToken: null,
    setJwtToken: () => {},
    showLoginPopup: null,
    setShowLoginPopup: () => {}
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [jwtToken, setJwtToken] = useState<string | null>(null);
    const [showLoginPopup, setShowLoginPopup] = useState<boolean | null>(null);

    // Load token and login popup state from local storage on initial render
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const loginPopup = localStorage.getItem('showLoginPopup');
        if (token) {
            setJwtToken(token);
        }
        if (loginPopup) {
            setShowLoginPopup(loginPopup === 'true');
        }
    }, []);

    // Update local storage whenever jwtToken changes
    useEffect(() => {
        if (jwtToken) {
            localStorage.setItem('jwtToken', jwtToken);
        } else {
            localStorage.removeItem('jwtToken');
        }
    }, [jwtToken]);

    // Update local storage whenever showLoginPopup changes
    useEffect(() => {
        if (showLoginPopup !== null) {
            localStorage.setItem('showLoginPopup', showLoginPopup.toString());
        } else {
            localStorage.removeItem('showLoginPopup');
        }
    }, [showLoginPopup]);

    return (
        <AuthContext.Provider value={{ jwtToken, setJwtToken, showLoginPopup, setShowLoginPopup }}>
            {children}
        </AuthContext.Provider>
    );
};
