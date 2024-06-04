import { render, screen } from '@testing-library/react';
import MovieContent from './movieContent';
import { OMDBMovieDetail } from '../../types';

// Mocking the RatingForm component
jest.mock('../../components/rating', () => ({
  __esModule: true,
  default: ({ imdbID }: { imdbID: string }) => <div data-testid="rating-form">Rating Form for {imdbID}</div>,
}));

const mockMovieDetails: OMDBMovieDetail = {
  Title: 'Mock Movie',
  Year: '2021',
  Rated: 'PG-13',
  Released: '2021-01-01',
  Runtime: '120 min',
  Genre: 'Drama, Thriller',
  Director: 'John Doe',
  Writer: 'Jane Smith',
  Actors: 'Actor A, Actor B',
  Plot: 'This is a mock plot description for a mock movie.',
  Language: 'English',
  Country: 'USA',
  Awards: '5 nominations',
  Poster: 'https://via.placeholder.com/300x400',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '7.8/10' },
    { Source: 'Rotten Tomatoes', Value: '85%' },
  ],
  Metascore: '75',
  imdbRating: '7.8',
  imdbVotes: '100,000',
  imdbID: 'tt1234567',
};

describe('MovieContent', () => {
  it('renders movie details correctly', () => {
    render(<MovieContent {...mockMovieDetails} />);

    // Check that all movie details are rendered
    expect(screen.getByText('Mock Movie (2021)')).toBeInTheDocument();
    expect(screen.getByText('Drama, Thriller 120 min')).toBeInTheDocument();
    expect(screen.getByText('This is a mock plot description for a mock movie.')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Actor A, Actor B')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('5 nominations')).toBeInTheDocument();

    // Check that ratings are rendered
    expect(screen.getByText('Internet Movie Database: 7.8/10')).toBeInTheDocument();
    expect(screen.getByText('Rotten Tomatoes: 85%')).toBeInTheDocument();
    expect(screen.getByText('Metascore: 75')).toBeInTheDocument();
    expect(screen.getByText('IMDB Rating: 7.8')).toBeInTheDocument();
    expect(screen.getByText('IMDB Votes: 100,000')).toBeInTheDocument();
  });

  it('renders RatingForm when imdbID is provided', () => {
    render(<MovieContent {...mockMovieDetails} />);

    // Check that the RatingForm is rendered with the correct imdbID
    expect(screen.getByTestId('rating-form')).toBeInTheDocument();
    expect(screen.getByText('Rating Form for tt1234567')).toBeInTheDocument();
  });
});
