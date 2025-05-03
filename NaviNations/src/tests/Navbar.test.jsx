import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  const mockOnLogout = jest.fn();

  test('renders navigation links and login button when not logged in', () => {
    render(
      <MemoryRouter>
        <Navbar isLoggedIn={false} onLogout={mockOnLogout} />
      </MemoryRouter>
    );
    expect(screen.getByText('NaviNations')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Regions')).not.toBeInTheDocument();
    expect(screen.queryByText('Search')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  test('renders navigation links and logout button when logged in', () => {
    render(
      <MemoryRouter>
        <Navbar isLoggedIn={true} onLogout={mockOnLogout} />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Regions')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  test('toggles mobile menu', () => {
    render(
      <MemoryRouter>
        <Navbar isLoggedIn={false} onLogout={mockOnLogout} />
      </MemoryRouter>
    );
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('Login')).toBeVisible();
    fireEvent.click(menuButton);
    expect(screen.queryByText('Home')).not.toBeVisible();
  });

  test('calls onLogout when logout button is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar isLoggedIn={true} onLogout={mockOnLogout} />
      </MemoryRouter>
    );
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});