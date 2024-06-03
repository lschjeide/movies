import axios from 'axios';
import { OMDBMovieDetail } from '../types';

const API_URL = 'https://www.omdbapi.com';
const API_KEY = process.env.OMDBAPI_API_KEY || 'b61dec25'; // Assuming you have a fixed API key

export const fetchMovieDetails = async (id: string): Promise<OMDBMovieDetail> => {
  try {
    const response = await axios.get(`${API_URL}/?i=${id}&plot=full&apikey=${API_KEY}`);
    const data = response.data;

    if (data.Error) {
      throw new Error('Movie not found');
    }

    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export default fetchMovieDetails;