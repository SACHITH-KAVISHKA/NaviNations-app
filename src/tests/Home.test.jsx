// src/__tests__/Home.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { getAllCountries } from '../services/api';

// Mock the API call
jest.mock('../services/api', () => ({
  getAllCountries: jest.fn(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders hero section correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Explore the World with/i)).toBeInTheDocument();
    expect(screen.getByText(/Dive into rich country profiles/i)).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    getAllCountries.mockReturnValue(new Promise(() => {})); // Pending promise to simulate loading
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message on API failure', async () => {
    getAllCountries.mockRejectedValue(new Error('API Error'));
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await screen.findByText('Failed to fetch countries. Please try again later.');
  });
});
