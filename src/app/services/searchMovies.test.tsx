import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import searchMovies from './searchMovies';

// Create a new instance of the axios mock adapter
const mock = new MockAdapter(axios);

describe('searchMovies function', () => {
  afterEach(() => {
    // Reset the axios mock after each test
    mock.reset();
  });

  it('should return an array of movies when the search is successful', async () => {
    // Arrange
    const searchTerm = 'avengers';
    const mockResponse = {
      Search: [{ Title: 'Avengers', Year: '2012', imdbID: 'tt0848228', Type: 'movie', Poster: 'N/A' }],
      totalResults: '1',
      Response: 'True'
    };
    mock.onGet(`https://www.omdbapi.com/?s=${searchTerm}&type=movie&plot=full&apikey=b61dec25`).reply(200, mockResponse);

    // Act
    const result = await searchMovies(searchTerm);

    // Assert
    expect(result).toEqual(mockResponse.Search);
  });

  it('should throw an error when the request fails', async () => {
    // Arrange
    const searchTerm = 'avengers';
    mock.onGet(`https://www.omdbapi.com/?s=${searchTerm}&type=movie&plot=full&apikey=b61dec25`).networkError();

    // Act & Assert
    await expect(searchMovies(searchTerm)).rejects.toThrow('Failed to fetch data');
  });
});
