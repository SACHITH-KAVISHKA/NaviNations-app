import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

describe('ProtectedRoute', () => {
  const TestComponent = () => <div>Test Component</div>;

  test('renders children when logged in', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute isLoggedIn={true}>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  test('redirects to login when not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute isLoggedIn={false}>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.queryByText('Test Component')).not.toBeInTheDocument();
    // Note: We can't directly test the redirect URL with MemoryRouter, but we can check the absence of the protected content
  });
});