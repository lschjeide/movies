import { render, screen } from '@testing-library/react';
import Error from './error';

describe('Error', () => {
  it('renders error message correctly', () => {
    const errorMessage = 'An error occurred!';
    render(<Error error={errorMessage} />);
    
    // Check that the error message is rendered
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('does not render anything when error is null', () => {
    render(<Error error={null} />);
    
    // Check that nothing is rendered
    expect(screen.queryByText(/.+/)).toBeNull();
  });
});
