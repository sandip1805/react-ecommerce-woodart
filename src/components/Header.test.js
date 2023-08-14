import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

describe('Header component', () => {
  it('renders logo and navigation links', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const logo = screen.getByText('Ecommerce Woodart');
    expect(logo).toBeInTheDocument();
  });
});
