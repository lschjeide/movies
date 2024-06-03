import axios from 'axios';
import { Movie, OMDBMovie } from '../types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const fetchTopTenMovies = async (): Promise<(Movie & OMDBMovie)[]> => {
  const response = await axios.get<Movie[]>(`${API_URL}/movies/top-ten`);
  const movies = response.data;

  const detailedMovies = await Promise.all(
    movies.map(async (movie) => {
      const omdbResponse = await axios.get<OMDBMovie>(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=short&apikey=b61dec25`);
      return { ...movie, ...omdbResponse.data };
    })
  );

  return detailedMovies;
};

export default fetchTopTenMovies;