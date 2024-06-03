import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import TopTenMovies from './page';
import fetchTopTenMovies from '../services/fetchTopTenMovies';
import { Movie, OMDBMovie } from '../types';

jest.mock('../services/fetchTopTenMovies');

// Mock data
const movies: (Movie & OMDBMovie)[] = [
  {
    Title: 'Movie 1',
    imdbID: 'tt0111161',
    avgRating: 9.3,
    weightedScore: 8.9,
    numRatings: 1000,
    Year: '1994',
    Poster: 'https://example.com/movie1.jpg',
    Plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
  },
  {
    Title: 'Movie 2',
    imdbID: 'tt0068646',
    avgRating: 9.2,
    weightedScore: 8.8,
    numRatings: 900,
    Year: '1972',
    Poster: 'https://example.com/movie2.jpg',
    Plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
  }
];

describe('TopTenMovies', () => {
  it('displays loading state initially', () => {
    (fetchTopTenMovies as jest.Mock).mockResolvedValueOnce(movies);

    render(<TopTenMovies />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    (fetchTopTenMovies as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch movies'));

    render(<TopTenMovies />);

    await waitFor(() => expect(screen.getByText('Failed to fetch movies')).toBeInTheDocument());
  });

  it('displays movies after successful fetch', async () => {
    (fetchTopTenMovies as jest.Mock).mockResolvedValueOnce(movies);

    render(<TopTenMovies />);

    await waitFor(() => {
      expect(screen.getByText('Top 10 Movies')).toBeInTheDocument();
      expect(screen.getByText('1. Movie 1 (1994)')).toBeInTheDocument();
      expect(screen.getByText('2. Movie 2 (1972)')).toBeInTheDocument();
      expect(screen.getByText('Average Rating: 9.30')).toBeInTheDocument();
      expect(screen.getByText('Weighted Rating: 8.90')).toBeInTheDocument();
      expect(screen.getByText('Number of Ratings: 1000')).toBeInTheDocument();
      expect(screen.getByText('Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.')).toBeInTheDocument();
      expect(screen.getByText('The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.')).toBeInTheDocument();
    });
  });
});