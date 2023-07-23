import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import authService from '../services/AuthService';

jest.mock('../services/AuthService'); // Mocking the authService

describe('Login Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it('should render the login form with email and password inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('should update the state when typing in email and password inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('password');
  });

  it('should call authService.login with provided email and password when form is submitted', async () => {
    const email = 'user@example.com';
    const password = 'password';
    authService.login.mockResolvedValueOnce({ success: true, message: 'Login successful!' });

    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith(email, password);
    });
  });

  it('should log success message when login is successful', async () => {
    const successMessage = 'Login successful!';
    authService.login.mockResolvedValueOnce({ success: true, message: successMessage });

    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(successMessage)).toBeInTheDocument();
    });
  });

  it('should log error message when login fails', async () => {
    const errorMessage = 'Invalid email or password!';
    authService.login.mockRejectedValueOnce({ success: false, message: errorMessage });

    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'invaliduser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
