import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import { useRouter } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  it('updates search query on input change', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Search for a movie...');
    fireEvent.change(input, { target: { value: 'Inception' } });

    expect(input).toHaveValue('Inception');
  });


  it('calls router.push with the correct URL on search button click', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Search for a movie...');
    fireEvent.change(input, { target: { value: 'Inception' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/search/Inception');
  });

  it('calls router.push with the correct URL on Enter key press', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Search for a movie...');
    fireEvent.change(input, { target: { value: 'Inception' } });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(pushMock).toHaveBeenCalledWith('/search/Inception');
  });
});
