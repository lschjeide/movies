import { render, screen, waitFor } from '@testing-library/react';
import MoviePage from './page';
import { useParams } from 'next/navigation';
import fetchMovieDetails from '@/services/fetchMovieDetails';
import { OMDBMovieDetail } from '../../types';


// Mocking the fetchMovieDetails service
jest.mock('../../services/fetchMovieDetails');

jest.mock('next/navigation', () => ({
    useParams: jest.fn().mockReturnValue({ id: 'tt1234567' }),
}));

//const mockUseParams = useParams as jest.Mock;
const mockFetchMovieDetails = fetchMovieDetails as jest.Mock;

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

describe('MoviePage', () => {

  it('renders loading state while fetching movie details', async () => {
    mockFetchMovieDetails.mockResolvedValueOnce(mockMovieDetails);

    render(<MoviePage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
  });

  it('renders error state if fetching movie details fails', async () => {
    mockFetchMovieDetails.mockRejectedValueOnce(new Error('Failed to fetch movie'));

    render(<MoviePage />);

    await waitFor(() => expect(screen.getByText(/failed to fetch movie/i)).toBeInTheDocument());
  });

  it('renders movie content after fetching movie details', async () => {
    mockFetchMovieDetails.mockResolvedValueOnce(mockMovieDetails);

    render(<MoviePage />);

    await waitFor(() => expect(screen.getByText('Mock Movie (2021)')).toBeInTheDocument());

    expect(screen.getByText('Drama, Thriller 120 min')).toBeInTheDocument();
    expect(screen.getByText('This is a mock plot description for a mock movie.')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Actor A, Actor B')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('5 nominations')).toBeInTheDocument();
    expect(screen.getByText('Internet Movie Database: 7.8/10')).toBeInTheDocument();
    expect(screen.getByText('Rotten Tomatoes: 85%')).toBeInTheDocument();
    expect(screen.getByText('Metascore: 75')).toBeInTheDocument();
    expect(screen.getByText('IMDB Rating: 7.8')).toBeInTheDocument();
    expect(screen.getByText('IMDB Votes: 100,000')).toBeInTheDocument();
  });
});
