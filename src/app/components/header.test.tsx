import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './header';


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
      }),
  useParams: () => ({
    slug: 'mock-slug',
  }),
  usePathname: () => '/',
}));

describe('Header', () => {
  it('renders header with logo and navigation links', () => {
    render(<Header />);

    // Check that the logo is rendered
    expect(screen.getByAltText('Popcorn Icon')).toBeInTheDocument();
    expect(screen.getByText('Popcorn')).toBeInTheDocument();

    // Check that navigation links are rendered
    expect(screen.getByText('Top Ten Movies')).toBeInTheDocument();
  });
});
