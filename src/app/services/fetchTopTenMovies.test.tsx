import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fetchTopTenMovies from './fetchTopTenMovies';
import { Movie, OMDBMovie } from '../types';


/*export interface Movie {
    imdbID: string;
    avgRating: number;
    numRatings: number;
    weightedScore: number;
  }*/
// Mock data
const movies: Movie[] = [
  { imdbID: 'tt0111161', avgRating:  7.5, numRatings: 5, weightedScore: 8 },
  { imdbID: 'tt0068646', avgRating: 8, numRatings: 4, weightedScore: 7 },
];


/*
  export interface OMDBMovie {
    imdbID: string;
    Title: string;
    Year: string;
    Plot: string;
    Poster: string;
  }*/
const omdbMovie1: OMDBMovie = {
  Title: 'Movie 1',
  Year: '1994',
  Plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDI5LWExMWMtNWMzNzJlZjY3M2EwXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
  imdbID: 'tt0111161'
};

const omdbMovie2: OMDBMovie = {
  Title: 'Movie 2',
  Year: '1972',
  Plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  Poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwMC00ZjQ5LWFmNjEtMWY2Y2NhZGU3MTVkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  imdbID: 'tt0068646'
};

describe('fetchTopTenMovies', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch the top ten movies and their OMDB details', async () => {
    // Mock the API responses
    mock.onGet('http://localhost:1337/api/movies/top-ten').reply(200, movies);
    mock.onGet('http://www.omdbapi.com/?i=tt0111161&plot=short&apikey=b61dec25').reply(200, omdbMovie1);
    mock.onGet('http://www.omdbapi.com/?i=tt0068646&plot=short&apikey=b61dec25').reply(200, omdbMovie2);

    // Call the function
    const result = await fetchTopTenMovies();

    // Assertions
    expect(result).toEqual([
      { ...movies[0], ...omdbMovie1 },
      { ...movies[1], ...omdbMovie2 },
    ]);
  });

  it('should handle errors gracefully', async () => {
    // Mock the API responses
    mock.onGet('http://localhost:1337/api/movies/top-ten').reply(500);
    
    // Expect the function to throw an error
    await expect(fetchTopTenMovies()).rejects.toThrow('Request failed with status code 500');
  });
});
