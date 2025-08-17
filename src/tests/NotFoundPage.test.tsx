import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';

describe('NotFoundPage', () => {
  it('renders the 404 page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Sorry, the page you are looking for/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Return/i })).toHaveAttribute('href', '/');
  });
});
