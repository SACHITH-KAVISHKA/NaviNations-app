import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Login', () => {
  const mockOnLogin = jest.fn();

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <Login onLogin={mockOnLogin} />
      </MemoryRouter>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('submits form with valid credentials', () => {
    render(
      <MemoryRouter>
        <Login onLogin={mockOnLogin} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(mockOnLogin).toHaveBeenCalledWith('admin', 'password123');
  });

  test('shows error with invalid credentials', () => {
    mockOnLogin.mockReturnValueOnce(false);
    render(
      <MemoryRouter>
        <Login onLogin={mockOnLogin} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});