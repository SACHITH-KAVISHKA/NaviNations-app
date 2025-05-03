import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { getAllCountries } from '../services/api';

// Mock the API call
jest.mock('../services/api', () => ({
  getAllCountries: jest.fn(),
}));

// Mock country data
const mockCountries = [
  { cca3: 'USA', name: { common: 'United States' }, region: 'Americas' },
  { cca3: 'FRA', name: { common: 'France' }, region: 'Europe' },
  { cca3: 'JPN', name: { common: 'Japan' }, region: 'Asia' },
  { cca3: 'AUS', name: { common: 'Australia' }, region: 'Oceania' },
];

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
    expect(screen.getByText(/Welcome to Countries Explorer/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover information about countries around the world/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
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
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch countries. Please try again later.')).toBeInTheDocument();
    });
  });

  test('renders countries after successful API call', async () => {
    getAllCountries.mockResolvedValue(mockCountries);
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.getByText('Japan')).toBeInTheDocument();
      expect(screen.getByText('Australia')).toBeInTheDocument();
    });
  });

  test('filters countries by region', async () => {
    getAllCountries.mockResolvedValue(mockCountries);
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Europe/i }));
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
    expect(screen.queryByText('Japan')).not.toBeInTheDocument();
  });

  test('filters countries by search query', async () => {
    getAllCountries.mockResolvedValue(mockCountries);
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search for a country...'), { target: { value: 'Japan' } });
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
    expect(screen.queryByText('France')).not.toBeInTheDocument();
  });

  test('limits displayed countries to 8', async () => {
    const manyCountries = Array.from({ length: 10 }, (_, i) => ({
      cca3: `C${i}`,
      name: { common: `Country ${i}` },
      region: 'Americas',
    }));
    getAllCountries.mockResolvedValue(manyCountries);
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await waitFor(() => {
      const countryElements = screen.getAllByText(/Country \d/);
      expect(countryElements).toHaveLength(8); // Should only show 8 out of 10
    });
  });

  test('renders Explore All Countries link', async () => {
    getAllCountries.mockResolvedValue(mockCountries);
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await waitFor(() => {
      const link = screen.getByText('Explore All Countries');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/region/all');
    });
  });
});