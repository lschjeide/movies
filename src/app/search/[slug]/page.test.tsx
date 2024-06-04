import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieList from './page';
import searchMovies from '@/services/searchMovies';

jest.mock('../../services/searchMovies');

// Mock useParams hook
jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({ slug: 'mock-slug' }),
}));

describe('MovieList', () => {
  it('renders loading state while fetching movies', async () => {
    // Mock searchMovies to resolve after some time
    (searchMovies as jest.Mock).mockResolvedValueOnce([]);

    render(<MovieList />);

    // Expect loading state to be rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for loading state to disappear (optional)
    await screen.findByText('Showing results for: mock-slug');

    // Ensure loading state is not rendered
    expect(screen.queryByTestId('loading')).toBeNull();

    // Your additional assertions here...
  });

  it('renders movie list when movies are fetched successfully', async () => {
    const mockMovies = [
      {
        imdbID: 'tt1234567',
        Title: 'Mock Movie 1',
        Year: '2021',
        Poster: 'https://example.com/movie1.jpg',
        Plot: 'Mock plot description 1',
        avgRating: 7.5,
        weightedScore: 8.2,
        numRatings: 100,
      },
      {
        imdbID: 'tt7654321',
        Title: 'Mock Movie 2',
        Year: '2022',
        Poster: 'https://example.com/movie2.jpg',
        Plot: 'Mock plot description 2',
        avgRating: 8.0,
        weightedScore: 8.5,
        numRatings: 150,
      },
    ];

    // Mock searchMovies as jest.Mock) to resolve with mock movies
    (searchMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    render(<MovieList />);

    // Wait for movie list to be rendered
    await waitFor(() => {
      expect(screen.getByText('Showing results for: mock-slug')).toBeInTheDocument();  
      expect(screen.getByText('Mock Movie 1 (2021)')).toBeInTheDocument();
      expect(screen.getByText('Mock Movie 2 (2022)')).toBeInTheDocument();
    });

    // Ensure loading state is not rendered
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  // Add other test cases here...
});
  /*
describe('MovieList', () => {
  beforeEach(() => {
    // Reset searchMovies before each test
    (searchMovies as jest.Mock).mockReset();
  });

  it('renders loading state while fetching movies', async () => {
    // Mock searchMovies to resolve after some time
    (searchMovies as jest.Mock).mockResolvedValueOnce([]);

    render(<MovieList />);

    // Ensure loading state is rendered
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Wait for movies to be loaded
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).toBeNull();
    });

    // Ensure loading state is not rendered
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  it('renders error message when fetching movies fails', async () => {
    // Mock searchMovies as jest.Mock) to reject with an error
    (searchMovies as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch movies'));

    render(<MovieList />);

    // Wait for error message to be rendered
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch movies')).toBeInTheDocument();
    });

    // Ensure loading state is not rendered
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  it('renders movie list when movies are fetched successfully', async () => {
    const mockMovies = [
      {
        imdbID: 'tt1234567',
        Title: 'Mock Movie 1',
        Year: '2021',
        Poster: 'mock-poster-url-1',
        Plot: 'Mock plot description 1',
        avgRating: 7.5,
        weightedScore: 8.2,
        numRatings: 100,
      },
      {
        imdbID: 'tt7654321',
        Title: 'Mock Movie 2',
        Year: '2022',
        Poster: 'mock-poster-url-2',
        Plot: 'Mock plot description 2',
        avgRating: 8.0,
        weightedScore: 8.5,
        numRatings: 150,
      },
    ];

    // Mock searchMovies as jest.Mock) to resolve with mock movies
    (searchMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    render(<MovieList />);

    // Wait for movie list to be rendered
    await waitFor(() => {
      expect(screen.getByText('Mock Movie 1 (2021)')).toBeInTheDocument();
      expect(screen.getByText('Mock Movie 2 (2022)')).toBeInTheDocument();
    });

    // Ensure loading state is not rendered
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  // Add other test cases here...
});
*/