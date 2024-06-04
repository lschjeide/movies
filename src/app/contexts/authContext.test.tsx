import React, { useContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, AuthContext } from './authContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const TestComponent = () => {
  const { jwtToken, setJwtToken, showLoginPopup, setShowLoginPopup } = useContext(AuthContext);
  return (
    <div>
      <span data-testid="jwtToken">{jwtToken}</span>
      <span data-testid="showLoginPopup">{showLoginPopup?.toString()}</span>
      <button onClick={() => setJwtToken('test-token')}>Set Token</button>
      <button onClick={() => setShowLoginPopup(true)}>Show Login Popup</button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides the initial context values', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('jwtToken').textContent).toBe('');
    expect(screen.getByTestId('showLoginPopup').textContent).toBe('');
  });

  it('loads initial values from localStorage', () => {
    localStorage.setItem('jwtToken', 'stored-token');
    localStorage.setItem('showLoginPopup', 'true');
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('jwtToken').textContent).toBe('stored-token');
    expect(screen.getByTestId('showLoginPopup').textContent).toBe('true');
  });

  it('saves jwtToken to localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    userEvent.click(screen.getByText('Set Token'));
    waitFor(() => {
      expect(localStorage.getItem('jwtToken')).toBe('test-token');
      expect(screen.getByTestId('jwtToken').textContent).toBe('test-token');
    });
  });

  it('saves showLoginPopup to localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    userEvent.click(screen.getByText('Show Login Popup'));
    waitFor(() => {
      expect(localStorage.getItem('showLoginPopup')).toBe('true');
      expect(screen.getByTestId('showLoginPopup').textContent).toBe('true');
    });
  });
});
