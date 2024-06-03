import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import submitRating from '@/services/submitRating';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

describe('submitRating', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should submit a rating successfully', async () => {
    const rating = 8;
    const imdbID = 'tt1234567';
    const jwtToken = 'fake-jwt-token';
    const responseData = { message: 'Rating received!' };

    mock.onPost(`${API_URL}/movie-ratings`).reply(200, responseData);

    const response = await submitRating(rating, imdbID, jwtToken);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  it('should handle an error response', async () => {
    const rating = 8;
    const imdbID = 'tt1234567';
    const jwtToken = 'fake-jwt-token';

    mock.onPost(`${API_URL}/api/movie-ratings`).reply(500, { message: 'Internal Server Error' });

    try {
      await submitRating(rating, imdbID, jwtToken);
      // If the above line doesn't throw, fail the test
      throw new Error('Expected error to be thrown');
    } catch (error) {
      // Type assertion to ensure error is an AxiosError
      if (axios.isAxiosError(error) && error.response) {
        expect(error.response.status).toBe(500);
        expect(error.response.data.message).toBe('Internal Server Error');
      } else {
        throw new Error('Unexpected error format');
      }
    }
  });
});