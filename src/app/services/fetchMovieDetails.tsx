import { OMDBMovieDetail } from '../types';

export const fetchMovieDetails = async (id: string): Promise<OMDBMovieDetail> => {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=b61dec25`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    if (data.Error) {
      throw new Error('Movie not found');
    }
    return data;
  };

export default fetchMovieDetails;