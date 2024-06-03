import { OMDBMovie } from '../types';
  
  export const searchMovies = async (slug: string): Promise<OMDBMovie[]> => {
    const response = await fetch(`http://www.omdbapi.com/?s=${slug}&type=movie&plot=full&apikey=b61dec25`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    if (data.Error) {
      throw new Error('Movie not found');
    }
    return data.Search;
  };
  
  export default searchMovies;