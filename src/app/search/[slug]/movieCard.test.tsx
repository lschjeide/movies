import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieCard from './movieCard';
import { OMDBMovie } from '../../types';

describe('MovieCard', () => {
  const mockMovie: OMDBMovie = {
    imdbID: 'tt1234567',
    Title: 'Mock Movie',
    Year: '2021',
    Poster: 'https://example.com/movie2.jpg',
    Plot: 'Stuff happened',
    };

  it('renders movie details correctly', () => {
    render(<MovieCard {...mockMovie} />);

    expect(screen.getByText(`Mock Movie (2021)`)).toBeInTheDocument();
    expect(screen.getByAltText('Mock Movie')).toHaveAttribute('src', `/_next/image?url=${encodeURIComponent(mockMovie.Poster)}&w=384&q=75`);
  });

  it('navigates to movie details page when clicked', () => {
    render(<MovieCard {...mockMovie} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/movie/${mockMovie.imdbID}`);

    // Simulate click event
    userEvent.click(linkElement);
    // Expect the URL to be correct
    expect(linkElement).toHaveAttribute('href', `/movie/${mockMovie.imdbID}`);
  });
});
