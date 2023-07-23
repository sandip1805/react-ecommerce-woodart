import authService from './AuthService';

// Mocking the setTimeout function to avoid waiting during tests
jest.useFakeTimers();

describe('AuthService', () => {
  it('should resolve with success message when valid credentials are provided', async () => {
    const email = 'user@example.com';
    const password = 'password';

    // Mock the API call and resolve it with a success message
    const loginPromise = authService.login(email, password);
    jest.runAllTimers(); // Resolve the promise immediately

    await expect(loginPromise).resolves.toEqual({
      success: true,
      message: 'Login successful!',
    });
  });

  it('should reject with an error message when invalid credentials are provided', async () => {
    const email = 'invaliduser@example.com';
    const password = 'invalidpassword';

    // Mock the API call and reject it with an error message
    const loginPromise = authService.login(email, password);
    jest.runAllTimers(); // Resolve the promise immediately

    await expect(loginPromise).rejects.toEqual({
      success: false,
      message: 'Invalid email or password!',
    });
  });

  it('should reject with an error message when email is missing', async () => {
    const email = '';
    const password = 'password';

    // Mock the API call and reject it with an error message
    const loginPromise = authService.login(email, password);
    jest.runAllTimers(); // Resolve the promise immediately

    await expect(loginPromise).rejects.toEqual({
      success: false,
      message: 'Invalid email or password!',
    });
  });

  it('should reject with an error message when password is missing', async () => {
    const email = 'user@example.com';
    const password = '';

    // Mock the API call and reject it with an error message
    const loginPromise = authService.login(email, password);
    jest.runAllTimers(); // Resolve the promise immediately

    await expect(loginPromise).rejects.toEqual({
      success: false,
      message: 'Invalid email or password!',
    });
  });
});
