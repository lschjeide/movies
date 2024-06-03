import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export const submitRating = async (rating: number, imdbID: string, jwtToken: string) => {
  const response = await axios.post(
    `${API_URL}/api/movie-ratings`,
    { data: { rating, imdbID } },
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  return response;
};

export default submitRating;