import React, { useState } from 'react';
import authService from '../services/AuthService.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    authService
      .login(email, password)
      .then((response) => {
        setErrorMessage('');
        setSuccessMessage(response.message);
        // Implement any actions after successful login (e.g., redirect to dashboard).
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage(error.message);
        // Implement error handling (e.g., show error message to the user).
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          id="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          id="password"
        />
      </div>
      <button type="submit">Login</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
};

export default Login;
