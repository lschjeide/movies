
import axios from 'axios';
import { OMDBMovie } from '../types';

const API_URL = 'https://www.omdbapi.com';
const API_KEY = process.env.OMDBAPI_API_KEY || 'b61dec25';

export const searchMovies = async (slug: string): Promise<OMDBMovie[]> => {
  try {
    const response = await axios.get(`${API_URL}/?s=${slug}&type=movie&plot=full&apikey=${API_KEY}`);
    const data = response.data;
    
    if (data.Error) {
      throw new Error('Movie not found');
    }

    return data.Search;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export default searchMovies;