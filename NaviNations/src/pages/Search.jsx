// src/pages/Search.jsx
import { useState } from 'react';
import { getCountryByName } from '../services/api';
import CountryCard from '../components/CountryCard';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getCountryByName(searchTerm);
      setCountries(data);
      setSearched(true);
      setLoading(false);
    } catch (err) {
      setError('No countries found matching your search. Please try a different query.');
      setCountries([]);
      setSearched(true);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Search Countries</h1>

        {/* Search Form */}
        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a country..."
               className="flex-grow py-2 px-4 rounded-l-lg bg-white text-gray-800 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
          <p className="mt-2 text-sm text-gray-400 text-center">
            Try searching for a country by name, e.g., "France", "Japan", "Brazil"
          </p>
        </div>

        {/* Loading/Error State */}
        {loading ? (
          <div className="flex justify-center">
            <div className="loader">Loading...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : searched ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              Search Results ({countries.length})
            </h2>
            {countries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {countries.map((country) => (
                  <CountryCard key={country.cca3} country={country} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400">No countries found matching your search.</div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            Enter a country name above to begin your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
