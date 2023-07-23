import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
  it('should render navigation links', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const homeLink = screen.getByText('Home');
    const loginLink = screen.getByText('Login');
    const registerLink = screen.getByText('Register');

    expect(homeLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });
});
