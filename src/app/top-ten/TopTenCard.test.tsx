import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import TopTenCard from './topTenCard';

describe('TopTenCard', () => {
  const mockMovie = {
    imdbID: 'tt1234567',
    Title: 'Mock Movie',
    Year: '2021',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    Plot: 'Mock plot description',
    avgRating: 7.5,
    weightedScore: 8.2,
    numRatings: 100,
    index: 1,
  };

  it('renders movie details correctly', async () => {
    render(<TopTenCard {...mockMovie} />);

    await waitFor(() => {
        expect(screen.queryByText(`Average Rating: ${mockMovie.avgRating.toFixed(2)}`)).toBeInTheDocument();
        expect(screen.queryByText(`Weighted Rating: ${mockMovie.weightedScore.toFixed(2)}`)).toBeInTheDocument();
        expect(screen.queryByText(`Number of Ratings: ${mockMovie.numRatings}`)).toBeInTheDocument();
        expect(screen.queryByText(mockMovie.Plot)).toBeInTheDocument();
      });
  });

});