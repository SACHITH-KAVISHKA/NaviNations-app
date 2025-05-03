import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders Home page for public access', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('NaviNations')).toBeInTheDocument();
  });

  test('redirects to login for protected route when not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Search')).not.toBeInTheDocument();
  });

  test('allows access to protected route when logged in', () => {
    localStorage.setItem('user', 'admin');
    render(
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('NaviNations')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('logs out after session timeout', async () => {
    localStorage.setItem('user', 'admin');
    render(
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
    jest.advanceTimersByTime(30 * 60 * 1000 + 1); // Advance past 30 minutes
    await waitFor(() => {
      expect(screen.queryByText('Search')).not.toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
    });
  });
});