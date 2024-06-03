import axios from 'axios';
import { fetchMovieDetails } from './fetchMovieDetails';

jest.mock('axios');

describe('fetchMovieDetails', () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return movie details if the movie is found', async () => {
    const mockData = {
      Title: 'The Matrix',
      Year: '1999',
      imdbID: 'tt0133093',
      // Add other necessary properties
    };

    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchMovieDetails('tt0133093');

    expect(result).toEqual(mockData);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(expect.stringContaining('tt0133093'));
  });


  it('should throw an error if the request fails for other reasons', async () => {
    const mockError = new Error('Internal Server Error');
    mockAxios.get.mockRejectedValueOnce(mockError);

    await expect(fetchMovieDetails('tt0133093')).rejects.toThrow('Failed to fetch data');
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(expect.stringContaining('tt0133093'));
  });
});
