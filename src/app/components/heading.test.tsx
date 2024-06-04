import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from './heading';

describe('Heading component', () => {
  it('renders with the correct title', () => {
    const title = 'Welcome to Popcorn!';
    render(<Heading title={title} />);
    
    // Assert that the title is rendered correctly
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders with the correct class', () => {
    const title = 'Welcome to Popcorn!';
    render(<Heading title={title} />);
    
    // Assert that the correct class is applied
    const headingElement = screen.getByText(title);
    expect(headingElement).toHaveClass('mt-5 p-5 rounded-lg w-fit text-2xl mx-5 text-black font-bold bg-yellow-500');
  });
});
