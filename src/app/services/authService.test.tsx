import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { login, register } from './authService';

// Create a new instance of axios-mock-adapter with the default instance of axios
const mockAxios = new MockAdapter(axios);

describe('AuthService', () => {
  afterEach(() => {
    // Reset any mocks after each test
    mockAxios.reset();
  });

  it('should login successfully', async () => {
    // Mock successful login response
    const mockResponse = { token: 'mockToken' };
    mockAxios.onPost(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`).reply(200, mockResponse);

    // Call the login function
    const result = await login('mockUsername', 'mockPassword');

    // Assert that the login function returns the expected data
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when login fails', async () => {
    // Mock failed login response
    mockAxios.onPost(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`).reply(401);

    // Call the login function and expect it to throw an error
    await expect(login('mockUsername', 'mockPassword')).rejects.toThrowError();
  });

  it('should register successfully', async () => {
    // Mock successful register response
    const mockResponse = { id: 'mockId' };
    mockAxios.onPost(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`).reply(200, mockResponse);

    // Call the register function
    const result = await register('mockUsername', 'mockPassword');

    // Assert that the register function returns the expected data
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when registration fails', async () => {
    // Mock failed registration response
    mockAxios.onPost(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`).reply(400);

    // Call the register function and expect it to throw an error
    await expect(register('mockUsername', 'mockPassword')).rejects.toThrowError();
  });
});
