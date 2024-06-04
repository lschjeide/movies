import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext } from '@/contexts/authContext';
import App from './login';

// Mock the AuthContext values
const mockAuthContextValues = {
  jwtToken: null,
  setJwtToken: jest.fn(),
  showLoginPopup: false,
  setShowLoginPopup: jest.fn(),
};

describe('App', () => {
  it('renders Login link when not authenticated', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValues}>
        <App />
      </AuthContext.Provider>
    );

    // Check that the Login link is rendered
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders Logout link when authenticated', () => {
    const authContextValues = {
      ...mockAuthContextValues,
      jwtToken: 'mockToken',
    };

    render(
      <AuthContext.Provider value={authContextValues}>
        <App />
      </AuthContext.Provider>
    );

    // Check that the Logout link is rendered
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('opens LoginPopup when Login link is clicked', async () => {
    const authContextValues = {
      ...mockAuthContextValues,
      setShowLoginPopup: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValues}>
        <App />
      </AuthContext.Provider>
    );

    // Click the Login link
    fireEvent.click(screen.getByText('Login'));

    // Check that setShowLoginPopup is called with true
    await waitFor(() => {
      expect(authContextValues.setShowLoginPopup).toHaveBeenCalledWith(true);
    });
  });

  it('closes LoginPopup when Cancel button is clicked', async () => {
    const authContextValues = {
      ...mockAuthContextValues,
      showLoginPopup: true,
    };

    render(
      <AuthContext.Provider value={authContextValues}>
        <App />
      </AuthContext.Provider>
    );

    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Check that setShowLoginPopup is called with false
    await waitFor(() => {
      expect(authContextValues.setShowLoginPopup).toHaveBeenCalledWith(false);
    });
  });

  // You can add more tests to validate the login and registration functionality
});
